<script lang="ts">
	let { isHome = false, isGallery = false, isAbout = false, appendTitle = '' } = $props();

	// Toggle state for the dropdown
	let menuOpen = $state(false);
</script>

<div class="flex w-full flex-row font-extrabold text-white">
	<h1 class="w-full text-4xl font-extrabold">PILE-PILE-PILE {appendTitle}</h1>

	<div class="flex w-full items-center justify-end gap-6">
		{#if !isGallery}<a href="/gallery" class="uppercase hover:text-amber-600">Gallery</a>{/if}
		{#if !isAbout}<a href="/about" class="uppercase hover:text-amber-600">About</a>{/if}

		<div class="relative">
			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="font-extrabold uppercase hover:text-amber-600 focus:outline-none"
			>
				Pile-World {menuOpen ? '↑' : '↓'}
			</button>

			{#if menuOpen}
				<div
					class="absolute right-0 z-50 mt-2 flex min-w-[150px] flex-col bg-white p-4 text-black shadow-xl ring-4 ring-white"
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
					<a
						href="/film"
						target="_blank"
						class="py-1 hover:text-amber-600">Film</a
					>
					<a
						href="/prints"
						target="_blank"
						class="py-1 hover:text-amber-600">Prints</a
					>
					<hr class="my-2 border-black" />
					<button class="py-1 text-left uppercase hover:text-red-600">Logout</button>
				</div>

				<div
					role="presentation"
					class="fixed inset-0 z-40"
					onclick={() => (menuOpen = false)}
				></div>
			{/if}
		</div>

		{#if !isHome}
			<a href="/#" class="hover:text-amber-600">Home</a>
		{/if}
	</div>
</div>
