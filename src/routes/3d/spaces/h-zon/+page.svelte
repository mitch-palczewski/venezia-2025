<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo9.svelte';
	import { View } from '@threlte/extras';

	let itemDom1: any;
	let itemDom2: any;
	let itemDom3: any;
</script>

<div
	bind:this={itemDom1}
	class="absolute top-[58vh] left-[50vw] h-[37vh] w-[50vh] overflow-hidden "
></div>
<div
	bind:this={itemDom2}
	class="absolute top-[58vh] left-[5vw] h-[37vh] w-[50vh] overflow-hidden "
></div>
<div
	bind:this={itemDom3}
	class="absolute top-[58vh] left-[140vw] h-[37vh] w-[50vh] overflow-hidden "
></div>

<div class="absolute -z-20 w-[230vw] h-screen">
	<img src="/images/test/h-zon-sketch.png" alt="" class="h-screen " />
</div>

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
