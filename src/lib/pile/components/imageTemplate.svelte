<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, meshBounds, SVG, TransformControls, useTexture } from '@threlte/extras';
	import { Group, Vector3, Quaternion, Texture } from 'three';
	import type { AsyncWritable, Props } from '@threlte/core';
	import { type Snippet } from 'svelte';
	import type { Transform3D } from '../types';
	import type { PileObject2D } from '../util/pileObject.svelte';
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
		pileObjectData: PileObject2D;
		pileApp: PileApp;
	} = $props();
	interactivity();

	let shown = $state(pileObjectData.shown);
	const imageEntry = pileApp.imageInventory.get(pileObjectData.name);
	console.log(`2D Object: ${pileObjectData.name}`);
	let texture: null | AsyncWritable<Texture> = $state(null);

	if (imageEntry?.fileType === 'png') {
		texture = useTexture(imageEntry.path);
	}

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

<!-- MAIN EXECUTION -->
<T.Group bind:ref dispose={true} {name} {...props} scale={pileObjectData.uniformScale!}>
	{#await imageEntry?.path}
		{@render fallback?.()}
	{:then}
		{#if shown}
			<TransformControls
				showX={showThisTransformControls}
				showY={showThisTransformControls}
				showZ={showThisTransformControls}
				mode={pileApp.state.transformControlsMode}
			>
				{#if imageEntry?.fileType === 'svg'}
					<SVG
						src={imageEntry.path}
						fillMeshProps={{ onclick: handleModelClick }}
						raycast={meshBounds}
						
					/>
				{:else if imageEntry?.fileType === 'png'}
					{#await texture then map}
						<T.Mesh onclick={handleModelClick} raycast={meshBounds}>
							<T.PlaneGeometry args={[1, map?.image.height / map?.image.width]} />
							<T.MeshBasicMaterial {map} transparent={true} side={2} alphaTest={0.5} />
						</T.Mesh>
					{/await}
				{/if}
			</TransformControls>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{#if ref}
		{@render children?.({ ref })}
	{/if}
</T.Group>
