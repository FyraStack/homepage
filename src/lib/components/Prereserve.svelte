<script lang="ts">
	import { fly } from 'svelte/transition';
	import { colocationPlans } from '$lib/data/colocationPlans';
	import { vpsPlans } from '$lib/data/vpsPlans';
	import { prereserve } from '$lib/remote/prereserve.remote';
	import type { PrereserveResult } from '$lib/server/prereserve';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';

	let {
		selectedPlanName = 'STACK-XXS',
		serviceType = 'vps' as 'vps' | 'colocation'
	}: {
		selectedPlanName?: string;
		serviceType?: 'vps' | 'colocation';
	} = $props();

	const formId = $props.id();
	const reservationForm = prereserve.for(formId);

	let plan = $derived(selectedPlanName);
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let currentProvider = $state('');
	let useCase = $state('');

	let submitting = $derived(reservationForm.pending > 0);
	let submitted = $derived(reservationForm.result?.ok === true);

	let toast = $state<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | null = null;
	let lastHandledResult = $state<PrereserveResult | null>(null);

	$effect(() => {
		const result = reservationForm.result;

		if (!result || result === lastHandledResult) {
			return;
		}

		lastHandledResult = result;

		if (result.ok) {
			showToast(
				'success',
				"You're on the list.",
				`We got your reservation for ${result.plan} and will be in touch at ${result.email}.`
			);
		} else {
			showToast('error', 'Submission failed.', result.error);
		}
	});

	function showToast(type: 'success' | 'error', title: string, message: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toast = { type, title, message };
		toastTimer = setTimeout(() => {
			toast = null;
		}, 6000);
	}

	function dismissToast() {
		if (toastTimer) clearTimeout(toastTimer);
		toast = null;
	}

	const labelClass = 'text-[11px] font-medium uppercase tracking-widest text-muted-foreground';
	const issueClass = 'text-xs text-destructive';
</script>

