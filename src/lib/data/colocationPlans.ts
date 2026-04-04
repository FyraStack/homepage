export const colocationPlans = [
	{ name: 'STACK-1U', price: '50', units: '1', power: '200', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-2U', price: '100', units: '2', power: '300', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-3U', price: '140', units: '3', power: '400', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-4U', price: '180', units: '4', power: '500', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-5U', price: '220', units: '5', power: '600', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-6U', price: '260', units: '6', power: '700', bandwidth: '1Gbps', ips: '1' }
] as const;

export type ColocationPlan = (typeof colocationPlans)[number];
