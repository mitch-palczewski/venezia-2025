<script lang="ts">
	import PageHeader from '$lib/components/layouts/PageHeader.svelte';
	import { dev } from '$app/environment';

	let { data } = $props();
	const { screenshots } = $derived(data);
	function getOptimizedUrl(url: string, width = 640, quality = 75) {
		if (dev || !url) return '/media/Cover_v4.1.png';
		return `/_vercel/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
	}
</script>

{#snippet renderScreenshots()}
	{#if screenshots && screenshots.length > 0}
		<div class="grid grid-cols-2 w-full gap-3" style="content-visibility: auto; ">
			{#each screenshots as item (item.id)}
				<div class="mb-2 bg-dark-gray pt-1 px-3 pb-3">
					<p class=" flex w-full justify-end text-light-green">
						{new Date(item.created_at).toLocaleDateString('en-US', {
							month: 'numeric',
							day: 'numeric',
							year: 'numeric'
						})}
					</p>
					<img
						src={getOptimizedUrl(item.url, 1920, 100)}
						alt="ID: {item.id}, CREATED_AT: {item.created_at}"
						class="aspect-video w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-light-green italic">No screenshots in the pile yet...</p>
	{/if}
{/snippet}

<div class=" min-h-screen w-full bg-dark-green">
	<div class="sticky top-0 z-10 bg-dark-green px-2 pt-4 pb-2">
		<PageHeader isGallery={true} appendTitle={'Gallery'} />
	</div>
	<div class="gap-3 p-2 pt-3 ">
		{@render renderScreenshots()}
	</div>
</div>
