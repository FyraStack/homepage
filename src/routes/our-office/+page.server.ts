import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request }) => {
		const webhookUrl = env.OFFICE_SIGNUP_DISCORD_WEBHOOK;
		if (!webhookUrl) {
			return fail(500, { error: 'Office signup is not configured.' });
		}
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const membership = String(data.get('membership') ?? '').trim();
		const note = String(data.get('note') ?? '').trim();

		if (!name || !email) {
			return fail(400, { error: 'Name and email are required.', name, email, membership, note });
		}

		const res = await fetch(webhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				embeds: [
					{
						title: 'New office membership inquiry',
						color: 0xc6716d,
						fields: [
							{ name: 'Name', value: name, inline: true },
							{ name: 'Email', value: email, inline: true },
							{ name: 'Membership', value: membership || 'Not specified', inline: true },
							...(note ? [{ name: 'Note', value: note }] : [])
						]
					}
				]
			})
		});

		if (!res.ok) {
			return fail(500, { error: 'Something went wrong. Email us directly at hello@fyrastack.com.', name, email, membership, note });
		}

		return { success: true };
	}
};
