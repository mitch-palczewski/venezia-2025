import type { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';

export type CompassAnchor = 'NW' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'C';

export interface ProjectedElementFrameConfig {
	x: number;
	y: number;
	width?: number;
	height?: number;
	zIndex?: number;
	projectDimensions?: boolean;
	anchor?: CompassAnchor;
}

export class ProjectedElementFrameModel {
	public x = $state(0);
	public y = $state(0);
	public width = $state(0);
	public height = $state(0);
	public measuredWidth = $state(0);
	public measuredHeight = $state(0);
	public zIndex = $state(1);
	public scale = $state(1);

	public projectDimensions = $state(true);
	public anchor = $state<CompassAnchor>('NW');
	public projector = $state<CoordinateProjector>();

	public isContentDrivenWidth = false;
	public isContentDrivenHeight = false;

	constructor(config: ProjectedElementFrameConfig, projector: CoordinateProjector) {
		this.x = config.x;
		this.y = config.y;
		this.isContentDrivenWidth = config.width === undefined;
		this.isContentDrivenHeight = config.height === undefined;
		this.width = config.width ?? 0;
		this.height = config.height ?? 0;
		this.zIndex = config.zIndex ?? 1;
		this.projectDimensions = config.projectDimensions ?? true;
		this.anchor = config.anchor ?? 'NW';
		this.projector = projector;
		this.measuredWidth = this.width;
		this.measuredHeight = this.height;
	}

	public physicalWidth = $derived.by(() => {
		if (this.isContentDrivenWidth) return undefined;
		if (!this.projector || !this.projectDimensions) return this.width;
		return this.width * this.activeScaleX;
	});

	public physicalHeight = $derived.by(() => {
		if (this.isContentDrivenHeight) return undefined;
		if (!this.projector || !this.projectDimensions) return this.height;
		return this.height * this.activeScaleY;
	});

	private anchorOffset = $derived.by(() => {
		let w = 0;
		let h = 0;

		if (this.isContentDrivenWidth) {
			w = this.measuredWidth;
		} else {
			w = this.width * (this.projectDimensions ? this.activeScaleX : 1);
		}

		if (this.isContentDrivenHeight) {
			h = this.measuredHeight;
		} else {
			h = this.height * (this.projectDimensions ? this.activeScaleY : 1);
		}

		let offsetX = 0;
		let offsetY = 0;

		if (this.anchor.includes('E')) offsetX = w;
		else if (this.anchor.includes('W')) offsetX = 0;
		else offsetX = w / 2;

		if (this.anchor.includes('S')) offsetY = h;
		else if (this.anchor.includes('N')) offsetY = 0;
		else offsetY = h / 2;

		return { x: offsetX, y: offsetY };
	});

	public physicalX = $derived.by(() => {
		return this.x * this.activeScaleX - this.anchorOffset.x;
	});

	public physicalY = $derived.by(() => {
		return this.y * this.activeScaleY - this.anchorOffset.y;
	});

	public physicalBoundsStyle = $derived(`
        position: absolute;
        left: ${this.physicalX}px;
        top: ${this.physicalY}px;
        ${this.physicalWidth !== undefined ? `width: ${this.physicalWidth}px;` : ''}
        ${this.physicalHeight !== undefined ? `height: ${this.physicalHeight}px;` : ''}
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
			NW: 'top left',
			N: 'top center',
			NE: 'top right',
			E: 'center right',
			SE: 'bottom right',
			S: 'bottom center',
			SW: 'bottom left',
			W: 'center left',
			C: 'center center'
		};
		return mapping[this.anchor];
	}
}
