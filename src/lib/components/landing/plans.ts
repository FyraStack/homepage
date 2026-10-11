export interface Plan {
  memoryGb: number;
  name: string;
  price: number;
  storageGb: number;
  vcpu: number;
}

export const plans: Plan[] = [
  { memoryGb: 2, name: "BASE-2G", price: 5, storageGb: 40, vcpu: 2 },
  { memoryGb: 4, name: "BASE-4G", price: 12, storageGb: 60, vcpu: 2 },
  { memoryGb: 6, name: "BASE-6G", price: 18, storageGb: 80, vcpu: 3 },
  { memoryGb: 8, name: "BASE-8G", price: 24, storageGb: 100, vcpu: 4 },
  { memoryGb: 10, name: "BASE-10G", price: 30, storageGb: 120, vcpu: 5 },
  { memoryGb: 12, name: "BASE-12G", price: 36, storageGb: 140, vcpu: 6 },
  { memoryGb: 14, name: "BASE-14G", price: 42, storageGb: 160, vcpu: 7 },
  { memoryGb: 16, name: "BASE-16G", price: 48, storageGb: 180, vcpu: 8 },
];

export interface CompetitorOffer {
  approximate?: boolean;
  price: number;
  spec: string;
}

const usdPerEur = 1.17;

const fromEur = (spec: string, priceEur: number): CompetitorOffer => ({
  approximate: true,
  price: Math.round(priceEur * usdPerEur),
  spec,
});

export interface Competitor {
  offersByMemoryGb: Partial<Record<number, CompetitorOffer>>;
  provider: string;
}

export const competitors: Competitor[] = [
  {
    offersByMemoryGb: {
      2: { price: 18, spec: "Basic · 2 vCPU / 2 GB" },
      4: { price: 24, spec: "Basic · 2 vCPU / 4 GB" },
      8: { price: 48, spec: "Basic · 4 vCPU / 8 GB" },
      16: { price: 96, spec: "Basic · 8 vCPU / 16 GB" },
    },
    provider: "DigitalOcean",
  },
  {
    offersByMemoryGb: {
      2: fromEur("CPX12 · 1 vCPU / 2 GB", 11.49),
      4: fromEur("CPX22 · 2 vCPU / 4 GB", 19.49),
      8: fromEur("CPX32 · 4 vCPU / 8 GB", 35.49),
      16: fromEur("CPX42 · 8 vCPU / 16 GB", 69.49),
    },
    provider: "Hetzner",
  },
  {
    offersByMemoryGb: {
      2: { price: 7, spec: "Slice 2048 · 1 core / 2 GB" },
      4: { price: 15, spec: "Slice 4096 · 1 core / 4 GB" },
      8: { price: 30, spec: "Slice 8192 · 2 cores / 8 GB" },
      12: { price: 45, spec: "KVM Slice · 3 cores / 12 GB" },
      16: { price: 60, spec: "Slice 16384 · 4 cores / 16 GB" },
    },
    provider: "BuyVM",
  },
];

export const colocationTiers = [
  { price: 70, units: 1, watts: 200 },
  { price: 140, units: 2, watts: 300 },
  { price: 210, units: 3, watts: 400 },
  { price: 280, units: 4, watts: 500 },
  { price: 350, units: 5, watts: 600 },
  { price: 420, units: 6, watts: 700 },
];

export const planSpecs = (plan: Plan) =>
  `${plan.vcpu} vCPU · ${plan.memoryGb} GB RAM · ${plan.storageGb} GB SAS3 SSD`;
