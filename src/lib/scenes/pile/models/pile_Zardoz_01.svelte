<script lang="ts">
	import type { Props } from '@threlte/core';
	import * as THREE from 'three';
	import { T } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import { type Snippet } from 'svelte';
	import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
	import type { ModelName } from '../types';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name='Zardoz_01',
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: ModelName;
	} = $props();
	interactivity();

	let showTransformControls: boolean = $state(false);
	let transformControlsMode: TransformControlsMode = $state('translate');

	const gltf = useGltf('/models/undertow/Zardoz_01.glb');
</script>

<T.Group bind:ref dispose={false} name={name} {...props}>
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
				geometry={gltf.nodes.Zardoz_01.geometry}
				material={gltf.nodes.Zardoz_01.material}
				raycast={meshBounds}
				ondblclick={(e: any) => (showTransformControls = !showTransformControls)}
			></T.Mesh>
		</TransformControls>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
