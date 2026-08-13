<script lang="ts">
	import type { Lodge } from '$lib/lodge/Lodge.svelte';
	import type { Group } from 'three';
	import { useObjectHold } from './useObjectHold.svelte';
	import { usePivotRotation } from './useKeyboardAxis';
	import { useObjectGrab } from './useObjectGrab.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { useKeyCycle } from './useKeyCycle.svelte';

	type Props = {
		lodge: Lodge;
		interactiveGroup: Group | undefined;
	};
	let { lodge, interactiveGroup }: Props = $props();

	const grab = useObjectGrab(() => (interactiveGroup ? interactiveGroup.children : []));
	const FKeyState = useKeyCycle(["No Orientation", "Orient To Camera", "Lock Pitch"], "KeyF");
	lodge.objectOrientState = FKeyState
	const isOrienting = () => {
		if (FKeyState.getIndex() >= 1) {
			return true;
		}
		return false;
	};
	const isLockedPitch = () => {
		if (FKeyState() === "Lock Pitch") {
			return true;
		}
		return false;
	};
	const hold = useObjectHold(
		() => grab.grabbedObject,
		() => grab.initialDistance,
		{ orientToCamera: isOrienting, lockPitch: isLockedPitch }
	);

	usePivotRotation(() => grab.grabbedObject);

	function onPointerDown(e: MouseEvent) {
		if (e.button !== 0 || !document.pointerLockElement) return;

		if (interactiveGroup) {
			grab.toggleGrab();
		}
	}

	onMount(() => {
		window.addEventListener('pointerdown', onPointerDown);
	});

	onDestroy(() => {
		window.removeEventListener('pointerdown', onPointerDown);
	});
</script>
