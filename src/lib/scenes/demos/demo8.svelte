<script lang="ts">
	import { generateTerrainGeometry } from '$lib/3d/generateTerrain';
	import { T, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import type { PlaneGeometry } from 'three';
	import * as THREE from 'three';
    

	let geometry: PlaneGeometry | undefined | null = null;
    const {scene} = useThrelte();
    scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0005 );

  

  onMount(() => {
    geometry = generateTerrainGeometry(7500, 7500, 10);
    console.log('terrain attributes', geometry?.attributes);
   
  });

</script>

<T.PerspectiveCamera
	makeDefault
    near={1}
    far={5000}
	position={[100, 800, -800]}
	oncreate={(ref) => {
		ref.lookAt(- 100, 810, - 800);
	}}
>
    
    <OrbitControls/>
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow intensity={1} />
<T.AmbientLight intensity={0.3} />


{#if geometry}
	<T.Mesh geometry={geometry} castShadow receiveShadow>
		<T.MeshStandardMaterial color="blue" />
	</T.Mesh>
{/if}

<T.Mesh>
	<T.TorusKnotGeometry />
	<T.MeshNormalMaterial />
</T.Mesh>
