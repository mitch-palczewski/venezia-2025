<!--Contains All 3D content for Pile -->

<script lang="ts">
	import { T } from '@threlte/core';
	import { CubeEnvironment, Environment, OrbitControls, Text } from '@threlte/extras';
	import { Quaternion, Vector3 } from 'three';
	import { pileState } from './util/pileState.svelte';
	import TestWorld from '../demos/testWorld.svelte';
	import ModelTemplate from './models/modelTemplate.svelte';
	import type {
		ObjectPositionPayload,
		Transform,
		PileDataPayload,
		RawDataPayload as RawPayload,
		Model
	} from './types';
	import { getModelPath } from './models/models';

	interface Props {
		rawPositionData: RawPayload;
	}
	let { rawPositionData }: Props = $props();

	initObjectPositions(rawPositionData);

	export function getPositions(): PileDataPayload {
		// return a fresh snapshot from scene state
		const objectPositionsPayload: ObjectPositionPayload = {};
		let id = 1001;
		pileState.pileModels.forEach((model) => {
			try {
				if (model.shown) {
					console.log(model.ref);
					const v3Position = new Vector3(0, 0, 0);
					const quatRotation = new Quaternion(0, 0, 0, 0);
					const v3Scale = new Vector3(0, 0, 0);
					model.ref?.children[0].getWorldPosition(v3Position);
					model.ref?.children[0].getWorldQuaternion(quatRotation);
					model.ref?.children[0].getWorldScale(v3Scale);
					const transform: Transform = {
						translate: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
						rotation: {
							x: quatRotation.x,
							y: quatRotation.y,
							z: quatRotation.z,
							w: quatRotation.w
						},
						scale: { x: v3Scale.x, y: v3Scale.y, z: v3Scale.z }
					};
					objectPositionsPayload[id] = { transform: transform, name: model.name };
					id += 1;
				}
			} catch (e) {
				console.log(e);
			}
		});

		return { pile_position_data: objectPositionsPayload };
	}

	function initObjectPositions(rawPositionData: RawPayload) {
		const positionData: ObjectPositionPayload = rawPositionData.data.pile_position_data;
		for (const [key, value] of Object.entries(positionData)) {
			const downloadedModel: Model = {
				name: value.name,
				id: key,
				modelPath: getModelPath(value.name),
				transform: value.transform,
				ref: null,
				shown: true
			};
			pileState.pileModels.push(downloadedModel);
		}
	}
</script>

<T.PerspectiveCamera
	makeDefault
	position={[1, 2, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight intensity={0.08} />
<Environment
	url={"/images/environment/world.jpg"}
	isBackground={true}
/>

<TestWorld />

{#each pileState.pileModels as model}
	<ModelTemplate
		name={model.name}
		id={model.id}
		oncreate={(ref) => {
			pileState.maxID += 1;
			model.ref = ref;
		}}
		position={[
			model.transform!.translate.x,
			model.transform!.translate.y,
			model.transform!.translate.z
		]}
		quaternion={[
			model.transform!.rotation.x,
			model.transform!.rotation.y,
			model.transform!.rotation.z,
			model.transform!.rotation.w
		]}
		scale={[model.transform!.scale.x, model.transform!.scale.y, model.transform!.scale.z]}
	/>
{/each}
