<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import PileZardoz01 from './models/pile_Zardoz_01.svelte';
	import Test1PileZardoz01 from './models/test1_pile_Zardoz_01.svelte';
	import PileZardoz02 from './models/pile_Zardoz_02.svelte';
	import type { ObjectPositions, PilePositionData } from './types';
	import { Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState } from './pileState.svelte';

	let { rawPositionData } = $props();
	const pile_position_data: ObjectPositions = rawPositionData.data.pile_position_data;
	const pileZardoz01Data = pile_position_data.PileZardoz01;
	let pileZardoz01Ref: Group<Object3DEventMap>;
	let pileZardoz01Position: [x: number, y: number, z: number] = $state([2, 2, 2]);

	function setPositions() {
		console.log('Raw Position Data');
		console.log(rawPositionData);

		console.log(rawPositionData.data.pile_position_data);
		pileZardoz01Position = [
			pileZardoz01Data.position.x,
			pileZardoz01Data.position.y,
			pileZardoz01Data.position.z
		];
	}

	export function getPositions(): PilePositionData {
		// return a fresh snapshot from scene state
		let pileZardoz01V3Position = new Vector3(0, 0, 0);
		//pileZardoz01Ref.getWorldPosition(pileZardoz01V3Position);
		console.log(pileZardoz01V3Position);
		return {
			pile_position_data: {
				PileZardoz01: {
					position: {
						x: pileZardoz01V3Position.x,
						y: pileZardoz01V3Position.y,
						z: pileZardoz01V3Position.z
					},
					rotation: { x: 0, y: 0, z: 0 },
					scale: { x: 0, y: 0, z: 0 }
				},
				TestObject: {
					position: { x: 0, y: 0, z: 0 },
					rotation: { x: 0, y: 0, z: 0 },
					scale: { x: 0, y: 0, z: 0 }
				}
			}
		};
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

<!--
<PileZardoz01
	oncreate={(ref) => {
		pileZardoz01Ref = ref;
	}}
	position={pileZardoz01Position}
/>
<Test1PileZardoz01 />
-->

<PileZardoz02/>


