<script lang="ts">
  import LegalPage from "$lib/components/docs/legal-page.svelte";
  import Content, { metadata } from "../../content/legal/terms-of-service.md";
</script>

<LegalPage content={Content} {metadata} />
