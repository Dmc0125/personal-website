import { z } from 'zod';
import { createClient } from '@sanity/client';
import { error, redirect } from '@sveltejs/kit';
import { SANITY_DATASET, SANITY_PROJECT_ID } from '$env/static/private';

import { translations, type Locale } from '$lib/i18n/translations';
import type { PageServerLoad } from './$types';
import type { CommitsTimestampsRes } from '../last-commits/+server';

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

	try {
		const commits = (await (await event.fetch('/last-commits')).json()) as CommitsTimestampsRes;

		for (let i = 0; i < projects.length; i++) {
			const projectData = projects[i];

			const commitId = `${projectData.githubOwner.toLowerCase()}-${projectData.githubRepo.toLowerCase()}`;
			const commitTimestamp = commits[commitId];

			if (commitTimestamp) {
				const d = new Date(commitTimestamp);
				const t = translations.get(locale)!;

				projectData.commitMsg = `${t.commit} ${
					t.months[d.getMonth()]
				} ${d.getDate()}, ${d.getFullYear()}`;
			}
		}
	} catch (_) {
		throw error(500, 'Unknown server error');
	}

	return {
		locale,
		projects,
	};
};
