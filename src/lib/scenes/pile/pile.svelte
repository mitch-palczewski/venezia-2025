<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Text } from '@threlte/extras';
	import PileZardoz01 from './models/pile_Zardoz_01.svelte';
	import { Quaternion, Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState, pushObjectRef } from './pileState.svelte';
	import TestWorld from '../demos/testWorld.svelte';
	import PileBurntBoy01 from './models/pile_BurntBoy_01.svelte';
	import PileMisc01 from './models/pile_Misc_01.svelte';
	import type {ObjectPositionsDTO, TransformDTO, PileDataDTO, RawDataDTO } from './types';

	interface Props {
		rawPositionData: RawDataDTO
	}
	let { rawPositionData }:Props = $props();
	const downloadedPositions = rawPositionData.data.pile_position_data;

	//for testing
	const Zardoz01ReadData = downloadedPositions.Zardoz_01;
	const BurntBoy01ReadData = downloadedPositions.BurntBoy_01;
	const Misc01ReadData = downloadedPositions.Misc_01;



	let pileObjectsRef: Array<Group<Object3DEventMap>> = [];

	export function getPositions(): PileDataDTO {
		// return a fresh snapshot from scene state
		const pileObjectPositions:ObjectPositionsDTO = {};

		pileObjectsRef.forEach((ref) => {
			const v3Position = new Vector3( 0, 0, 0);
			const quatRotation = new Quaternion( 0,0,0,0);
			const v3Scale = new Vector3( 0,0,0);
			ref.children[0].getWorldPosition(v3Position);
			ref.children[0].getWorldQuaternion(quatRotation)
			ref.children[0].getWorldScale(v3Scale)
			const transform: TransformDTO = {
				translate: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
				rotation: { x: quatRotation.x, y: quatRotation.y, z: quatRotation.z, w: quatRotation.w},
				scale: { x: v3Scale.x, y: v3Scale.y, z: v3Scale.z }
			};
			pileObjectPositions[ref.name] = transform;
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

<PileZardoz01
	oncreate={(ref) => {
		pushObjectRef(ref)
		pileObjectsRef.push(ref)
	}}
	position={[Zardoz01ReadData.translate.x, Zardoz01ReadData.translate.y, Zardoz01ReadData.translate.z]}
	quaternion={[Zardoz01ReadData.rotation.x, Zardoz01ReadData.rotation.y, Zardoz01ReadData.rotation.z, Zardoz01ReadData.rotation.w]}
	scale={[Zardoz01ReadData.scale.x, Zardoz01ReadData.scale.y, Zardoz01ReadData.scale.z]}
/>

<PileBurntBoy01
	oncreate={(ref) => {
		pileObjectsRef.push(ref)
		pushObjectRef(ref)
	}}
	position={[BurntBoy01ReadData.translate.x, BurntBoy01ReadData.translate.y, BurntBoy01ReadData.translate.z]}
	quaternion={[BurntBoy01ReadData.rotation.x, BurntBoy01ReadData.rotation.y, BurntBoy01ReadData.rotation.z, BurntBoy01ReadData.rotation.w]}
	scale={[BurntBoy01ReadData.scale.x, BurntBoy01ReadData.scale.y, BurntBoy01ReadData.scale.z]}
/>

<PileMisc01
oncreate={(ref) => {
		pileObjectsRef.push(ref)
		pushObjectRef(ref)
	}}
	position={[ Misc01ReadData.translate.x,Misc01ReadData.translate.y, Misc01ReadData.translate.z]}
	quaternion={[Misc01ReadData.rotation.x, Misc01ReadData.rotation.y, Misc01ReadData.rotation.z, Misc01ReadData.rotation.w]}
	scale={[Misc01ReadData.scale.x, Misc01ReadData.scale.y, Misc01ReadData.scale.z]}

/>