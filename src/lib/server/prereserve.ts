import type { RemoteFormInput } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { colocationPlans } from '$lib/data/colocationPlans';
import { vpsPlans } from '$lib/data/vpsPlans';
import { recordSubmission } from '$lib/server/counter';

export interface PrereserveInput extends RemoteFormInput {
	plan: string;
	name: string;
	email: string;
	company: string;
	currentProvider: string;
	useCase: string;
}

export type PrereserveResult =
	| {
			ok: true;
			plan: string;
			email: string;
	  }
	| {
			ok: false;
			error: string;
	  };

export const validPlanNames = new Set<string>(
	[...vpsPlans, ...colocationPlans].map((plan) => plan.name)
);

export async function submitPrereserve({
	plan,
	name,
	email,
	company = '',
	currentProvider = '',
	useCase = ''
}: PrereserveInput): Promise<PrereserveResult> {
	const webhookUrl = env.DISCORD_WEBHOOK_URL;

	if (!webhookUrl) {
		return { ok: false, error: 'Webhook not configured.' };
	}

	const vpsPlan = vpsPlans.find((item) => item.name === plan);
	const coloPlan = colocationPlans.find((item) => item.name === plan);

	if (!vpsPlan && !coloPlan) {
		return { ok: false, error: 'Selected plan is not available.' };
	}

	let priceNum = 0;
	let priceLabel = '';
	let specs = '';

	if (vpsPlan) {
		priceNum = Number(vpsPlan.price);
		priceLabel = `$${vpsPlan.price}/mo`;
		specs = `${vpsPlan.cpu} vCPU · ${vpsPlan.ram}GB RAM · ${vpsPlan.storage}GB SAS3`;
	} else if (coloPlan) {
		priceNum = Number(coloPlan.price);
		priceLabel = `$${coloPlan.price}/mo`;
		specs = `${coloPlan.units}U · ${coloPlan.power}W · ${coloPlan.bandwidth} Fair-use`;
	}

	const { submissionNumber, totalMonthly } = await recordSubmission(priceNum);

	const description = [
		`**${name}** · ${email}`,
		company && `*${company}*`,
		currentProvider && `Currently on ${currentProvider}`
	]
		.filter(Boolean)
		.join('\n');

	const fields = [
		...(useCase ? [{ name: 'Use Case', value: useCase, inline: false }] : []),
		{
			name: 'Running total',
			value: `**$${totalMonthly}/mo** across **${submissionNumber}** reservation${submissionNumber === 1 ? '' : 's'}`,
			inline: false
		}
	];

	const body = {
		username: 'Fyra Stack',
		embeds: [
			{
				author: { name: 'New pre-reservation' },
				title: `${plan}  ·  ${priceLabel}`,
				description: specs ? `\`${specs}\`\n\n${description}` : description,
				color: 0xc6716d,
				fields,
				footer: { text: `#${submissionNumber} · fyrastack.com` },
				timestamp: new Date().toISOString()
			}
		]
	};

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		console.error('Discord webhook failed:', response.status, await response.text());
		return { ok: false, error: 'Failed to send notification.' };
	}

	return { ok: true, plan, email };
}
