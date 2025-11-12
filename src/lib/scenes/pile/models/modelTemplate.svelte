<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import { Group, Vector3, Quaternion, Mesh } from 'three';
	import { pileState, isSelectedObject } from '../util/pileState.svelte';
	import { getModelPath } from './models';
	import type { Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	import type { Transform } from '../types';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		name = '',
		id = '',
		...props
	}: Props<Group> & {
		ref?: Group;
		children?: Snippet<[{ ref: Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		name?: string;
		id?: string;
	} = $props();
	interactivity();

	const gltfPath = getModelPath(name);
	const gltf = useGltf(gltfPath);
	let shown = $state(true);
	let mesh: Mesh

	let showThisTransformControls = $derived.by(() => {
		if (id && id != '' && isSelectedObject(id)) {
			return pileState.showTransformControls;
		} else {
			return false;
		}
	});

	export function getTransform(): Transform {
		const positionVec = new Vector3(0, 0, 0);
		const quaternionVec = new Quaternion(0, 0, 0, 0);
		const scaleVec = new Vector3(0, 0, 0);
		ref?.children[0].getWorldPosition(positionVec);
		ref?.children[0].getWorldQuaternion(quaternionVec);
		ref?.children[0].getWorldScale(scaleVec);
		const transform: Transform = {
			translate: { x: positionVec.x, y: positionVec.y, z: positionVec.z },
			rotation: { x: quaternionVec.x, y: quaternionVec.y, z: quaternionVec.z, w: quaternionVec.w },
			scale: { x: scaleVec.x, y: scaleVec.y, z: scaleVec.z }
		};
		return transform;
	}

	function handleDoubleClick(e: MouseEvent) {
		e.stopPropagation();
		if (!name) return;
		if (isSelectedObject(id)) {
			pileState.showTransformControls = !pileState.showTransformControls;
			pileState.selectedObjectID = null;
			return;
		} else {
			if (ref) {
				pileState.selectedObjectID = id;
			}
			pileState.showTransformControls = true;
		}
	}
</script>

<T.Group bind:ref dispose={true} {name}  {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		{#if shown}
			<TransformControls
				showX={showThisTransformControls}
				showY={showThisTransformControls}
				showZ={showThisTransformControls}
				mode={pileState.transformControlsMode}
			>
				<T.Mesh
					geometry={gltf.nodes[name].geometry}
					material={gltf.nodes[name].material}
					raycast={meshBounds}
					ondblclick={handleDoubleClick}
				></T.Mesh>
			</TransformControls>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
