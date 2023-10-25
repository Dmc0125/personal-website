import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } from '$env/static/private';
import { createDb, type CommitTimestamp, type NewCommitTimestamp } from '../../../db/utils';

const projectsRepos: { owner: string; repo: string }[] = [
	{ owner: 'dmc0125', repo: 'funding-arbitrage' },
	{ owner: 'dmc0125', repo: 'anchor-client-gen-rs' },
	{ owner: 'AlgoTrdng', repo: 'meteora-autocompounder' },
	{ owner: 'dmc0125', repo: 'sveegy' },
];

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

export type CommitsTimestampsRes = Record<string, number>;

function insertCachedToRes(cached: CommitTimestamp[], res: CommitsTimestampsRes) {
	cached.forEach(({ gh_repo, gh_username, updated_at }) => {
		res[`${gh_username}-${gh_repo}`] = new Date(Number(updated_at)).getTime();
	});
}

export const GET: RequestHandler = async () => {
	const db = createDb(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD);

	let cachedCommitsTimestamps: CommitTimestamp[];
	try {
		cachedCommitsTimestamps = await db.selectFrom('commit').selectAll().execute();
	} catch (e) {
		console.log(e);
		throw error(500, JSON.stringify('Unknown server error'));
	}

	const shouldFetch: { owner: string; repo: string; isNew: boolean }[] = [];
	projectsRepos.forEach(({ owner, repo }) => {
		const c = cachedCommitsTimestamps.find(
			({ gh_repo, gh_username }) => gh_repo === repo && gh_username == owner,
		);

		if (!c) {
			shouldFetch.push({
				owner,
				repo,
				isNew: true,
			});
		} else if (c.updated_at + 60000 * 60 * 24 < new Date().getTime()) {
			shouldFetch.push({
				owner,
				repo,
				isNew: false,
			});
		}
	});

	const res: CommitsTimestampsRes = {};

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

			const insertValues: NewCommitTimestamp[] = [];

			for (let i = 0; i < fetchedRes.length; i++) {
				const r = fetchedRes[i];
				if (!r) {
					continue;
				}

				const latest = r[0];
				if (!latest.commit.committer) {
					continue;
				}

				const { isNew, owner, repo } = shouldFetch[i];
				const d = new Date(latest.commit.committer.date);

				res[`${owner}-${repo}`] = d.getTime();

				if (isNew) {
					insertValues.push({
						updated_at: d.getTime(),
						gh_repo: repo,
						gh_username: owner,
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

			if (insertValues.length) {
				await db.insertInto('commit').values(insertValues).execute();
			}
		} catch (e) {
			console.log(e);
			throw error(500, JSON.stringify('Unknown server error'));
		}
	} else {
		insertCachedToRes(cachedCommitsTimestamps, res);
	}

	const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	return new Response(JSON.stringify(res), {
		headers: {
			Expires: expiresDate.toUTCString(),
			'Cache-Control': 'max-age=86400, public',
		},
	});
};
