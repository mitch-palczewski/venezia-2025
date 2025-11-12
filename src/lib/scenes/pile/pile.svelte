<!--Contains All 3D content for Pile -->

<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Text } from '@threlte/extras';
	import { Quaternion, Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState, pushObjectRef } from './util/pileState.svelte';
	import TestWorld from '../demos/testWorld.svelte';
	import ModelTemplate from './models/modelTemplate.svelte';
	import type {
		ObjectPositionsPayload,
		Transform,
		PileDataPayload,
		RawDataPayload as RawPayload,
		Model
	} from './types';
	import { getModelPath } from './models/models';

	interface Props {
		rawPositionData: RawPayload;
	}
	let { rawPositionData }: Props = $props();
	let pileObjectRefs: Array<Group<Object3DEventMap>> = [];


	initObjectPositions(rawPositionData)
	
	
	export function getPositions(): PileDataPayload {
		// return a fresh snapshot from scene state
		const objectPositionsPayload: ObjectPositionsPayload = {};
		let id = 1001;
		pileState.pileObjectRefs.forEach((ref) => {
			console.log(ref);
			const v3Position = new Vector3(0, 0, 0);
			const quatRotation = new Quaternion(0, 0, 0, 0);
			const v3Scale = new Vector3(0, 0, 0);
			ref.children[0].getWorldPosition(v3Position);
			ref.children[0].getWorldQuaternion(quatRotation);
			ref.children[0].getWorldScale(v3Scale);
			const transform: Transform = {
				translate: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
				rotation: { x: quatRotation.x, y: quatRotation.y, z: quatRotation.z, w: quatRotation.w },
				scale: { x: v3Scale.x, y: v3Scale.y, z: v3Scale.z }
			};
			objectPositionsPayload[id] = { transform: transform, name: ref.name };
			id += 1;
		});

		return { pile_position_data: objectPositionsPayload };
	}

	function initObjectPositions(rawPositionData: RawPayload) {
		const positionData: ObjectPositionsPayload = rawPositionData.data.pile_position_data;
		for (const [key, value] of Object.entries(positionData)) {
			const downloadedModel: Model = {
				name: value.name,
				id: key,
				modelPath: getModelPath(value.name),
				transform: value.transform,
				ref: null,
				shown:true
			};
			pileState.pileModels.push(downloadedModel);
		}
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
<T.AmbientLight intensity={0.1} />

<TestWorld />
<Text
	text="Double click on Zardoz_01 to show or hide Transform Controls. 
	Try moving Zardoz_01 around uploading position data wait 30 sec then reloading the page. "
	color="black"
	anchorX="50%"
	position={[0, 2, -3.5]}
/>

{#each pileState.pileModels as model}
	<ModelTemplate
		name={model.name}
		id={model.id}
		oncreate={(ref) => {
			pileObjectRefs.push(ref);
			pushObjectRef(ref);
			pileState.maxID += 1;
			model.ref = ref
		}}
		position={[
			model.transform!.translate.x,
			model.transform!.translate.y,
			model.transform!.translate.z
		]}
		quaternion={[
			model.transform!.rotation.x,
			model.transform!.rotation.y,
			model.transform!.rotation.z,
			model.transform!.rotation.w
		]}
		scale={[model.transform!.scale.x, model.transform!.scale.y, model.transform!.scale.z]}
	/>
{/each}



