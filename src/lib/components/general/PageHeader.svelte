<script lang="ts">
	let {
		isHome = false,
		isGallery = false,
		isPrints = false,
		isFilm = false,
		appendTitle = ''
	} = $props();

	let menuOpen = $state(false);
</script>

<div class="flex w-full flex-row pb-3 font-extrabold text-light-green sm:p-0">
	<a href="/#" class="w-220 pt-1 text-3xl font-extrabold sm:text-6xl bg-light-yellow text-dark-gray border-b-2 border-r-2 border-light-yellow hover:border-dark-gray ">PILE-PILE-PILE {appendTitle}</a>

	<div class="flex w-full items-center justify-end gap-6">
		<div class="hidden uppercase sm:flex flex-row gap-6">
			{#if !isGallery}<a href="/gallery/pile-3d-gallery" class="uppercase hover:text-amber-600"
					>Pile-3D Gallery</a
				>{/if}
			{#if !isPrints}<a href="/gallery/prints" class="uppercase hover:text-amber-600">Prints</a
				>{/if}
			{#if !isFilm}<a href="/gallery/film" class="uppercase hover:text-amber-600">Film</a>{/if}
		</div>

		<div class="relative">
			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="font-extrabold uppercase hover:text-amber-600 focus:outline-none w-30"
			>
				Pile-World {menuOpen ? '↑' : '↓'}
			</button>

			{#if menuOpen}
				<div
					class="absolute right-0 z-50 mt-2 flex min-w-[150px] flex-col bg-white p-4 text-black shadow-xl ring-4 ring-white"
				>
					<a href="/gallery/pile-3d-gallery" target="_blank" class="py-1 hover:text-amber-600"
						>Pile-3D Gallery</a
					>
					<a
						href="https://audehelene.itch.io/pilemaker"
						target="_blank"
						class="py-1 hover:text-amber-600">Pilemaker (Original)</a
					>
					<a
						href="https://audehelene.itch.io/city-pile"
						target="_blank"
						class="py-1 hover:text-amber-600">City Pilemaker</a
					>
					<a href="/3d/pile" target="_blank" class="py-1 hover:text-amber-600">Pile-3D</a>
					<a href="/gallery/film" target="_blank" class="py-1 hover:text-amber-600">Film</a>
					<a href="/gallery/prints" target="_blank" class="py-1 hover:text-amber-600">Prints</a>
				</div>

				<div
					role="presentation"
					class="fixed inset-0 z-40"
					onclick={() => (menuOpen = false)}
				></div>
			{/if}
		</div>
	</div>
</div>
