<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import ImageTemplate from './components/imageTemplate.svelte';
	import { PileApp } from './util/pileApp.svelte';
	import CameraControls from './components/camera/CameraController.svelte';
	import { onDestroy } from 'svelte';
	import { interactivity } from '@threlte/extras';
	import SettingsKeyBind from './components/UI/SettingsKeyBind.svelte';
	import PerformanceManager from './components/PerformanceManager.svelte';

	const { raycaster } = interactivity({
		filter: (hits) => {
			return hits.slice(0, 1);
		}
	});
	raycaster.firstHitOnly = true;

	let { data, uiSettings } = $props();

	let windowIsVisible = $state(true);
	let windowIsFocused = $state(true);
	const isActivelyWatching = $derived(windowIsVisible && windowIsFocused);
	export const pileApp = new PileApp(() => isActivelyWatching, uiSettings, data);
	onDestroy(() => {
		pileApp.database.destroy();
	});

	function handleVisibilityChange() {
		windowIsVisible = document.visibilityState === 'visible';
	}
</script>

<svelte:document onvisibilitychange={handleVisibilityChange} />
<svelte:window onfocus={() => (windowIsFocused = true)} onblur={() => (windowIsFocused = false)} />

<SettingsKeyBind settingState = {uiSettings}/>


{#if uiSettings && pileApp}
	<CameraControls {uiSettings} app={pileApp}/>
	<T.DirectionalLight position={[0, 10, 10]} />
	<T.AmbientLight intensity={0.08} />
{/if}

{#if uiSettings.showGrid}
	<Grid
		type={'polar'}
		cellSize={10}
		sectionSize={20}
		infiniteGrid={true}
		sectionColor={'#FFFFFF'}
		sectionThickness={1}
		fadeDistance={500}
	/>
{/if}

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


