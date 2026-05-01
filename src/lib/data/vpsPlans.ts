export const vpsPlans = [
	{ name: 'STACK-XXS', price: '5', cpu: '2', ram: '2', storage: '40', network: '1' },
	{ name: 'STACK-XS', price: '10', cpu: '2', ram: '4', storage: '60', network: '1' },
	{ name: 'STACK-S', price: '15', cpu: '3', ram: '6', storage: '80', network: '1' },
	{ name: 'STACK-M', price: '20', cpu: '4', ram: '8', storage: '100', network: '1' },
	{ name: 'STACK-L', price: '25', cpu: '5', ram: '10', storage: '120', network: '1' },
	{ name: 'STACK-XL', price: '30', cpu: '6', ram: '12', storage: '140', network: '1' },
	{ name: 'STACK-XXL', price: '35', cpu: '7', ram: '14', storage: '160', network: '1' },
	{ name: 'STACK-XXXL', price: '40', cpu: '8', ram: '16', storage: '180', network: '1' }
] as const;

export type VpsPlan = (typeof vpsPlans)[number];
