<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { PileApp } from './util/pileApp.svelte';
	import { onDestroy } from 'svelte';
	import { interactivity } from '@threlte/extras';
	import SettingsKeyBind from './components/UI/SettingsKeyBind.svelte';
	import type { PileData } from '.';
	import type { UiState } from './util/ui/uiState.svelte';
	import type { PilePerformance } from './util/pilePerformance.svelte';
	import { captureThrelteScene } from '$lib/3d/features/utils/captureScene';
	import CameraController from './core/camera/CameraController.svelte';
	import OrbitLight from '$lib/3d/features/lights/OrbitLight.svelte';
	import Tower from '$lib/3d/components/Tower.svelte';
	import Fireplace from '$lib/3d/components/Fireplace.svelte';
	import ImageTemplate from './core/ImageTemplate.svelte';
	import PileObject from './core/DraggableObject.svelte';
	import ModelTemplate from './core/ModelTemplate.svelte';

	type Props = {
		data: PileData;
		uiState: UiState;
		performance: PilePerformance;
		databaseName?: string;
		objectControls?: 'gizmo' | 'drag' | 'view';
	};
	let { data, uiState, performance, databaseName, objectControls = 'gizmo' }: Props = $props();

	const { raycaster } = interactivity();
	raycaster.firstHitOnly = true;

	const { renderer, scene, camera } = useThrelte();
	export async function capturePileScene(): Promise<Blob> {
		return captureThrelteScene(renderer, scene, camera, 'image/jpeg', 1);
	}

	export const pileApp = new PileApp(capturePileScene, uiState, performance, data, databaseName);
	pileApp.state.objectControls = objectControls;

	onDestroy(() => {
		pileApp.database.destroy();
		performance.deviceContext.destroy();
	});
</script>

<T.Fog attach="fog" color="#004d7d" near={10} far={100000} />

<SettingsKeyBind settingState={uiState} />

{#if uiState && pileApp}
	<CameraController {uiState} app={pileApp} />
	<OrbitLight ready={pileApp.isReady} performanceTier={performance.lights} />
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

{#if databaseName === 'pile_objects'}
	<Tower />
	<Fireplace />
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
	{#if objectControls === 'gizmo'}
		<ModelTemplate
			{pileApp}
			bind:ref={model.ref}
			pileObjectData={model}
			position={[translate.x, translate.y, translate.z]}
			quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
			scale={[scale.x, scale.y, scale.z]}
		/>
	{:else if objectControls === 'drag'}
		<PileObject
			{pileApp}
			bind:ref={model.ref}
			pileObjectData={model}
			position={[translate.x, translate.y, translate.z]}
			quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
			scale={[scale.x, scale.y, scale.z]}
		/>
	{/if}
{/each}
