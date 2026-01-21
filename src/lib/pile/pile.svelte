<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import ImageTemplate from './components/imageTemplate.svelte';
	import { PileApp } from './util/pileApp.svelte';
	import CameraControls from './components/CameraControls.svelte';
	import { onDestroy } from 'svelte';
	import { interactivity } from '@threlte/extras';
    
    // This ensures that for every click, Threlte only 
    // fires the event for the FIRST (closest) object hit.
    interactivity({
        filter: (hits) => {
            // Hits are already sorted by distance by Three.js
            // We only return the first one (the closest)
            return hits.slice(0, 1);
        }
    });

	let { data } = $props();

	let windowIsVisible = $state(true);
	let windowIsFocused = $state(true);
	const isActivelyWatching = $derived(windowIsVisible && windowIsFocused);
	export const pileApp = new PileApp(() => isActivelyWatching, data);
	onDestroy(() => {
		pileApp.database.destroy();
	});

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
		bind:ref={image.ref}
		position={[translate.x, translate.y, translate.z]}
		quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
		scale={[scale.x, scale.y, scale.z]}
	/>
{/each}

{#each pileApp.state.objects3D as [id, model] (id)}
	{@const { translate: translate, rotation: quaternion, scale: scale } = model.transform3D}

	<ModelTemplate
		{pileApp}
		bind:ref={model.ref}
		pileObjectData={model}
		position={[translate.x, translate.y, translate.z]}
		quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
		scale={[scale.x, scale.y, scale.z]}
	/>
{/each}
