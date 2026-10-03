<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Check from '@lucide/svelte/icons/check';
	import colocationHeroDither from '$lib/assets/colocation-hero-dither.png';
	import ColocationRack from '$lib/components/landing/colocation-rack.svelte';
	import {
		colocationFeatures,
		colocationInquiryUrl,
		colocationSteps
	} from '$lib/components/landing/colocation';
	import DitherBackground from '$lib/components/landing/dither-background.svelte';
	import { colocationTiers } from '$lib/components/landing/plans';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	const startingTier = colocationTiers[0];

	const spaceOptions = [
		...colocationTiers.map((tier) => `${tier.units}U · ${tier.watts}W · $${tier.price}/mo`),
		'More than 6U',
		'Not sure yet'
	];

	let inquiry = $state({ name: '', email: '', space: spaceOptions[1], hardware: '', notes: '' });

	function sendInquiry(event: SubmitEvent) {
		event.preventDefault();
		const subject = `Colocation inquiry from ${inquiry.name.trim()}`;
		const body = [
			`Name: ${inquiry.name.trim()}`,
			`Email: ${inquiry.email.trim()}`,
			`Rack space: ${inquiry.space}`,
			'',
			'Hardware:',
			inquiry.hardware.trim(),
			...(inquiry.notes.trim() ? ['', 'Notes:', inquiry.notes.trim()] : [])
		].join('\n');
		window.location.href = `mailto:support@fyrastack.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	const facts = [
		{
			value: `From $${startingTier.price}/mo`,
			note: `${startingTier.units}U with ${startingTier.watts}W`
		},
		{ value: '1 Gbps', note: 'Port included on every tier' },
		{ value: 'AS402292', note: 'Our own network in Chicago' }
	];

	const included = [
		'Power allocation for your tier',
		'1 Gbps network port',
		'IPMI remote access over VPN',
		'A+B power with UPS and generator backup',
		'No egress charges'
	];
</script>

<svelte:head>
	<title>Colocation · Fyra Stack</title>
	<meta
		name="description"
		content="Server colocation in Chicago from Fyra Stack. Priced per rack unit with power and a 1 Gbps port included, starting at $70/mo."
	/>
</svelte:head>

<main>
	<!-- Hero: headline over a dithered shader, with three quick facts -->
	<section class="relative isolate overflow-hidden border-b border-border">
		<DitherBackground
			poster={colocationHeroDither}
			priority
			class="-z-10"
			settings={{
				shape: 2,
				pxSize: 3,
				scale: 2.2,
				speed: 0.09,
				driftX: -1.12,
				driftY: -1.14,
				seed: 47,
				intensity: 0.7,
				fadeTop: 0,
				fadeBottom: 0.45,
				shimmer: 0.25,
				shimmerRate: 0.4,
				clearAmount: 1,
				clearX: 0.027,
				clearY: 0.42,
				clearW: 0.95,
				clearH: 0.5
			}}
		/>

		<div class="page-container flex flex-col gap-20 pt-24 lg:gap-30 lg:pt-32">
			<div class="flex max-w-205 flex-col gap-6">
				<span class="font-mono text-xs tracking-[0.11em] text-muted-foreground uppercase">
					Colocation · Chicago, IL
				</span>
				<h1
					class="text-5xl/[1.05] font-semibold tracking-[-0.03em] sm:text-7xl/[1.03] lg:text-[80px]/[82px]"
				>
					Ship your hardware,<br /> we'll handle the rest
				</h1>
				<p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
					Colocation without the enterprise markup, mandatory contracts, or fees for asking
					questions.
				</p>
				<div class="flex flex-wrap items-center gap-3 pt-2">
					<Button
						href="#inquiry"
						variant="outline"
						size="lg"
						class="h-auto gap-2 bg-background/60 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
					>
						Start a colocation inquiry <ArrowRight data-icon="inline-end" />
					</Button>
					<Button
						href="#pricing"
						variant="ghost"
						size="lg"
						class="h-auto px-4 py-2.5 text-muted-foreground"
					>
						See pricing
					</Button>
				</div>
			</div>

			<dl class="grid border-t border-border sm:grid-cols-3">
				{#each facts as fact, index (fact.value)}
					<div
						class="flex flex-col-reverse gap-2.5 pt-7 pb-10 {index > 0
							? 'border-t border-border sm:border-t-0 sm:border-l sm:pl-7'
							: ''}"
					>
						<dt class="text-sm text-muted-foreground">{fact.note}</dt>
						<dd class="text-2xl font-semibold tracking-[-0.017em]">{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<!-- Facility: rack illustration and what the space gives you -->
	<section class="border-b border-border py-20 lg:py-28">
		<div class="page-container flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
			<ColocationRack />

			<div class="flex flex-1 flex-col gap-12">
				<div class="flex flex-col gap-5">
					<h2 class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]">
						A rack you can count on
					</h2>
					<p class="text-[17px]/[27px] text-pretty text-muted-foreground">
						Your hardware sits in our Chicago facility, on our network, looked after by the same
						small team that runs Stack.
					</p>
				</div>
				<ul>
					{#each colocationFeatures as feature (feature.title)}
						<li class="flex gap-4 border-t border-border py-5">
							<feature.icon class="mt-0.5 size-4.5 shrink-0" strokeWidth={1.75} />
							<div class="flex flex-col gap-1">
								<span class="text-[15px] font-semibold">{feature.title}</span>
								<span class="text-sm/[21px] text-muted-foreground">{feature.description}</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Pricing: per-rack-unit tiers and what every tier includes -->
	<section id="pricing" class="border-b border-border py-20 lg:py-28">
		<div class="page-container flex flex-col gap-12">
			<div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
				<h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">Pricing</h2>
				<p class="max-w-105 text-base/[26px] text-pretty text-muted-foreground">
					Priced per rack unit, with power and a 1 Gbps port included. Billed monthly once your
					server is racked.
				</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
				<div class="self-start border border-border">
					<table class="w-full text-left text-sm">
						<thead>
							<tr
								class="border-b border-border font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
							>
								<th scope="col" class="px-6 py-4 font-normal">Space</th>
								<th scope="col" class="px-6 py-4 font-normal">Power</th>
								<th scope="col" class="hidden px-6 py-4 font-normal sm:table-cell">Port</th>
								<th scope="col" class="px-6 py-4 text-right font-normal">Price</th>
							</tr>
						</thead>
						<tbody>
							{#each colocationTiers as tier (tier.units)}
								<tr class="border-b border-border last:border-b-0">
									<th scope="row" class="px-6 py-4.5 text-base font-semibold">{tier.units}U</th>
									<td class="px-6 py-4.5 font-mono text-[13px] text-muted-foreground"
										>{tier.watts}W</td
									>
									<td
										class="hidden px-6 py-4.5 font-mono text-[13px] text-muted-foreground sm:table-cell"
									>
										1 Gbps
									</td>
									<td class="px-6 py-4.5 text-right text-[15px] font-semibold tabular-nums"
										>${tier.price}/mo</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<aside class="flex flex-col gap-6 border border-border bg-gray-850 p-6">
					<span class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
						On every tier
					</span>
					<ul class="flex flex-col gap-3">
						{#each included as item (item)}
							<li class="flex items-center gap-2.5 text-sm/5">
								<Check class="size-4 shrink-0" strokeWidth={1.75} />
								{item}
							</li>
						{/each}
					</ul>
					<div class="h-px bg-border"></div>
					<p class="text-[13px]/5 text-pretty text-muted-foreground">
						Need more space or power than listed here? Tell us in your inquiry and we'll let you
						know what's available.
					</p>
					<Button href="#inquiry" variant="outline" size="lg" class="h-auto py-2.5">
						Start a colocation inquiry
					</Button>
				</aside>
			</div>
		</div>
	</section>

	<!-- How it works: inquiry, shipping, racking -->
	<section class="border-b border-border py-20 lg:py-28">
		<div class="page-container flex flex-col gap-12">
			<h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">How it works</h2>
			<ol class="grid gap-10 md:grid-cols-3">
				{#each colocationSteps as step, index (step.title)}
					<li class="flex flex-col gap-2.5 border-t border-border pt-6">
						<span class="font-mono text-xs tracking-[0.1em] text-brand-yellow">
							{String(index + 1).padStart(2, '0')}
						</span>
						<span class="text-lg font-semibold tracking-[-0.011em]">{step.title}</span>
						<span class="text-sm/[21px] text-muted-foreground">{step.description}</span>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Inquiry: form that drafts a colocation inquiry email -->
	<section id="inquiry" class="border-b border-border py-20 lg:py-28">
		<div class="page-container flex flex-col justify-between gap-12 lg:flex-row">
			<div class="flex flex-col gap-4 lg:w-110">
				<h2 class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]">
					Have hardware ready to rack?
				</h2>
				<p class="text-base/[26px] text-pretty text-muted-foreground">
					Send us what you're racking and how much power it needs. You'll hear back from the people
					who'll actually install it.
				</p>
				<p class="text-sm/[22px] text-pretty text-muted-foreground">
					Sending opens an email to
					<a
						href="mailto:support@fyrastack.com"
						class="text-foreground underline underline-offset-2">support@fyrastack.com</a
					> with your details filled in.
				</p>
			</div>

			<form
				action={colocationInquiryUrl}
				method="post"
				enctype="text/plain"
				onsubmit={sendInquiry}
				class="grid gap-5 border border-border bg-gray-850 p-6 sm:grid-cols-2 lg:w-160"
			>
				<div class="flex flex-col gap-2">
					<Label for="inquiry-name">Name</Label>
					<Input
						id="inquiry-name"
						name="name"
						autocomplete="name"
						required
						bind:value={inquiry.name}
						class="h-9 rounded-none"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<Label for="inquiry-email">Email</Label>
					<Input
						id="inquiry-email"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={inquiry.email}
						class="h-9 rounded-none"
					/>
				</div>
				<div class="flex flex-col gap-2 sm:col-span-2">
					<Label for="inquiry-space">Rack space</Label>
					<select
						id="inquiry-space"
						name="space"
						bind:value={inquiry.space}
						class="h-9 w-full border border-input bg-input/30 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
					>
						{#each spaceOptions as option (option)}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col gap-2 sm:col-span-2">
					<Label for="inquiry-hardware">Hardware</Label>
					<Textarea
						id="inquiry-hardware"
						name="hardware"
						required
						rows={3}
						placeholder="Model, size, and expected power draw"
						bind:value={inquiry.hardware}
						class="rounded-none"
					/>
				</div>
				<div class="flex flex-col gap-2 sm:col-span-2">
					<Label for="inquiry-notes">
						Anything else <span class="font-normal text-muted-foreground">(optional)</span>
					</Label>
					<Textarea
						id="inquiry-notes"
						name="notes"
						rows={2}
						placeholder="Network needs, timeline, questions"
						bind:value={inquiry.notes}
						class="rounded-none"
					/>
				</div>
				<Button
					type="submit"
					variant="outline"
					size="lg"
					class="h-auto gap-2 justify-self-start py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
				>
					Send inquiry <ArrowRight data-icon="inline-end" />
				</Button>
			</form>
		</div>
	</section>
</main>
