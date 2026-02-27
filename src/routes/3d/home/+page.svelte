

<script lang="ts">
//KEEP IF I WANT TO PUT SOME 3D VISUALS on here
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
	<a href={linkHref} aria-label="City Pile" class="group relative flex w-full bg-amber-700 p-1">
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
        <a href="/#" aria-label="Learn about Pilemaker" class="flex items-center justify-center  h-full bg-orange-200 hover:bg-indigo-100">
           <p class="text-2xl font-extrabold text-white bg-emerald-800">About =></p> 
        </a>
	</div>
{/snippet}

<div class="absolute grid h-screen w-screen grid-cols-3 gap-6 p-6 bg-violet-100">
	<div class="col-span-2 min-h-0">{@render enterPilePilePile()}</div>
	<div class="col-span-1 min-h-0">{@render sideBar()}</div>
</div>
