import { getContext, setContext } from "svelte";
import type { Viewport } from "./viewport.svelte";


const VIEWPORT_KEY = Symbol('VIEWPORT_CONTEXT')

export function setViewportContext(viewport: Viewport){
    setContext(VIEWPORT_KEY, viewport)
}

export function useViewportContext(){
    const context = getContext<Viewport>(VIEWPORT_KEY)
    if (!context) {
        throw new Error('useViewport must be called within a component tree initialized with setViewportContext');
    }
    return context;
}