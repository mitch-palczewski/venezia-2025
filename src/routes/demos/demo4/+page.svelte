<script>
	import CanvasPortal from '$lib/components/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demo4.svelte';

</script>
<p>To create multiple of the same model utilize npx threlte/gilf@latest path/to/model.glb to create a reusable component</p>
<p>Some options for this command are </p>
<p>--transform transforms the asset for the web (draco prune resize)</p>
<p>--types, -t Adds Typescript definitions</p>
<p>--shadows, -s Lets Meshes cast and recieve shadows</p>
<p>--suspense Suspense allows you to wait to init the model when called (I think not to sure but it could be useful)</p>

<CanvasPortal>
	<Scene/>
</CanvasPortal>


