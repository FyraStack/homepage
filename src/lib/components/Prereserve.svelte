<script lang="ts">
	import { vpsPlans } from '$lib/components/VPSPlans.svelte';
	import { colocationPlans } from '$lib/data/colocationPlans';

	let {
		selectedPlanName = 'STACK-XXS',
		serviceType = 'vps' as 'vps' | 'colocation',
	}: {
		selectedPlanName?: string;
		serviceType?: 'vps' | 'colocation';
	} = $props();

	let plan = $state(selectedPlanName);
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let currentProvider = $state('');
	let useCase = $state('');

	let submitting = $state(false);
	let submitted = $state(false);
	let submitError = $state<string | null>(null);

	let planDropdownOpen = $state(false);
	let planDropdownEl = $state<HTMLDivElement | null>(null);

	$effect(() => {
		plan = selectedPlanName;
	});

	async function handleSubmit() {
		submitting = true;
		submitError = null;

		try {
			const res = await fetch('/api/prereserve', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plan, name, email, company, currentProvider, useCase }),
			});

			if (res.ok) {
				submitted = true;
			} else {
				const data = await res.json().catch(() => ({}));
				submitError = data.error ?? 'Something went wrong. Please try again.';
			}
		} catch {
			submitError = 'Network error. Please try again.';
		} finally {
			submitting = false;
		}
	}

	const inputClass = "w-full bg-fyra-gray-800 border border-fyra-gray-700 text-fyra-gray-100 placeholder:text-fyra-gray-600 text-sm px-3 py-2.5 focus:outline-none focus:border-fyra-gray-500 transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed";
	const labelClass = "text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500";
</script>

<svelte:window
	onclick={(e) => { if (planDropdownEl && !planDropdownEl.contains(e.target as Node)) planDropdownOpen = false; }}
	onkeydown={(e) => { if (e.key === 'Escape') planDropdownOpen = false; }}
/>

