<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		RouterWifi,
		DeskAdjustable,
		Screen,
		AudioConsole,
		Drink01,
		Printer,
		PresentationFile,
		DogWalker,
		Hotel
	} from '@steeze-ui/carbon-icons';

	const amenities = [
		{ icon: DeskAdjustable, label: 'Desks with monitors & docks' },
		{ icon: Hotel, label: 'Couches' },
		{ icon: RouterWifi, label: 'Symmetrical 300mbps wifi' },
		{ icon: Drink01, label: 'Coffee & snacks' },
		{ icon: AudioConsole, label: 'Turntable' },
		{ icon: PresentationFile, label: 'Whiteboards' },
		{ icon: Printer, label: '3D printer' },
		{ icon: Screen, label: 'TV' },
		{ icon: DogWalker, label: 'Dog-friendly' }
	];

	let { form }: { form: ActionData } = $props();

	const conduct = [
		{
			n: '01',
			title: "Respect people's identities.",
			body: "Respect others, and how they identify. Mistakes happen, but being disrespectful in any way won't be tolerated."
		},
		{
			n: '02',
			title: "Don't be weird to anyone.",
			body: "Harassment and abuse is unacceptable and not welcome, we're here to work on projects, not to be a nuisance."
		},
		{
			n: '03',
			title: 'No gatekeeping.',
			body: "Just because someone is new or not as knowledgeable doesn't mean they're less deserving of respect."
		},

		{
			n: '04',
			title: 'Clean up after yourself.',
			body: 'All we ask is that you leave the office better than you found it, so that we can all enjoy a clean workspace.'
		}
	];
</script>

<svelte:head>
	<title>Our Office | Fyra Stack</title>
	<meta
		name="description"
		content="Stack's office in Ravenswood, Chicago. 850 square feet at Foster and Damen, open to the community. Work desks, fast wifi, 3D printer, and the engineers who run the cloud."
	/>
	<link rel="canonical" href="https://fyrastack.com/our-office" />
	<meta property="og:title" content="Our Office | Fyra Stack" />
	<meta
		property="og:description"
		content="Stack's office in Ravenswood, Chicago. 850 square feet at Foster and Damen, open to the community."
	/>
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/our-office" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Our Office | Fyra Stack" />
	<meta
		name="twitter:description"
		content="Stack's office in Ravenswood, Chicago. 850 square feet at Foster and Damen, open to the community."
	/>
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- Hero -->
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
			We have an office.
		</h1>
		<h2 class="mb-8 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
			<span class="text-fyra-red-400">Hangout with us.</span>
		</h2>
		<p class="mx-auto max-w-xl text-base text-fyra-gray-400 sm:text-lg/7">
			Our office serves as a community space for anyone and everyone.
		</p>
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
</div>

