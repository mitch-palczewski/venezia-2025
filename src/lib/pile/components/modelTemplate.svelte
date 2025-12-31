<script lang="ts">
	import { isInstanceOf, T } from '@threlte/core';
	import { interactivity, meshBounds, TransformControls, useGltf } from '@threlte/extras';
	import { Group, Vector3, Quaternion, Mesh, Object3D } from 'three';
	import type { Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	import type { Transform3D } from '../types';
	import type { PileObject3D } from '../util/pileObject.svelte';
	import type { PileApp } from '../util/pileApp.svelte';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		pileObjectData,
		pileApp,
		...props
	}: Props<Group> & {
		children?: Snippet<[{ ref: Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		ref?: Group;
		pileObjectData: PileObject3D;
		pileApp: PileApp;
	} = $props();
	interactivity();

	let shown = $state(pileObjectData.shown);
	const gltf = useGltf(pileObjectData.objectMap.path ?? '');
	const sceneChildren = $derived.by(() => {
		if (!$gltf || !$gltf.scene.children) {
			return [];
		}
		const thisSceneChildren = Object.values($gltf.scene.children) as Mesh[];
		console.log(`3D Object: ${pileObjectData.name}  `,thisSceneChildren)
		return thisSceneChildren;
	});

	let showThisTransformControls = $derived.by(() => {
		if (
			pileObjectData.id &&
			pileObjectData.id != '' &&
			pileApp.state.isSelected(pileObjectData.id)
		) {
			return pileApp.state.showTransformControls;
		} else {
			return false;
		}
	});

	export function getTransform(): Transform3D {
		const positionVec = new Vector3(0, 0, 0);
		const quaternionVec = new Quaternion(0, 0, 0, 0);
		const scaleVec = new Vector3(0, 0, 0);
		ref?.children[0].getWorldPosition(positionVec);
		ref?.children[0].getWorldQuaternion(quaternionVec);
		ref?.children[0].getWorldScale(scaleVec);
		const transform: Transform3D = {
			translate: { x: positionVec.x, y: positionVec.y, z: positionVec.z },
			rotation: { x: quaternionVec.x, y: quaternionVec.y, z: quaternionVec.z, w: quaternionVec.w },
			scale: { x: scaleVec.x, y: scaleVec.y, z: scaleVec.z }
		};
		return transform;
	}


	/**
	 * Modifies the pile state showTransformControls and selectedObjectID
	*/
	function handleModelClick(e: MouseEvent) {
		e.stopPropagation();
		if (!pileObjectData.id) return;
		if (pileApp.state.isSelected(pileObjectData.id)) {
			pileApp.state.showTransformControls = !pileApp.state.showTransformControls;
			pileApp.state.selectedObjectID = null;
			return;
		} else {
			if (ref) {
				pileApp.state.selectedObjectID = pileObjectData.id;
			}
			pileApp.state.showTransformControls = true;
		}
	}
</script>

<!-- 
	SNIPPET
	parameter: sceneChildren: Object3D[]
	description: If child is group calls self recursivly. If Mesh creates mesh. 
 -->
{#snippet sceneBuilder(sceneChildren: Object3D[])}
	{#each sceneChildren as child}
		{#if child.type == 'Group' && child.children || child.type == 'Object3D' && child.children}
			<T.Group
				position={[child.position.x, child.position.y, child.position.z]}
				rotation={[child.rotation.x, child.rotation.y, child.rotation.z]}
				scale={[child.scale.x, child.scale.y, child.scale.z]}
			>
				{@render sceneBuilder(child.children)}
			</T.Group>
		{/if}
		{#if child.type == 'Mesh' && isInstanceOf(child, 'Mesh')}
			<T.Mesh
				geometry={(child as Mesh).geometry}
				material={(child as Mesh).material}
				position={[child.position.x, child.position.y, child.position.z]}
				rotation={[child.rotation.x, child.rotation.y, child.rotation.z]}
				scale={[child.scale.x, child.scale.y, child.scale.z]}
				raycast={meshBounds}
				onclick={handleModelClick}
			/>
		{/if}
	{/each}
{/snippet}

<!-- MAIN EXECUTION -->
<T.Group bind:ref dispose={true} {name} {...props} scale={pileObjectData.uniformScale!}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		{#if shown && sceneChildren}
			<TransformControls
				showX={showThisTransformControls}
				showY={showThisTransformControls}
				showZ={showThisTransformControls}
				mode={pileApp.state.transformControlsMode}
			>
				<T.Group >
					{@render sceneBuilder(sceneChildren)}
				</T.Group>
			</TransformControls>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
