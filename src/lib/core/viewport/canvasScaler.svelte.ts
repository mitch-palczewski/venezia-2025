import type { Viewport } from './viewport.svelte';

/**
 * Configuration options to initialize a CanvasScaler instance.
 */
export interface ScalerConfig {
	/** * The baseline target width of your virtual canvas coordinate space.
	 * @default 1280
	 */
	referenceWidth?: number;

	/** * The baseline target height of your virtual canvas coordinate space.
	 * @default 720
	 */
	referenceHeight?: number;

    /** * The minimum allowable scale multiplier to prevent the stage from shrinking too small.
     * @default 0.4
     */
	minScale?: number;

    /** * The maximum allowable scale multiplier to prevent the stage from expanding too large.
     * @default 5.0
     */
	maxScale?: number;

	/** * Which viewport attribute the scale is based on.
     * @default 'area'
     */
	scaleBasedOn?: 'area' | 'shortest edge' | 'width';
}

/**
 * Responsive calculator that derives a proportional scale factor to perfectly fit 
 * a fixed virtual layout space inside a dynamic browser viewport.
 */
export class CanvasScaler {

	#scaleBasedOn: 'area' | 'shortest edge' | 'width'

    /** The active viewport instance monitored for window dimension changes. */
	public readonly viewport: Viewport;

    /** The baseline target width of the canvas layout space. */
	public readonly referenceWidth: number

    /** The baseline target height of the canvas layout space. */
	public readonly referenceHeight: number

    /** The minimum scaling boundary clamp. */
	public minScale = $state(0.4);

    /** The maximum scaling boundary clamp. */
	public maxScale = $state(5.0);

    /** The maximum scaling boundary clamp. */
	public scale = $derived.by(() => {
		switch(this.#scaleBasedOn){
			case 'area':
				return this.getAreaScaleFactor()
			case 'shortest edge':
				return this.getShortestEdgeScaleFactor()
			case 'width':
				return this.getWidthScaleFactor()
		}
	});

    /**
     * Initializes a new CanvasScaler instance tied to an active viewport.
     * @param viewport The reactive viewport size tracker to observe.
     * @param config Optional base dimensions and boundary limits override parameters.
     */
	constructor(viewport: Viewport, config?: ScalerConfig) {
		this.viewport = viewport;
		this.#scaleBasedOn = config?.scaleBasedOn ?? 'area';
		this.referenceWidth = config?.referenceWidth ?? 1280;
		this.referenceHeight = config?.referenceHeight ?? 720;
	}
	
	/** The baseline Area of the canvas layout space */
	get referenceArea() {
		return this.referenceHeight * this.referenceWidth
	}

	private getShortestEdgeScaleFactor(): number {
		const scale = Math.min(
			this.viewport.width / this.referenceWidth,
			this.viewport.height / this.referenceHeight
		);
		return this.clampScale(scale)
	}

	private getWidthScaleFactor():number {
		const scale = this.viewport.width / this.referenceWidth
		return this.clampScale(scale)
	}

	private getAreaScaleFactor():number {
		const scale = this.viewport.area / this.referenceArea
		return this.clampScale(scale)
	}

	private clampScale(rawScale:number) {
		return Math.max(this.minScale, Math.min(this.maxScale, rawScale));
	}
}
