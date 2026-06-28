import type { Viewport } from './viewport.svelte';

/**
 * Configuration options to initialize a CanvasScaler instance.
 */
export interface ScalerConfig {
	/** * The baseline target width of your virtual canvas coordinate space.
	 * @default 1920
	 */
	referenceWidth?: number;

	/** * The baseline target height of your virtual canvas coordinate space.
	 * @default 1080
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
}

/**
 * Responsive calculator that derives a proportional scale factor to perfectly fit 
 * a fixed virtual layout space inside a dynamic browser viewport.
 */
export class CanvasScaler {

    /** The active viewport instance monitored for window dimension changes. */
	public readonly viewport: Viewport;

    /** The baseline target width of the canvas layout space. */
	public referenceWidth = $state(1920);

    /** The baseline target height of the canvas layout space. */
	public referenceHeight = $state(1080);

    /** The minimum scaling boundary clamp. */
	public minScale = $state(0.4);

    /** The maximum scaling boundary clamp. */
	public maxScale = $state(5.0);

    /** The maximum scaling boundary clamp. */
	public scale = $derived(this.getScaleFactor());

    /**
     * Initializes a new CanvasScaler instance tied to an active viewport.
     * @param viewport The reactive viewport size tracker to observe.
     * @param config Optional base dimensions and boundary limits override parameters.
     */
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
