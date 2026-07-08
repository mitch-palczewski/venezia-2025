import { createContext, getContext, setContext } from 'svelte';
import { CoordinateProjector } from './coordinateProjector.svelte';
import type { Viewport } from '../viewport/viewport.svelte';


const VIEWPORT_PROJECTOR_KEY = Symbol('VIEWPORT_PROJECTOR_CONTEXT');

/**
 * Assigns a Projector instance to the Svelte component context tree.
 * @param projector The Projector instance to provide to descending components.
 */
export function setViewportProjectorContext(projector: CoordinateProjector) {
    setContext(VIEWPORT_PROJECTOR_KEY, projector);
}

/**
 * Retrieves the Projector instance from the Svelte component context tree.
 * @returns The active Projector instance.
 * @throws {Error} If invoked outside an initialized Projector context provider tree.
 */
export function useViewportProjector() {
    const context = getContext<CoordinateProjector>(VIEWPORT_PROJECTOR_KEY);
    if (!context) {
        throw new Error(
            'useViewportProjector missing context. Call initViewportProjectorContext() in a parent component.'
        );
    }
    return context;
}

/**
 * Initializes the Projector tracker, binds it to Svelte context,
 * and automatically manages its event listener cleanups.
 */
export function initViewportProjectorContext(viewport: Viewport): CoordinateProjector {
    const projector = new CoordinateProjector(viewport)
    setViewportProjectorContext(projector)
    return projector
}

/**
 * Allows for the get and set of ProjectorContext
 */
export const [getProjectorContext, setProjectorContext] = createContext<CoordinateProjector>();

/**
 * 
 * @returns CoordinateProjector or null
 */
export function safeGetProjectorContext() {
    try {
        return getProjectorContext();
    } catch {
        return null; // Suppresses "missing_context" if called outside a projector tree
    }
}