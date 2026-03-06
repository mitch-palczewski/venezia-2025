<script lang="ts">
	import ShieldmanDemo from '$lib/3d/ShieldmanDemo.svelte';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import PageHeader from '$lib/components/general/PageHeader.svelte';
	import { View } from '@threlte/extras';

	let { data } = $props();
	const { screenshots } = $derived(data);
	let scene3DDom = $state<undefined | HTMLElement>();
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
		<div
			class="absolute inset-0 flex flex-col items-center justify-center p-6 group-hover:bg-white/10"
		>
			<p
				class="w-full bg-cyan-800 p-1 text-center text-6xl font-extrabold text-white group-hover:invert"
			>
				Enter Pile-3D
			</p>
			<p class="bg-cyan-800 text-center text-sm font-extrabold text-white group-hover:invert">
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
	
	</div>
{/snippet}

{#snippet pileScreenshotGallery()}
	<div class="flex h-full flex-col overflow-hidden">
		<div class=" mr-2 bg-cyan-800 px-1 text-xl font-extrabold text-white hover:invert">
			<a
				href="/gallery"
				class=" flex w-full flex-col items-center justify-between border-b border-cyan-900"
			>
				<h1>Pile-3D Gallery</h1>
				<p class="text-sm">A collections of user captured screenshots.</p>
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
				<div class="mb-2 overflow-hidden bg-cyan-800 p-1">
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
	class="absolute bottom-8 right-9 h-[30vh] w-[22vw] z-10 border-2 overflow-hidden"
	bind:this={scene3DDom}
></div>

<div
	class="absolute flex flex-col bg-cover bg-center bg-no-repeat p-6 sm:h-screen -z-10"
>
	<PageHeader isHome={true} />
	<div class=" grid min-h-0 w-full grid-cols-1 gap-6 sm:grid-cols-4">
		<div class="min-h-0 sm:col-span-2">{@render enterPilePilePile()}</div>
		<div class="min-h-0">{@render pileScreenshotGallery()}</div>
		<div class=" min-h-0">{@render sideBar()}</div>
	</div>
</div>

<div class="absolute top-0 h-full">
<CanvasPortal>
	<View dom={scene3DDom}>
		<ShieldmanDemo/>
	</View>
</CanvasPortal>
</div>

