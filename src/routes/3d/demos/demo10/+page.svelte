<script lang="ts">
    import CanvasPortal from "$lib/components/3d-core/CanvasPortal.svelte";
    import Demo10 from "$lib/scenes/demos/demo10/demo10.svelte";
	import { View } from "@threlte/extras";

    let viewRef; 
</script>


<div bind:this={viewRef} class="relative h-[200px] w-[400px] p-10"></div>

<CanvasPortal>
    
        <Demo10/>
    
</CanvasPortal>