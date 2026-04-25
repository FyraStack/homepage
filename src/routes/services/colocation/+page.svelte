<script lang="ts">
	import { ArrowDown, ArrowRight, Check } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { colocationPlans } from '$lib/data/colocationPlans';
	import { reserve } from '$lib/remote/colocation-reserve.remote';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';

	let selectedPlanName = $state('STACK-1U');

	const currentPlan = $derived(
		colocationPlans.find((p) => p.name === selectedPlanName) ?? colocationPlans[0]
	);

	const formId = $props.id();
	const signupForm = reserve.for(formId);

	let plan = $state('STACK-1U');
	let name = $state('');
	let email = $state('');

	let submitting = $derived(signupForm.pending > 0);
	let showSuccess = $derived($page.url.searchParams.get('success') === 'true');

	// Scroll to bottom when payment succeeds
	$effect(() => {
		if (showSuccess) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		}
	});

	$effect(() => {
		const result = signupForm.result;
		if (result?.ok && result.paymentLink) {
			window.location.href = result.paymentLink;
		}
	});

	const SHIPPING_ADDRESS = `Fyra Stack Limited
5206 N Damen Ave
Chicago, IL 60625`;

	const labelClass = 'text-[11px] font-medium uppercase tracking-widest text-muted-foreground';
	const issueClass = 'text-xs text-destructive';

	// Comparison data
	const coloCompetitors = ['Traditional Colo', 'Dedicated Servers', 'Self-hosting'];

	const coloComparisonRows = [
		{
			label: 'Entry price',
			stack: { previousPrice: '$60', text: '$50/mo' },
			values: ['$200+/mo', '$80+/mo', '$0+/mo*']
		},
		{
			label: 'Bandwidth',
			stack: { text: '1 Gbps fair-use' },
			values: ['Extra', 'Metered', 'Consumer ISP']
		},
		{
			label: 'Power redundancy',
			stack: { text: 'Included' },
			values: ['Depends', 'Depends', 'Depends']
		},
		{
			label: 'IPMI / remote access',
			stack: { text: 'Included' },
			values: ['Extra cost', 'Included', 'Depends']
		},
		{
			label: 'Own your hardware',
			stack: { text: '✓' },
			values: ['✓', '✗', '✓']
		},
		{
			label: 'Physical security',
			stack: { text: '✓' },
			values: ['✓', '✓', '✗']
		},
		{
			label: 'No long contract',
			stack: { text: '✓' },
			values: ['✗', '✓', '✓']
		}
	];
</script>

<svelte:head>
	<title>Colocation in Chicago | Fyra Stack</title>
	<meta
		name="description"
		content="Ship your server to our Chicago data center. We rack, stack, and cable it. You SSH in and go. 1 Gbps uplink, IPMI access, remote hands."
	/>
	<link rel="canonical" href="https://fyrastack.com/services/colocation" />

	<!-- Open Graph -->
	<meta property="og:title" content="Colocation | Fyra Stack" />
	<meta
		property="og:description"
		content="Ship your server to our Chicago data center. We rack, stack, and cable it. You SSH in and go."
	/>
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/services/colocation" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Colocation | Fyra Stack" />
	<meta
		name="twitter:description"
		content="Ship your server to our Chicago data center. We rack, stack, and cable it. You SSH in and go."
	/>
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- Hero -->
<main class="relative isolate overflow-hidden border-b border-border px-6 pt-14 lg:px-8">
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary/20 to-primary/60 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
		></div>
	</div>

	<div class="mx-auto max-w-4xl py-24 text-center sm:py-32">
		<h1 class="mb-2 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
			Ship your hardware.
		</h1>
		<h2 class="mb-8 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
			<span class="text-primary">We'll handle the rest.</span>
		</h2>
		<p class="mx-auto max-w-lg text-base text-muted-foreground sm:text-lg/7">
			Colocation without the enterprise markup, mandatory contracts, or fees for asking questions.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button
				type="button"
				onclick={() => document.querySelector('#signup')?.scrollIntoView({ behavior: 'smooth' })}
			>
				Get started
				<ArrowDown class="h-3.5 w-3.5" aria-hidden="true" />
			</Button>
		</div>
	</div>

	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary/20 to-primary/60 opacity-25 sm:left-[calc(50%+36rem)] sm:w-288.75"
		></div>
	</div>
