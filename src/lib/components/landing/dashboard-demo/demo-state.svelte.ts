import { plans } from "../plans";

export type ServerStatus =
  | "running"
  | "stopped"
  | "restarting"
  | "provisioning"
  | "deleting"
  | "error"
  | "unknown";

export interface ServerInfo {
  agentConnected: boolean;
  backups: boolean;
  created: string;
  disk: string;
  id: string;
  ip: string;
  ipv6: string;
  liveLoaded: boolean;
  metrics: { cpu?: number | null; memory?: number | null } | null;
  name: string;
  plan: string;
  ram: string;
  region: string;
  status: ServerStatus;
  uptime: string;
  vcpu: number;
  vmTypeId: string;
}

export type ServerTab = "overview" | "networking" | "resize" | "settings";

export interface VmPlan {
  cap: number;
  cores: number;
  id: string;
  name: string;
  ramCapacity: number;
  storageAmount: number;
}

export interface PtrRecord {
  address: string;
  value: string;
}

export interface Allocation {
  address: string | null;
  family: "ipv4" | "ipv6";
  id: string;
  prefix: string | null;
  ptrEditable: boolean;
  ptrRecords: PtrRecord[];
}

export interface ChartSample {
  bandwidth: number | null;
  cpu: number | null;
  diskIo: number | null;
  memory: number | null;
  time?: number;
}

interface Load {
  bandwidth: number;
  cpu: number;
  diskIo: number;
  memory: number;
}

export const vmTypes: VmPlan[] = plans.map((plan) => ({
  cap: plan.price,
  cores: plan.vcpu,
  id: plan.name.toLowerCase(),
  name: plan.name,
  ramCapacity: plan.memoryGb * 1024,
  storageAmount: plan.storageGb,
}));

const seeds: {
  id: string;
  name: string;
  vmTypeId: string;
  ip: string;
  ipv6: string;
  prefix: string;
  created: string;
  uptime: string;
  load: Load;
}[] = [
  {
    created: "2026-07-27",
    id: "0b3f6c1e-4a2d-4e8b-9f61-2c7d8a1e5b90",
    ip: "144.225.80.24",
    ipv6: "2001:db8:10:1040::1",
    load: { bandwidth: 7200, cpu: 0.06, diskIo: 63_000, memory: 0.81 },
    name: "web-01",
    prefix: "2001:db8:10:1040::/64",
    uptime: "6d 6h 51m",
    vmTypeId: "base-2g",
  },
  {
    created: "2026-06-02",
    id: "1c84a2f7-9d3b-4c15-8e20-5a6b7c8d9e01",
    ip: "144.225.80.31",
    ipv6: "2001:db8:10:1041::1",
    load: { bandwidth: 48_000, cpu: 0.34, diskIo: 21_000, memory: 0.52 },
    name: "api-01",
    prefix: "2001:db8:10:1041::/64",
    uptime: "41d 2h 9m",
    vmTypeId: "base-4g",
  },
  {
    created: "2026-03-18",
    id: "2d95b3e8-0e4c-4d26-9f31-6b7c8d9e0f12",
    ip: "144.225.80.47",
    ipv6: "2001:db8:10:1042::1",
    load: { bandwidth: 16_000, cpu: 0.22, diskIo: 410_000, memory: 0.88 },
    name: "postgres",
    prefix: "2001:db8:10:1042::/64",
    uptime: "94d 17h 3m",
    vmTypeId: "base-8g",
  },
  {
    created: "2026-08-11",
    id: "3ea6c4f9-1f5d-4e37-8a42-7c8d9e0f1a23",
    ip: "144.225.81.58",
    ipv6: "2001:db8:10:1043::1",
    load: { bandwidth: 3100, cpu: 0.71, diskIo: 88_000, memory: 0.44 },
    name: "worker-01",
    prefix: "2001:db8:10:1043::/64",
    uptime: "12h 40m",
    vmTypeId: "base-2g",
  },
  {
    created: "2026-09-01",
    id: "4fb7d5a0-2a6e-4f48-9b53-8d9e0f1a2b34",
    ip: "144.225.81.62",
    ipv6: "2001:db8:10:1044::1",
    load: { bandwidth: 900, cpu: 0.03, diskIo: 4000, memory: 0.3 },
    name: "staging",
    prefix: "2001:db8:10:1044::/64",
    uptime: "3d 1h 22m",
    vmTypeId: "base-2g",
  },
];

const sampleCount = 12;
const sampleIntervalMs = 2000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function specsFor(vmTypeId: string) {
  const type = vmTypes.find((entry) => entry.id === vmTypeId) ?? vmTypes[0];
  return {
    disk: `${type.storageAmount}GB`,
    plan: type.name,
    ram: `${type.ramCapacity / 1024}GB`,
    vcpu: type.cores,
    vmTypeId: type.id,
  };
}

function jitter(value: number, spread: number) {
  return Math.max(0, value * (1 + (Math.random() - 0.5) * spread));
}

function sampleFor(load: Load): ChartSample {
  const spike = Math.random() < 0.15;
  return {
    bandwidth: jitter(load.bandwidth, spike ? 4 : 0.6),
    cpu: Math.min(0.99, jitter(load.cpu, 0.5) + (spike ? 0.08 : 0)),
    diskIo: jitter(load.diskIo, 0.8),
    memory: Math.min(0.99, jitter(load.memory, 0.03)),
    time: Math.floor(Date.now() / 1000),
  };
}

