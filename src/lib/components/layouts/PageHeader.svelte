<script lang="ts">
	let {
		isHome = false,
		isGallery: isPile3DGallery = false,
		isPrints = false,
		isFilm = false,
		appendTitle = ''
	} = $props();

	let menuOpen = $state(false);
	let contactMenuOpen = $state(false);

	$effect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});

	let status = $state("");
	let loading= $state(false);
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		loading = true;
		
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch("https://formspree.io/f/xreypyap", {
				method: 'POST',
				body: data,
				headers: { 'Accept': 'application/json' }
			});

			if (response.ok) {
				status = "Message sent successfully! Thank you";
				form.reset();
			} else {
				const result = await response.json();
				status = result.error || "Something went wrong.";
			}
		} catch (error) {
			status = "Error: Could not connect to the server.";
			console.log(error)
		} finally {
			loading = false;
    }
}
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
{#snippet formspree()}
	<div class="flex flex-col gap-4 p-2">
		{#if status}
			<div class="border-3 border-dark-gray h-full p-2 text-center text-dark-gray">
				{status}
			</div>
		{:else}
			<form onsubmit={handleSubmit} method="POST" class="flex flex-col gap-4 p-2">
				<label class="flex flex-col">
					<span class="text-sm font-bold uppercase">Email</span>
					<input
						type="email"
						name="email"
						required
						class="border-3 border-dark-gray p-2 outline-none focus:bg-white"
					/>
				</label>

				<label class="flex flex-col">
					<span class="text-sm font-bold uppercase">Message</span>
					<textarea
						name="message"
						required
						class="border-3 border-dark-gray p-2 outline-none focus:bg-white"
						rows="8"
					></textarea>
				</label>

				<button type="submit" disabled={loading} class="bg-dark-gray py-2 text-light-green hover:bg-teal disabled:opacity-50">
					{loading ? 'Sending...' : 'Send'}
				</button>
			</form>
		{/if}
	</div>
{/snippet}
{#snippet menu()}
	{#if menuOpen}
		<div
			class="pointer-events-none fixed inset-0 top-15 right-0 z-50 flex flex-col items-end sm:top-21 sm:flex-row-reverse"
		>
			<div
				class="shadow-3xl pointer-events-auto flex h-full w-screen flex-col overflow-y-scroll border-b-6 border-l-6 border-dark-gray bg-light-green p-4 text-xl text-dark-gray sm:w-125"
			>
				<h1 class="bg-teal pt-1 pl-1 text-3xl text-light-green">Pile World</h1>
				<div class="flex flex-col p-2">
					<a href="/#" class="py-1 hover:bg-light-yellow">Home</a>
					<a href="/3d/pile" class="py-1 hover:bg-light-yellow">Enter Pile-3D</a>
					<a href="/gallery/pile-3d-gallery" class="py-1 hover:bg-light-yellow"
						>Pile-3D Screenshot Gallery</a
					>
					<a href="/gallery/film" class="py-1 hover:bg-light-yellow">Film</a>
					<a href="/gallery/prints" class="py-1 hover:bg-light-yellow">Prints</a>
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

				<hr class="bold py-2" />
				<button
					onclick={() => {contactMenuOpen = !contactMenuOpen}}
					class="mb-2 flex px-2 py-1 hover:bg-light-yellow"
				>
					Contact
				</button>
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

			{#if contactMenuOpen}
				<div
					class="shadow-3xl pointer-events-auto flex h-fit w-screen flex-col border-t-6 border-dark-gray bg-light-yellow p-4 text-xl text-dark-gray sm:h-full sm:w-80"
				>
					<h1 class="bg-dark-gray pt-1 pl-1 text-3xl text-white">Contact</h1>
					<div class="flex flex-col p-2">
						{@render formspree()}
					</div>
				</div>
			{/if}
		</div>

		<div
			role="presentation"
			class="fixed inset-0 z-40"
			onclick={() => {
				menuOpen = false
				contactMenuOpen = false
				status=""
			}}
		></div>
	{/if}
{/snippet}

<div class="flex w-full flex-row font-extrabold text-light-yellow sm:p-0">
	<a
		href="/#"
		class="w-240 sm:border-r-2 sm:border-b-2 border-light-yellow
		bg-light-yellow pt-1 text-4xl font-extrabold text-dark-gray hover:border-dark-gray sm:text-5xl lg:text-6xl"
		>PILE-PILE-PILE </a
	>
	<div class="flex w-full items-center justify-end gap-6">
		<div class="hidden flex-row items-center gap-6 uppercase sm:flex">
			{#if !isHome}
				<a href="/3d/pile" class="hover:text-amber-600">Pile-3D Enter</a>
			{/if}

			{#if !isPile3DGallery}
				<a
					href="/gallery/pile-3d-gallery"
					class="px-1 transition-colors hover:bg-light-green hover:text-dark-gray"
				>
					Pile-3D Gallery
				</a>
			{/if}
		</div>
		<div class="flex flex-col ">
			{@render hamburger()}
			{@render menu()}
		</div>
	</div>
</div>
