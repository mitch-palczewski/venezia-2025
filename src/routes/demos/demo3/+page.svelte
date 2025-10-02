<script>
	import CanvasPortal from '$lib/components/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demo3.svelte';

</script>

<p>This model is being hosted in an external Database</p>
<p>Large files (greater then 100mb) cannot be stored on git hub and require a seperate storage option</p>
<p>This uses Vercels Blob storage. Limitations are a max capacity of 1GB and has a limit on the number of requests per month (2,000 read operations).</p>

<CanvasPortal>
	<Scene/>
</CanvasPortal>