<!-- Stat strip -->
<div class="grid grid-cols-1 gap-px border-b border-fyra-gray-800 bg-fyra-gray-800 md:grid-cols-3">
	{#each [{ value: '5206 N Damen Ave', label: 'Ravenswood, Chicago' }, { value: '850 sq ft', label: 'Ground floor · Foster & Damen' }, { value: 'Open Door Fridays', label: '7 - 10pm CST' }] as stat (stat.label)}
		<div class="flex flex-col gap-0.5 bg-fyra-gray-900 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">{stat.value}</span>
			<span class="text-[12px] text-fyra-gray-500">{stat.label}</span>
		</div>
	{/each}
</div>

<!-- The office -->
<section class="border-b border-fyra-gray-800">
	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		<!-- Left: text -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-fyra-gray-50">
				The office.
			</h2>
			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				We needed a place to work. We ended up with more space than we needed, so we opened it up.
				Our office is on the ground floor and located at Foster and Damen in Ravenswood.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-400">
				A lot of us work out of here. If you're a Stack user and something isn't working, the person
				who built it is probably in the same room. That's not a pitch, just how the office is laid
				out.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-400">
				Bring your work, bring your projects, most importantly, bring yourself.
			</p>
		</div>

		<!-- Right: bento facts -->
		<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
			<div class="relative min-h-72 overflow-hidden bg-fyra-gray-900 md:col-span-2">
				<img
					src="/assets/office-1.jpeg"
					alt="The office"
					class="absolute inset-0 h-full w-full object-cover brightness-60"
				/>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Access</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">24/7</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Members get a front door pin.</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Day pass</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">$10</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Membership from $30/mo.</p>
			</div>
		</div>
	</div>
</section>

<!-- Photos -->
<div class="grid grid-cols-1 gap-px border-b border-fyra-gray-800 bg-fyra-gray-800 md:grid-cols-3">
	{#each ['/assets/office-2.jpeg', '/assets/office-3.jpeg', '/assets/office-4.jpeg'] as src (src)}
		<div class="relative min-h-48 overflow-hidden">
			<img {src} alt="The office" class="h-full w-full object-cover brightness-75" />
		</div>
	{/each}
</div>

<!-- What's here -->
<section class="">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			What's here.
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Our office has a lot of interesting amenities, from desks with monitors and docks to couches
			and tools.
		</p>
	</div>
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each amenities as a (a.label)}
			<div class="flex items-center gap-4 bg-fyra-gray-900 px-6 py-5 md:px-10">
				<Icon src={a.icon} class="h-5 w-5 shrink-0 text-fyra-red-400" aria-hidden="true" />
				<span class="text-sm font-medium text-fyra-gray-50">{a.label}</span>
			</div>
		{/each}
	</div>
</section>

<!-- Open Door -->
<section id="open-door" class="border-t border-b border-fyra-gray-800">
	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-fyra-gray-50">
				Want to get a feel first?
			</h2>
			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				Open doors is every Friday from 7 - 10pm CST, and it's free. Come see the space, meet
				people, and work on something. If you're on the fence about a membership, this is how you
				can figure it out.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
			<div class="bg-fyra-gray-900 px-8 py-8 md:col-span-2">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">
					Open Door
				</p>
				<p class="mt-2 text-5xl font-bold tracking-tight text-fyra-gray-50">Free</p>
				<p class="mt-1.5 text-sm text-fyra-gray-500">Every Friday · 7 - 10pm CST · Just drop by!</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Address</p>
				<p class="mt-2 text-sm font-semibold text-fyra-gray-50">5206 N Damen Ave</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Ravenswood, Chicago, IL 60625</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Transit</p>
				<p class="mt-2 text-sm font-semibold text-fyra-gray-50">~10 min from Brown Line</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Damen stop · Bus 50 on the corner</p>
			</div>
		</div>
	</div>
</section>

<!-- Membership -->
<section id="pricing" class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Membership.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			We need to cover operational costs, so we charge a small membership fee. It gets you front
			door pin and 24/7 access.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
		<div class="flex flex-col bg-fyra-gray-900 px-8 py-8 md:px-10">
			<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Day Pass</p>
			<p class="mt-2 text-5xl font-bold tracking-tight text-fyra-gray-50">
				$10<span class="text-xl font-medium text-fyra-gray-400">/day</span>
			</p>
			<p class="mt-1.5 text-sm text-fyra-gray-500">Drop in any time, there's no commitment.</p>
		</div>
		<div class="flex flex-col bg-fyra-gray-900 px-8 py-8 md:px-10">
			<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Monthly</p>
			<p class="mt-2 text-5xl font-bold tracking-tight text-fyra-gray-50">
				$30<span class="text-xl font-medium text-fyra-gray-400">/mo</span>
			</p>
			<p class="mt-1.5 text-sm text-fyra-gray-500">
				24/7 access, front door pin, and bring a guest.
			</p>
		</div>
	</div>

	<div class="border-t border-fyra-gray-800 px-6 py-5 md:px-10">
		<p class="text-sm text-fyra-gray-500">
			<span class="font-medium text-fyra-gray-300">Cost shouldn't stop you.</span>
			Please email
			<a href="mailto:contact@fyrastack.com" class="text-fyra-red-400 hover:text-fyra-red-300"
				>contact@fyrastack.com</a
			> and we'll work something out.
		</p>
	</div>
</section>

<!-- Conduct -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Rules.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">The short version? Be decent.</p>
	</div>
	<div class="divide-y divide-fyra-gray-800">
		{#each conduct as c (c.n)}
			<div class="flex items-start gap-6 px-6 py-5 md:px-10">
				<span
					class="shrink-0 pt-px text-[10px] font-medium tracking-widest text-fyra-gray-600 uppercase"
					>{c.n}</span
				>
				<div class="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
					<p class="text-sm font-semibold text-fyra-gray-100 sm:w-48 sm:shrink-0">{c.title}</p>
					<p class="text-sm leading-relaxed text-fyra-gray-400">{c.body}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Signup -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Sign up.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Tell us who you are and what you're after. We'll follow up with next steps.
		</p>
	</div>

	<div class="px-6 py-10 md:px-10">
		{#if form?.success}
			<p class="text-sm font-medium text-fyra-gray-50">
				Got it. We'll be in touch at the email you provided.
			</p>
		{:else}
			<form
				method="POST"
				action="?/signup"
				use:enhance
				class="grid grid-cols-1 gap-4 sm:grid-cols-2"
			>
				{#if form?.error}
					<p class="col-span-full text-sm text-fyra-red-400">{form.error}</p>
				{/if}

				<div class="flex flex-col gap-1.5">
					<label
						for="name"
						class="text-[11px] font-medium tracking-widest text-fyra-gray-500 uppercase">Name</label
					>
					<input
						id="name"
						name="name"
						type="text"
						required
						value={form?.name ?? ''}
						placeholder="Your name"
						class="rounded-xs border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2 text-sm text-fyra-gray-50 placeholder-fyra-gray-600 outline-none focus:border-fyra-gray-600 focus:ring-0"
					/>
				</div>

				<div class="flex flex-col gap-1.5">
					<label
						for="email"
						class="text-[11px] font-medium tracking-widest text-fyra-gray-500 uppercase"
						>Email</label
					>
					<input
						id="email"
						name="email"
						type="email"
						required
						value={form?.email ?? ''}
						placeholder="you@example.com"
						class="rounded-xs border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2 text-sm text-fyra-gray-50 placeholder-fyra-gray-600 outline-none focus:border-fyra-gray-600 focus:ring-0"
					/>
				</div>

				<div class="flex flex-col gap-1.5">
					<label
						for="membership"
						class="text-[11px] font-medium tracking-widest text-fyra-gray-500 uppercase"
						>Membership</label
					>
					<select
						id="membership"
						name="membership"
						class="rounded-xs border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2 text-sm text-fyra-gray-50 outline-none focus:border-fyra-gray-600 focus:ring-0"
					>
						<option value="">Not sure yet</option>
						<option value="Day Pass" selected={form?.membership === 'Day Pass'}
							>Day Pass · $10/day</option
						>
						<option value="Monthly" selected={form?.membership === 'Monthly'}
							>Monthly · $30/mo</option
						>
					</select>
				</div>

				<div class="flex flex-col gap-1.5 sm:col-span-2">
					<label
						for="note"
						class="text-[11px] font-medium tracking-widest text-fyra-gray-500 uppercase"
						>Note <span class="text-fyra-gray-600 normal-case">(optional)</span></label
					>
					<textarea
						id="note"
						name="note"
						rows="3"
						placeholder="Anything we should know about you or your projects."
						class="resize-none rounded-xs border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2 text-sm text-fyra-gray-50 placeholder-fyra-gray-600 outline-none focus:border-fyra-gray-600 focus:ring-0"
						>{form?.note ?? ''}</textarea
					>
				</div>

				<div class="sm:col-span-2">
					<button
						type="submit"
						class="rounded-xs bg-fyra-red-600 px-5 py-2 text-sm font-medium text-fyra-gray-50 transition-colors hover:bg-fyra-red-500"
					>
						Send inquiry
					</button>
				</div>
			</form>
		{/if}
	</div>
</section>

<!-- CTA -->
<section class="">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Interested?</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Email us or drop into the Discord. Someone will get back to you.
		</p>
	</div>
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2">
		<a
			href="mailto:hello@fyrastack.com?subject=Office"
			class="flex flex-col gap-0.5 bg-fyra-gray-900 px-6 py-6 transition-colors hover:bg-fyra-gray-800/60 md:px-10"
		>
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Email us</span>
			<span class="text-[12px] text-fyra-red-400">hello@fyrastack.com</span>
		</a>
		<a
			href="https://discord.gg/fyrastack"
			rel="external"
			class="flex flex-col gap-0.5 bg-fyra-gray-900 px-6 py-6 transition-colors hover:bg-fyra-gray-800/60 md:px-10"
		>
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Discord</span>
			<span class="text-[12px] text-fyra-gray-500">Drop in and say hi.</span>
		</a>
	</div>
</section>
