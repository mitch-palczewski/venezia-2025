<script lang="ts">
	import { T } from '@threlte/core';
	import { Environment, Grid} from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import type {
		PileDataPayload,
		RawDataPayload as RawPayload
	} from './types';
	import { PileApp } from './util/pileApp';
	import CameraControls from './components/CameraControls.svelte';

	interface Props {rawPositionData: RawPayload;}
	let { rawPositionData }: Props = $props();


	export const pileApp = new PileApp(rawPositionData)


	export function getPositions(): PileDataPayload {
		return pileApp.getPileObjectPositions()
	}
</script> 

<CameraControls/>

<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight intensity={0.08} />


<Grid
	type={"polar"}
	cellSize={5}
	infiniteGrid={true}
	sectionColor={'#000000'}
	sectionThickness={1}
/>
<Environment url={'/images/environment/yellow.png'} isBackground={true} />

{#each pileApp.state.models as model}
	<ModelTemplate
		pileApp = {pileApp}
		objectData = {model}
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


