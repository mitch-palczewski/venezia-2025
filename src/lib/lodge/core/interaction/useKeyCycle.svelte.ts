import { onDestroy, onMount } from 'svelte';

export type KeyCycleState<T> = {
	(): T;
	getIndex(): number;
	setIndex(index: number): void;
};

export function useKeyCycle<T>(states: T[], targetKey = 'KeyF', initialIndex = 0) {
	if (!states || states.length === 0) {
		throw new Error('useKeyCycle requires a non-empty states array.');
	}

	let currentIndex = $state(Math.max(0, Math.min(initialIndex, states.length - 1)));

	const onKeyDown = (e: KeyboardEvent) => {
		const target = e.target as HTMLElement;
		if (
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
		) {
			return;
		}
		if (e.code === targetKey && !e.repeat) {
			currentIndex = (currentIndex + 1) % states.length;
		}
	};

	onMount(() => {
		window.addEventListener('keydown', onKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown);
	});

	const getState = () => states[currentIndex];

	getState.getIndex = () => currentIndex;
	getState.setIndex = (index: number) => {
		currentIndex = Math.max(0, Math.min(index, states.length - 1));
	};

	return getState;
}
