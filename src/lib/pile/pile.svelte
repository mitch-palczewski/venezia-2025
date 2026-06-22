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
	import { captureThrelteScene } from '$lib/utils/captureScene';
	import type { PileData } from '.';
	import type { UiState } from './util/ui/uiState.svelte';
	import { WindowManager } from '$lib/utils/windowManager.svelte';

	type Props = {
		data: PileData;
		uiState: UiState;
	};
	let { data, uiState }: Props = $props();

	const { raycaster } = interactivity();
	raycaster.firstHitOnly = true;

	const { renderer, scene, camera } = useThrelte();
	export async function capturePileScene(): Promise<Blob> {
		return captureThrelteScene(renderer, scene, camera, 'image/jpeg', 1);
	}

	const windowManager = new WindowManager();
	export const pileApp = new PileApp(() => windowManager.isActivelyWatching, capturePileScene, uiState, data);
	onDestroy(() => {
		pileApp.database.destroy();
	});
</script>



<PerformanceManager app={pileApp} />

<SettingsKeyBind settingState={uiState} />

{#if uiState && pileApp}
	<CameraControls uiSettings={uiState} app={pileApp} />
	<OrbitLight ready={pileApp.isReady} />
	<T.AmbientLight intensity={0.6} />
{/if}

{#if uiState.showGrid}
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
<Fireplace />

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
