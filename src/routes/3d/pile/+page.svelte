<script lang="ts">
	import { enhance } from '$app/forms';
	import { View } from '@threlte/extras';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene } from '$lib/scenes/pile';

	let sceneRef: any;
	let pileSceneDom: any;

	async function uploadTestData() {
		//TODO get real data
		const test_data = {
			PileZardoz01: { position: [1, 2, 3], rotation: [0, 0, 0], scale: [1, 1, 1] }
		};

		const signalTimeoutMs = 10000;
		const payload = { test_data, label: 'from-client' };
		const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
		const file = new File([blob], 'object_positions.json', { type: 'application/json' });

		const form = new FormData();
		form.append('file', file);
		form.append('meta', 'from-client');

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), signalTimeoutMs);

		try {
			const res = await fetch('/3d/pile', {
				method: 'POST',
				body: form,
				signal: controller.signal
			});
			clearTimeout(timeout);

			if (!res.ok) {
				let body;
				try {
					body = await res.json();
				} catch {
					body = await res.text();
				}
				return { ok: false, status: res.status, body };
			}

			const json = await res.json();
			console.log(json);
		} catch (rawErr) {
			const { name, message } = extractErrorInfo(rawErr);
			console.error('upload failed', { name, message, rawErr });
			if (rawErr instanceof DOMException && rawErr.name === 'AbortError') {
				return { ok: false, error: 'timeout' };
			}
			return { ok: false, error: 'network_or_unexpected', details: message };
		}
	}
	function extractErrorInfo(err: unknown) {
		if (err instanceof Error) {
			return { name: err.name, message: err.message, stack: err.stack };
		}
		if (typeof err === 'object' && err !== null) {
			const anyErr = err as Record<string, unknown>;
			const name = typeof anyErr.name === 'string' ? anyErr.name : 'Error';
			const message = typeof anyErr.message === 'string' ? anyErr.message : JSON.stringify(anyErr);
			return { name, message, stack: undefined };
		}
		return { name: 'Error', message: String(err), stack: undefined };
	}
</script>

<div class="relative">
	<button
		on:click={uploadTestData}
		class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
		>Upload Test Data</button
	>
</div>

<div bind:this={pileSceneDom} class="relative h-[200px] w-[400px] p-10"></div>

<CanvasPortal>
	<View dom={pileSceneDom}>
		<PileScene bind:this={sceneRef} />
	</View>
</CanvasPortal>
