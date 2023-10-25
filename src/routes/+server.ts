import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response('Redirect', {
		status: 308,
		headers: {
			location: '/en',
		},
	});
};
