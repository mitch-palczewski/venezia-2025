<script lang="ts">
	import PageHeader from '$lib/components/layouts/PageHeader.svelte';

	const prints = [
		'/images/prints/1_LOD2.avif',
		'/images/prints/2_LOD2.avif',
		'/images/prints/3_LOD2.avif',
		'/images/prints/4_LOD2.avif',
		'/images/prints/5_LOD2.avif',
		'/images/prints/6_LOD2.avif',
		'/images/prints/7_LOD2.avif',
		'/images/prints/8_LOD2.avif',
		'/images/prints/9_LOD2.avif'
	];
</script>

<div class=" min-h-screen w-full bg-dark-green">
	<div class="sticky top-0 z-10 bg-dark-green px-2 pt-4 pb-2">
		<PageHeader  appendTitle={'Prints'} />
	</div>
	<div class="grid grid-cols-1 gap-3 p-2 md:grid-cols-2">
		{#each prints as print}
			<div class="mx-auto h-screen  p-2">
				<img src={print} alt="Pile Print" class="h-[80vh] object-contain" />
			</div>
		{/each}
	</div>
</div>
