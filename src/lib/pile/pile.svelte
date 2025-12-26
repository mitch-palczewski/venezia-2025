<script lang="ts">
	import { T } from '@threlte/core';
	import { Environment, Grid} from '@threlte/extras';
	import ModelTemplate from './components/modelTemplate.svelte';
	import ImageTemplate from './components/imageTemplate.svelte';
	import { PileApp } from './util/pileApp';
	import CameraControls from './components/CameraControls.svelte';
	

	interface Props {rawPositionData: object}
	let { rawPositionData }: Props = $props();


	export const pileApp = new PileApp(rawPositionData)


	export function getPositions(): object{
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

{#each pileApp.state.objects2D as image}
	<ImageTemplate
		pileApp = {pileApp}
		pileObjectData = {image[1]}
		oncreate={(ref) => {
			console.log(image[1])
			pileApp.state.maxID += 1;
			image[1].ref = ref;
		}}
		position={[
			image[1].transform3D.translate.x,
			image[1].transform3D.translate.y,
			image[1].transform3D.translate.z
		]}
		quaternion={[
			image[1].transform3D.rotation.x,
			image[1].transform3D.rotation.y,
			image[1].transform3D.rotation.z,
			image[1].transform3D.rotation.w
		]}
		scale={[
			image[1].transform3D.scale.x, 
			image[1].transform3D.scale.y, 
			image[1].transform3D.scale.z
		]}
	/>
{/each}

{#each pileApp.state.objects3D as model}
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




