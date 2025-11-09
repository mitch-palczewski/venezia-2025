<!--Contains All 3D content for Pile -->

<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Text } from '@threlte/extras';
	import { Quaternion, Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState, pushObjectRef } from './util/pileState.svelte';
	import TestWorld from '../demos/testWorld.svelte';
	import ModelTemplate from './models/modelTemplate.svelte';
	import type { ObjectPositionsDTO, Transform, PileDataDTO, RawDataDTO, Models } from './types';

	interface Props {
		rawPositionData: RawDataDTO;
	}
	let { rawPositionData }: Props = $props();
	const positionData: ObjectPositionsDTO = rawPositionData.data.pile_position_data;
	const downloadedObjects = Object.entries(positionData);
	const newObjects: Models = []

	let pileObjectsRef: Array<Group<Object3DEventMap>> = [];

	export function getPositions(): PileDataDTO {
		// return a fresh snapshot from scene state
		const pileObjectPositions: ObjectPositionsDTO = {};
		let id = 1001
		pileObjectsRef.forEach((ref) => {
			console.log(ref)
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
			pileObjectPositions[id] = {transform:transform, name: ref.name};
			id += 1
		});

		return { pile_position_data: pileObjectPositions };
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


{#each pileState.newModels as model}
	<ModelTemplate
		name={model.name}
		oncreate={(ref) => {
			pileObjectsRef.push(ref);
			pushObjectRef(ref);
		}}
		position={[model.transform.translate.x, model.transform.translate.y, model.transform.translate.z]}
	/>
{/each}

{#each downloadedObjects as [key, value] (key)}
	<ModelTemplate
		name={value.name}
		id={pileState.maxID}
		oncreate={(ref) => {
			pileObjectsRef.push(ref);
			pushObjectRef(ref);
			pileState.maxID += 1
		}}
		position={[value.transform.translate.x, value.transform.translate.y, value.transform.translate.z]}
		quaternion={[
			value.transform.rotation.x,
			value.transform.rotation.y,
			value.transform.rotation.z,
			value.transform.rotation.w
		]}
		scale={[value.transform.scale.x, value.transform.scale.y, value.transform.scale.z]}
	/>
{/each}
