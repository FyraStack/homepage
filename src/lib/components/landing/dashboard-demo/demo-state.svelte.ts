import { type Plan, plans } from "../plans";

export type ServerStatus = "running" | "stopped" | "restarting";

export type PowerAction = "start" | "shutdown" | "kill" | "restart";

export interface PtrRecord {
  address: string;
  value: string;
}

export interface ServerInfo {
  created: string;
  id: string;
  ip: string;
  ipv4Ptr: string;
  ipv6: string;
  ipv6Prefix: string;
  ipv6Ptrs: PtrRecord[];
  name: string;
  plan: Plan;
  region: string;
  status: ServerStatus;
  uptime: string;
}

export type ServerTab = "overview" | "networking" | "resize" | "settings";

export interface ChartSample {
  bandwidth: number;
  cpu: number;
  diskIo: number;
  memory: number;
}

type Load = ChartSample;

const seeds: {
  id: string;
  name: string;
  planName: string;
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
    planName: "BASE-2G",
    prefix: "2001:db8:10:1040::/64",
    uptime: "6d 6h 51m",
  },
  {
    created: "2026-06-02",
    id: "1c84a2f7-9d3b-4c15-8e20-5a6b7c8d9e01",
    ip: "144.225.80.31",
    ipv6: "2001:db8:10:1041::1",
    load: { bandwidth: 48_000, cpu: 0.34, diskIo: 21_000, memory: 0.52 },
    name: "api-01",
    planName: "BASE-4G",
    prefix: "2001:db8:10:1041::/64",
    uptime: "41d 2h 9m",
  },
  {
    created: "2026-03-18",
    id: "2d95b3e8-0e4c-4d26-9f31-6b7c8d9e0f12",
    ip: "144.225.80.47",
    ipv6: "2001:db8:10:1042::1",
    load: { bandwidth: 16_000, cpu: 0.22, diskIo: 410_000, memory: 0.88 },
    name: "postgres",
    planName: "BASE-8G",
    prefix: "2001:db8:10:1042::/64",
    uptime: "94d 17h 3m",
  },
  {
    created: "2026-08-11",
    id: "3ea6c4f9-1f5d-4e37-8a42-7c8d9e0f1a23",
    ip: "144.225.81.58",
    ipv6: "2001:db8:10:1043::1",
    load: { bandwidth: 3100, cpu: 0.71, diskIo: 88_000, memory: 0.44 },
    name: "worker-01",
    planName: "BASE-2G",
    prefix: "2001:db8:10:1043::/64",
    uptime: "12h 40m",
  },
  {
    created: "2026-09-01",
    id: "4fb7d5a0-2a6e-4f48-9b53-8d9e0f1a2b34",
    ip: "144.225.81.62",
    ipv6: "2001:db8:10:1044::1",
    load: { bandwidth: 900, cpu: 0.03, diskIo: 4000, memory: 0.3 },
    name: "staging",
    planName: "BASE-2G",
    prefix: "2001:db8:10:1044::/64",
    uptime: "3d 1h 22m",
  },
];

const sampleCount = 12;
const sampleIntervalMs = 2000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const planNamed = (name: string) =>
  plans.find((plan) => plan.name === name) ?? plans[0];

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
  };
}

const offlineSample: ChartSample = {
  bandwidth: 0,
  cpu: 0,
  diskIo: 0,
  memory: 0,
};

export class DemoState {
  servers = $state<ServerInfo[]>(
    seeds.map((seed) => ({
      created: seed.created,
      id: seed.id,
      ip: seed.ip,
      ipv4Ptr: `${seed.name}.acme.dev`,
      ipv6: seed.ipv6,
      ipv6Prefix: seed.prefix,
      ipv6Ptrs: [],
      name: seed.name,
      plan: planNamed(seed.planName),
      region: "Chicago",
      status: "running",
      uptime: seed.uptime,
    }))
  );

  selectedId = $state(seeds[0].id);
  activeTab = $state<ServerTab>("overview");

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

  select(id: string) {
    this.selectedId = id;
  }

  tick() {
    for (const server of this.servers) {
      const sample =
        server.status === "running"
          ? sampleFor(this.#loads[server.id])
          : offlineSample;
      this.history[server.id] = [...this.history[server.id], sample].slice(
        -sampleCount
      );
    }
  }

  startTicking() {
    this.tick();
    const interval = setInterval(() => this.tick(), sampleIntervalMs);
    return () => clearInterval(interval);
  }

  #update(id: string, apply: (server: ServerInfo) => void) {
    const server = this.servers.find((entry) => entry.id === id);
    if (server) {
      apply(server);
    }
  }

  #schedule(id: string, delayMs: number, apply: (server: ServerInfo) => void) {
    clearTimeout(this.#timers[id]);
    this.#timers[id] = setTimeout(() => this.#update(id, apply), delayMs);
  }

  async power(vmId: string, action: PowerAction) {
    await wait(action === "kill" ? 500 : 700);
    if (action === "start") {
      this.#update(vmId, (server) => {
        server.status = "running";
        server.uptime = "0m";
      });
    } else if (action === "shutdown") {
      this.#schedule(vmId, 1500, (server) => {
        server.status = "stopped";
      });
    } else if (action === "restart") {
      this.#update(vmId, (server) => {
        server.status = "restarting";
      });
      this.#schedule(vmId, 2500, (server) => {
        server.status = "running";
        server.uptime = "0m";
      });
    } else {
      clearTimeout(this.#timers[vmId]);
      this.#update(vmId, (server) => {
        server.status = "stopped";
      });
    }
  }

  async rename(vmId: string, name: string) {
    await wait(600);
    this.#update(vmId, (server) => {
      server.name = name;
    });
  }

  async resize(vmId: string, plan: Plan) {
    await wait(900);
    this.#update(vmId, (server) => {
      server.plan = plan;
    });
  }

  async delete(vmId: string) {
    await wait(600);
    clearTimeout(this.#timers[vmId]);
    this.servers = this.servers.filter((server) => server.id !== vmId);
    if (this.selectedId === vmId && this.servers[0]) {
      this.selectedId = this.servers[0].id;
    }
    this.activeTab = "overview";
  }

  async setIpv4Ptr(vmId: string, value: string) {
    await wait(500);
    this.#update(vmId, (server) => {
      server.ipv4Ptr = value;
    });
  }

  async setIpv6Ptrs(vmId: string, records: PtrRecord[]) {
    await wait(500);
    this.#update(vmId, (server) => {
      server.ipv6Ptrs = records;
    });
  }

  dispose() {
    Object.values(this.#timers).forEach(clearTimeout);
  }
}
