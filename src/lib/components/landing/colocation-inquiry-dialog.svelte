<script lang="ts">
  import { resolve } from "$app/paths";
  import ContactForm from "$lib/components/landing/contact-form.svelte";
  import { colocationTiers } from "$lib/components/landing/plans";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import { Textarea } from "$lib/components/ui/textarea";
  import { contactLimits } from "$lib/contact";
  import ArrowUpRight from "~icons/nucleo/arrow-up-right";

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
  const [, defaultSpace] = spaceOptions;
  const textFieldLimit = Math.floor((contactLimits.message - 200) / 2);

  let space = $state(defaultSpace);

  function toInquiryBody(body: FormData) {
    const field = (name: string) => String(body.get(name) ?? "").trim();
    const notes = field("notes");
    body.set("topic", "Colocation");
    body.set(
      "message",
      [
        `Rack space: ${field("space")}`,
        "",
        "Hardware:",
        field("hardware"),
        ...(notes ? ["", "Notes:", notes] : []),
      ].join("\n")
    );
  }
</script>

<Dialog.Root {onOpenChange} bind:open>
  <Dialog.Content
    class="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto bg-background p-6 sm:max-w-xl"
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

    <ContactForm
      idPrefix="inquiry"
      onSent={() => {
        space = defaultSpace;
      }}
      prepare={toInquiryBody}
      submitLabel="Send inquiry"
    >
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-space">Rack space</Label>
        <Select.Root name="space" type="single" bind:value={space}>
          <Select.Trigger class="h-9 w-full" id="inquiry-space">
            {space}
          </Select.Trigger>
          <Select.Content class="">
            {#each spaceOptions as option (option)}
              <Select.Item class="" label={option} value={option} />
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-hardware">Hardware</Label>
        <Textarea
          class=""
          id="inquiry-hardware"
          maxlength={textFieldLimit}
          name="hardware"
          placeholder="Model, size, and expected power draw"
          required
          rows={3}
        />
      </div>
      <div class="flex flex-col gap-2 sm:col-span-2">
        <Label for="inquiry-notes">
          Anything else
          <span class="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          class=""
          id="inquiry-notes"
          maxlength={textFieldLimit}
          name="notes"
          placeholder="Network needs, timeline, questions"
          rows={2}
        />
      </div>
      {#snippet actions()}
        <Button
          class="h-auto gap-2 py-2.5 pl-4 text-muted-foreground has-data-[icon=inline-end]:pr-3"
          href={resolve("/docs/[section]", { section: "colocation" })}
          rel="noopener"
          size="lg"
          target="_blank"
          variant="ghost"
        >
          Colocation docs
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      {/snippet}
    </ContactForm>
  </Dialog.Content>
</Dialog.Root>
