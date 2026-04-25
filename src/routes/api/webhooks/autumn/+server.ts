import { error, type RequestHandler } from '@sveltejs/kit';
import { Webhook } from 'svix';
import { env } from '$env/dynamic/private';

///// this section was stolen from autumn's repo because they dont export types for it. i really hate this section and it should be removed ASAP when there is a better solution.

type CustomerProductsUpdatedScenario =
	| 'new'
	| 'upgrade'
	| 'downgrade'
	| 'renew'
	| 'cancel'
	| 'expired'
	| 'past_due'
	| 'scheduled';

type BalancesLimitType = 'included' | 'max_purchase' | 'spend_limit';
type UsageAlertThresholdType = 'usage' | 'usage_percentage';

export type CusProductStatus = 'active' | 'expired' | 'scheduled' | 'trialing' | 'past_due';

type CusProduct = {
	id: string;
	name: string | null;
	group: string | null;
	status: CusProductStatus;
	canceled_at?: number | null;
	started_at: number;
	is_default: boolean;
	is_add_on: boolean;
	version?: number | null;
	stripe_subscription_ids?: string[] | null;
	current_period_start?: number | null;
	current_period_end?: number | null;
	entity_id?: string | null;
	items?: ProductItem[] | null;
	quantity?: number;
};

export interface ProductItem {
	type?: string | null;
	feature_id?: string | null;
	feature_type?: string | null;
	included_usage?: number | 'Infinity' | null;
	interval?: string | null;
	interval_count?: number | null;
	price?: number | null;
	tiers?: unknown[] | null;
	tier_behavior?: unknown | null;
	usage_model?: unknown | null;
	billing_units?: number | null;
	reset_usage_when_enabled?: boolean | null;
	entity_feature_id?: string | null;
	display?: unknown | null;
	quantity?: number | null;
	next_cycle_quantity?: number | null;
	config?: {
		rollover?: unknown | null;
		on_increase?: string | null;
		on_decrease?: string | null;
	} | null;
}

interface CustomerProductsUpdatedEvent {
	type: 'customer.products.updated';
	data: {
		scenario: CustomerProductsUpdatedScenario;
		customer: {
			id: string;
			name: string;
			email: string;
			balances: Record<string, unknown>;
			subscriptions: CusProduct[];
		};
		updated_product: {
			id: string;
			name: string;
			features: unknown[];
		};
	};
}

interface BalancesLimitReachedEvent {
	type: 'balances.limit_reached';
	data: {
		customer_id: string;
		feature_id: string;
		entity_id?: string;
		limit_type: BalancesLimitType;
	};
}

interface BalancesUsageAlertTriggeredEvent {
	type: 'balances.usage_alert_triggered';
	data: {
		customer_id: string;
		feature_id: string;
		usage_alert: {
			name: string;
			threshold: number;
			threshold_type: UsageAlertThresholdType;
		};
	};
}

type AutumnWebhookEvent =
	| CustomerProductsUpdatedEvent
	| BalancesLimitReachedEvent
	| BalancesUsageAlertTriggeredEvent;

///// end of shit code section

const get_header_or_throw = (headers: Headers, field: string): string => {
	const header = headers.get(field);

	if (!header) {
		throw new Error(`Unable to get header for ${field}`);
	}

	return header;
};

export const POST: RequestHandler = async ({ request }) => {
	// TODO: implement autumn webhook handler whenever autumn gives us access

	// TODO: verify the webhook is actually from autumn by using svix for signature verification
	//  https://docs.useautumn.com/documentation/webhooks#webhook-security
	//  https://docs.svix.com/receiving/verifying-payloads/how

	const wh = new Webhook(env.AUTUMN_WEBHOOK_SECRET);

	const headers: Record<string, string> = {
		'svix-id': get_header_or_throw(request.headers, 'svix-id'),
		'svix-timestamp': get_header_or_throw(request.headers, 'svix-timestamp'),
		'svix-signature': get_header_or_throw(request.headers, 'svix-signature')
	};

	const unverified_contet = await request.text();

	// Throws on error, returns the verified content on success
	const content = wh.verify(unverified_contet, headers) as AutumnWebhookEvent;

	switch (content.type) {
		case 'customer.products.updated': {
			const webhookBody = {
				username: 'Fyra Stack',
				embeds: [
					{
						author: { name: 'New Colocation Reservation Payment' },
						title: `${content.data.updated_product.name}`,
						description: `${content.data.customer.name} - ${content.data.customer.email}`,
						color: 0xc6716d,
						footer: { text: `fyrastack.com` },
						timestamp: new Date().toISOString()
					}
				]
			};

			if (env.COLOCATION_RESERVATION_DISCORD_WEBHOOK) {
				const response = await fetch(env.COLOCATION_RESERVATION_DISCORD_WEBHOOK, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(webhookBody)
				});

				if (!response.ok) {
					throw new Error(
						`Response status: ${response.status}, Response content: ${await response.text()}`
					);
				}
			} else {
				console.log('would have called discord colocation webhook');
				console.log(webhookBody);
				console.log(webhookBody.embeds);
			}
			break;
		}
		default:
			return new Response('Unknown Event Type');
	}

	return new Response(String('Unimplemented'));
};
