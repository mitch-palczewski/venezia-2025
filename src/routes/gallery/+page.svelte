<script lang="ts">
	let { data } = $props();
	const { screenshots } = $derived(data);
</script>

{#snippet renderScreenshots()}
	{#if screenshots && screenshots.length > 0}
		{#each screenshots as item (item.id)}
			<div class="mb-2 overflow-hidden bg-cyan-800 p-1">
				<p class=" text-white">
					{new Date(item.created_at).toLocaleDateString('en-US', {
						month: 'numeric',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
				<img
					src={item.url}
					alt={item.name}
					class="aspect-video w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{/each}
	{:else}
		<p class="text-stone-500 italic">No screenshots in the pile yet...</p>
	{/if}
{/snippet}

{#snippet header()}
	<div class="flex flex-row w-full">
		<h1 class="text-4xl font-extrabold">PILE-PILE-PILE Gallery</h1>
        <a href="/#" class=" items-center font-extrabold justify-end">Back</a>
	</div>
{/snippet}

<div class="p-6 w-full">
	{@render header()}
	<div class="grid grid-cols-2 gap-3 py-3">
		{@render renderScreenshots()}
	</div>
</div>
