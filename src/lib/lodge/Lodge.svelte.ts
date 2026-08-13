import type { Box3 } from 'three';
import type { KeyCycleState } from './core/interaction/useKeyCycle.svelte';

export class Lodge {
	public bounds = $state<Box3>();
	public objectOrientState = $state<KeyCycleState<string>>();

	constructor() {}
}
