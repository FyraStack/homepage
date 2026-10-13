<script lang="ts">
  import type { Snippet } from "svelte";
  import { Button } from "#lib/components/ui/button/index.js";
  import { Input as TextInput } from "#lib/components/ui/input/index.js";
  import { Label } from "#lib/components/ui/label/index.js";
  import { contactLimits } from "#lib/contact.js";
  import type {
    sendColocationInquiry,
    sendContactMessage,
  } from "#lib/contact.remote.js";
  import { cn } from "#lib/utils.js";
  import ArrowRight from "~icons/nucleo/arrow-right";

  let {
    form,
    idPrefix,
    submitLabel,
    class: className,
    onSent,
    children,
    actions,
  }: {
    form: typeof sendContactMessage | typeof sendColocationInquiry;
    idPrefix: string;
    submitLabel: string;
    class?: string;
    onSent?: () => void;
    children: Snippet;
    actions?: Snippet;
  } = $props();

  let sent = $state(false);
  let unreachable = $state(false);

  const failure = $derived(
    unreachable
      ? "We couldn't reach the server. Check your connection and try again."
      : form.fields.allIssues()?.[0]?.message
  );
</script>

<form
  class={cn("grid gap-5 sm:grid-cols-2", className)}
  {...form.enhance(async ({ element, submit }) => {
    sent = false;
    unreachable = false;
    try {
      sent = await submit();
    } catch {
      unreachable = true;
      return;
    }
    if (sent) {
      element.reset();
      onSent?.();
    }
  })}
>
  <div class="flex flex-col gap-2">
    <Label for="{idPrefix}-name">Name</Label>
    <TextInput
      autocomplete="name"
      class="h-9"
      id="{idPrefix}-name"
      maxlength={contactLimits.name}
      required
      {...form.fields.name.as("text")}
    />
  </div>
  <div class="flex flex-col gap-2">
    <Label for="{idPrefix}-email">Email</Label>
    <TextInput
      autocomplete="email"
      class="h-9"
      id="{idPrefix}-email"
      maxlength={contactLimits.email}
      required
      {...form.fields.email.as("email")}
    />
  </div>
  {@render children()}
  <div aria-hidden="true" class="hidden">
    <Label for="{idPrefix}-website">Leave this empty</Label>
    <TextInput
      autocomplete="off"
      id="{idPrefix}-website"
      tabindex={-1}
      {...form.fields.company_website.as("text")}
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
      disabled={form.pending > 0}
      size="lg"
      type="submit"
      variant="accent"
    >
      {form.pending > 0 ? "Sending…" : submitLabel}
      <ArrowRight data-icon="inline-end" />
    </Button>
    {@render actions?.()}
    <p aria-live="polite" class="text-sm text-pretty" role="status">
      {#if sent}
        <span class="text-muted-foreground"
          >Thanks, we got it. We'll reply to the email you gave us.</span
        >
      {:else if failure}
        <span class="text-destructive">{failure}</span>
      {/if}
    </p>
  </div>
</form>
