import type { CoordinateProjector } from "$lib/core/projector/coordinateProjector.svelte";

export type CompassAnchor = 'NW' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'C';

export interface ProjectedElementFrameConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex?: number;
    projectDimensions?: boolean;        
    anchor?: CompassAnchor;     
}

export class ProjectedElementFrameModel{
    public x = $state(0);
    public y = $state(0);
    public width = $state(0);
    public height = $state(0);
    public zIndex = $state(1);
    public scale = $state(1)
    
    public projectDimensions = $state(true);
    public anchor = $state<CompassAnchor>('NW');

    public projector = $state<CoordinateProjector>();

    constructor(config: ProjectedElementFrameConfig, projector: CoordinateProjector) {
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.zIndex = config.zIndex ?? 1;
        this.projectDimensions = config.projectDimensions ?? true;
        this.anchor = config.anchor ?? 'NW';
        this.projector = projector;
    }

    public physicalWidth = $derived.by(() => {
        if (!this.projector || !this.projectDimensions) return this.width;
        return this.width * this.activeScaleX;
    });

    public physicalHeight = $derived.by(() => {
        if (!this.projector || !this.projectDimensions) return this.height;
        return this.height * this.activeScaleY;
    });

    private anchorOffset = $derived.by(() => {
        if (!this.projector || this.projectDimensions) return { x: 0, y: 0 };

        const sx = this.activeScaleX;
        const sy = this.activeScaleY;

        const diffW = this.width * sx - this.width;
        const diffH = this.height * sy - this.height;

        let offsetX = 0;
        let offsetY = 0;

        if (this.anchor.includes('E')) offsetX = diffW;         
        else if (!this.anchor.includes('W') && this.anchor !== 'N' && this.anchor !== 'S') {
            offsetX = diffW / 2;                               
        }

        if (this.anchor.includes('S')) offsetY = diffH;         
        else if (!this.anchor.includes('N') && this.anchor !== 'E' && this.anchor !== 'W') {
            offsetY = diffH / 2;                               
        }

        if (this.anchor === 'C') {
            offsetX = diffW / 2;
            offsetY = diffH / 2;
        }

        return { x: offsetX, y: offsetY };
    });

    public physicalX = $derived.by(() => {
        const base = this.projector ? (this.x * this.activeScaleX) : this.x;
        return base - this.anchorOffset.x;
    });

    public physicalY = $derived.by(() => {
        const base = this.projector ? (this.y * this.activeScaleY) : this.y;
        return base - this.anchorOffset.y;
    });

    public physicalBoundsStyle = $derived(`
        position: absolute;
        left: ${this.physicalX}px;
        top: ${this.physicalY}px;
        width: ${this.physicalWidth}px;
        height: ${this.physicalHeight}px;
        z-index: ${this.zIndex};
        transform-origin: ${this.getTransformOrigin()};
    `);

    private get activeScaleX() {
        return (this.projector?.scaleX ?? 1) * this.scale;
    }

    private get activeScaleY() {
        return (this.projector?.scaleY ?? 1) * this.scale;
    }

    private getTransformOrigin(): string {
        const mapping: Record<CompassAnchor, string> = {
            NW: 'top left', N: 'top center', NE: 'top right',
            E: 'center right', SE: 'bottom right', S: 'bottom center',
            SW: 'bottom left', W: 'center left', C: 'center center'
        };
        return mapping[this.anchor];
    }
}