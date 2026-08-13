<script lang="ts">
	import type { Lodge } from "./Lodge.svelte";

	type Props = {
		lodge: Lodge;
	};
	let { lodge }: Props = $props();

</script>

<div class="fixed text-white">
	Use the 'f' Key to change grab type. Current Grab Type: {lodge.heldObjectOrientationState?.()}
	
</div>


<div class="pointer-events-none fixed inset-0 flex items-center justify-center">

    <div 
        class="h-2 w-2 rounded-full border border-white/80 bg-white/40 transition-transform"
       
    ></div>
</div>