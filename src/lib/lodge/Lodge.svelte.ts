import type { Box3 } from 'three';
import type { KeyCycleState } from './core/interaction/key-listeners/useKeyCycle.svelte';

export class Lodge {
	public bounds = $state<Box3>();
	public heldObjectOrientationState = $state<KeyCycleState<string>>();

	constructor() {}
}
