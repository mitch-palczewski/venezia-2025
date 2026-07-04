


/**
 * NEEED TO FINISH
 * */

import type { CompassAnchor } from "../projected-element/projectedElementModel.svelte";

// 1. The baseline geometric data properties shared by ALL structural elements
export interface BaseElementConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex?: number;
}

// 2. The unified configurations representing the super-set of both behaviors
export interface CanvasElementConfig extends BaseElementConfig {
    // Projection specific options
    projectDimensions?: boolean;        
    anchor?: CompassAnchor;     

    // Interaction/Movable specific options
    draggable?: boolean;       
    showTransformGizmo?: boolean;
}

import type { CoordinateProjector } from '$lib/core/viewport/coordinateProjector.svelte';

export class CanvasElementModel {
    public readonly id = crypto.randomUUID();

    // Core Geometry Runes
    public x = $state(0);
    public y = $state(0);
    public width = $state(240);
    public height = $state(160);
    public zIndex = $state(1);

    // Contextual Behaviors
    public projectDimensions = $state(true);
    public anchor = $state<CompassAnchor>('NW');
    public draggable = $state(true);
    public showTransformGizmo = $state(false);

    // Optional projector reference if operating on an infinite workspace stage
    private projector = $state<CoordinateProjector | undefined>(undefined);

    constructor(config: CanvasElementConfig, projector?: CoordinateProjector) {
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.zIndex = config.zIndex ?? 1;

        this.projectDimensions = config.projectDimensions ?? true;
        this.anchor = config.anchor ?? 'NW';
        this.draggable = config.draggable ?? true;
        this.showTransformGizmo = config.showTransformGizmo ?? false;
        this.projector = projector;
    }

    /**
     * Compute real-time screen coordinates automatically if a projector is present.
     * This makes it trivially simple for any consumer layer to access computed values.
     */
    public pixelGeometry = $derived.by(() => {
        if (!this.projector) {
            // Tier 2 Fallback: Element is operating in native absolute layout pixels
            return { x: this.x, y: this.y, width: this.width, height: this.height };
        }

        // Tier 1 Canvas Projection Math:
        const pX = this.x * this.projector.scaleX;
        const pY = this.y * this.projector.scaleY;
        const pW = this.projectDimensions ? this.width * this.projector.scaleX : this.width;
        const pH = this.projectDimensions ? this.height * this.projector.scaleY : this.height;

        // Apply anchor point adjustments matching your engine mechanics
        // (E.g. modifying pX/pY matching 'C', 'NW', etc.)

        return { x: pX, y: pY, width: pW, height: pH };
    });
}