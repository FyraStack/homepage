<script lang="ts">
	import Content, { metadata } from '../../content/legal/terms-of-service.md';
	import LegalPage from '$lib/components/docs/legal-page.svelte';
</script>

<LegalPage content={Content} {metadata} />
