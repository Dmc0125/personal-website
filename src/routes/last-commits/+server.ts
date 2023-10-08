import type { RequestHandler } from './$types';
import { projectsRepos } from '$lib/projects';

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

export type CommitDates = Record<number, string>;

export const GET: RequestHandler = async () => {
	const res = await Promise.all<Promise<CommitsRes | null>[]>(
		projectsRepos.map((ownerWithRepo) => {
			const [owner, repo] = ownerWithRepo.split('/');
			return fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
				headers: {
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28',
				},
			}).then((r) => {
				if (r.ok) {
					return r.json();
				} else {
					return null;
				}
			});
		}),
	);

	const parsed: CommitDates = {};

	res.forEach((r, i) => {
		if (!r) {
			return;
		}

		const latest = r[0];
		// Last commit on Nov 12, 2023
		if (latest.commit.committer) {
			parsed[i] = latest.commit.committer.date;
		}
	});

	const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	return new Response(JSON.stringify(parsed), {
		headers: {
			Expires: expiresDate.toUTCString(),
			'Cache-Control': 'max-age=86400, public',
		},
	});
};
