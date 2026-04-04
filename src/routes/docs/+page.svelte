<script lang="ts">
	const steps = [
		{
			n: '01',
			title: 'Contact us',
			body: "Pick your colocation plan and use the contact form, we'll then reach out to organize shipping your server.",
			cta: { label: 'Sign up today →', href: '/services/colocation' }
		},
		{
			n: '02',
			title: 'Ship your servers.',
			body: 'Pack up your server (or buy one on eBay) and ship it to our office, our team will then rack and stack it in our Chicago Data Center.',
			code: null
		},
		{
			n: '03',
			title: 'Rack and stack.',
			body: "We'll unpack, label, and test your server, then take it to our Data Center in Chicago and rack, cable, and power on your server. ",
			code: null
		},
		{
			n: '04',
			title: 'SSH in and go!',
			body: "SSH in, run a full system update, add your user, lock down SSH, and you're off. Your server is up.",
			code: 'ssh user@colo-07712.us-mdw-chi.fyrastack.com'
		}
	];

	const guides = [
		{
			category: 'Colocation',
			description: 'IPMI access, power specs, and getting your hardware online.',
			articles: [
				{
					label: 'Shipping hardware to us',
					soon: false,
					href: '/docs/colocation/shipping-hardware'
				},
				{ label: 'Accessing IPMI remotely', soon: false, href: '/docs/colocation/ipmi' },
				{ label: 'Requesting remote hands', soon: false, href: '/docs/colocation/remote-hands' },
				{ label: 'Power budgets and PDUs', soon: false, href: '/docs/colocation/power-budgets' }
			]
		},
		{
			category: 'VPS',
			description: 'First login, initial hardening, and setting up your environment.',
			articles: [
				{ label: 'Connecting via SSH', soon: true },
				{ label: 'Initial server hardening', soon: true },
				{ label: 'Adding a non-root user', soon: true },
				{ label: 'Choosing a Linux distro', soon: true }
			]
		},
		{
			category: 'Linux & Distros',
			description: 'Supported operating systems and distro-specific notes.',
			articles: [
				{ label: 'Ultramarine Linux', soon: false },
				{ label: 'Debian / Ubuntu', soon: true },
				{ label: 'Arch', soon: true },
				{ label: 'NixOS', soon: true }
			]
		},
		{
			category: 'Account & Billing',
			description: 'Managing your plan, invoices, and cancellation.',
			articles: [
				{ label: 'Upgrading your plan', soon: true },
				{ label: 'Reading your invoice', soon: true },
				{ label: 'Cancelling a plan', soon: true },
				{ label: 'Contacting support', soon: true }
			]
		}
	];

	const faqs: { q: string; a: string }[] = [
		{
			q: 'How does fair-use bandwidth work?',
			a: 'Your server is connected to a 1 Gbps port. "Fair-use" means there\'s no hard monthly cap — we don\'t meter per-GB. We expect reasonable usage; running a public torrent seed box for months on end is not that.'
		},
		{
			q: 'What Linux distros can I run?',
			a: "Anything that boots. We're partial to Ultramarine Linux and can pre-install it for you, but Debian, Ubuntu, Arch, CachyOS, NixOS, and most others work fine. Bring your own ISO if you need something exotic."
		},
		{
			q: 'When will I get access after reserving?',
			a: "We're in early access and provisioning in batches. We'll email you when your slot is ready — usually within a few days of launch. You'll hear from us before anyone else."
		},
		{
			q: 'Can I upgrade my plan later?',
			a: "Yes. We'll migrate your data to the new plan with minimal downtime. Downgrades are handled case-by-case depending on disk usage."
		},
		{
			q: 'Do you offer managed hosting?',
			a: "Not yet. Right now everything is self-managed with full root access. We're building out a dashboard and may offer managed tiers in the future."
		},
		{
			q: 'Is there a control panel or dashboard?',
			a: "We're building one. In the meantime, you get SSH, out-of-band serial console, and direct access to everything. No black boxes."
		},
		{
			q: 'How do I get support?',
			a: 'Email support@fyralabs.com or join the Fyra Labs Discord. For colocation customers with urgent hardware issues, we have a direct line.'
		},
		{
			q: "What's the cancellation policy?",
			a: 'Cancel anytime, no long-term contracts. We prorate to the day. No cancellation fees, no "retention specialist" to guilt-trip you through.'
		}
	];
