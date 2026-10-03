<script lang="ts">
	import Content, { metadata } from '../../content/legal/privacy-statement.md';
	import LegalPage from '$lib/components/docs/legal-page.svelte';
</script>

<LegalPage content={Content} {metadata} />
