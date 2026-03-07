<script lang="ts">
	import PageHeader from '$lib/components/general/PageHeader.svelte';

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

<div class="bg-dark-green p-6">
	<div class="pb-8">
		<PageHeader />
	</div>
	<div class="grid grid-cols-1 xl:grid-cols-2 px-auto">
		{#each prints as print}
			<div class="mx-auto h-screen w-full p-2">
				<img src={print} alt="Pile Print" class="h-[90vh] object-contain" />
			</div>
		{/each}
	</div>
</div>
