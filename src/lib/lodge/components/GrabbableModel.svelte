<!-- GrabbableModel.svelte -->
<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import type { ComponentProps } from 'svelte';
	import type { Mesh } from 'three';

	type Props = ComponentProps<typeof T.Group> & {
		url: string;
	};

	let { url, userData, ...rest }: Props = $props();

	const gltf = useGltf(url);

	// Traverse the scene graph once the GLTF finishes loading
	$effect(() => {
		if ($gltf?.scene) {
			$gltf.scene.traverse((child) => {
				if ((child as Mesh).isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
		}
	});
</script>

{#if $gltf}
	<T.Group userData={{ interactionType: 'grab', ...userData }} {...rest}>
		<T.Group name="pivot">
			<T is={$gltf.scene} />
		</T.Group>
	</T.Group>
{/if}
