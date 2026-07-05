<script lang="ts">
	import { useViewport } from "$lib/core";
	import { useViewportProjector } from "$lib/core/projector/projector.context.svelte";
	import { ProjectedElementFrameModel } from "$lib/features";
	import ElementFrame from "$lib/features/element-frame/ElementFrame.svelte";

    const viewport = useViewport()
    const vpProjector = useViewportProjector()

    const element = new ProjectedElementFrameModel({
        x:100,
        y:100,
        anchor:"NE"
    }, vpProjector)
     const element2 = new ProjectedElementFrameModel({
        x:100,
        y:100,
        anchor:"SW"
    }, vpProjector)

</script>



<ElementFrame projectorModel = {element} class="bg-blue-500 ">
    hello world 
</ElementFrame>

<ElementFrame projectorModel = {element2} class="bg-red-500 ">
    hello world2
</ElementFrame>
