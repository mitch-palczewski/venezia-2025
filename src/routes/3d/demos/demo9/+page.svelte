<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo9.svelte';
	import { View } from '@threlte/extras';

	let itemDom1: any;
	let itemDom2: any;
	let itemDom3: any;

	function test() {
		console.log('click');
	}
</script>

<p class="p-10">Each Croc is a duplicate scene in its own container</p>

	
		<div bind:this={itemDom1} class="absolute h-[800vh] w-[90vw] -translate-x-1/2 border"></div>
		<div bind:this={itemDom2} class="absolute h-[750vh] w-[10vw] -translate-x-1/2 border"></div>
		<div bind:this={itemDom3} class="absolute h-[800vh] w-[30vw] -translate-x-1/2 border"></div>
		

	<button
			on:click={() => {
				console.log('click');
			}}
			class="absolute rounded bg-green-600 p-2 px-4 z-3 text-white hover:border-2 hover:bg-green-200"
			>Test button should become lighter on hover</button
		>

	<div class="absolute top-0 h-full">
		<CanvasPortal>
			<View dom={itemDom1}>
				<Scene />
			</View>
			<View dom={itemDom2}>
				<Scene />
			</View>
			<View dom={itemDom3}>
				<Scene />
			</View>
		</CanvasPortal>
	</div>

