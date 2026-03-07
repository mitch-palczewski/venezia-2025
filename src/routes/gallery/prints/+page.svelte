<script lang="ts">
	import PageHeader from '$lib/components/general/PageHeader.svelte';

	const prints = [
		'/images/prints/1.jpg',
		'/images/prints/2.jpg',
		'/images/prints/3.jpg',
		'/images/prints/4.jpg',
		'/images/prints/5.jpg',
		'/images/prints/6.jpg',
		'/images/prints/7.jpg',
		'/images/prints/8.jpg',
		'/images/prints/9.jpg'
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
