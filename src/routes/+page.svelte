<script lang="ts">
	let { data } = $props();
	const { screenshots } = $derived(data);
</script>

{#snippet enterPilePilePile()}
	<a
		href="/3d/pile"
		aria-label="City Pile"
		class="group relative flex h-full w-full overflow-hidden bg-amber-700 p-1"
	>
		<img
			src="/media/Cover_v4.1.png"
			alt="PilePilePile Preview"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 flex items-center justify-center group-hover:bg-white/30">
			<p class="bg-cyan-800 text-6xl font-extrabold text-white group-hover:invert">
				Enter PilePilePile
			</p>
		</div>
	</a>
{/snippet}

{#snippet pile2DLink(linkHref: string, text: string, imageSrc: string)}
	<a
		href={linkHref}
		aria-label="City Pile"
		target="_blank"
		class="group relative flex w-full bg-amber-700 p-1"
	>
		<img src={imageSrc} alt="Pilemaker Preview" class="object-fit w-full" />
		<div class="absolute inset-0 flex items-center justify-center group-hover:bg-white/30">
			<p class="bg-cyan-800 text-4xl font-extrabold text-white group-hover:invert">{text}</p>
		</div>
	</a>
{/snippet}

{#snippet sideBar()}
	<div class="flex h-full w-full flex-col gap-3 bg-green-400 p-3">
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
		<a
			href="/#"
			aria-label="Learn about Pilemaker"
			class="flex h-full items-center justify-center bg-orange-200 hover:bg-indigo-100"
		>
			<p class="bg-emerald-800 text-2xl font-extrabold text-white">About =></p>
		</a>
	</div>
{/snippet}

{#snippet pileScreenshotGallery()}
	<div class="flex h-full flex-col overflow-hidden ">
		<div class=" bg-cyan-800 px-1 text-xl font-extrabold text-white hover:invert">
			<a href="/gallery" target="_blank" class=" flex w-full flex-row items-center justify-between">
				<h1>PilePilePile Gallery</h1>
				<h1>Visit =></h1>
			</a>
		</div>
		<div class="min-h-0 flex-1">
			{@render renderScreenshots()}
		</div>
	</div>
{/snippet}

{#snippet renderScreenshots()}
	{#if screenshots && screenshots.length > 0}
		<div class="h-full overflow-y-auto pt-2 pr-2">
			{#each screenshots.slice(0, 20) as item (item.id)}
				<div class="mb-2 overflow-hidden p-1 bg-cyan-800">
					<img
						src={item.url}
						alt={item.name}
						class="aspect-video w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
			<div class=" bg-cyan-800 hover:invert">
				<a
					href="/gallery"
					target="_blank"
					class=" flex w-full items-center justify-center py-12 text-4xl text-white"
				>
					<h1 class="">View More</h1>
				</a>
			</div>
		</div>
	{:else}
		<p class="text-stone-500 italic">No screenshots in the pile yet...</p>
	{/if}
{/snippet}

<div
	class="absolute grid h-screen w-screen grid-cols-4 gap-6 bg-violet-100 p-6 bg-cover bg-center bg-no-repeat"
	style="background-image: url('/images/environment/world.jpg');"
>
	
	<div class="col-span-2 min-h-0">{@render enterPilePilePile()}</div>
	<div class="min-h-0">{@render pileScreenshotGallery()}</div>
	<div class=" min-h-0">{@render sideBar()}</div>
</div>
