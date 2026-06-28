import { getContext, setContext } from 'svelte';
import { Viewport } from './viewport.svelte';
import type { AspectRatio } from './viewport.types';

const VIEWPORT_KEY = Symbol('VIEWPORT_CONTEXT');

/**
 * Assigns a Viewport instance to the Svelte component context tree.
 * @param viewport The Viewport instance to provide to descending components.
 */
export function setViewportContext(viewport: Viewport) {
	setContext(VIEWPORT_KEY, viewport);
}

/**
 * Retrieves the Viewport instance from the Svelte component context tree.
 * @returns The active Viewport instance.
 * @throws {Error} If invoked outside an initialized Viewport context provider tree.
 */
export function useViewport() {
	const context = getContext<Viewport>(VIEWPORT_KEY);
	if (!context) {
		throw new Error(
			'useViewportContext missing context. Call initViewportContext() in a parent component.'
		);
	}
	return context;
}

/**
 * Initializes the Viewport tracker, binds it to Svelte context,
 * and automatically manages its event listener cleanups.
 */
export function initViewportContext(customTargets?: readonly AspectRatio[]): Viewport {
	const vp = new Viewport(customTargets);
	setViewportContext(vp);

	$effect(() => {
		return () => vp.destroy();
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			document.documentElement.setAttribute('data-ratio', vp.ratioSlug);
		}
	});
	return vp;
}
