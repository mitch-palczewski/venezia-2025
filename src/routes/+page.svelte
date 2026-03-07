<script lang="ts">
	import PageHeader from '$lib/components/general/PageHeader.svelte';

	let { data } = $props();
	const { screenshots } = $derived(data);

	const formatDate = (isoString: string | number | Date) => {
		const date = new Date(isoString);
		const m = date.getMonth() + 1;
		const d = date.getDate();
		const y = date.getFullYear().toString().slice(-2);

		return `${m}/${d}/${y}`;
	};
</script>

{#snippet enterPilePilePile()}
	{@const optimizedUrl = `/_vercel/image?url=${encodeURIComponent(screenshots![0].url)}&w=1080&q=75`}
	<a
		href="/3d/pile"
		aria-label="Enter 3D Pile"
		class="group relative flex h-100 max-h-200 min-h-[82vh] w-full overflow-hidden bg-dark-gray pb-10 pl-20 sm:h-full"
	>
		<img
			src={optimizedUrl}
			alt="Most recent user captured screenshot"
			class="h-full w-full object-cover sm:border-b-8 sm:border-l-20 sm:border-light-yellow"
		/>
		<div class="absolute inset-0 flex flex-col md:flex-row">
			<img class="md:pt-[50%]" src="/gifs/Misc_05_preview2.gif" alt="Fire Pot Rotating" />

			<img src="/gifs/Ibix_01_preview2.gif" alt="Ibix Rotating" />
		</div>
		<div class="absolute inset-0 flex flex-col items-center justify-center p-6">
			<div
				class="mr-25 border-r-2 border-b-2 border-teal bg-teal group-hover:border-dark-gray group-hover:bg-light-yellow md:mr-50"
			>
				<p
					class="w-full p-1 text-center text-3xl font-extrabold text-white group-hover:invert sm:text-6xl"
				>
					Enter Pile-3D
				</p>
				<p class="  text-sm font-extrabold text-white group-hover:invert">
					Shared public space in a web-based 3D environment which needs your participation. Move,
					rotate, and scale objects to build community architecture in a persistent sandbox.
				</p>
			</div>
		</div>
	</a>
{/snippet}

{#snippet pile2DLink(linkHref: string, text: string, imageSrc: string)}
	<a
		href={linkHref}
		aria-label="City Pile"
		target="_blank"
		class="group relative flex min-h-0 w-full flex-1"
	>
		<img src={imageSrc} alt={text} class="h-full w-full object-cover" />
		<div class="absolute inset-0 flex items-center justify-center">
			<p class="bg-cyan-800 text-4xl font-extrabold text-white group-hover:invert">{text}</p>
		</div>
	</a>
{/snippet}

{#snippet sideBar()}
	<div class="relative flex h-full min-h-0 w-full flex-1 flex-col gap-3 bg-dark-gray p-3">
		<div class="flex flex-1 flex-col gap-2 overflow-hidden bg-teal p-3">
			{@render pile2DLink('/gallery/prints', 'Prints', '/images/prints/1.jpg')}
			{@render pile2DLink('/gallery/film', 'Film', '')}
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
			{#each screenshots.slice(0, 10) as item (item.id)}
				{@const optimizedUrl = `/_vercel/image?url=${encodeURIComponent(item.url)}&w=640&q=75`}
				<div class="relative mb-6 overflow-visible text-light-green">
					<img
						src={optimizedUrl}
						alt="User Captured Screenshot {item.created_at}"
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

<div class="relative h-screen overflow-hidden bg-dark-green p-2 pb-8 sm:p-6">
	<div class="pointer-events-none absolute inset-0 ml-5 grid grid-cols-1 gap-0 p-3 sm:grid-cols-6">
		<div class=" ml-8 border-r-8 border-light-yellow bg-dark-gray"></div>
		<div class=" sm:col-span-5">
			<div class="grid grid-cols-5 sm:h-80">
				<div class="sm:col-span-3"></div>
				<div class="sm:col-span-2"></div>
			</div>
			<div class="mb-2 ml-12 h-full bg-dark-gray"></div>
		</div>
	</div>

	<div class="relative z-10 flex h-full flex-col">
		<PageHeader isHome={true} />
		<div class="grid min-h-0 w-full grid-cols-1 gap-0 pt-3 lg:grid-cols-6">
			<div class="hidden min-h-0 pt-4 xl:block">{@render pileScreenshotGallery()}</div>
			<div class="min-h-0 lg:col-span-4 xl:col-span-3">{@render enterPilePilePile()}</div>
			<div class="hidden min-h-0 flex-col pt-4 pl-8 lg:col-span-2 lg:mt-12 lg:flex">
				{@render sideBar()}
			</div>
		</div>
	</div>
</div>
