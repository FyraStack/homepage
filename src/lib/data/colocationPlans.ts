export const colocationPlans = [
	{ name: 'STACK-1U', price: '50',  units: '1', power: '200', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-2U', price: '100', units: '2', power: '300', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-3U', price: '150', units: '3', power: '400', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-4U', price: '200', units: '4', power: '500', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-5U', price: '250', units: '5', power: '600', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-6U', price: '300', units: '6', power: '700', bandwidth: '1Gbps', ips: '1' },
] as const;

export type ColocationPlan = typeof colocationPlans[number];
