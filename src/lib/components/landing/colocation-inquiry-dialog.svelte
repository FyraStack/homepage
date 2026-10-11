<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { colocationInquiryUrl } from "$lib/components/landing/colocation";
  import { colocationTiers } from "$lib/components/landing/plans";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

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

  let inquiry = $state({
    email: "",
    hardware: "",
    name: "",
    notes: "",
    space: spaceOptions[1],
  });

  function sendInquiry(event: SubmitEvent) {
    event.preventDefault();
    const subject = `Colocation inquiry from ${inquiry.name.trim()}`;
    const body = [
      `Name: ${inquiry.name.trim()}`,
      `Email: ${inquiry.email.trim()}`,
      `Rack space: ${inquiry.space}`,
      "",
      "Hardware:",
      inquiry.hardware.trim(),
      ...(inquiry.notes.trim() ? ["", "Notes:", inquiry.notes.trim()] : []),
    ].join("\n");
    window.location.href = `mailto:support@fyrastack.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
        Tell us what you're racking and how much power it needs. Sending opens
        an email to
        <a
          class="text-foreground underline underline-offset-2"
          href="mailto:support@fyrastack.com"
          >support@fyrastack.com</a
        >
        with your details filled in.
      </Dialog.Description>
    </Dialog.Header>

    <form
      action={colocationInquiryUrl}
      class="grid gap-5 sm:grid-cols-2"
      enctype="text/plain"
      method="post"
      onsubmit={sendInquiry}
    >
      <div class="flex flex-col gap-2">
        <Label for="inquiry-name">Name</Label>
        <Input
          autocomplete="name"
          class="h-9 rounded-none"
          id="inquiry-name"
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
          name="email"
          required
          type="email"
          bind:value={inquiry.email}
        />
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-space">Rack space</Label>
        <select
          class="h-9 w-full border border-input bg-input/30 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          id="inquiry-space"
          name="space"
          bind:value={inquiry.space}
        >
          {#each spaceOptions as option (option)}
            <option value={option}>{option}</option>
          {/each}
        </select>
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
      <Button
        class="h-auto gap-2 justify-self-start py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
        size="lg"
        type="submit"
        variant="accent"
      >
        Send inquiry <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
