<script lang="ts">
	import PageHeader from "$lib/components/general/PageHeader.svelte";

	let { data } = $props();
	const { screenshots } = $derived(data);
</script>

{#snippet renderScreenshots()}
	{#if screenshots && screenshots.length > 0}
		{#each screenshots as item (item.id)}
			<div class="mb-2 bg-dark-gray p-1">
				<p class=" text-light-green w-full flex justify-end">
					{new Date(item.created_at).toLocaleDateString('en-US', {
						month: 'numeric',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
				<img
					src={item.url}
					alt="ID: {item.id}, CREATED_AT: {item.created_at}" 
					class="aspect-video w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{/each}
	{:else}
		<p class="text-light-green italic">No screenshots in the pile yet...</p>
	{/if}
{/snippet}

<div class=" w-full bg-dark-green min-h-screen">
    <div class="sticky pt-4 px-2 pb-2 top-0 z-10 bg-dark-green">
        <PageHeader isGallery={true} appendTitle={"Gallery"}/>
    </div>
    <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        {@render renderScreenshots()}
    </div>
</div>