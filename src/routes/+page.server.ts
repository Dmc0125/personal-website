import { error } from '@sveltejs/kit';
import mailjetClient from 'node-mailjet';

import type { Actions } from './$types';
import { MAILJET_API_KEY, MAILJET_SECRET_KEY, RECEIVER_EMAIL_ADDRESS } from '$env/static/private';

function validateExists(prop: FormDataEntryValue | null, name: string): string {
	if (!prop) {
		throw error(400, JSON.stringify({ error: `${name} was not provided` }));
	}

	const str = prop.toString();
	if (!str.length) {
		throw error(400, JSON.stringify({ error: `${name} was not provided` }));
	}

	return str;
}

export const actions: Actions = {
	async default(event) {
		const data = await event.request.formData();

		const name = validateExists(data.get('name'), 'Name');
		const email = validateExists(data.get('email'), 'Email');
		const message = validateExists(data.get('message'), 'Message');

		if (name.length < 2) {
			throw error(400, JSON.stringify({ error: `Name is too small` }));
		}

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (!emailRegex.test(email)) {
			throw error(400, JSON.stringify({ error: `Email is not valid` }));
		}

		if (message.length < 2) {
			throw error(400, JSON.stringify({ error: 'Message is too small' }));
		}

		try {
			const mailjet = mailjetClient.apiConnect(MAILJET_API_KEY, MAILJET_SECRET_KEY);
			await mailjet.post('send', { version: 'v3.1' }).request({
				Messages: [
					{
						From: {
							Email: email,
							Name: name,
						},
						To: [
							{
								Email: RECEIVER_EMAIL_ADDRESS,
								Name: 'Me',
							},
						],
						Subject: 'Contact form portfolio',
						TextPart: `Sender: ${name}\n${message}`,
					},
				],
			});
		} catch (_) {
			throw error(500, JSON.stringify({ error: 'Unable to send' }));
		}

		return { success: true };
	},
};
