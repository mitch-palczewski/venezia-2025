<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PileZardoz01 from './models/pile_Zardoz_01.svelte';
	import type { ObjectPositions, PilePositionData } from './types';
	import { Vector3, type Group, type Object3DEventMap } from 'three';
	import { pileState } from './pileState.svelte';

	let { rawPositionData } = $props();
	const pile_position_data: ObjectPositions = rawPositionData.data.pile_position_data;
	const pileZardoz01Data = pile_position_data.PileZardoz01;
	let pileZardoz01Ref: Group<Object3DEventMap>;

	debugFetch()
	function debugFetch(){
		//console.log('Raw Position Data');
		//console.log(rawPositionData);
		console.log('Fetched Position Data');
		console.log(rawPositionData.data.pile_position_data);
	}function debugUpload(pileZardoz01Position:Vector3){
		console.log("Debuging Position Upload")
		console.log("ref children list  -- should contain mesh")
		console.log(pileZardoz01Ref.children)

		console.log("ref.child[mesh] world position")
		console.log(pileZardoz01Position)

		console.log("ref.child[mesh] local position (NOT USED)")
		console.log(pileZardoz01Ref.children[0].position)
	}


	

	export function getPositions(): PilePositionData {
		// return a fresh snapshot from scene state
		let pileZardoz01V3Position = new Vector3(0,0,0)
		const pileZardoz01Position = pileZardoz01Ref.children[0].getWorldPosition(pileZardoz01V3Position)
		debugUpload(pileZardoz01Position)
		return {
			pile_position_data: {
				PileZardoz01: {
					position: {
						x: pileZardoz01Position.x,
						y: pileZardoz01Position.y,
						z: pileZardoz01Position.z
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

<PileZardoz01
	oncreate={(ref) => {
		pileZardoz01Ref = ref;
	}}
	position={[pileZardoz01Data.position.x, pileZardoz01Data.position.y, pileZardoz01Data.position.z]}
/>

<PileZardoz01 position={[1, 1, 1]} />
