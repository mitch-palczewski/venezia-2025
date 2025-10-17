<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo9.svelte';
	import { View } from '@threlte/extras';

	let itemDom: any

	

</script>


<div  bind:this={itemDom} class="relative h-[800vh] w-[60vw] border left-[50vw] -translate-x-1/2 "></div>



<CanvasPortal>
	<View dom={itemDom}>
		<Scene/>
	</View>
</CanvasPortal>


