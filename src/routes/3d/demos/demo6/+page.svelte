<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import Scene from '$lib/scenes/demos/demo6.svelte';
	import { View } from '@threlte/extras';
	import * as THREE from 'three';

	type itemType = {
		dom: HTMLElement | undefined;
		geometry: geoTypes;
		material: THREE.MeshStandardMaterial;
	};

	type geoTypes =
		| THREE.BoxGeometry
		| THREE.SphereGeometry
		| THREE.DodecahedronGeometry
		| THREE.CylinderGeometry;

	const items: itemType[] = [];
	const geometries = [
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.SphereGeometry(0.5, 12, 8),
		new THREE.DodecahedronGeometry(0.5),
		new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
	];
	for (let i = 0; i < 40; i++) {
		const geometry = geometries[(geometries.length * Math.random()) | 0];
		const material = new THREE.MeshStandardMaterial({
			color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace),
			roughness: 0.5,
			metalness: 0,
			flatShading: true
		});
		items.push({ dom: undefined, geometry, material });
	}
</script>

<div id="container" class="bg-white">
	<div id="content" class="relative z-1 h-full">
		{#each items as item, i}
			<div id="item" class="m-4 inline-block p-4 shadow-md">
				<div bind:this={item.dom} class="h-[200px] w-[200px]"></div>
				<div class="mt-2">Scene {i + 1}</div>
			</div>
		{/each}
	</div>
	<div class="absolute top-0 h-full">
		<CanvasPortal>
			{#each items as item}
                <View dom={item.dom}>
                    <Scene {...item}/>
                </View>   
            {/each}
		</CanvasPortal>
	</div>
</div>
