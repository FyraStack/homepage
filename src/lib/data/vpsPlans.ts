export const vpsPlans = [
	{ name: 'BASE-2G', price: '7', cpu: '2', ram: '2', storage: '40', network: '1' },
	{ name: 'BASE-4G', price: '14', cpu: '2', ram: '4', storage: '60', network: '1' },
	{ name: 'BASE-6G', price: '21', cpu: '3', ram: '6', storage: '80', network: '1' },
	{ name: 'BASE-8G', price: '28', cpu: '4', ram: '8', storage: '100', network: '1' },
	{ name: 'BASE-10G', price: '35', cpu: '5', ram: '10', storage: '120', network: '1' },
	{ name: 'BASE-12G', price: '42', cpu: '6', ram: '12', storage: '140', network: '1' },
	{ name: 'BASE-14G', price: '49', cpu: '7', ram: '14', storage: '160', network: '1' },
	{ name: 'BASE-16G', price: '56', cpu: '8', ram: '16', storage: '180', network: '1' }
] as const;

export type VpsPlan = (typeof vpsPlans)[number];
