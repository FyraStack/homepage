export const vpsPlans = [
	{
		name: 'STACK-XXS',
		price: '5',
		cpu: '2',
		ram: '2',
		storage: '40',
		network: '1',
		yearlyPrice: '50'
	},
	{
		name: 'STACK-XS',
		price: '10',
		cpu: '3',
		ram: '3',
		storage: '60',
		network: '1',
		yearlyPrice: '100'
	},
	{
		name: 'STACK-S',
		price: '15',
		cpu: '4',
		ram: '4',
		storage: '80',
		network: '1',
		yearlyPrice: '150'
	},
	{
		name: 'STACK-M',
		price: '20',
		cpu: '5',
		ram: '5',
		storage: '100',
		network: '1',
		yearlyPrice: '200'
	},
	{
		name: 'STACK-L',
		price: '25',
		cpu: '6',
		ram: '6',
		storage: '120',
		network: '1',
		yearlyPrice: '250'
	},
	{
		name: 'STACK-XL',
		price: '30',
		cpu: '7',
		ram: '7',
		storage: '140',
		network: '1',
		yearlyPrice: '300'
	},
	{
		name: 'STACK-XXL',
		price: '35',
		cpu: '8',
		ram: '8',
		storage: '160',
		network: '1',
		yearlyPrice: '350'
	},
	{
		name: 'STACK-XXXL',
		price: '40',
		cpu: '9',
		ram: '9',
		storage: '180',
		network: '1',
		yearlyPrice: '400'
	}
] as const;

export const computeOptimizedPlans = [
	{
		name: 'STACK-CO-XS',
		price: '10',
		cpu: '4',
		ram: '4',
		storage: '30',
		network: '1',
		yearlyPrice: '100'
	},
	{
		name: 'STACK-CO-S',
		price: '15',
		cpu: '6',
		ram: '5',
		storage: '40',
		network: '1',
		yearlyPrice: '150'
	},
	{
		name: 'STACK-CO-M',
		price: '20',
		cpu: '8',
		ram: '6',
		storage: '50',
		network: '1',
		yearlyPrice: '200'
	},
	{
		name: 'STACK-CO-L',
		price: '25',
		cpu: '10',
		ram: '7',
		storage: '60',
		network: '1',
		yearlyPrice: '250'
	},
	{
		name: 'STACK-CO-XL',
		price: '30',
		cpu: '12',
		ram: '8',
		storage: '70',
		network: '1',
		yearlyPrice: '300'
	},
	{
		name: 'STACK-CO-XXL',
		price: '35',
		cpu: '14',
		ram: '9',
		storage: '80',
		network: '1',
		yearlyPrice: '350'
	},
	{
		name: 'STACK-CO-XXXL',
		price: '40',
		cpu: '16',
		ram: '10',
		storage: '90',
		network: '1',
		yearlyPrice: '400'
	},
	{
		name: 'STACK-CO-XXXXL',
		price: '45',
		cpu: '18',
		ram: '11',
		storage: '100',
		network: '1',
		yearlyPrice: '450'
	}
] as const;

export type VpsPlan = (typeof vpsPlans)[number];
