<script lang="ts">
	import { T } from '@threlte/core';
	import type { Lodge } from './Lodge.svelte';
	import TestLodgeRoom from './components/test/TestLodgeRoom.svelte';
	import CameraControls from './core/CameraControls.svelte';
	import { Box3, Vector3, type Group } from 'three';
	import { useFPSGrab } from './core/useFPSGrab.svelte';
	import { onDestroy, onMount } from 'svelte';
	import TestCube from './components/test/TestCube.svelte';

	type Props = {
		lodge: Lodge;
	};
	let { lodge }: Props = $props();

	let interactiveGroup = $state<Group>();
	const grabSystem = useFPSGrab(3.0)

		function onPointerDown(e: MouseEvent) {
        if (e.button !== 0 || !document.pointerLockElement) return;

        if (interactiveGroup) {
            grabSystem.handleInteract(interactiveGroup.children);
        }
    }

    onMount(() => {
        window.addEventListener('pointerdown', onPointerDown);
    });

    onDestroy(() => {
        window.removeEventListener('pointerdown', onPointerDown);
    });

	function getRandomPosition(box: Box3, padding = 1.0): [number, number, number] {
        const minX = box.min.x + padding;
        const maxX = box.max.x - padding;
        const minZ = box.min.z + padding;
        const maxZ = box.max.z - padding;

        const x = minX + Math.random() * (maxX - minX);
        const z = minZ + Math.random() * (maxZ - minZ);
        const y = (box.min.y + padding) + Math.random() * (box.max.y - box.min.y - padding * 2);

        return [x, y, z];
    }
	let cubePositions = $derived.by(() => {
        if (!lodge.bounds) return [];

        return Array.from({ length: 10 }, () => getRandomPosition(new Box3(new Vector3(-9,0,-9), new Vector3(9,9,9))));
    });
</script>

<CameraControls {lodge} position={[0, 3, 0]} />

<T.AmbientLight intensity={2} />
<T.PointLight position={[0, 8, 0]} intensity={13} distance={25} />

<TestLodgeRoom {lodge} height={10} width={20} depth={20} />

 
<T.Group bind:ref={interactiveGroup}>
    {#each cubePositions as pos, i (i)}
		<TestCube position={pos}/>
    {/each}
</T.Group>