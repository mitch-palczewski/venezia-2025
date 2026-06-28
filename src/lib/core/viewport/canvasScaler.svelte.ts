import type { Viewport } from "./viewport.svelte";

export interface ScalerConfig {
    referenceWidth?: number;
    referenceHeight?: number;
}

export class CanvasScaler {
    public readonly viewport: Viewport
    public referenceWidth = $state(1920);
    public referenceHeight = $state(1080);

    constructor(viewport: Viewport, config?: ScalerConfig) {
        this.viewport = viewport;
        this.referenceWidth = config?.referenceWidth ?? 1920;
        this.referenceHeight = config?.referenceHeight ?? 1080;
    }

    get scaleFactor(): number {
        return Math.min(
            this.viewport.width / this.referenceWidth,
            this.viewport.height / this.referenceHeight
        );
    }

}