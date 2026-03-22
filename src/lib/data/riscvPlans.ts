export const riscvPlans = [
	{ name: 'RISCV-XS',  price: '10', cpu: '2', ram: '4',  storage: '40',  network: '1' },
	{ name: 'RISCV-S',   price: '18', cpu: '4', ram: '8',  storage: '80',  network: '1' },
	{ name: 'RISCV-M',   price: '30', cpu: '4', ram: '16', storage: '160', network: '1' },
	{ name: 'RISCV-L',   price: '50', cpu: '8', ram: '32', storage: '320', network: '1' },
] as const;

export type RiscVPlan = typeof riscvPlans[number];
