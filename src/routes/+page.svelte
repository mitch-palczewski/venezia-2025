<script lang="ts">
	import PageHeader from '$lib/components/general/PageHeader.svelte';

	let { data } = $props();
	const { screenshots } = $derived(data);

	const formatDate = (isoString: string | number | Date) => {
		const date = new Date(isoString);
		const m = date.getMonth() + 1;
		const d = date.getDate();
		const y = date.getFullYear().toString().slice(-2); // Get last 2 digits

		return `${m}/${d}/${y}`;
	};
</script>

{#snippet enterPilePilePile()}
	<a
		href="/3d/pile"
		aria-label="City Pile"
		class="group relative flex sm:h-full w-full overflow-hidden bg-dark-gray pb-10 pl-20 h-[80vh]"
	>
		<img
			src="/media/Cover_v4.1.png"
			alt="PilePilePile Preview"
			class="h-full w-full sm:border-b-8 sm:border-l-20 sm:border-light-yellow object-cover"
		/>
		<div class="absolute inset-0 flex flex-col items-center justify-center p-6">
			<p
				class="w-full bg-teal p-1 text-center text-3xl sm:text-6xl font-extrabold text-white group-hover:invert"
			>
				Enter Pile-3D
			</p>
			<p class="bg-teal text-center text-sm font-extrabold text-white group-hover:invert">
				Shared public space in a web-based 3D environment which needs your participation. Move,
				rotate, and scale objects to build community architecture in a persistent sandbox.
			</p>
		</div>
	</a>
{/snippet}

{#snippet pile2DLink(linkHref: string, text: string, imageSrc: string)}
	<a
		href={linkHref}
		aria-label="City Pile"
		target="_blank"
		class="group relative flex max-h-[20vh] w-full"
	>
		<img src={imageSrc} alt="Pilemaker Preview" class="w-full object-cover" />
		<div class="absolute inset-0 flex items-center justify-center">
			<p class="bg-cyan-800 text-4xl font-extrabold text-white group-hover:invert">{text}</p>
		</div>
	</a>
{/snippet}

{#snippet sideBar()}
	<div class="flex h-full w-full flex-col gap-3 bg-dark-gray p-3">
		<div class="p-3 bg-teal">
			{@render pile2DLink('/gallery/prints', 'Pile Prints', '/images/prints/1.jpg')}
			{@render pile2DLink(
				'https://audehelene.itch.io/city-pile',
				'City Pilemaker',
				'/media/city-pile_sc.png'
			)}
			{@render pile2DLink(
				'https://audehelene.itch.io/pilemaker',
				'Pilemaker (Original)',
				'/media/pilemaker_sc.png'
			)}
		</div>
	</div>
{/snippet}

{#snippet pileScreenshotGallery()}
	<div class="flex h-full flex-col overflow-hidden">
		<div class="min-h-0 flex-1">
			{@render renderScreenshots()}
		</div>
		<div
			class=" mt-1 mr-2 px-1 text-xl font-extrabold text-light-green hover:bg-light-green hover:text-dark-gray"
		>
			<a href="/gallery" class=" flex w-full flex-col tracking-tight">
				<h1 class="text-xl">Pile-3D Gallery</h1>
				<p class="text-sm">User captured screenshots.</p>
			</a>
		</div>
	</div>
{/snippet}

{#snippet renderScreenshots()}
	{#if screenshots && screenshots.length > 0}
		<div class="h-full overflow-y-auto pr-2">
			{#each screenshots.slice(1, 11) as item (item.id)}
				<div class="relative mb-6 overflow-visible text-light-green">
					<img
						src={item.url}
						alt={item.name}
						class="aspect-video w-full bg-teal object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-stone-500 italic">No screenshots in the pile yet...</p>
	{/if}
{/snippet}

<div class="relative bg-dark-green p-6 pb-8 sm:h-screen xl:overflow-hidden">
	<div class="pointer-events-none absolute inset-0 ml-5 grid grid-cols-1 gap-0 p-3 sm:grid-cols-6">
		<div class=" ml-8  border-r-8 border-light-yellow bg-dark-gray "></div>
		<div class=" sm:col-span-5">
			<div class="grid sm:h-80 grid-cols-5">
				<div class="sm:col-span-3"></div>
				<div class="sm:col-span-2"></div>
			</div>
			<div class="mb-2 ml-12 h-full bg-dark-gray"></div>
		</div>
	</div>

	<div class="relative z-10 flex h-full flex-col">
		<PageHeader isHome={true} />

		<div class="grid min-h-0 w-full grid-cols-1 gap-0 pt-3 xl:grid-cols-6">
			<div class="hidden min-h-0 pt-4 xl:block">{@render pileScreenshotGallery()}</div>
			<div class="min-h-0 xl:col-span-3">{@render enterPilePilePile()}</div>
			<div class="min-h-0 pt-12 pl-8 xl:col-span-2">{@render sideBar()}</div>
		</div>
	</div>
</div>
