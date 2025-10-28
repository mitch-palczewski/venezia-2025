<script lang="ts">
	import type * as THREE from 'three';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name = 'Misc_01',
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: String;
	} = $props();

	type GLTFResult = {
		nodes: {
			Misc_01: THREE.Mesh;
		};
		materials: {};
	};
	interactivity();

	let showTransformControls: boolean = $state(false);
	let transformControlsMode: TransformControlsMode = $state('translate');

	const gltf = useGltf<GLTFResult>('/models/undertow/Misc_01.glb');
</script>

<T.Group bind:ref dispose={false} {name} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<TransformControls
			showX={showTransformControls}
			showY={showTransformControls}
			showZ={showTransformControls}
			mode={transformControlsMode}
		>
			<T.Mesh
				geometry={gltf.nodes.Misc_01.geometry}
				material={gltf.nodes.Misc_01.material}
				raycast={meshBounds}
				ondblclick={(e: any) => (showTransformControls = !showTransformControls)}
			/>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
