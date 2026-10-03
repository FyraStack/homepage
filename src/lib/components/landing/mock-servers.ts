import { plans, type Plan } from './plans';

export type MockServer = {
	name: string;
	planName: string;
	ipv4: string;
	ipv6: string;
	created: string;
	uptime: string;
	load: { cpu: number; ram: number; bandwidth: number; disk: number };
};

export const mockServers: MockServer[] = [
	{
		name: 'web-01',
		planName: 'BASE-2G',
		ipv4: '144.225.80.24',
		ipv6: '2001:db8:10:1040:e44b:5ccb:656a:8ba7',
		created: '2026-07-27',
		uptime: '6d 6h 51m',
		load: { cpu: 0.06, ram: 0.81, bandwidth: 0.35, disk: 0.5 }
	},
	{
		name: 'api-01',
		planName: 'BASE-4G',
		ipv4: '144.225.80.31',
		ipv6: '2001:db8:10:1040:7a1c:02ff:fe4b:31c0',
		created: '2026-06-02',
		uptime: '41d 2h 9m',
		load: { cpu: 0.34, ram: 0.52, bandwidth: 0.6, disk: 0.25 }
	},
	{
		name: 'postgres',
		planName: 'BASE-8G',
		ipv4: '144.225.80.47',
		ipv6: '2001:db8:10:1040:5d2e:98ff:fe10:4a77',
		created: '2026-03-18',
		uptime: '94d 17h 3m',
		load: { cpu: 0.22, ram: 0.88, bandwidth: 0.2, disk: 0.75 }
	},
	{
		name: 'worker-01',
		planName: 'BASE-2G',
		ipv4: '144.225.81.58',
		ipv6: '2001:db8:10:1041:c3b0:11ff:fe62:9e05',
		created: '2026-08-11',
		uptime: '12h 40m',
		load: { cpu: 0.71, ram: 0.44, bandwidth: 0.1, disk: 0.4 }
	},
	{
		name: 'staging',
		planName: 'BASE-2G',
		ipv4: '144.225.81.62',
		ipv6: '2001:db8:10:1041:88f4:2aff:fe07:d1b3',
		created: '2026-09-01',
		uptime: '3d 1h 22m',
		load: { cpu: 0.03, ram: 0.3, bandwidth: 0.05, disk: 0.1 }
	}
];

export const planFor = (planName: string): Plan =>
	plans.find((plan) => plan.name === planName) ?? plans[0];

export const serverMeta = (server: Pick<MockServer, 'planName' | 'ipv4'>) => {
	const plan = planFor(server.planName);
	return `${plan.vcpu} vCPU • ${plan.memoryGb}GB • ${server.ipv4}`;
};
