<script lang="ts">
	import { moveCamera, useKeyboardMovement } from '$lib/3d/core/controls/keyboardMovement';
	import { useFirstPersonControls } from '$lib/3d/core/controls/movement/firstPersonControls';
	import { T, useThrelte } from '@threlte/core';
	import type { Lodge } from '../Lodge.svelte';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof T.PerspectiveCamera> & {
		lodge: Lodge;
		speed?: number;
	};
	let { lodge, speed = 7, ...rest }: Props = $props();

	let { camera } = useThrelte();

	useFirstPersonControls();

	useKeyboardMovement(
		() => speed,
		(step) => moveCamera(camera.current, step, lodge.bounds),
		{ lockYMovement: true }
	);
</script>

<T.PerspectiveCamera makeDefault fov={75} {...rest}></T.PerspectiveCamera>
