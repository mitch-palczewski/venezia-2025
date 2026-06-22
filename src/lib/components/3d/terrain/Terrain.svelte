<script lang="ts">
	import { onMount } from 'svelte';
	import type { BufferGeometry, Group } from 'three';
	import { generateTerrainGeometry } from './generateTerrain';
	import { T } from '@threlte/core';
	import { PI, rotate } from 'three/tsl';
	import { degToRad } from 'three/src/math/MathUtils.js';
	let geometry: BufferGeometry | null = null;

	onMount(() => {
		geometry = generateTerrainGeometry(50000, 70000, 200);
	});
</script>

{#if geometry}
	<T.Group position={[-80000, 60000, 4000]}>
		<T.Mesh {geometry} rotation={[degToRad(90), 0, 0]}>
			<T.MeshStandardMaterial color="#5c67cc" />
		</T.Mesh>
        <T.Mesh {geometry} rotation={[degToRad(30), 0, degToRad(30)]}>
			<T.MeshStandardMaterial color="#b694e0" />
		</T.Mesh>
         <T.Mesh {geometry} rotation={[degToRad(-30), 20, 0]}>
			<T.MeshStandardMaterial color="#00dba8" />
		</T.Mesh>
        <T.Mesh {geometry} rotation={[degToRad(-30), 50, -24]}>
			<T.MeshStandardMaterial color="#35b87b" />
		</T.Mesh>
        <T.Mesh {geometry} rotation={[12, -1.4, -2.9]}>
			<T.MeshStandardMaterial color="#5cb9cc" />
		</T.Mesh>
	</T.Group>

    <T.Group position={[80000, 60000, 4000]}>
		<T.Mesh {geometry} >
			<T.MeshStandardMaterial color="#5c67cc" />
		</T.Mesh>
        <T.Mesh {geometry} position={[0,1000,0]}>
			<T.MeshStandardMaterial color="#b694e0" />
		</T.Mesh>
         <T.Mesh {geometry} position={[0,2000,0]}>
			<T.MeshStandardMaterial color="#00dba8" />
		</T.Mesh>
        <T.Mesh {geometry} position={[0,3000,0]}>
			<T.MeshStandardMaterial color="#35b87b" />
		</T.Mesh>
        <T.Mesh {geometry} position={[0,4000,0]}>
			<T.MeshStandardMaterial color="#5cb9cc" />
		</T.Mesh>
	</T.Group>
{/if}
