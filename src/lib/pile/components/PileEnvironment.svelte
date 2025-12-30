<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import {
		EquirectangularReflectionMapping,
		SRGBColorSpace,
		NoToneMapping,
		LinearToneMapping
	} from 'three';

	let environmentPath = $state('/images/environment/world.jpg');
	const { scene, renderer } = useThrelte();
	const map = $derived(
		useTexture(environmentPath, {
			transform: (t) => {
				t.mapping = EquirectangularReflectionMapping;
				t.colorSpace = SRGBColorSpace;
				return t;
			}
		})
	);
	$effect(() => {
		if ($map) {
			scene.background = $map;
			scene.environment = $map;
			renderer.toneMapping = LinearToneMapping;
			renderer.toneMappingExposure = 0.8;
		}
	});
</script>
