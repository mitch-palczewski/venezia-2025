<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Text } from '@threlte/extras';
	import PileZardoz01 from './models/pile_Zardoz_01.svelte';
	import type { ObjectPositions, ObjectTransform, PilePositionData } from './types';
	import { Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState } from './pileState.svelte';
	import TestWorld from '../demos/testWorld.svelte';
	import PileBurntBoy01 from './models/pile_BurntBoy_01.svelte';

	let { rawPositionData } = $props();
	const pile_position_data: ObjectPositions = rawPositionData.data.pile_position_data;
	const Zardoz01ReadData = pile_position_data.Zardoz_01;
	const BurntBoy01ReadData = pile_position_data.BurntBoy_01;
	let zardoz01Ref: Group<Object3DEventMap>;

	let pileObjectsRef: Array<Group<Object3DEventMap>> = [];

	export function getPositions(): PilePositionData {
		// return a fresh snapshot from scene state
		const pileObjectPositions: ObjectPositions = {};

		pileObjectsRef.forEach((ref) => {
			const v3Position = new Vector3(0, 0, 0);
			ref.children[0].getWorldPosition(v3Position);
			const transform: ObjectTransform = {
				position: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
				rotation: { x: 0, y: 0, z: 0 },
				scale: { x: 0, y: 0, z: 0 }
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
		zardoz01Ref = ref;
		pileObjectsRef.push(zardoz01Ref);
	}}
	position={[Zardoz01ReadData.position.x, Zardoz01ReadData.position.y, Zardoz01ReadData.position.z]}
/>

<PileBurntBoy01
	oncreate={(ref) => {
		pileObjectsRef.push(ref);
	}}
	position={[BurntBoy01ReadData.position.x, BurntBoy01ReadData.position.y, BurntBoy01ReadData.position.z]}
/>
