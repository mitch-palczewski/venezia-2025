<script lang="ts">
	import type { Lodge } from '$lib/lodge/Lodge.svelte';
	import { Box3, type Group } from 'three';
	import { useObjectHold } from './useObjectHold.svelte';
	import { useObjectGrab } from './useObjectGrab.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { usePivotReset } from './pivot/usePivotReset';
	import { useKeyCycle } from './key-listeners/useKeyCycle.svelte';
	import { usePivotRotation } from './pivot/usePivotRotation';
	import { usePivotScale } from './pivot/usePivotScale';

	type Props = {
		lodge: Lodge;
		interactiveGroup: Group | undefined;
	};
	let { lodge, interactiveGroup }: Props = $props();

	//Object orientation 
	const orientationCycle = useKeyCycle(['No Orientation', 'Orient To Camera'], 'KeyF', null, 1);
	lodge.heldObjectOrientationState = orientationCycle;
	const isOrientingToCamera = () => orientationCycle.getIndex() >= 1;

	//Grab Objects
	const grab = useObjectGrab(() => (interactiveGroup ? interactiveGroup.children : []));
	const getGrabbedObject = () => grab.grabbedObject;
	
	//Hold Objects
	const _heldObjectBounds = new Box3();
	const hold = useObjectHold(
		getGrabbedObject,
		() => grab.initialDistance,
		{
			orientToCamera: isOrientingToCamera,
			lockPitch: () => true,
			bounds: () => {
				if (!lodge.bounds) return null;
				return _heldObjectBounds.copy(lodge.bounds).expandByScalar(1);
			}
		}
	);

	//Transform Objects on Pivot
	usePivotRotation(getGrabbedObject);
	usePivotReset(getGrabbedObject);
	usePivotScale(getGrabbedObject);

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