const offlineSample = (): ChartSample => ({
  bandwidth: 0,
  cpu: 0,
  diskIo: 0,
  memory: 0,
  time: Math.floor(Date.now() / 1000),
});

export class DemoState {
  featureFlags = {
    vpsConsole: false,
    vpsLogs: false,
    vpsNetworking: true,
    vpsResize: true,
    vpsSettings: true,
  };

  servers = $state<ServerInfo[]>(
    seeds.map((seed) => ({
      agentConnected: true,
      backups: false,
      created: seed.created,
      id: seed.id,
      ip: seed.ip,
      ipv6: seed.ipv6,
      liveLoaded: true,
      metrics: null,
      name: seed.name,
      region: "Chicago",
      status: "running",
      uptime: seed.uptime,
      ...specsFor(seed.vmTypeId),
    }))
  );

  selectedId = $state(seeds[0].id);
  activeTab = $state<ServerTab>("overview");

  allocations = $state<Record<string, Allocation[]>>(
    Object.fromEntries(
      seeds.map((seed) => [
        seed.id,
        [
          {
            address: seed.ip,
            family: "ipv4",
            id: `${seed.id}-v4`,
            prefix: null,
            ptrEditable: true,
            ptrRecords: [{ address: seed.ip, value: `${seed.name}.acme.dev` }],
          },
          {
            address: null,
            family: "ipv6",
            id: `${seed.id}-v6`,
            prefix: seed.prefix,
            ptrEditable: true,
            ptrRecords: [],
          },
        ],
      ])
    )
  );

  history = $state<Record<string, ChartSample[]>>(
    Object.fromEntries(
      seeds.map((seed) => [
        seed.id,
        Array.from({ length: sampleCount }, () => sampleFor(seed.load)),
      ])
    )
  );

  readonly #loads: Record<string, Load> = Object.fromEntries(
    seeds.map((seed) => [seed.id, seed.load])
  );
  readonly #timers: Record<string, ReturnType<typeof setTimeout>> = {};

  selected = $derived(
    this.servers.find((server) => server.id === this.selectedId) ??
      this.servers[0]
  );

  vmTypeFor(server: ServerInfo) {
    return vmTypes.find((type) => type.id === server.vmTypeId) ?? null;
  }

  select(id: string) {
    this.selectedId = id;
  }

  tick() {
    for (const server of this.servers) {
      const load = this.#loads[server.id];
      if (!load) {
        continue;
      }
      const sample =
        server.status === "running" ? sampleFor(load) : offlineSample();
      server.metrics =
        server.status === "running"
          ? { cpu: sample.cpu, memory: sample.memory }
          : null;
      this.history[server.id] = [
        ...(this.history[server.id] ?? []),
        sample,
      ].slice(-sampleCount);
    }
  }

  startTicking() {
    this.tick();
    const interval = setInterval(() => this.tick(), sampleIntervalMs);
    return () => clearInterval(interval);
  }

  #schedule(id: string, delayMs: number, update: (server: ServerInfo) => void) {
    clearTimeout(this.#timers[id]);
    this.#timers[id] = setTimeout(() => {
      const server = this.servers.find((entry) => entry.id === id);
      if (server) {
        update(server);
      }
    }, delayMs);
  }

  #server(id: string) {
    const server = this.servers.find((entry) => entry.id === id);
    if (!server) {
      throw new Error("Server not found");
    }
    return server;
  }

  async startVm({ vmId }: { vmId: string }) {
    await wait(700);
    this.#server(vmId).status = "running";
    this.#server(vmId).uptime = "0m";
  }

  async stopVm({ vmId }: { vmId: string }) {
    await wait(700);
    this.#schedule(vmId, 1500, (server) => {
      server.status = "stopped";
    });
  }

  async rebootVm({ vmId }: { vmId: string }) {
    await wait(700);
    this.#server(vmId).status = "restarting";
    this.#schedule(vmId, 2500, (server) => {
      server.status = "running";
      server.uptime = "0m";
    });
  }

  async killVm({ vmId }: { vmId: string }) {
    await wait(500);
    clearTimeout(this.#timers[vmId]);
    this.#server(vmId).status = "stopped";
  }

  async renameVm({
    vmId,
    name,
  }: {
    vmId: string;
    name: string;
    updateHostname: boolean;
  }) {
    await wait(600);
    this.#server(vmId).name = name;
    return { name };
  }

  async resizeVm({ vmId, vmTypeId }: { vmId: string; vmTypeId: string }) {
    await wait(900);
    Object.assign(this.#server(vmId), specsFor(vmTypeId));
  }

  async deleteVm({ vmId }: { vmId: string }) {
    await wait(600);
    clearTimeout(this.#timers[vmId]);
    this.servers = this.servers.filter((server) => server.id !== vmId);
    if (this.selectedId === vmId && this.servers[0]) {
      this.selectedId = this.servers[0].id;
    }
    this.activeTab = "overview";
  }

  async setVmPtrRecord({
    vmId,
    allocationId,
    address,
    value,
  }: {
    vmId: string;
    allocationId: string;
    address: string;
    value: string;
  }) {
    await wait(500);
    const allocation = this.allocations[vmId]?.find(
      (entry) => entry.id === allocationId
    );
    if (!allocation) {
      throw new Error("Allocation not found");
    }
    return value ? { address, value } : null;
  }

  dispose() {
    Object.values(this.#timers).forEach(clearTimeout);
  }
}
