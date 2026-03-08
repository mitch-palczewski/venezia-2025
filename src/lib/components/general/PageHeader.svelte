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

{#snippet menu()}
	{#if menuOpen}
		<div
			class="shadow-3xl fixed right-0 z-50 mt-2 flex w-screen flex-col border-b-6 border-l-6 border-dark-gray bg-light-green p-4 text-xl text-dark-gray sm:w-[500px]"
		>
			<h1 class="bg-teal pt-1 pl-1 text-3xl text-light-green">Pile World</h1>
			<div class="flex flex-col p-2">
				<a href="/3d/pile" target="_blank" class="py-1 hover:bg-light-yellow">Enter Pile-3D</a>
				<a href="/gallery/pile-3d-gallery" target="_blank" class="py-1 hover:bg-light-yellow"
					>Pile-3D Screenshot Gallery</a
				>
				<a href="/gallery/film" target="_blank" class="py-1 hover:bg-light-yellow">Film</a>
				<a href="/gallery/prints" target="_blank" class="py-1 hover:bg-light-yellow">Prints</a>
				<a
					href="https://audehelene.itch.io/pilemaker"
					target="_blank"
					class="py-1 hover:bg-light-yellow">Pilemaker (Original)</a
				>
				<a
					href="https://audehelene.itch.io/city-pile"
					target="_blank"
					class="py-1 hover:bg-light-yellow">City Pilemaker</a
				>
			</div>

			<hr class="bold py-3" />
			<h1 class="bg-teal pt-1 pl-1 text-3xl text-light-green">Association</h1>
			<div class="flex flex-col p-2">
				<a href="https://www.feedfeednhv.com/" target="_blank" class="py-1 hover:bg-light-yellow"
					>FEED FEED NHV</a
				>
				<a
					href="https://www.mitch-palczewski.com/"
					target="_blank"
					class="py-1 hover:bg-light-yellow">Mitch-Palczewski.com</a
				>
				<a
					href="https://www.mitch-palczewski.com/sketches/shield-man/"
					target="_blank"
					class="py-1 hover:bg-light-yellow">Shield Man Speaks</a
				>
			</div>
		</div>

		<div role="presentation" class="fixed inset-0 z-40" onclick={() => (menuOpen = false)}></div>
	{/if}
{/snippet}

<div class="flex w-full flex-row pb-3 font-extrabold text-light-yellow sm:p-0">
	<a
		href="/#"
		class="w-240 border-r-2 border-b-2 border-light-yellow
		bg-light-yellow pt-1 text-4xl font-extrabold text-dark-gray hover:border-dark-gray sm:text-5xl lg:text-6xl"
		>PILE-PILE-PILE {appendTitle}</a
	>

	<div class="flex w-full items-center justify-end gap-6">
		<div class="hidden flex-row gap-6 uppercase sm:flex">
			{#if !isHome}<a href="/3d/pile" class="uppercase hover:text-amber-600">Pile-3D Enter</a>{/if}
			{#if !isPile3DGallery}
				<a
					href="/gallery/pile-3d-gallery"
					class="uppercase hover:bg-light-green hover:text-dark-gray"
				>
					Pile-3D Gallery
				</a>
			{/if}
		</div>

		<div class="relative">
			{@render hamburger()}
			{@render menu()}
		</div>
	</div>
</div>
