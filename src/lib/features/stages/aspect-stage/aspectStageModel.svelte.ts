import type { Viewport } from "$lib/core";
import type { LayoutBounds } from "$lib/core/viewport/viewport.types";

export class AspectStageModel {
    public readonly viewport: Viewport;
    
    // Controlled margin percentage per side (e.g. 0.05 = 5% edge padding on all sides)
    public marginPercentage = $state(0);

    public bounds: LayoutBounds = $derived.by(() => {
        const viewW = this.viewport.width;
        const viewH = this.viewport.height;

        // Prevent layout calculation failures if window isn't sized yet
        if (viewW === 0 || viewH === 0) {
            return { width: 0, height: 0, offsetX: 0, offsetY: 0 };
        }

        const targetRatio = this.viewport.closestCommonRatioValue;
        
        // Calculate the maximum bounding box ceiling after padding margins are cleared
        const maxW = viewW * (1 - (this.marginPercentage * 2));
        const maxH = viewH * (1 - (this.marginPercentage * 2));

        // Start by sizing completely into the horizontal bounds ceiling
        let stageW = maxW;
        let stageH = maxW / targetRatio;

        // If the resulting container height breaks the vertical ceiling constraint -> Scale down to fit height
        if (stageH > maxH) {
            stageH = maxH;
            stageW = maxH * targetRatio;
        }

        return {
            width: stageW,
            height: stageH,
            offsetX: (viewW - stageW) / 2,
            offsetY: (viewH - stageH) / 2
        };
    });

    // Clean, direct, reactive getters mapping directly to your LayoutBounds interface
    public get width() { return this.bounds.width; }
    public get height() { return this.bounds.height; }
    public get offsetX() { return this.bounds.offsetX; }
    public get offsetY() { return this.bounds.offsetY; }

    constructor(viewport: Viewport, marginPercentage: number = 0) {
        this.viewport = viewport;
        this.marginPercentage = marginPercentage;
    }
}