export const colocationPlans = [
	{
		name: 'COLO-1U',
		price: '70',
		units: '1',
		power: '200',
		bandwidth: '1Gbps',
		ips: '1'
	},
	{
		name: 'COLO-2U',
		price: '140',
		units: '2',
		power: '300',
		bandwidth: '1Gbps',
		ips: '1'
	},
	{
		name: 'COLO-3U',
		price: '210',
		units: '3',
		power: '400',
		bandwidth: '1Gbps',
		ips: '1'
	},
	{
		name: 'COLO-4U',
		price: '280',
		units: '4',
		power: '500',
		bandwidth: '1Gbps',
		ips: '1'
	},
	{
		name: 'COLO-5U',
		price: '350',
		units: '5',
		power: '600',
		bandwidth: '1Gbps',
		ips: '1'
	},
	{
		name: 'COLO-6U',
		price: '420',
		units: '6',
		power: '700',
		bandwidth: '1Gbps',
		ips: '1'
	}
] as const;

export type ColocationPlan = (typeof colocationPlans)[number];
