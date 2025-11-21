<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo9.svelte';
	import { View } from '@threlte/extras';

	let itemDom1: any;
	let itemDom2: any;
	let itemDom3: any;
</script>



<div bind:this={itemDom1} class="absolute  h-[70vh] w-[70vh] left-[50vw] top-[5vh] -translate-x-1/2 border-10 border-yellow-500 overflow-hidden">
</div>
<div class="absolute z-[-10]  h-[70vh] w-[70vh] left-[50vw] top-[5vh] -translate-x-1/2 overflow-hidden">
<img src="/images/test/dollroom.png" alt="" class="w-full h-full object-cover object-center block z-[-10]">
</div>

<div class="absolute z-[-20] w-full h-full object-cover overflow-hidden" >
    <img src="/images/test/flatbg.jpg" alt="">
</div>


<div class="absolute top-0 h-full">
		<CanvasPortal>
			<View dom={itemDom1}>
				<Scene />
			</View>
		</CanvasPortal>
	</div>