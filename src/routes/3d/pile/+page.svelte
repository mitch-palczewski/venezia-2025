<script lang="ts">
	import { enhance } from '$app/forms';
	import { View } from '@threlte/extras';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene } from '$lib/scenes/pile';

	export let form: any;
	let sceneRef: any;
	let pileSceneDom: any;

	const test_data = {
		PileZardoz01: {
			position: [1, 2, 3],
			rotation: [0, 0, 0],
			scale: [1, 1, 1]
		}
	};
	const payload = { test_data, label: 'from-client' };

	const jsonString = JSON.stringify(payload);
	const blob = new Blob([jsonString], { type: 'application/json' });
	const file = new File([blob], 'object_positions.json', { type: 'application/json' });

	async function upload() {
		const test_data = {
			PileZardoz01: { position: [1, 2, 3], rotation: [0, 0, 0], scale: [1, 1, 1] }
		};
		const payload = { test_data, label: 'from-client' };
		const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
		const file = new File([blob], 'object_positions.json', { type: 'application/json' });

		const form = new FormData();
		form.append('file', file);
		form.append('meta', 'from-client');

		const res = await fetch('/3d/pile', { method: 'POST', body: form });
		const json = await res.json();
		console.log(json);
	}
</script>

<div class="relative">
	<form method="POST">
		<input type="hidden" name="file" value={file} />
		<button
			class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 focus:outline-none"
			>Upload</button
		>
		{#if form}
			<p>uploaded {form.uploaded}</p>
		{/if}
	</form>
	<button on:click={upload} class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none">Upload</button>
</div>

<div bind:this={pileSceneDom} class="relative h-[200px] w-[400px] p-10"></div>

<CanvasPortal>
	<View dom={pileSceneDom}>
		<PileScene bind:this={sceneRef} />
	</View>
</CanvasPortal>
