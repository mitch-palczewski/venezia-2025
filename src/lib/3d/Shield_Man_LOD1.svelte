
<script lang="ts">
	import type * as THREE from 'three';
	import modelUrl from '$lib/assets/3D/Shield_Man/Shield_Man_LOD1.glb?url';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
	} = $props();

	type GLTFResult = {
		nodes: {
			Quad_Sphere_1: THREE.Mesh;
			Quad_Sphere_2: THREE.Mesh;
			Quad_Sphere_3: THREE.Mesh;
			Quad_Sphere_4: THREE.Mesh;
			Quad_Sphere_5: THREE.Mesh;
			Quad_Sphere_6: THREE.Mesh;
			Quad_Sphere_7: THREE.Mesh;
			Handle_1: THREE.Mesh;
			Handle_2: THREE.Mesh;
			Handle_3: THREE.Mesh;
			Handle_4: THREE.Mesh;
			Handle_5: THREE.Mesh;
			Handle_6: THREE.Mesh;
			Tube_1: THREE.Mesh;
			Tube_2: THREE.Mesh;
			Tube_3: THREE.Mesh;
		};
		materials: {};
	};

	const gltf = useGltf<GLTFResult>(modelUrl);
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Group position={[0, 0, -0.2]} rotation={[-0.1, 0, 0]}>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_1.geometry}
				material={gltf.nodes.Quad_Sphere_1.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_2.geometry}
				material={gltf.nodes.Quad_Sphere_2.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_3.geometry}
				material={gltf.nodes.Quad_Sphere_3.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_4.geometry}
				material={gltf.nodes.Quad_Sphere_4.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_5.geometry}
				material={gltf.nodes.Quad_Sphere_5.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_6.geometry}
				material={gltf.nodes.Quad_Sphere_6.material}
			/>
			<T.Mesh
				geometry={gltf.nodes.Quad_Sphere_7.geometry}
				material={gltf.nodes.Quad_Sphere_7.material}
			/>
		</T.Group>
		<T.Group position={[-0.15, -0.09, 0.05]} rotation={[-1.57, 0.34, 0]} scale={2.33}>
			<T.Mesh geometry={gltf.nodes.Handle_1.geometry} material={gltf.nodes.Handle_1.material} />
			<T.Mesh geometry={gltf.nodes.Handle_2.geometry} material={gltf.nodes.Handle_2.material} />
			<T.Mesh geometry={gltf.nodes.Handle_3.geometry} material={gltf.nodes.Handle_3.material} />
			<T.Mesh geometry={gltf.nodes.Handle_4.geometry} material={gltf.nodes.Handle_4.material} />
			<T.Mesh geometry={gltf.nodes.Handle_5.geometry} material={gltf.nodes.Handle_5.material} />
			<T.Mesh geometry={gltf.nodes.Handle_6.geometry} material={gltf.nodes.Handle_6.material} />
		</T.Group>
		<T.Group position={[0.06, 0, 0]} rotation={[0, 0, 0.32]}>
			<T.Mesh geometry={gltf.nodes.Tube_1.geometry} material={gltf.nodes.Tube_1.material} />
			<T.Mesh geometry={gltf.nodes.Tube_2.geometry} material={gltf.nodes.Tube_2.material} />
			<T.Mesh geometry={gltf.nodes.Tube_3.geometry} material={gltf.nodes.Tube_3.material} />
		</T.Group>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
