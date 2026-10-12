<script lang="ts" module>
  import { resolve } from "$app/paths";
  import { socialLinks } from "$lib/site";
  import TextLink from "./text-link.svelte";

  export { openNote };
</script>

{#snippet openNote()}
  Our <TextLink href={socialLinks.github}>code</TextLink>,
  <TextLink href={socialLinks.discord}>community</TextLink>, and
  <TextLink href={resolve("/about")}>team</TextLink>
  are open
{/snippet}
