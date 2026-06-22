<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import ImageTemplate from './components/imageTemplate.svelte';
	import { PileApp } from './util/pileApp.svelte';
	import CameraControls from './components/camera/CameraController.svelte';
	import { onDestroy } from 'svelte';
	import { interactivity } from '@threlte/extras';
	import SettingsKeyBind from './components/UI/SettingsKeyBind.svelte';
	import OrbitLight from '$lib/components/3d/lights/OrbitLight.svelte';
	import PerformanceManager from '$lib/components/util/PerformanceManager.svelte';
	import Tower from '../assets/Tower.svelte';
	import Fireplace from '$lib/assets/Fireplace.svelte';

	let { data, uiSettings } = $props();

	const { raycaster } = interactivity({
		filter: (hits) => {
			return hits.slice(0, 1);
		}
	});
	raycaster.firstHitOnly = true;

	const { renderer, scene, camera } = useThrelte();

	

	export async function captureThrelteScene(): Promise<Blob> {
		return new Promise((resolve, reject) => {
			renderer.render(scene, camera.current)
			const canvas = renderer.domElement
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(new Error("Failed to capture WebGL canvas"))
			}, 'image/jpeg', 1)
		})
	}

	let windowIsVisible = $state(true);
	let windowIsFocused = $state(true);
	const isActivelyWatching = $derived(windowIsVisible && windowIsFocused);
	export const pileApp = new PileApp(() => isActivelyWatching, captureThrelteScene, uiSettings, data);
	function handleVisibilityChange() {
		windowIsVisible = document.visibilityState === 'visible';
	}

	onDestroy(() => {
		pileApp.database.destroy();
	});
</script>

<svelte:document onvisibilitychange={handleVisibilityChange} />
<svelte:window onfocus={() => (windowIsFocused = true)} onblur={() => (windowIsFocused = false)} />

<PerformanceManager app={pileApp}/>

<SettingsKeyBind settingState = {uiSettings}/>


{#if uiSettings && pileApp}
	<CameraControls {uiSettings} app={pileApp}/>
	<OrbitLight ready={pileApp.isReady}/>
	<T.AmbientLight intensity={.6} />
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


<Tower />
<Fireplace/>

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


