import { form, getRequestEvent } from '$app/server';
import { type } from 'arktype';
import { colocationPlans } from '$lib/data/colocationPlans';
import { AUTUMN_SECRET_KEY } from '$env/static/private';
import { Autumn } from 'autumn-js';

const planNames = colocationPlans.map((p) => p.name);
const planType = type.enumerated(...planNames);

const reserveSchema = type({
	plan: planType,
	name: 'string.trim & /\\S/',
	email: 'string.trim & string.email'
});

export type ReserveInput = typeof reserveSchema.infer;

export type ReserveResult =
	| {
			ok: true;
			paymentLink: string;
	  }
	| {
			ok: false;
			error: string;
	  };

// TODO: Integrate with payment provider (Autumn)
async function createPaymentLink(plan: string, email: string, name: string): Promise<string> {
	const event = getRequestEvent();
	if (!event) {
		throw new Error('No request event found');
	}

	const user_id = crypto.randomUUID();
	const autumn = new Autumn({ secretKey: AUTUMN_SECRET_KEY });

	await autumn.customers.getOrCreate({
		customerId: user_id,
		name: name,
		email: email
	});

	const url = new URL(event.request.url);
	const successUrl = `${url.origin}/services/colocation?success=true`;

	const response = await autumn.billing.attach({
		customerId: user_id,
		planId: plan,
		successUrl
	});

	return response.paymentUrl as string;
}

export const reserve = form(
	reserveSchema,
	async (data): Promise<ReserveResult> => {
		const paymentLink = await createPaymentLink(data.plan, data.email, data.name);
		return { ok: true, paymentLink };
	}
);
