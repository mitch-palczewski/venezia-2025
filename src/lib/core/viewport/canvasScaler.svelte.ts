import type { Viewport } from "./viewport.svelte";

export interface ScalerConfig {
    referenceWidth?: number;
    referenceHeight?: number;
    minScale?: number; 
    maxScale?: number;
    
}

export class CanvasScaler {
    public readonly viewport: Viewport
    public referenceWidth = $state(1920);
    public referenceHeight = $state(1080);
    public minScale = $state(0.4); 
    public maxScale = $state(5.0);
    public scale = $derived(this.getScaleFactor())

    constructor(viewport: Viewport, config?: ScalerConfig) {
        this.viewport = viewport;
        this.referenceWidth = config?.referenceWidth ?? 1920;
        this.referenceHeight = config?.referenceHeight ?? 1080;
    }

    /**
     * Calculates the proportional scale factor and clamps it 
     * within the defined minimum and maximum boundaries.
     */
    private getScaleFactor(): number {
        const rawScale = Math.min(
            this.viewport.width / this.referenceWidth,
            this.viewport.height / this.referenceHeight
        );

        return Math.max(this.minScale, Math.min(this.maxScale, rawScale));
    }

}

