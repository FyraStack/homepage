<script lang="ts">
	import { fly } from 'svelte/transition';
	import { colocationPlans, type ColocationPlan } from '$lib/data/colocationPlans';
	import { reserve } from '$lib/remote/colocation-reserve.remote';
	import { page } from '$app/stores';

	const formId = $props.id();
	const signupForm = reserve.for(formId);

	let plan = $state('STACK-1U');
	let name = $state('');
	let email = $state('');

	let planDropdownOpen = $state(false);
	let planDropdownEl = $state<HTMLDivElement | null>(null);

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
			// Redirect to Autumn payment page
			window.location.href = result.paymentLink;
		}
	});

	const SHIPPING_ADDRESS = `Fyra Stack Limited
5206 N Damen Ave
Chicago, IL 60625`;

	const DOCS_LINK = '/docs/colocation';

	const inputClass =
		'w-full bg-fyra-gray-800 border border-fyra-gray-700 text-fyra-gray-100 placeholder:text-fyra-gray-600 text-sm px-3 py-2.5 focus:outline-none focus:border-fyra-gray-500 transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed';
	const labelClass = 'text-[11px] font-medium uppercase tracking-widest text-fyra-gray-400';
	const issueClass = 'text-xs text-fyra-red-400';
</script>

<svelte:window
	onclick={(e) => {
		if (planDropdownEl && !planDropdownEl.contains(e.target as Node)) planDropdownOpen = false;
	}}
	onkeydown={(e) => {
		if (e.key === 'Escape') planDropdownOpen = false;
	}}
/>

<section class="relative">
	<!-- Payment Complete Overlay (shown after returning from Autumn) -->
	{#if showSuccess}
		<div
			transition:fly={{ y: 16, duration: 200 }}
			class="absolute inset-0 z-10 border border-fyra-gray-700 bg-fyra-gray-900 px-6 py-8 md:px-10"
		>
			<div class="flex h-full flex-col justify-center">
				<div class="mb-6 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-fyra-red-500/20 text-fyra-red-400"
					>
						<svg class="h-5 w-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M13.5 4.5 6.5 11.5 3 8" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
					<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">
						Payment complete!
					</h2>
				</div>

				<div class="space-y-6">
					<div>
						<h3 class="text-sm font-medium text-fyra-gray-300">Shipping Address</h3>
						<p class="mt-2 whitespace-pre-wrap text-sm text-fyra-gray-400">{SHIPPING_ADDRESS}</p>
					</div>

					<div>
						<h3 class="text-sm font-medium text-fyra-gray-300">Documentation</h3>
						<p class="mt-2 text-sm text-fyra-gray-400">
							Review our colocation documentation for shipping guidelines, required paperwork, and
							what to expect when your server arrives.
						</p>
						<a
							href={DOCS_LINK}
							class="mt-3 inline-flex items-center gap-2 text-sm text-fyra-red-400 transition-colors hover:text-fyra-red-300"
						>
							View Colocation Docs
							<svg class="h-3.5 w-3.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M2 8 6 4M6 4 2 0M6 4h8" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Form -->
	<div>
		<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
			<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
				Get started with colocation.
			</h2>
			<p class="mt-2 text-sm text-fyra-gray-400">
				Select your plan, provide your details, and we'll get you set up.
			</p>
		</div>

		<div class="px-6 py-8 md:px-10">
			<form {...signupForm} class="flex flex-col gap-6">
				<input type="hidden" name="plan" value={plan} />

				<!-- Plan -->
				<div class="flex flex-col gap-2">
					<span class={labelClass}>Plan</span>
					<div class="relative" bind:this={planDropdownEl}>
						<button
							type="button"
							onclick={() => {
								planDropdownOpen = !planDropdownOpen;
							}}
							class="flex w-full items-center justify-between border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2.5 text-left text-sm text-fyra-gray-100 transition-colors duration-100 focus:border-fyra-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 {planDropdownOpen
								? 'border-fyra-gray-500'
								: ''}"
							aria-haspopup="listbox"
							aria-expanded={planDropdownOpen}
						>
							<span>
								{#each colocationPlans as p (p.name)}
									{#if p.name === plan}
										{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
									{/if}
								{/each}
							</span>
							<svg
								class="ml-2 h-3.5 w-3.5 shrink-0 text-fyra-gray-400 transition-transform duration-150 {planDropdownOpen
									? 'rotate-180'
									: ''}"
								viewBox="0 0 10 10"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M2 3.5 5 6.5 8 3.5" />
							</svg>
						</button>

						{#if planDropdownOpen}
							<ul
								role="listbox"
								class="absolute top-full right-0 left-0 z-20 mt-px max-h-64 overflow-y-auto border border-fyra-gray-700 bg-fyra-gray-800"
							>
								{#each colocationPlans as p (p.name)}
									<li role="option" aria-selected={plan === p.name}>
										<button
											type="button"
											onclick={() => {
												plan = p.name;
												planDropdownOpen = false;
											}}
											class="w-full px-3 py-2.5 text-left text-sm transition-colors duration-100 {plan ===
											p.name
												? 'bg-fyra-gray-700 text-fyra-gray-50'
												: 'text-fyra-gray-300 hover:bg-fyra-gray-700/60 hover:text-fyra-gray-100'}"
										>
											{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
					{#if signupForm.fields.plan.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.plan.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Name -->
				<div class="flex flex-col gap-2">
					<label for="name" class={labelClass}>
						Display Name<span class="tracking-normal text-fyra-red-500 normal-case">*</span>
					</label>
					<input
						id="name"
						name="name"
						type="text"
						bind:value={name}
						required
						placeholder="Reisen Inaba"
						class={inputClass}
					/>
					{#if signupForm.fields.name.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.name.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Email -->
				<div class="flex flex-col gap-2">
					<label for="email" class={labelClass}>
						Email Address<span class="tracking-normal text-fyra-red-500 normal-case">*</span>
					</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={email}
						required
						placeholder="reisen@kaguyas.pet"
						class={inputClass}
					/>
					{#if signupForm.fields.email.issues()?.[0]}
						<p class={issueClass}>{signupForm.fields.email.issues()?.[0]?.message}</p>
					{/if}
				</div>

				<!-- Submit -->
				<div>
					<button
						type="submit"
						disabled={submitting}
						class="w-fit border border-fyra-gray-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if submitting}
							Processing...
						{:else}
							Continue to Payment
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
