<script lang="ts">
	import { enhance } from '$app/forms';
	import { View } from '@threlte/extras';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene, uploadPositions } from '$lib/scenes/pile';

	export let form: any;
	let sceneRef: any;
	let pileSceneDom: any;
	let sendJsonResult: any = null;


	const test_data = {
		PileZardoz01: {
			position: [1, 2, 3],
			rotation: [0, 0, 0],
			scale: [1, 1, 1]
		}
	};

	async function sendJson() {
		const payload = { test_data, label: 'from-client' };

		const jsonString = JSON.stringify(payload);
    	const blob = new Blob([jsonString], { type: 'application/json' });
    	const file = new File([blob], 'positions.json', { type: 'application/json' });

		const fd = new FormData();
    	fd.append('file', file);


		const res = await fetch('?upload', {
			method: 'POST',
			body: fd,
			credentials: 'same-origin'
		});

		if(res.ok){
			sendJsonResult = await res.json();
			form = sendJsonResult;
		}else{
			const text = await res.text();
			sendJsonResult = { error: true, status: res.status, text };
		}

		console.log(await res.text());
	}
</script>

<div class="relative">

Does not function

<form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
	<input type="file" name="file" required />
	<button
		class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 focus:outline-none"
		>Upload</button
	>

	{#if form}
		<p>uploaded {form.uploaded}</p>
	{/if}
</form>

<button on:click={sendJson} class="rounded bg-green-600 px-4 py-2 text-white">Send JSON</button>

<div bind:this={pileSceneDom} class="relative h-[200px] w-[400px] p-10"></div>
</div>


<CanvasPortal>
	<View dom={pileSceneDom}>
		<PileScene bind:this={sceneRef} />
	</View>
</CanvasPortal>
