import { z } from 'zod';
import { createClient } from '@sanity/client';
import { error, redirect } from '@sveltejs/kit';
import {
	DATABASE_HOST,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
	SANITY_DATASET,
	SANITY_PROJECT_ID,
} from '$env/static/private';

import { translations, type Locale, type LocaleTranslations } from '$lib/i18n/translations';
import type { PageServerLoad } from './$types';
import { createDb, type CommitTimestamp, type NewCommitTimestamp } from '../../../db/utils';

const sanityClient = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	apiVersion: '2021-10-21',
	useCdn: false,
});

const projectSchema = z.object({
	order: z.number(),
	isFinished: z.boolean(),
	isWebsite: z.boolean(),
	title: z.string().min(1),
	description: z.string().min(1),
	tags: z.array(z.string().min(1)),
	githubOwner: z.string().min(1),
	githubRepo: z.string().min(1),
	imgBgClr: z.string().or(z.undefined()),
	imgBgClrMiddle: z.string().or(z.undefined()),
	lang: z.string().min(1),
	websiteUrl: z.string().url().or(z.undefined()),
	img: z
		.object({
			asset: z.object({
				_ref: z
					.string()
					.min(1)
					.transform((url) => url.replace('image-', '').replace('-png', '.png')),
			}),
		})
		.or(z.undefined()),
});

type ProjectSchema = z.infer<typeof projectSchema>;

type CommitsRes = {
	url: string;
	sha: string;
	node_id: string;
	html_url: string;
	comments_url: string;
	commit: {
		url: string;
		author: {
			name: string;
			email: string;
			date: string;
		} | null;
		committer: {
			name: string;
			email: string;
			date: string;
		} | null;
	};
	author: {
		url: string;
	} | null;
}[];

const ONE_DAY_MS = 60 * 1000 * 60 * 24;

async function setOrUpdateCommits(
	projects: (ProjectSchema & { commitMsg?: string })[],
	t: LocaleTranslations,
) {
	const db = createDb(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD);

	let cachedCommitsTimestamps: CommitTimestamp[];
	try {
		cachedCommitsTimestamps = await db.selectFrom('commit').selectAll().execute();
	} catch (e) {
		console.log(e);
		throw error(500, JSON.stringify('Unknown server error'));
	}

	const shouldFetch: { repo: string; owner: string; isNew: boolean }[] = [];

	for (const p of projects) {
		const cached = cachedCommitsTimestamps.find(
			({ gh_repo, gh_username }) =>
				gh_repo.toLowerCase() === p.githubRepo.toLowerCase() &&
				gh_username.toLowerCase() === p.githubOwner.toLowerCase(),
		);

		if (!cached) {
			shouldFetch.push({
				repo: p.githubRepo.toLowerCase(),
				owner: p.githubOwner.toLowerCase(),
				isNew: true,
			});
		} else if (cached.updated_at + ONE_DAY_MS < new Date().getTime()) {
			shouldFetch.push({
				repo: p.githubRepo.toLowerCase(),
				owner: p.githubOwner.toLowerCase(),
				isNew: false,
			});
		} else {
			const d = new Date(Number(cached.updated_at));
			p.commitMsg = `${t.commit} ${t.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
		}
	}

	if (shouldFetch.length) {
		try {
			const fetchedRes = await Promise.all<Promise<CommitsRes | null>[]>(
				shouldFetch.map(async ({ owner, repo }) => {
					const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
						headers: {
							Accept: 'application/vnd.github+json',
							'X-GitHub-Api-Version': '2022-11-28',
						},
					});
					if (r.ok) {
						return r.json();
					} else {
						return null;
					}
				}),
			);

			const toInsert: NewCommitTimestamp[] = [];

			for (let i = 0; i < fetchedRes.length; i++) {
				const r = fetchedRes[i];
				if (!r) {
					return;
				}
				const latest = r[0];
				if (!latest.commit.committer) {
					return;
				}

				const { isNew, owner, repo } = shouldFetch[i];
				const d = new Date(latest.commit.committer.date);

				const p = projects.find(
					({ githubOwner, githubRepo }) =>
						owner.toLowerCase() == githubOwner.toLowerCase() &&
						repo.toLowerCase() === githubRepo.toLowerCase(),
				);
				if (p) {
					p.commitMsg = `${t.commit} ${t.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
				}

				if (isNew) {
					toInsert.push({
						updated_at: d.getTime(),
						gh_username: owner,
						gh_repo: repo,
					});
				} else {
					await db
						.updateTable('commit')
						.set({
							updated_at: d.getTime(),
						})
						.where('gh_username', '=', owner)
						.where('gh_repo', '=', repo)
						.execute();
				}
			}

			if (toInsert.length) {
				await db.insertInto('commit').values(toInsert).execute();
			}
		} catch (e) {
			console.log(e);
			throw error(500, JSON.stringify('Unknown server error'));
		}
	}
}

export const load: PageServerLoad = async (event) => {
	let locale: Locale;
	if (event.params.lang === 'sk') {
		locale = 'sk_SK';
	} else if (event.params.lang === 'en') {
		locale = 'en_EN';
	} else {
		throw redirect(308, '/en');
	}

	const data = await sanityClient.fetch(`*[lang == "${locale}"]`);
	const result = z.array(projectSchema).safeParse(data);

	if (!result.success) {
		throw error(500, 'Unknown server error');
	}

	const projects = result.data as (z.infer<typeof projectSchema> & { commitMsg?: string })[];
	projects.sort((a, b) => a.order - b.order);

	await setOrUpdateCommits(projects, translations.get(locale)!);

	return {
		locale,
		projects,
	};
};
