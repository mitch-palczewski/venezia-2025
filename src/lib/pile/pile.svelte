<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import ImageTemplate from './components/imageTemplate.svelte';
	import { PileApp } from './util/pileApp.svelte';
	import CameraControls from './components/CameraControls.svelte';
	import { onDestroy} from 'svelte';


	let { data }= $props();

	let windowIsVisible = $state(true);
	let windowIsFocused = $state(true);
	const isActivelyWatching = $derived(windowIsVisible && windowIsFocused);
	export const pileApp = new PileApp(() => isActivelyWatching, data);

	onDestroy(() => {
		pileApp.database.destroy()
	})

	function handleVisibilityChange() {
		windowIsVisible = document.visibilityState === 'visible';
	}
</script>

<svelte:document onvisibilitychange={handleVisibilityChange} />
<svelte:window onfocus={() => (windowIsFocused = true)} onblur={() => (windowIsFocused = false)} />

<CameraControls />

<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight intensity={0.08} />

<Grid
	type={'polar'}
	cellSize={5}
	infiniteGrid={true}
	sectionColor={'#000000'}
	sectionThickness={1}
/>

{#each pileApp.state.objects2D as [id, image] (id)}
	{@const { translate: translate, rotation: quaternion, scale: scale } = image.transform3D}
	<ImageTemplate
		{pileApp}
		pileObjectData={image}
		oncreate={(ref) => {
			pileApp.state.maxID += 1;
			image.ref = ref;
		}}
		position={[translate.x, translate.y, translate.z]}
		quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
		scale={[scale.x, scale.y, scale.z]}
	/>
{/each}

{#each pileApp.state.objects3D as [id, model] (id)}
	{@const { translate: translate, rotation: quaternion, scale: scale } = model.transform3D}

	<ModelTemplate
		{pileApp}
		pileObjectData={model}
		oncreate={(ref) => {
			pileApp.state.maxID += 1;
			model.ref = ref;
		}}
		position={[translate.x, translate.y, translate.z]}
		quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
		scale={[scale.x, scale.y, scale.z]}
	/>
{/each}
