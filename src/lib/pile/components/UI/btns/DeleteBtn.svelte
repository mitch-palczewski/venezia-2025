<script lang="ts">
	import type { PileState } from "$lib/pile/util/pileState.svelte";
	import { deleteSelectedModel } from "$lib/pile/util/ui/uiActions";

	let { pileState }: { pileState: PileState } = $props();


	const deleteItem = () => {
		deleteSelectedModel(pileState)
	};
</script>

<div class="flex items-center rounded-xl border border-white/10 bg-zinc-900/80 p-1 backdrop-blur-sm" use:pileState.uiSettings.hudTooltip={"delete : Delete Object"}>
	<button
		onclick={deleteItem}
		class="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all text-zinc-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95"
		aria-label="Delete item"
	>
		<span>Delete</span>
		
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
		>
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
		</svg>
	</button>
</div>