<div class="">
	<div class="grid grid-cols-1 divide-t divide-fyra-gray-800 lg:grid-cols-7 lg:divide-x lg:divide-y-0">

		<!-- Left: header + form -->
		<div class="col-span-1 lg:col-span-5">
			<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
				<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
					{serviceType === 'colocation' ? 'Pre-reserve your colocation.' : 'Pre-reserve your VPS.'}
				</h2>
				<p class="mt-2 text-sm text-fyra-gray-400">We're in early access, submit your info and we'll reach out when your plan is ready.</p>
			</div>

			<div class="px-6 py-8 md:px-10">

				{#if submitted}
					<div class="mb-6 flex items-start gap-3 border border-fyra-gray-700 bg-fyra-gray-800 px-4 py-4">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-fyra-red-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M13.5 4.5 6.5 11.5 3 8" />
						</svg>
						<div>
							<p class="text-sm font-medium text-fyra-gray-50">You're on the list.</p>
							<p class="mt-0.5 text-sm text-fyra-gray-400">We got your reservation for <span class="text-fyra-gray-100">{plan}</span> and will be in touch at <span class="text-fyra-gray-100">{email}</span>.</p>
						</div>
					</div>
				{/if}

				<div class="flex flex-col gap-6">

					<!-- Plan -->
					<div class="flex flex-col gap-2">
						<span class={labelClass}>Plan</span>
						<div class="relative" bind:this={planDropdownEl}>
							<button
								type="button"
								onclick={() => { if (!submitted) planDropdownOpen = !planDropdownOpen; }}
								disabled={submitted}
								class="flex w-full items-center justify-between border border-fyra-gray-700 bg-fyra-gray-800 px-3 py-2.5 text-left text-sm text-fyra-gray-100 transition-colors duration-100 focus:outline-none focus:border-fyra-gray-500 disabled:cursor-not-allowed disabled:opacity-40 {planDropdownOpen ? 'border-fyra-gray-500' : ''}"
								aria-haspopup="listbox"
								aria-expanded={planDropdownOpen}
							>
								<span>
									{#if serviceType === 'colocation'}
										{#each colocationPlans as p}
											{#if p.name === plan}
												{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
											{/if}
										{/each}
									{:else}
										{#each vpsPlans as p}
											{#if p.name === plan}
												{p.name} — ${p.price}/mo · {p.cpu} vCPU · {p.ram}GB RAM · {p.storage}GB NVMe
											{/if}
										{/each}
									{/if}
								</span>
								<svg
									class="ml-2 h-3.5 w-3.5 shrink-0 text-fyra-gray-500 transition-transform duration-150 {planDropdownOpen ? 'rotate-180' : ''}"
									viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
								>
									<path d="M2 3.5 5 6.5 8 3.5" />
								</svg>
							</button>

							{#if planDropdownOpen}
								<ul
									role="listbox"
									class="absolute left-0 right-0 top-full z-20 mt-px max-h-64 overflow-y-auto border border-fyra-gray-700 bg-fyra-gray-800"
								>
									{#if serviceType === 'colocation'}
										{#each colocationPlans as p}
											<li role="option" aria-selected={plan === p.name}>
												<button
													type="button"
													onclick={() => { plan = p.name; planDropdownOpen = false; }}
													class="w-full px-3 py-2.5 text-left text-sm transition-colors duration-100 {plan === p.name ? 'bg-fyra-gray-700 text-fyra-gray-50' : 'text-fyra-gray-300 hover:bg-fyra-gray-700/60 hover:text-fyra-gray-100'}"
												>
													{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
												</button>
											</li>
										{/each}
									{:else}
										{#each vpsPlans as p}
											<li role="option" aria-selected={plan === p.name}>
												<button
													type="button"
													onclick={() => { plan = p.name; planDropdownOpen = false; }}
													class="w-full px-3 py-2.5 text-left text-sm transition-colors duration-100 {plan === p.name ? 'bg-fyra-gray-700 text-fyra-gray-50' : 'text-fyra-gray-300 hover:bg-fyra-gray-700/60 hover:text-fyra-gray-100'}"
												>
													{p.name} — ${p.price}/mo · {p.cpu} vCPU · {p.ram}GB RAM · {p.storage}GB NVMe
												</button>
											</li>
										{/each}
									{/if}
								</ul>
							{/if}
						</div>
					</div>

					<!-- Name + Email -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex flex-col gap-2">
							<label for="name" class={labelClass}>
								Full Name<span class="normal-case tracking-normal text-fyra-red-500">*</span>
							</label>
							<input id="name" type="text" bind:value={name} required disabled={submitted} placeholder="Reisen Inaba" class={inputClass} />
						</div>
						<div class="flex flex-col gap-2">
							<label for="email" class={labelClass}>
								Email Address<span class="normal-case tracking-normal text-fyra-red-500">*</span>
							</label>
							<input id="email" type="email" bind:value={email} required disabled={submitted} placeholder="reisen@kaguyas.pet" class={inputClass} />
						</div>
					</div>

					<!-- Company + Current Provider -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex flex-col gap-2">
							<label for="company" class={labelClass}>Company</label>
							<input id="company" type="text" bind:value={company} disabled={submitted} placeholder="Gensokyo Inc." class={inputClass} />
						</div>
						<div class="flex flex-col gap-2">
							<label for="provider" class={labelClass}>{serviceType === 'colocation' ? 'Current Colo Provider' : 'Current Provider'}</label>
							<input id="provider" type="text" bind:value={currentProvider} disabled={submitted} placeholder="DigitalOcean, Hetzner, OVH..." class={inputClass} />
						</div>
					</div>

					<!-- Use Case -->
					<div class="flex flex-col gap-2">
						<label for="usecase" class={labelClass}>Use Case</label>
						<textarea id="usecase" bind:value={useCase} rows="3" disabled={submitted} placeholder="Tell us what you'll be running…" class="{inputClass} resize-none"></textarea>
					</div>

					<!-- Submit -->
					<div class="flex flex-col gap-3">
						{#if submitError}
							<p class="text-sm text-fyra-red-500">{submitError}</p>
						{/if}
						<button
							type="button"
							onclick={handleSubmit}
							disabled={submitting || submitted}
							class="w-fit border border-fyra-gray-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if submitted}
								Reservation submitted
							{:else if submitting}
								Full sending it...
							{:else}
								Reserve Your Stack
							{/if}
						</button>
					</div>

				</div>
			</div>
		</div>

		<!-- Right: decorative panel (desktop only) -->
		<div class="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center col-span-1 lg:col-span-2 ">
			<img
				src="/stack-pattern.svg"
				alt=""
				class="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
				aria-hidden="true"
			/>

		</div>

	</div>
</div>
