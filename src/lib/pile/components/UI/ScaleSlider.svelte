<script lang="ts">
	import { PileState } from '$lib/pile/util/pileState.svelte';
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

	let { pileState, uiSettings }: { pileState: PileState; uiSettings: SettingsState } = $props();

	let localScale = $state(1);

	$effect(() => {
		const selectedObj = pileState.getSelectedObject();
		if (selectedObj?.ref) {
			const scale = PileState.getObjScale(selectedObj.ref);
			// Syncing to X for uniform scale
			localScale = Math.round(scale.x * 1000) / 1000;
		}
	});

	function applyScale(val: number) {
		// Clamp to your minimum, but allow "infinity" upward
		const sanitized = Math.max(0.01, val);
		const selectedObj = pileState.getSelectedObject();
		if (selectedObj?.ref) {
			PileState.setScale(selectedObj.ref, sanitized);
			localScale = sanitized;
		}
	}
</script>

<div
	class="flex flex-row gap-3 rounded-xl border border-white/10 bg-zinc-900/80 px-4 backdrop-blur-sm"
>
	<div class="flex items-center justify-between">
		<span class="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Scale</span>
	</div>

	<div class="flex items-center gap-3">
		<input
			type="range"
			min="0.01"
			max={uiSettings.scaleSliderMax}
			step="0.01"
			bind:value={localScale}
			oninput={() => applyScale(localScale)}
			class="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-zinc-500 accent-blue-500"
		/>

		<div class="relative flex items-center">
			<input
				type="number"
				bind:value={localScale}
				oninput={(e) => applyScale(parseFloat(e.currentTarget.value))}
				min="0.01"
				step="0.1"
				class="w-15 [appearance:textfield] rounded bg-black/40 py-1 pr-1 pl-2 font-mono text-xs font-bold text-blue-400 ring-1 ring-white/10 focus:ring-blue-500/50 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
		</div>
	</div>
</div>

<style>
	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		height: 14px;
		width: 14px;
		border-radius: 50%;
		background: #f4f4f5;
		cursor: pointer;
		border: 2px solid #3b82f6;
	}
</style>
