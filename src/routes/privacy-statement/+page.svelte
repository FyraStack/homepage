<script lang="ts">
  import LegalPage from "#lib/components/docs/legal-page.svelte";
  import Content, { metadata } from "../../content/legal/privacy-statement.md";
</script>

<LegalPage content={Content} {metadata} />
