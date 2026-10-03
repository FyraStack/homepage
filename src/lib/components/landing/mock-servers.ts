import { type Plan, plans } from "./plans";

export interface MockServer {
  created: string;
  ipv4: string;
  ipv6: string;
  load: { cpu: number; ram: number; bandwidth: number; disk: number };
  name: string;
  planName: string;
  uptime: string;
}

export const mockServers: MockServer[] = [
  {
    created: "2026-07-27",
    ipv4: "144.225.80.24",
    ipv6: "2001:db8:10:1040:e44b:5ccb:656a:8ba7",
    load: { bandwidth: 0.35, cpu: 0.06, disk: 0.5, ram: 0.81 },
    name: "web-01",
    planName: "BASE-2G",
    uptime: "6d 6h 51m",
  },
  {
    created: "2026-06-02",
    ipv4: "144.225.80.31",
    ipv6: "2001:db8:10:1040:7a1c:02ff:fe4b:31c0",
    load: { bandwidth: 0.6, cpu: 0.34, disk: 0.25, ram: 0.52 },
    name: "api-01",
    planName: "BASE-4G",
    uptime: "41d 2h 9m",
  },
  {
    created: "2026-03-18",
    ipv4: "144.225.80.47",
    ipv6: "2001:db8:10:1040:5d2e:98ff:fe10:4a77",
    load: { bandwidth: 0.2, cpu: 0.22, disk: 0.75, ram: 0.88 },
    name: "postgres",
    planName: "BASE-8G",
    uptime: "94d 17h 3m",
  },
  {
    created: "2026-08-11",
    ipv4: "144.225.81.58",
    ipv6: "2001:db8:10:1041:c3b0:11ff:fe62:9e05",
    load: { bandwidth: 0.1, cpu: 0.71, disk: 0.4, ram: 0.44 },
    name: "worker-01",
    planName: "BASE-2G",
    uptime: "12h 40m",
  },
  {
    created: "2026-09-01",
    ipv4: "144.225.81.62",
    ipv6: "2001:db8:10:1041:88f4:2aff:fe07:d1b3",
    load: { bandwidth: 0.05, cpu: 0.03, disk: 0.1, ram: 0.3 },
    name: "staging",
    planName: "BASE-2G",
    uptime: "3d 1h 22m",
  },
];

export const planFor = (planName: string): Plan =>
  plans.find((plan) => plan.name === planName) ?? plans[0];

export const serverMeta = (server: Pick<MockServer, "planName" | "ipv4">) => {
  const plan = planFor(server.planName);
  return `${plan.vcpu} vCPU • ${plan.memoryGb}GB • ${server.ipv4}`;
};