<!-- Toast -->
{#if toast}
	<div
		transition:fly={{ y: 16, duration: 200 }}
		class="fixed right-6 bottom-6 z-50 flex w-80 items-start gap-3 border border-border bg-background px-4 py-4 shadow-xl"
	>
		{#if toast.type === 'success'}
			<svg
				class="mt-0.5 h-4 w-4 shrink-0 text-primary"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M13.5 4.5 6.5 11.5 3 8" />
			</svg>
		{:else}
			<svg
				class="mt-0.5 h-4 w-4 shrink-0 text-primary"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M8 3v5M8 11.5v.5" />
				<circle cx="8" cy="8" r="6.5" />
			</svg>
		{/if}
		<div class="min-w-0 flex-1">
			<p class="text-sm font-medium text-foreground">{toast.title}</p>
			<p class="mt-0.5 text-sm text-muted-foreground">{toast.message}</p>
		</div>
		<button
			type="button"
			onclick={dismissToast}
			class="shrink-0 text-muted-foreground/60 transition-colors duration-100 hover:text-muted-foreground/80"
			aria-label="Dismiss"
		>
			<svg
				class="h-3.5 w-3.5"
				viewBox="0 0 10 10"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				aria-hidden="true"
			>
				<path d="M2 2 8 8M8 2 2 8" />
			</svg>
		</button>
	</div>
{/if}

<section class="">
	<div>
		<!-- Form -->
		<div>
			<div class="border-b border-border px-6 py-8 md:px-10">
				<h2 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
					{serviceType === 'colocation' ? 'Sign up for colocation.' : 'Pre-reserve your VPS.'}
				</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					{serviceType === 'colocation'
						? "Contact us below and we'll reach out to help assist with getting your server racked today."
						: "We're in the early access phase, submit your info and we'll reach out when your plan is ready. Expected to launch by May 1st, 2026."}
				</p>
			</div>

			<div class="px-6 py-8 md:px-10">
				<form {...reservationForm} class="flex flex-col gap-6">
					<input type="hidden" name="plan" value={plan} />

					<!-- Plan -->
					<div class="flex flex-col gap-2">
						<span class={labelClass}>Plan</span>
						<Select.Root bind:value={plan} disabled={submitted}>
							<Select.Trigger class="w-full bg-muted text-foreground">
								{#if serviceType === 'colocation'}
									{#each colocationPlans as p (p.name)}
										{#if p.name === plan}
											{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
										{/if}
									{/each}
								{:else}
									{#each vpsPlans as p (p.name)}
										{#if p.name === plan}
											{p.name} — ${p.price}/mo · {p.cpu} vCPU · {p.ram}GB RAM · {p.storage}GB SAS3
											SSD
										{/if}
									{/each}
								{/if}
							</Select.Trigger>
							<Select.Content>
								{#if serviceType === 'colocation'}
									{#each colocationPlans as p (p.name)}
										<Select.Item value={p.name}>
											{p.name} — ${p.price}/mo · {p.units}U · {p.power}W · {p.bandwidth}
										</Select.Item>
									{/each}
								{:else}
									{#each vpsPlans as p (p.name)}
										<Select.Item value={p.name}>
											{p.name} — ${p.price}/mo · {p.cpu} vCPU · {p.ram}GB RAM · {p.storage}GB SAS3
											SSD
										</Select.Item>
									{/each}
								{/if}
							</Select.Content>
						</Select.Root>
						{#if reservationForm.fields.plan.issues()?.[0]}
							<p class={issueClass}>{reservationForm.fields.plan.issues()?.[0]?.message}</p>
						{/if}
					</div>

					<!-- Name + Email -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex flex-col gap-2">
							<Label for="name" class={labelClass}>
								Full Name<span class="tracking-normal text-primary normal-case">*</span>
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								bind:value={name}
								required
								disabled={submitted}
								placeholder="Reisen Inaba"
								class="bg-muted text-foreground placeholder:text-muted-foreground/60"
							/>
							{#if reservationForm.fields.name.issues()?.[0]}
								<p class={issueClass}>{reservationForm.fields.name.issues()?.[0]?.message}</p>
							{/if}
						</div>
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
								disabled={submitted}
								placeholder="reisen@kaguyas.pet"
								class="bg-muted text-foreground placeholder:text-muted-foreground/60"
							/>
							{#if reservationForm.fields.email.issues()?.[0]}
								<p class={issueClass}>{reservationForm.fields.email.issues()?.[0]?.message}</p>
							{/if}
						</div>
					</div>

					<!-- Company + Current Provider -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="flex flex-col gap-2">
							<Label for="company" class={labelClass}>Company</Label>
							<Input
								id="company"
								name="company"
								type="text"
								bind:value={company}
								disabled={submitted}
								placeholder="Gensokyo Inc."
								class="bg-muted text-foreground placeholder:text-muted-foreground/60"
							/>
						</div>
						<div class="flex flex-col gap-2">
							<Label for="provider" class={labelClass}
								>{serviceType === 'colocation'
									? 'Current Colo Provider'
									: 'Current Provider'}</Label
							>
							<Input
								id="provider"
								name="currentProvider"
								type="text"
								bind:value={currentProvider}
								disabled={submitted}
								placeholder={serviceType === 'colocation'
									? "Cirno's Perfect Colocation Inc."
									: 'Digital Ocean, Hetzner, OVH...'}
								class="bg-muted text-foreground placeholder:text-muted-foreground/60"
							/>
						</div>
					</div>

					<!-- Use Case -->
					<div class="flex flex-col gap-2">
						<Label for="usecase" class={labelClass}>Use Case</Label>
						<Textarea
							id="usecase"
							name="useCase"
							bind:value={useCase}
							rows="3"
							disabled={submitted}
							placeholder="Tell us what you'll be running…"
							class="resize-none bg-muted text-foreground placeholder:text-muted-foreground/60"
						/>
					</div>

					<!-- Submit -->
					<div>
						<Button
							type="submit"
							disabled={submitting || submitted}
							variant="outline"
							class="w-fit bg-muted text-foreground hover:border-primary"
						>
							{#if submitted}
								Reservation submitted
							{:else if submitting}
								Full sending it...
							{:else}
								Reserve Your Stack
							{/if}
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