</main>

<!-- Features -->
<section class="border-b border-border">
	<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
		<!-- Left: headline -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-foreground">
				Stack is different.
			</h2>

			<p class="mt-6 text-base leading-relaxed text-muted-foreground">
				Most colocation providers won't work with you, we will.
			</p>
			<p class="mt-3 text-base leading-relaxed text-muted-foreground">
				Colocate in our Illinois space with power redundancy, solid network connectivity, and
				support from people who've actually racked servers before.
			</p>
			<p class="mt-3 text-base leading-relaxed text-muted-foreground">
				We charge you for rack space, power, and bandwidth.
			</p>
			<p class="mt-3 text-base leading-relaxed text-muted-foreground/80">That's it.</p>
		</div>

		<!-- Right: bento grid -->
		<div class="grid grid-cols-2 gap-px bg-muted">
			<div class="relative col-span-2 overflow-hidden bg-background p-8">
				<div class="pointer-events-none absolute top-0 right-0 h-full w-2/5 select-none">
					<img
						src="/stack-pattern.svg"
						alt=""
						class="h-full w-full object-cover object-left opacity-20"
						aria-hidden="true"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"
					></div>
				</div>
				<div class="relative">
					<p class="text-lg font-semibold text-foreground">Midwest proud</p>
					<p class="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
						Providing low-latency access to the entire US on our blended network.
					</p>
				</div>
			</div>

			<div class="bg-background p-8">
				<p class="text-lg leading-snug font-semibold text-foreground">IPMI remote access</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					Full out-of-band management over a simple VPN connection.
				</p>
			</div>

			<div class="bg-background p-8">
				<p class="text-lg font-semibold text-foreground">Redundant power</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					A+B feeds, UPS, and generator backup keeps your server on.
				</p>
			</div>

			<div class="bg-background p-8">
				<p class="text-lg font-semibold text-foreground">Real support</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					By the engineers who have actually racked servers before.
				</p>
			</div>

			<div class="bg-background p-8">
				<p class="text-lg font-semibold text-foreground">Honest pricing</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					No hidden power fees, no egress charges, no surprise bills.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Comparison -->
