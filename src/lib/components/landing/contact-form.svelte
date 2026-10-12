<script lang="ts">
  import type { Snippet } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    type ContactStatus,
    contactHoneypotField,
    contactLimits,
    submitContactMessage,
  } from "$lib/contact";
  import { cn } from "$lib/utils";
  import ArrowRight from "~icons/nucleo/arrow-right";

  let {
    idPrefix,
    submitLabel,
    class: className,
    prepare,
    onSent,
    children,
    actions,
  }: {
    idPrefix: string;
    submitLabel: string;
    class?: string;
    prepare?: (body: FormData) => void;
    onSent?: () => void;
    children: Snippet;
    actions?: Snippet;
  } = $props();

  let status = $state<ContactStatus>({ kind: "idle" });

  async function send(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const body = new FormData(form);
    prepare?.(body);
    status = { kind: "sending" };
    status = await submitContactMessage(body);
    if (status.kind === "sent") {
      form.reset();
      onSent?.();
    }
  }
</script>

<form class={cn("grid gap-5 sm:grid-cols-2", className)} onsubmit={send}>
  <div class="flex flex-col gap-2">
    <Label for="{idPrefix}-name">Name</Label>
    <Input
      autocomplete="name"
      class="h-9"
      id="{idPrefix}-name"
      maxlength={contactLimits.name}
      name="name"
      required
    />
  </div>
  <div class="flex flex-col gap-2">
    <Label for="{idPrefix}-email">Email</Label>
    <Input
      autocomplete="email"
      class="h-9"
      id="{idPrefix}-email"
      maxlength={contactLimits.email}
      name="email"
      required
      type="email"
    />
  </div>
  {@render children()}
  <div aria-hidden="true" class="hidden">
    <Label for="{idPrefix}-website">Leave this empty</Label>
    <Input
      autocomplete="off"
      id="{idPrefix}-website"
      name={contactHoneypotField}
      tabindex={-1}
    />
  </div>
  <div
    class={cn(
      "flex flex-wrap items-center sm:col-span-2",
      actions ? "gap-x-2 gap-y-4" : "gap-4"
    )}
  >
    <Button
      class="h-auto gap-2 py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
      disabled={status.kind === "sending"}
      size="lg"
      type="submit"
      variant="accent"
    >
      {status.kind === "sending" ? "Sending…" : submitLabel}
      <ArrowRight data-icon="inline-end" />
    </Button>
    {@render actions?.()}
    <p aria-live="polite" class="text-sm text-pretty" role="status">
      {#if status.kind === "sent"}
        <span class="text-muted-foreground"
          >Thanks, we got it. We'll reply to the email you gave us.</span
        >
      {:else if status.kind === "failed"}
        <span class="text-destructive">{status.message}</span>
      {/if}
    </p>
  </div>
</form>
