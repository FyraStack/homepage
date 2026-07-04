<script lang="ts">
	import { page } from '$app/stores';

	type Props = {
		title: string;
		description: string;
	};

	const { title, description }: Props = $props();

	const isDocsIndex = $derived($page.url.pathname === '/docs');
	const pageTitle = $derived(isDocsIndex ? `${title} | Fyra Stack` : `${title} | Fyra Stack Docs`);
	const canonicalUrl = $derived(`https://fyrastack.com${$page.url.pathname}`);
	const ogType = $derived(isDocsIndex ? 'website' : 'article');
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonicalUrl} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>