<section class="border-b border-border">
	<div class="border-b border-border px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
			Stack, well... stacks up.
		</h2>
		<p class="mt-2 text-sm text-muted-foreground">Compared at our entry-level plan.</p>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<Table.Root class="min-w-[600px]">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-36 px-6 md:w-44 md:px-10"></Table.Head>
					<Table.Head>
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-foreground">Stack</span>
						</div>
					</Table.Head>
					{#each coloCompetitors as name (name)}
						<Table.Head>{name}</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each coloComparisonRows as row (row.label)}
					<Table.Row>
						<Table.Cell class="px-6 text-muted-foreground md:px-10">{row.label}</Table.Cell>
						<Table.Cell class="font-semibold text-primary">
							{#if row.stack.previousPrice}
								<span class="text-foreground0 mr-1.5 line-through">{row.stack.previousPrice}</span>
							{/if}
							{row.stack.text}
						</Table.Cell>
						{#each row.values as val, i (`${row.label}-${coloCompetitors[i]}`)}
							<Table.Cell class="text-muted-foreground/80">{val}</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>

<!-- Plans -->
<div id="plans" class="border-b border-border px-6 py-8 md:px-10">
	<h2 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Priced fairly.</h2>
	<p class="mt-2 text-sm text-muted-foreground">Simple, flat-rate plans with no surprise fees.</p>
</div>

<div class="grid grid-cols-7">
	<div class="col-span-7 flex flex-col justify-between border-b border-border p-5">
		<!-- top -->
		<div class="flex min-w-full items-center justify-between">
			<h2 class="text-xl font-semibold tracking-wide lg:text-2xl">
				{currentPlan.name}
			</h2>
			<div class="flex items-center gap-3">
				<div class="text-right">
					<h3 class="text-xl font-semibold tracking-tight lg:text-2xl">
						{#if currentPlan.originalPrice}
							<span class="text-foreground0 mr-1.5 font-medium tracking-wide line-through"
								>${currentPlan.originalPrice}</span
							>
						{/if}
						<span class="font-medium tracking-wide">$</span>{currentPlan.price}<span
							class="text-sm leading-3 font-medium lg:text-base">/mo</span
						>
					</h3>
				</div>
				{#if currentPlan.originalPrice}
					<Badge class="bg-primary/10 text-primary">Limited time</Badge>
				{/if}
			</div>
		</div>
		<!-- middle -->
		<div
			class="mt-8 grid grid-cols-1 gap-x-8 gap-y-1.5 text-base md:grid-cols-2 md:gap-y-3.5 lg:mt-16 lg:text-[1.05rem]"
		>
			<div class="flex justify-between">
				<p class="text-muted-foreground">Rack Units</p>
				<p class="tracking-tight">{currentPlan.units}U</p>
			</div>
			<div class="flex justify-between">
				<p class="text-muted-foreground">Bandwidth</p>
				<p class="tracking-tight">{currentPlan.bandwidth} Fair-use</p>
			</div>
			<div class="flex justify-between">
				<p class="text-muted-foreground">Power</p>
				<p class="tracking-tight">{currentPlan.power}W</p>
			</div>
			<div class="flex justify-between">
				<p class="text-muted-foreground">IP Addresses</p>
				<p class="tracking-tight">{currentPlan.ips} IPs</p>
			</div>
		</div>
	</div>
</div>

<div class="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-3">
	{#each colocationPlans as plan, i (plan.name)}
		<Button
			onclick={() => (selectedPlanName = plan.name)}
			variant="ghost"
			class="col-span-1 h-auto w-full rounded-none p-4 text-left duration-200 {selectedPlanName ===
			plan.name
				? 'bg-muted'
				: 'bg-background hover:bg-muted'} {i === colocationPlans.length - 1
				? 'border-b border-border'
				: ''}"
		>
			<div class="flex items-start justify-between gap-4">
				<h4 class="text-base/5 font-medium md:text-[1.1rem]/6">{plan.name}</h4>
				<div class="text-right">
					<h3 class="text-sm font-medium tracking-tighter lg:text-base">
						{#if plan.originalPrice}
							<span class="text-foreground0 mr-1 font-normal tracking-wide line-through"
								>${plan.originalPrice}</span
							>
						{/if}
						<span class="font-normal tracking-wide">$</span>{plan.price}<span class="text-sm"
							>/mo</span
						>
					</h3>
				</div>
			</div>
			<div class="mt-4 text-left md:mt-6">
				<p class="text-xs text-muted-foreground">
					{plan.units}U
					<span class="px-0.5 text-primary">•</span>
					{plan.power}W
					<span class="px-0.5 text-primary">•</span>
					{plan.bandwidth}
				</p>
			</div>
		</Button>
	{/each}
</div>

<div class="border-b border-border px-5 py-3 text-center">
	<p class="text-xs text-muted-foreground">
		Need something custom?
		<a
			href="mailto:contact@fyrastack.com"
			class="text-primary transition-colors hover:text-primary/80">Contact us</a
		>
		for bulk orders and non-profit discounts.
	</p>
</div>

<!-- Doc link -->
<section class="border-b border-border">
	<div class="flex flex-col items-center justify-center px-8 py-12 text-center lg:py-16">
		<p class="text-lg text-muted-foreground/80">Need a hand getting started?</p>
		<p class="mt-2 text-sm text-muted-foreground">Our docs walk you through it.</p>
		<a
			href={resolve('/docs')}
			class="mt-3 inline-flex items-center gap-2 text-base text-primary transition-colors hover:text-primary/80"
		>
			Read the documentation
			<ArrowRight class="h-4 w-4" aria-hidden="true" />
		</a>
	</div>
</section>

<!-- Signup section -->
<section class="relative" id="signup">
	<!-- Payment Complete Overlay (shown after returning from Autumn) -->
	{#if showSuccess}
		<div
			transition:fly={{ y: 16, duration: 200 }}
			class="absolute inset-0 z-10 border border-border bg-background px-6 py-8 md:px-10"
		>
			<div class="flex h-full flex-col justify-center">
				<div class="mb-6 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary"
					>
						<Check class="h-5 w-5" aria-hidden="true" />
					</div>
					<h2 class="text-2xl font-semibold tracking-tight text-foreground">Payment complete!</h2>
				</div>

				<div class="space-y-6">
					<div>
						<h3 class="text-sm font-medium text-muted-foreground/80">Shipping Address</h3>
						<p class="mt-2 text-sm whitespace-pre-wrap text-muted-foreground">{SHIPPING_ADDRESS}</p>
					</div>

					<div>
						<h3 class="text-sm font-medium text-muted-foreground/80">Documentation</h3>
						<p class="mt-2 text-sm text-muted-foreground">
							Review our colocation documentation for shipping guidelines, required paperwork, and
							what to expect when your server arrives.
						</p>
						<a
							href={resolve('/docs')}
							class="mt-3 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
						>
							View Colocation Docs
							<ArrowRight class="h-3.5 w-3.5" aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Form -->
	<div>
		<div class="border-b border-border px-6 py-8 md:px-10">
			<h2 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
				Get started with colocation.
			</h2>
			<p class="mt-2 text-sm text-muted-foreground">
				Select your plan, provide your details, and we'll get you set up.
			</p>
		</div>

		<div class="px-6 py-8 md:px-10">
			<form {...signupForm} class="flex flex-col gap-6">
				<input type="hidden" name="plan" value={plan} />

				<!-- Plan -->
				<div class="flex flex-col gap-2">
					<span class={labelClass}>Plan</span>
					<Select.Root bind:value={plan}>
						<Select.Trigger class="w-full bg-muted text-foreground">
							{#each colocationPlans as p (p.name)}
								{#if p.name === plan}
									{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
								{/if}
							{/each}
						</Select.Trigger>
						<Select.Content>
							{#each colocationPlans as p (p.name)}
								<Select.Item value={p.name}>
									{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					{#if signupForm.fields.plan.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.plan.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Name -->
				<div class="flex flex-col gap-2">
					<Label for="name" class={labelClass}>
						Display Name<span class="tracking-normal text-primary normal-case">*</span>
					</Label>
					<Input
						id="name"
						name="name"
						type="text"
						bind:value={name}
						required
						placeholder="Reisen Inaba"
						class="bg-muted text-foreground placeholder:text-muted-foreground/60"
					/>
					{#if signupForm.fields.name.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.name.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Email -->
				<div class="flex flex-col gap-2">
					<Label for="email" class={labelClass}>
						Email Address<span class="tracking-normal text-primary normal-case">*</span>
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						bind:value={email}
						required
						placeholder="reisen@kaguyas.pet"
						class="bg-muted text-foreground placeholder:text-muted-foreground/60"
					/>
					{#if signupForm.fields.email.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.email.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Submit -->
				<div>
					<Button
						type="submit"
						disabled={submitting}
						variant="outline"
						class="w-fit bg-muted text-foreground hover:border-primary"
					>
						{#if submitting}
							Processing...
						{:else}
							Continue to Payment
						{/if}
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>
