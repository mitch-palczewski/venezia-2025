<script lang="ts">
	import { T } from '@threlte/core';
	import { Environment, OrbitControls } from '@threlte/extras';
	import TestWorld from '$lib/scenes/demos/testWorld.svelte';
	import ModelTemplate from './components/modelTemplate.svelte';
	import type {
		PileDataPayload,
		RawDataPayload as RawPayload
	} from './types';
	import { PileApp } from './util/pileApp';

	interface Props {rawPositionData: RawPayload;}
	let { rawPositionData }: Props = $props();


	export const pileApp = new PileApp(rawPositionData)


	export function getPositions(): PileDataPayload {
		return pileApp.getPileObjectPositions()
	}
</script> 

<T.PerspectiveCamera
	makeDefault
	position={[1, 2, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight intensity={0.08} />


<TestWorld />
<Environment url={'/images/environment/yellow.png'} isBackground={true} />

{#each pileApp.state.models as model}
	<ModelTemplate
		pileApp = {pileApp}
		pileObjectData = {model}
		oncreate={(ref) => {
			pileApp.state.maxID += 1;
			model.ref = ref;
		}}
		position={[
			model.transform3D.translate.x,
			model.transform3D.translate.y,
			model.transform3D.translate.z
		]}
		quaternion={[
			model.transform3D.rotation.x,
			model.transform3D.rotation.y,
			model.transform3D.rotation.z,
			model.transform3D.rotation.w
		]}
		scale={[
			model.transform3D.scale.x, 
			model.transform3D.scale.y, 
			model.transform3D.scale.z
		]}
	/>
{/each}


