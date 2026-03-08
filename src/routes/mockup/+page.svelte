<script lang="ts">
	let activeServer = $state(0);

	const servers = [
		{ name: 'web-prod-01',  ip: '198.51.100.42', plan: 'VPS-2', cpu: 38, ram: 61, disk: 44, status: 'running', uptime: '47d 3h' },
		{ name: 'db-prod-01',   ip: '198.51.100.43', plan: 'VPS-4', cpu: 12, ram: 80, disk: 71, status: 'running', uptime: '47d 3h' },
		{ name: 'dev-sandbox',  ip: '198.51.100.91', plan: 'VPS-1', cpu:  0, ram:  0, disk: 18, status: 'stopped', uptime: '—' },
	];

	const events = [
		{ time: '10:42:01',   msg: 'SSH login from 203.0.113.7' },
		{ time: '09:15:33',   msg: 'Kernel: eth0 link up at 1000Mbps' },
		{ time: '08:00:00',   msg: 'cron: daily backup completed (2.1 GB)' },
		{ time: 'yesterday',  msg: 'System reboot initiated by root' },
		{ time: 'yesterday',  msg: 'Package updates applied (14 packages)' },
	];
</script>

<svelte:head><title>Stack Control — mockup</title></svelte:head>

<div class="flex h-screen bg-fyra-gray-950 font-sans text-sm select-none overflow-hidden">

	<!-- Icon sidebar -->
	<aside class="flex w-11 shrink-0 flex-col border-r border-fyra-gray-800 bg-fyra-gray-900 items-center">
		<div class="flex h-11 w-full items-center justify-center border-b border-fyra-gray-800">
			<img src="/logo.svg" alt="" class="h-4 w-4" />
		</div>
		<nav class="flex flex-col gap-0.5 p-1.5 flex-1 w-full">
			{#each [
				{ icon: 'M3 5h10M3 8h10M3 11h6',                                              active: false },
				{ icon: 'M2 4h12v8H2zM5 12v2M9 12v2M4 14h8',                                  active: true  },
				{ icon: 'M8 2L2 5v4c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V5L8 2z',            active: false },
				{ icon: 'M2 10h12v4H2zM2 6h12v4H2zM2 2h12v4H2z',                              active: false },
				{ icon: 'M2 4h12v10H2zM2 7h12',                                               active: false },
				{ icon: 'M8 5a3 3 0 100 6 3 3 0 000-6zM1 8h2M11 8h2M8 1v2M8 11v2',           active: false },
			] as item}
				<a href="#" class="flex items-center justify-center p-2 transition-colors duration-100
					{item.active ? 'bg-fyra-gray-800 text-fyra-gray-50' : 'text-fyra-gray-600 hover:bg-fyra-gray-800 hover:text-fyra-gray-300'}">
					<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d={item.icon} />
					</svg>
				</a>
			{/each}
		</nav>
		<div class="border-t border-fyra-gray-800 py-2.5 w-full flex justify-center">
			<div class="flex h-5 w-5 items-center justify-center rounded-full bg-fyra-red-700 text-[9px] font-bold text-white">J</div>
		</div>
	</aside>

	<!-- Content -->
	<div class="flex flex-1 flex-col overflow-hidden">

		<!-- Topbar -->
		<div class="flex h-11 shrink-0 items-center justify-between border-b border-fyra-gray-800 bg-fyra-gray-900 px-5">
			<div class="flex items-center gap-1.5 text-[12px] text-fyra-gray-500">
				<span>Servers</span>
				<span class="text-fyra-gray-700">/</span>
				<span class="text-fyra-gray-200">{servers[activeServer].name}</span>
			</div>
			<div class="flex items-center gap-px bg-fyra-gray-800">
				<button class="bg-fyra-gray-900 px-3 py-1.5 text-[12px] text-fyra-gray-300 hover:bg-fyra-gray-800 transition-colors duration-100">Console</button>
				<button class="bg-fyra-gray-900 px-3 py-1.5 text-[12px] text-fyra-gray-300 hover:bg-fyra-gray-800 transition-colors duration-100">Reboot</button>
				<button class="bg-fyra-gray-900 px-3 py-1.5 text-[12px] text-fyra-red-500 hover:bg-fyra-gray-800 transition-colors duration-100">Shut down</button>
			</div>
		</div>

		<div class="flex flex-1 overflow-hidden">

			<!-- Server list -->
			<div class="flex w-48 shrink-0 flex-col border-r border-fyra-gray-800 bg-fyra-gray-900 overflow-y-auto">
				<div class="border-b border-fyra-gray-800 px-4 py-2.5">
					<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Servers</p>
				</div>
				<div class="divide-y divide-fyra-gray-800">
					{#each servers as server, i}
						<button
							type="button"
							onclick={() => activeServer = i}
							class="w-full flex flex-col gap-0.5 px-4 py-3 text-left transition-colors duration-100
								{activeServer === i ? 'bg-fyra-gray-800' : 'hover:bg-fyra-gray-800/40'}"
						>
							<div class="flex items-center justify-between gap-2">
								<span class="truncate text-[12px] font-medium {activeServer === i ? 'text-fyra-gray-50' : 'text-fyra-gray-200'}">{server.name}</span>
								<span class="h-1.5 w-1.5 shrink-0 rounded-full {server.status === 'running' ? 'bg-green-500' : 'bg-fyra-gray-600'}"></span>
							</div>
							<span class="text-[11px] text-fyra-gray-500">{server.plan} · {server.ip}</span>
						</button>
					{/each}
				</div>
				<button class="mt-auto border-t border-dashed border-fyra-gray-800 px-4 py-3 text-left text-[12px] text-fyra-gray-600 hover:text-fyra-gray-400 hover:bg-fyra-gray-800/40 transition-colors duration-100">
					+ New server
				</button>
			</div>

			<!-- Detail pane -->
			<div class="flex flex-1 flex-col overflow-y-auto divide-y divide-fyra-gray-800 bg-fyra-gray-900">

				<!-- Server identity -->
				<div class="flex items-center justify-between px-6 py-4">
					<div>
						<div class="flex items-center gap-2.5">
							<h1 class="text-[13px] font-semibold text-fyra-gray-50">{servers[activeServer].name}</h1>
							{#if servers[activeServer].status === 'running'}
								<span class="flex items-center gap-1 text-[11px] text-green-400">
									<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span> Running
								</span>
							{:else}
								<span class="flex items-center gap-1 text-[11px] text-fyra-gray-500">
									<span class="h-1.5 w-1.5 rounded-full bg-fyra-gray-600"></span> Stopped
								</span>
							{/if}
						</div>
						<p class="mt-0.5 text-[12px] text-fyra-gray-500">{servers[activeServer].plan} · Midwest · Uptime {servers[activeServer].uptime}</p>
					</div>
				</div>

				<!-- Stats row -->
				<div class="grid grid-cols-3 gap-px bg-fyra-gray-800">
					{#each [
						{ label: 'CPU Usage',  value: servers[activeServer].cpu,  unit: '%' },
						{ label: 'RAM Usage',  value: servers[activeServer].ram,  unit: '%' },
						{ label: 'Disk Usage', value: servers[activeServer].disk, unit: '%' },
					] as stat}
						<div class="bg-fyra-gray-900 px-6 py-5">
							<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">{stat.label}</p>
							<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">
								{stat.value}<span class="text-sm font-normal text-fyra-gray-500">{stat.unit}</span>
							</p>
							<div class="mt-3 h-px w-full bg-fyra-gray-800 overflow-hidden">
								<div
									class="h-full transition-all duration-500
										{stat.value > 80 ? 'bg-fyra-red-500' : stat.value > 60 ? 'bg-amber-500' : 'bg-fyra-red-600'}"
									style="width: {stat.value}%"
								></div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Network + Activity -->
				<div class="grid grid-cols-2 gap-px bg-fyra-gray-800">

					<!-- Network -->
					<div class="bg-fyra-gray-900">
						<div class="border-b border-fyra-gray-800 px-6 py-2.5">
							<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Network</p>
						</div>
						<div class="divide-y divide-fyra-gray-800">
							{#each [
								{ label: 'IPv4',         value: servers[activeServer].ip },
								{ label: 'IPv6',         value: '2001:db8::1' },
								{ label: 'Bandwidth',    value: '1 Gbps fair-use' },
								{ label: 'TX this mo.',  value: '183 GB' },
								{ label: 'RX this mo.',  value: '41 GB' },
							] as row}
								<div class="flex items-center justify-between px-6 py-2.5">
									<span class="text-[12px] text-fyra-gray-500">{row.label}</span>
									<span class="font-mono text-[12px] text-fyra-gray-200">{row.value}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Activity -->
					<div class="bg-fyra-gray-900">
						<div class="border-b border-fyra-gray-800 px-6 py-2.5">
							<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Recent Activity</p>
						</div>
						<div class="divide-y divide-fyra-gray-800">
							{#each events as ev}
								<div class="flex items-start gap-4 px-6 py-2.5">
									<span class="shrink-0 font-mono text-[10px] text-fyra-gray-600 pt-px">{ev.time}</span>
									<span class="text-[12px] text-fyra-gray-300">{ev.msg}</span>
								</div>
							{/each}
						</div>
					</div>

				</div>

				<!-- Specs -->
				<div class="grid grid-cols-4 gap-px bg-fyra-gray-800">
					{#each [
						{ label: 'vCPUs',   value: '2 cores' },
						{ label: 'RAM',     value: '4 GB' },
						{ label: 'Storage', value: '80 GB NVMe' },
						{ label: 'OS',      value: 'Ultramarine 41' },
					] as spec}
						<div class="bg-fyra-gray-900 px-6 py-4">
							<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">{spec.label}</p>
							<p class="mt-1.5 text-[13px] font-medium text-fyra-gray-100">{spec.value}</p>
						</div>
					{/each}
				</div>

			</div>
		</div>
	</div>

</div>
