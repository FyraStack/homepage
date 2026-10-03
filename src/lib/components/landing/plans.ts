export type Plan = {
	name: string;
	vcpu: number;
	memoryGb: number;
	storageGb: number;
	price: number;
};

export const plans: Plan[] = [
	{ name: 'BASE-2G', vcpu: 2, memoryGb: 2, storageGb: 40, price: 5 },
	{ name: 'BASE-4G', vcpu: 2, memoryGb: 4, storageGb: 60, price: 12 },
	{ name: 'BASE-6G', vcpu: 3, memoryGb: 6, storageGb: 80, price: 18 },
	{ name: 'BASE-8G', vcpu: 4, memoryGb: 8, storageGb: 100, price: 24 },
	{ name: 'BASE-10G', vcpu: 5, memoryGb: 10, storageGb: 120, price: 30 },
	{ name: 'BASE-12G', vcpu: 6, memoryGb: 12, storageGb: 140, price: 36 },
	{ name: 'BASE-14G', vcpu: 7, memoryGb: 14, storageGb: 160, price: 42 },
	{ name: 'BASE-16G', vcpu: 8, memoryGb: 16, storageGb: 180, price: 48 }
];

export type CompetitorOffer = {
	spec: string;
	price: number;
	approximate?: boolean;
};

const usdPerEur = 1.17;

const fromEur = (spec: string, priceEur: number): CompetitorOffer => ({
	spec,
	price: Math.round(priceEur * usdPerEur),
	approximate: true
});

export type Competitor = {
	provider: string;
	offersByMemoryGb: Partial<Record<number, CompetitorOffer>>;
};

export const competitors: Competitor[] = [
	{
		provider: 'DigitalOcean',
		offersByMemoryGb: {
			2: { spec: 'Basic · 2 vCPU / 2 GB', price: 18 },
			4: { spec: 'Basic · 2 vCPU / 4 GB', price: 24 },
			8: { spec: 'Basic · 4 vCPU / 8 GB', price: 48 },
			16: { spec: 'Basic · 8 vCPU / 16 GB', price: 96 }
		}
	},
	{
		provider: 'Hetzner',
		offersByMemoryGb: {
			2: fromEur('CPX11 · 2 vCPU / 2 GB', 17.49),
			4: fromEur('CPX21 · 3 vCPU / 4 GB', 31.99),
			8: fromEur('CPX31 · 4 vCPU / 8 GB', 62.49),
			16: fromEur('CPX41 · 8 vCPU / 16 GB', 120.49)
		}
	},
	{
		provider: 'BuyVM',
		offersByMemoryGb: {
			2: { spec: 'Slice 2048 · 1 core / 2 GB', price: 7 },
			4: { spec: 'Slice 4096 · 1 core / 4 GB', price: 15 },
			8: { spec: 'Slice 8192 · 2 cores / 8 GB', price: 30 },
			12: { spec: 'KVM Slice · 3 cores / 12 GB', price: 45 },
			16: { spec: 'Slice 16384 · 4 cores / 16 GB', price: 60 }
		}
	}
];

export const colocationTiers = [
	{ units: 1, watts: 200, price: 70 },
	{ units: 2, watts: 300, price: 140 },
	{ units: 3, watts: 400, price: 210 },
	{ units: 4, watts: 500, price: 280 },
	{ units: 5, watts: 600, price: 350 },
	{ units: 6, watts: 700, price: 420 }
];

export const planSpecs = (plan: Plan) =>
	`${plan.vcpu} vCPU · ${plan.memoryGb} GB RAM · ${plan.storageGb} GB SAS3 SSD`;