</script>

<svelte:head>
	<title>Documentation — Fyra Stack</title>

	<!-- Open Graph -->
	<meta property="og:title" content="Documentation — Fyra Stack" />
	<meta property="og:description" content="Guides, references, and answers for getting your Stack VPS or colocation slot up and running." />
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/docs" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Documentation — Fyra Stack" />
	<meta name="twitter:description" content="Guides, references, and answers for getting your Stack VPS or colocation slot up and running." />
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────── -->
<div class="relative isolate overflow-hidden border-b border-fyra-gray-800 px-6 pt-14 lg:px-8">
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
		></div>
	</div>

	<div class="mx-auto max-w-4xl py-24 text-center sm:py-32">
		<h1
			class="mb-2 text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl"
		>
			Documentation.
		</h1>
		<p class="mx-auto max-w-lg text-base text-fyra-gray-400 sm:text-lg/7">
			Guides, references, and answers for getting your Stack VPS or colocation slot up and running.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a
				href="#quick-start"
				class="inline-flex items-center gap-2 border border-fyra-red-500 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
			>
				Colocation quick start
				<svg
					class="h-3.5 w-3.5"
					viewBox="0 0 14 14"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
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

	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%+36rem)] sm:w-288.75"
		></div>
	</div>

	<!-- <div
		class="grid grid-cols-2 divide-x divide-fyra-gray-800 border-t border-fyra-gray-800 md:grid-cols-4"
	>
		<div class="flex flex-col gap-0.5 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">~5 min</span>
			<span class="text-[12px] text-fyra-gray-500">Time to first login</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Root access</span>
			<span class="text-[12px] text-fyra-gray-500">Full control, no wrappers</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Any distro</span>
			<span class="text-[12px] text-fyra-gray-500">Bring your own ISO</span>
		</div>
		<div class="flex flex-col gap-0.5 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Out-of-band</span>
			<span class="text-[12px] text-fyra-gray-500">Serial console included</span>
		</div>
	</div> -->
</div>

<!-- ─── Quick start ──────────────────────────────────────────────────── -->
<section id="quick-start" class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Colocation quick start.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			From shipping a server to a running server in just four steps.
		</p>
	</div>

	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		{#each steps as step, i}
			<div class="px-6 py-8 md:px-10 {i >= 2 ? 'lg:border-t lg:border-fyra-gray-800' : ''}">
				<div class="flex items-start gap-4">
					<span class="mt-0.5 shrink-0 font-mono text-xs font-medium text-fyra-red-500"
						>{step.n}</span
					>
					<div class="flex-1">
						<h3 class="text-base font-semibold text-fyra-gray-50">{step.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">{step.body}</p>
						{#if step.code}
							<pre
								class="mt-4 overflow-x-auto border border-fyra-gray-700 bg-fyra-gray-950 px-4 py-3 font-mono text-sm text-fyra-gray-200"><span
									class="text-fyra-gray-600 select-none"
									>$ </span>{step.code}</pre>
						{/if}
						{#if step.cta}
							<a
								href={step.cta.href}
								class="mt-4 inline-block text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
								>{step.cta.label}</a
							>
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
		<p class="mt-2 text-sm text-fyra-gray-400">
			In-depth documentation by topic. More being written as we launch.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-4">
		{#each guides as guide}
			<div class="bg-fyra-gray-900 p-6">
				<p class="text-[11px] font-medium tracking-widest text-fyra-gray-400 uppercase">
					{guide.category}
				</p>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-400">{guide.description}</p>
				<ul class="mt-5 flex flex-col gap-2">
					{#each guide.articles as article}
						<li class="flex items-center justify-between gap-2">
							{#if article.soon}
								<span class="text-sm text-fyra-gray-400">{article.label}</span>
								<span
									class="shrink-0 text-[10px] font-medium tracking-widest text-fyra-gray-400 uppercase"
									>Soon</span
								>
							{:else}
								<a
									href={article.href ?? '#'}
									class="text-sm text-fyra-gray-300 transition-colors duration-100 hover:text-fyra-gray-50"
									>{article.label}</a
								>
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
		<p class="mt-2 text-sm text-fyra-gray-400">
			Things people ask before signing up. Honest answers only.
		</p>
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
