import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { vpsPlans } from '$lib/data/vpsPlans';
import { colocationPlans } from '$lib/data/colocationPlans';
import { recordSubmission } from '$lib/server/counter';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const { plan, name, email, company, currentProvider, useCase } = data;

	if (!name || !email || !plan) {
		return json({ error: 'Missing required fields.' }, { status: 400 });
	}

	const DISCORD_WEBHOOK_URL = env.DISCORD_WEBHOOK_URL;

	if (!DISCORD_WEBHOOK_URL) {
		return json({ error: 'Webhook not configured.' }, { status: 500 });
	}

	const vpsPlan = vpsPlans.find(p => p.name === plan);
	const coloPlan = colocationPlans.find(p => p.name === plan);
	const priceNum = vpsPlan ? Number(vpsPlan.price) : coloPlan ? Number(coloPlan.price) : 0;
	const priceLabel = vpsPlan ? `$${vpsPlan.price}/mo` : coloPlan ? `$${coloPlan.price}/mo` : 'Unknown';

	const { submissionNumber, totalMonthly } = recordSubmission(priceNum);

	const specs = vpsPlan
		? `${vpsPlan.cpu} vCPU · ${vpsPlan.ram}GB RAM · ${vpsPlan.storage}GB NVMe`
		: coloPlan
			? `${coloPlan.units}U · ${coloPlan.power}W · ${coloPlan.bandwidth} Fair-use`
			: '';

	const description = [
		`**${name}** · ${email}`,
		company         && `*${company}*`,
		currentProvider && `Currently on ${currentProvider}`,
	].filter(Boolean).join('\n');

	const fields = [
		...(useCase ? [{ name: 'Use Case', value: useCase, inline: false }] : []),
		{
			name: 'Running total',
			value: `**$${totalMonthly}/mo** across **${submissionNumber}** reservation${submissionNumber === 1 ? '' : 's'}`,
			inline: false,
		},
	];

	const body = {
		username: 'Fyra Stack',
		embeds: [
			{
				author:      { name: 'New pre-reservation' },
				title:       `${plan}  ·  ${priceLabel}`,
				description: specs ? `\`${specs}\`\n\n${description}` : description,
				color:       0xc6716d,
				fields,
				footer:      { text: `#${submissionNumber} · fyrastack.com` },
				timestamp:   new Date().toISOString(),
			},
		],
	};

	const res = await fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		console.error('Discord webhook failed:', res.status, await res.text());
		return json({ error: 'Failed to send notification.' }, { status: 502 });
	}

	return json({ success: true });
};
