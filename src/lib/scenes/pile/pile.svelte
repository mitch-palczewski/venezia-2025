<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';

	import PileZardoz01 from './models/pile_Zardoz_01.svelte';
	import type { ObjectPositions, PilePositionData } from './types';
	import {  Vector3, type Group, type Object3DEventMap } from 'three';

	let { rawPositionData } = $props()
	let pileZardoz01Ref: Group<Object3DEventMap>
	let pileZardoz01Position = new Vector3(0,0,0)
	
	setPositions()
	function setPositions(){
		console.log("Raw Position Data")
		console.log(rawPositionData)

		console.log(rawPositionData.data.pile_position_data)
	
	}
	
	export function getPositions(): PilePositionData {
		// return a fresh snapshot from scene state
		pileZardoz01Ref.getWorldPosition(pileZardoz01Position)
		console.log(pileZardoz01Position)
		return {'pile_position_data':{
			PileZardoz01: { 
				position: [pileZardoz01Position.x, pileZardoz01Position.y, pileZardoz01Position.z], 
				rotation: [0, 0, 0], 
				scale: [1, 1, 1] 
			},
			'TestObject': {
				position: [1,2,3],
				rotation: [4,5,6],
				scale:[1,1,1]
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
	oncreate={(ref)=>{
		pileZardoz01Ref = ref
	}}
	
	/>
