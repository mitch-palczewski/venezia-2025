<script lang="ts">
	let {
		isHome = false,
		isGallery: isPile3DGallery = false,
		isPrints = false,
		isFilm = false,
		appendTitle = ''
	} = $props();

	let menuOpen = $state(false);
</script>

{#snippet hamburger()}
	<button
		onclick={() => (menuOpen = !menuOpen)}
		class="relative h-10 w-10 font-extrabold uppercase focus:outline-none"
		aria-label="Hamburger Menu"
	>
		<div class="absolute top-1/2 left-1/2 w-8 -translate-x-1/2 -translate-y-1/2">
			<span
				class="absolute block h-1 w-8 bg-light-yellow transition-all duration-300 {menuOpen
					? 'rotate-45'
					: '-translate-y-2.5'}"
			></span>

			<span
				class="absolute block h-1 w-8 bg-light-yellow transition-all duration-300 {menuOpen
					? 'opacity-0'
					: 'opacity-100'}"
			></span>

			<span
				class="absolute block h-1 w-8 bg-light-yellow transition-all duration-300 {menuOpen
					? '-rotate-45'
					: 'translate-y-2.5'}"
			></span>
		</div>
	</button>
{/snippet}

<div class="flex w-full flex-row pb-3 font-extrabold text-light-yellow sm:p-0">
	<a
		href="/#"
		class="w-220 border-r-2 border-b-2 border-light-yellow
		bg-light-yellow pt-1 text-3xl font-extrabold text-dark-gray hover:border-dark-gray sm:text-4xl md:text-5xl lg:text-6xl"
		>PILE-PILE-PILE {appendTitle}</a
	>

	<div class="flex w-full items-center justify-end gap-6">
		<div class="hidden flex-row gap-6 uppercase sm:flex">
			{#if !isHome}<a href="/3d/pile" class="uppercase hover:text-amber-600">Pile-3D Enter</a>{/if}
			{#if !isPile3DGallery}
				<a href="/gallery/pile-3d-gallery" class="uppercase hover:text-dark-gray hover:bg-light-green">
					Pile-3D Gallery
				</a>
			{/if}
		</div>

		<div class="relative">
			{@render hamburger()}
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
