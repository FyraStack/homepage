<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { colocationTiers } from "$lib/components/landing/plans";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    type ContactStatus,
    contactLimits,
    submitContactMessage,
  } from "$lib/contact";

  let {
    open = $bindable(false),
    onOpenChange,
  }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = $props();

  const spaceOptions = [
    ...colocationTiers.map(
      (tier) => `${tier.units}U · ${tier.watts}W · $${tier.price}/mo`
    ),
    "More than 6U",
    "Not sure yet",
  ];

  const emptyInquiry = {
    email: "",
    hardware: "",
    name: "",
    notes: "",
    space: spaceOptions[1],
  };

  let inquiry = $state({ ...emptyInquiry });
  let inquiryStatus = $state<ContactStatus>({ kind: "idle" });

  function toInquiryMessage() {
    return [
      `Rack space: ${inquiry.space}`,
      "",
      "Hardware:",
      inquiry.hardware.trim(),
      ...(inquiry.notes.trim() ? ["", "Notes:", inquiry.notes.trim()] : []),
    ].join("\n");
  }

  async function sendInquiry(event: SubmitEvent) {
    event.preventDefault();
    const body = new FormData();
    body.set("name", inquiry.name);
    body.set("email", inquiry.email);
    body.set("topic", "Colocation");
    body.set("message", toInquiryMessage());

    inquiryStatus = { kind: "sending" };
    inquiryStatus = await submitContactMessage(body);
    if (inquiryStatus.kind === "sent") {
      inquiry = { ...emptyInquiry };
    }
  }
</script>

<Dialog.Root {onOpenChange} bind:open>
  <Dialog.Content
    class="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto rounded-none bg-background p-6 sm:max-w-xl"
  >
    <Dialog.Header class="gap-2 pr-6">
      <Dialog.Title class="text-xl font-semibold tracking-[-0.02em]">
        Have hardware ready to rack?
      </Dialog.Title>
      <Dialog.Description
        class="text-sm/[22px] text-pretty text-muted-foreground"
      >
        Tell us what you're racking and how much power it needs, and we'll reply
        by email.
      </Dialog.Description>
    </Dialog.Header>

    <form class="grid gap-5 sm:grid-cols-2" onsubmit={sendInquiry}>
      <div class="flex flex-col gap-2">
        <Label for="inquiry-name">Name</Label>
        <Input
          autocomplete="name"
          class="h-9 rounded-none"
          id="inquiry-name"
          maxlength={contactLimits.name}
          name="name"
          required
          bind:value={inquiry.name}
        />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="inquiry-email">Email</Label>
        <Input
          autocomplete="email"
          class="h-9 rounded-none"
          id="inquiry-email"
          maxlength={contactLimits.email}
          name="email"
          required
          type="email"
          bind:value={inquiry.email}
        />
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-space">Rack space</Label>
        <Select.Root name="space" type="single" bind:value={inquiry.space}>
          <Select.Trigger class="h-9 w-full rounded-none" id="inquiry-space">
            {inquiry.space}
          </Select.Trigger>
          <Select.Content class="rounded-none">
            {#each spaceOptions as option (option)}
              <Select.Item class="rounded-none" label={option} value={option} />
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-hardware">Hardware</Label>
        <Textarea
          class="rounded-none"
          id="inquiry-hardware"
          name="hardware"
          placeholder="Model, size, and expected power draw"
          required
          rows={3}
          bind:value={inquiry.hardware}
        />
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-notes">
          Anything else
          <span class="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          class="rounded-none"
          id="inquiry-notes"
          name="notes"
          placeholder="Network needs, timeline, questions"
          rows={2}
          bind:value={inquiry.notes}
        />
      </div>
      <div class="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          class="h-auto gap-2 py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
          disabled={inquiryStatus.kind === "sending"}
          size="lg"
          type="submit"
          variant="accent"
        >
          {inquiryStatus.kind === "sending" ? "Sending…" : "Send inquiry"}
          <ArrowRight data-icon="inline-end" />
        </Button>
        <p aria-live="polite" class="text-sm text-pretty" role="status">
          {#if inquiryStatus.kind === "sent"}
            <span class="text-muted-foreground"
              >Thanks, we got it. We'll reply to the email you gave us.</span
            >
          {:else if inquiryStatus.kind === "failed"}
            <span class="text-destructive">{inquiryStatus.message}</span>
          {/if}
        </p>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
