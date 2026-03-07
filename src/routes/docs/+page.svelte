<script lang="ts">
	const steps = [
		{
			n: '01',
			title: 'Reserve your plan',
			body: 'Pick a VPS or colocation plan and submit your pre-reservation. We\'ll reach out when your slot is ready.',
			cta: { label: 'View plans →', href: '/pricing' },
		},
		{
			n: '02',
			title: 'Receive your credentials',
			body: 'We\'ll email you your server\'s IP address, root password, and SSH fingerprint. Verify the fingerprint before connecting.',
			code: null,
		},
		{
			n: '03',
			title: 'Connect via SSH',
			body: 'Log in as root. We recommend adding an SSH key and disabling password auth immediately after first login.',
			code: 'ssh root@<your-ip>',
		},
		{
			n: '04',
			title: 'Update and go',
			body: 'Run a full system update, add your user, lock down SSH, and you\'re off. The server is yours.',
			code: 'apt update && apt full-upgrade -y',
		},
	];

	const guides = [
		{
			category: 'Getting Started',
			description: 'First login, initial hardening, and setting up your environment.',
			articles: [
				{ label: 'Connecting via SSH',         soon: false },
				{ label: 'Initial server hardening',   soon: false },
				{ label: 'Adding a non-root user',     soon: false },
				{ label: 'Choosing a Linux distro',    soon: true  },
			],
		},
		{
			category: 'Networking',
			description: 'IPv4 and IPv6 configuration, firewall setup, and DNS.',
			articles: [
				{ label: 'Configuring your IPv4 address',  soon: false },
				{ label: 'Setting up IPv6 (/64)',          soon: false },
				{ label: 'Firewall with nftables',         soon: false },
				{ label: 'Reverse DNS (PTR records)',      soon: true  },
			],
		},
		{
			category: 'Storage',
			description: 'Working with NVMe disks, filesystems, and disk best practices.',
			articles: [
				{ label: 'Disk layout and partitioning',  soon: false },
				{ label: 'Enabling periodic TRIM',        soon: false },
				{ label: 'Resizing your filesystem',      soon: true  },
				{ label: 'Benchmarking disk I/O',         soon: true  },
			],
		},
		{
			category: 'Serial Console',
			description: 'Out-of-band access for when SSH is unreachable.',
			articles: [
				{ label: 'Accessing the serial console',    soon: false },
				{ label: 'Recovering from a failed boot',   soon: false },
				{ label: 'Resetting a forgotten password',  soon: true  },
			],
		},
		{
			category: 'Colocation',
			description: 'IPMI access, power specs, and getting your hardware online.',
			articles: [
				{ label: 'Accessing IPMI remotely',       soon: false },
				{ label: 'Power budgets and PDUs',        soon: false },
				{ label: 'Shipping hardware to us',       soon: true  },
				{ label: 'Requesting cross-connects',     soon: true  },
			],
		},
		{
			category: 'Linux & Distros',
			description: 'Supported operating systems and distro-specific notes.',
			articles: [
				{ label: 'Ultramarine Linux',   soon: false },
				{ label: 'Debian / Ubuntu',     soon: false },
				{ label: 'CachyOS / Arch',      soon: true  },
				{ label: 'NixOS',               soon: true  },
			],
		},
		{
			category: 'Security',
			description: 'Hardening your server against common attack vectors.',
			articles: [
				{ label: 'SSH key-only authentication',   soon: false },
				{ label: 'fail2ban setup',                soon: false },
				{ label: 'AppArmor / SELinux basics',     soon: true  },
				{ label: 'Automatic security updates',    soon: true  },
			],
		},
		{
			category: 'Account & Billing',
			description: 'Managing your plan, invoices, and cancellation.',
			articles: [
				{ label: 'Upgrading your plan',    soon: true },
				{ label: 'Reading your invoice',   soon: true },
				{ label: 'Cancelling a plan',      soon: true },
				{ label: 'Contacting support',     soon: false },
			],
		},
	];

	const faqs: { q: string; a: string }[] = [
		{
			q: 'How does fair-use bandwidth work?',
			a: 'Your server is connected to a 1 Gbps port. "Fair-use" means there\'s no hard monthly cap — we don\'t meter per-GB. We expect reasonable usage; running a public torrent seed box for months on end is not that.',
		},
		{
			q: 'What Linux distros can I run?',
			a: 'Anything that boots. We\'re partial to Ultramarine Linux and can pre-install it for you, but Debian, Ubuntu, Arch, CachyOS, NixOS, and most others work fine. Bring your own ISO if you need something exotic.',
		},
		{
			q: 'When will I get access after reserving?',
			a: 'We\'re in early access and provisioning in batches. We\'ll email you when your slot is ready — usually within a few days of launch. You\'ll hear from us before anyone else.',
		},
		{
			q: 'Can I upgrade my plan later?',
			a: 'Yes. We\'ll migrate your data to the new plan with minimal downtime. Downgrades are handled case-by-case depending on disk usage.',
		},
		{
			q: 'Do you offer managed hosting?',
			a: 'Not yet. Right now everything is self-managed with full root access. We\'re building out a dashboard and may offer managed tiers in the future.',
		},
		{
			q: 'Is there a control panel or dashboard?',
			a: 'We\'re building one. In the meantime, you get SSH, out-of-band serial console, and direct access to everything. No black boxes.',
		},
		{
			q: 'How do I get support?',
			a: 'Email support@fyralabs.com or join the Fyra Labs Discord. For colocation customers with urgent hardware issues, we have a direct line.',
		},
		{
			q: 'What\'s the cancellation policy?',
			a: 'Cancel anytime, no long-term contracts. We prorate to the day. No cancellation fees, no "retention specialist" to guilt-trip you through.',
		},
	];
