export const colocationPlans = [
	{ name: 'STACK-1U', price: '50', originalPrice: '60', units: '1', power: '200', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-2U', price: '90', originalPrice: '100', units: '2', power: '300', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-3U', price: '130', originalPrice: '140', units: '3', power: '400', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-4U', price: '170', originalPrice: '180', units: '4', power: '500', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-5U', price: '210', originalPrice: '220', units: '5', power: '600', bandwidth: '1Gbps', ips: '1' },
	{ name: 'STACK-6U', price: '250', originalPrice: '260', units: '6', power: '700', bandwidth: '1Gbps', ips: '1' }
] as const;

export type ColocationPlan = (typeof colocationPlans)[number];
