<script lang="ts">
	import { Box3, Group, Vector3 } from "three";
	import TestCube from "./TestCube.svelte";
	import { T } from "@threlte/core";
	import type { Lodge } from "$lib/lodge/Lodge.svelte";
	import TestLightSwitch from "./TestLightSwitch.svelte";
	import CuBeSpawner from "./CubeSpawner.svelte";
	import GrabbableModel from "../GrabbableModel.svelte";

    type Props = {
        lodge: Lodge
        interactiveGroup?:Group
    }
    let {lodge, interactiveGroup = $bindable()}: Props = $props()

    function getRandomPosition(box: Box3, padding = 1.0): [number, number, number] {
		const minX = box.min.x + padding;
		const maxX = box.max.x - padding;
		const minZ = box.min.z + padding;
		const maxZ = box.max.z - padding;

		const x = minX + Math.random() * (maxX - minX);
		const z = minZ + Math.random() * (maxZ - minZ);
		const y = box.min.y + padding + Math.random() * (box.max.y - box.min.y - padding * 2);

		return [x, y, z];
	}
	let cubePositions = $derived.by(() => {
		if (!lodge.bounds) return [];

		return Array.from({ length: 4 }, () =>
			getRandomPosition(new Box3(new Vector3(-9, 0, -9), new Vector3(9, 9, 9)))
		);
	});
</script>


<T.Group bind:ref={interactiveGroup}>
	{#each cubePositions as pos, i (i)}
		<TestCube position={pos} />
	{/each}

	<GrabbableModel url={"/models/Misc_04_LOD1.glb"} scale={.5}/>
	<GrabbableModel url={"/models/VEN_Stock_04_LOD1.glb"} scale={.5} position={[3,1,3]}/>

	<CuBeSpawner position={[-8,-.1, 8]}/>
	<TestLightSwitch position={[3,5,-9.9]}/>
	<TestLightSwitch position={[-3,5,9.9]} rotation={[0,Math.PI,0]}/>
</T.Group>