</script>

<svelte:head>
	<title>Documentation — Fyra Stack</title>
</svelte:head>

<!-- ─── Header ──────────────────────────────────────────────────────── -->
<div class="relative overflow-hidden border-b border-fyra-gray-800">
	<div class="pointer-events-none absolute inset-0 opacity-[0.07]">
		<img src="/stack-pattern.svg" alt="" class="h-full w-full object-cover object-center" aria-hidden="true" />
	</div>
	<div class="relative px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
		<h1 class="text-5xl font-semibold leading-[1.1] tracking-tight text-fyra-gray-50 md:text-6xl">
			Documentation.<br />
			<span class="text-fyra-red-400">No fluff.</span>
		</h1>
		<p class="mt-6 max-w-md text-base leading-relaxed text-fyra-gray-400">
			Guides, references, and answers for getting your Stack VPS or colocation slot up and running.
		</p>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<a
				href="#quick-start"
				class="inline-flex items-center gap-2 border border-fyra-red-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
			>
				Quick start
				<svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M7 2v10M3 8l4 4 4-4" />
				</svg>
			</a>
			<a
				href="#guides"
				class="inline-flex items-center gap-2 border border-fyra-gray-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
			>
				Browse guides
			</a>
		</div>
	</div>
	<div class="relative grid grid-cols-2 divide-x divide-fyra-gray-800 border-t border-fyra-gray-800 md:grid-cols-4">
		<div class="flex flex-col gap-0.5 px-6 py-4">
			<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">~5 min</span>
			<span class="text-[12px] text-fyra-gray-500">Time to first login</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-4">
			<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">Root access</span>
			<span class="text-[12px] text-fyra-gray-500">Full control, no wrappers</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-4">
			<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">Any distro</span>
			<span class="text-[12px] text-fyra-gray-500">Bring your own ISO</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-4">
			<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">Out-of-band</span>
			<span class="text-[12px] text-fyra-gray-500">Serial console included</span>
		</div>
	</div>
</div>

<!-- ─── Quick start ──────────────────────────────────────────────────── -->
<section id="quick-start" class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Quick start.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">From reservation to a running server in four steps.</p>
	</div>

	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
		{#each steps as step, i}
			<div class="px-6 py-8 md:px-10 {i >= 2 ? 'lg:border-t lg:border-fyra-gray-800' : ''}">
				<div class="flex items-start gap-4">
					<span class="shrink-0 font-mono text-xs font-medium text-fyra-red-500 mt-0.5">{step.n}</span>
					<div class="flex-1">
						<h3 class="text-base font-semibold text-fyra-gray-50">{step.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">{step.body}</p>
						{#if step.code}
							<pre class="mt-4 overflow-x-auto border border-fyra-gray-700 bg-fyra-gray-950 px-4 py-3 text-sm font-mono text-fyra-gray-200"><span class="text-fyra-gray-600 select-none">$ </span>{step.code}</pre>
						{/if}
						{#if step.cta}
							<a href={step.cta.href} class="mt-4 inline-block text-sm font-medium text-fyra-red-400 hover:text-fyra-red-300 transition-colors duration-100">{step.cta.label}</a>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- ─── Guides ───────────────────────────────────────────────────────── -->
<section id="guides" class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Guides.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">In-depth documentation by topic. More being written as we launch.</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-4">
		{#each guides as guide}
			<div class="bg-fyra-gray-900 p-6">
				<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">{guide.category}</p>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-400">{guide.description}</p>
				<ul class="mt-5 flex flex-col gap-2">
					{#each guide.articles as article}
						<li class="flex items-center justify-between gap-2">
							{#if article.soon}
								<span class="text-sm text-fyra-gray-600">{article.label}</span>
								<span class="shrink-0 text-[10px] font-medium uppercase tracking-widest text-fyra-gray-700">Soon</span>
							{:else}
								<a href="#" class="text-sm text-fyra-gray-300 hover:text-fyra-gray-50 transition-colors duration-100">{article.label}</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<!-- ─── FAQ ──────────────────────────────────────────────────────────── -->
<section>
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Common questions.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Things people ask before signing up. Honest answers only.</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 lg:grid-cols-2">
		{#each faqs as faq}
			<div class="bg-fyra-gray-900 px-6 py-9 md:px-10 md:py-10">
				<p class="text-sm font-semibold text-fyra-gray-100">{faq.q}</p>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-400">{faq.a}</p>
			</div>
		{/each}
	</div>
</section>
