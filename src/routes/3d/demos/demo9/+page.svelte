<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo9.svelte';
	import { View } from '@threlte/extras';

	let itemDom1: any
	let itemDom2: any
	let itemDom3: any

</script>

<p class="p-10"> 
	Each Croc is a duplicate scene in its own container

</p>

<div  bind:this={itemDom1} class="absolute h-[800vh] w-[90vw] border left-[50vw] -translate-x-1/2 top-[20vh]"></div>
<div  bind:this={itemDom2} class="absolute h-[750vh] w-[10vw] border left-[13vw] -translate-x-1/2 top-[27vh]"></div>
<div  bind:this={itemDom3} class="absolute h-[800vh] w-[30vw] border left-[70vw] -translate-x-1/2 top-[3vh]"></div>



<CanvasPortal>
	<View dom={itemDom1}>
		<Scene/>
	</View>
	<View dom={itemDom2}>
		<Scene/>
	</View>
	<View dom={itemDom3}>
		<Scene/>
	</View>

</CanvasPortal>


