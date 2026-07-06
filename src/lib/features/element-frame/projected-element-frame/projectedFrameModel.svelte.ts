import type { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
import { getAnchorOffset, getTransformOrigin, type CompassAnchor } from '../util/anchor';
import type { BaseFrameConfig, ProjectedElementFrameConfig } from './projectedFrame.types';

type InternalConfig = BaseFrameConfig & {
    projectedWidth?: number;
    projectedHeight?: number;
    pixelWidth?: number;
    pixelHeight?: number;
};

export class ProjectedFrameModel {
	public x = $state(0);
    public y = $state(0);

	public projectedWidth = $state<number | undefined>(undefined);
    public projectedHeight = $state<number | undefined>(undefined);
    public pixelWidth = $state<number | undefined>(undefined);
    public pixelHeight = $state<number | undefined>(undefined);

    public zIndex = $state(1);
    public scale = $state(1);
    public anchor = $state<CompassAnchor>('NW');
    public projector = $state<CoordinateProjector>();

    public measuredWidth = $state(0);
    public measuredHeight = $state(0);



	constructor(config: ProjectedElementFrameConfig, projector: CoordinateProjector)
	constructor(config: InternalConfig, projector: CoordinateProjector) {
		this.x = config.x;
        this.y = config.y;

		this.projectedWidth = config.projectedWidth;
        this.projectedHeight = config.projectedHeight;
        this.pixelWidth = config.pixelWidth;
        this.pixelHeight = config.pixelHeight;

        this.zIndex = config.zIndex ?? 1;
        this.anchor = config.anchor ?? 'NW';
        this.projector = projector;

        this.measuredWidth = this.projectedWidth ?? this.pixelWidth ?? 0;
        this.measuredHeight = this.projectedHeight ?? this.pixelHeight ?? 0;
	}

	public readonly isContentDrivenWidth: boolean = $derived(this.projectedWidth === undefined && this.pixelWidth === undefined);
    public readonly isContentDrivenHeight: boolean = $derived(this.projectedHeight === undefined && this.pixelHeight === undefined);

	public isReady = $derived(
        (!this.isContentDrivenWidth || this.measuredWidth > 0) &&
        (!this.isContentDrivenHeight || this.measuredHeight > 0)
    );

	public activeScaleX = $derived((this.projector?.scaleX ?? 1) * this.scale);
    public activeScaleY = $derived((this.projector?.scaleY ?? 1) * this.scale);

	public physicalWidth = $derived.by(() => {
        if (this.isContentDrivenWidth) return undefined;
        if (this.pixelWidth !== undefined) return this.pixelWidth;
        return this.projectedWidth! * this.activeScaleX;
    });

    public physicalHeight = $derived.by(() => {
        if (this.isContentDrivenHeight) return undefined;
        if (this.pixelHeight !== undefined) return this.pixelHeight;
        return this.projectedHeight! * this.activeScaleY;
    });

	private anchorOffset = $derived.by(() => {
		const w = this.physicalWidth ?? this.measuredWidth;
        const h = this.physicalHeight ?? this.measuredHeight;
		return getAnchorOffset(w, h, this.anchor);
	});

	public physicalX = $derived.by(() => {
		return this.x * this.activeScaleX - this.anchorOffset.x;
	});

	public physicalY = $derived.by(() => {
		return this.y * this.activeScaleY - this.anchorOffset.y;
	});

	

	public physicalBoundsStyle = $derived.by(() => {
        const styles = [
            `position: absolute`,
            `left: ${this.physicalX}px`,
            `top: ${this.physicalY}px`,
            `z-index: ${this.zIndex}`,
            `transform-origin: ${getTransformOrigin(this.anchor)}`
        ];

        if (this.physicalWidth !== undefined) styles.push(`width: ${this.physicalWidth}px`);
        if (this.physicalHeight !== undefined) styles.push(`height: ${this.physicalHeight}px`);
		if (!this.isReady) styles.push(`visibility: hidden`);

        return styles.join('; ') + ';';
    });
}
