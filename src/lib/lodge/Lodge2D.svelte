<script lang="ts">
	import type { Lodge } from "./Lodge.svelte";

	type Props = {
		lodge: Lodge;
	};
	let { lodge }: Props = $props();

</script>

<div class="fixed text-white mt-30 p-2">
	<p>'left click' - Grab/Drop & Interact</p>
	<p>'right click' - bring object close</p>
	<p>'mouse wheel' - adjust distance</p>
	<p>'f' - Object Orientation: {lodge.heldObjectOrientationState?.()}</p>
	<p>'e' & 'r' - cycle object rotation</p>
	<p>'arrow keys' - precise object rotation</p>
	<p>'+/-' - scale objects</p>
	
	
</div>


<div class="pointer-events-none fixed inset-0 flex items-center justify-center">

    <div 
        class="h-2 w-2 rounded-full border border-white/80 bg-white/40 transition-transform"
       
    ></div>
</div>