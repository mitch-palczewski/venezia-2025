import {
	areaTierBreaks,
	COMMON_RATIOS,
	shortestEdgeTierBreaks,
	TIER_TEXT_MAP,
	widthTierBreaks,
	type AspectRatio,
	type Orientation,
	type Tier,
	type TierBreakpoints,
	type TierText
} from './viewport.types';

/**
 * Manages reactive viewport state, tracking dimensions, orientation,
 * aspect ratios, and design system layout tiers.
 * * Optimized for Svelte 5 using runes, throttled window resize observers, and
 * fully decoupled to evaluate custom collections of layout design anchors.
 */
export class Viewport {
	#width = $state(0);
	#height = $state(0);
	#ticking = false;
	#targetRatios: readonly AspectRatio[] = COMMON_RATIOS;
	#closestRatioMatch = $derived(
		getClosestAspectRatio(this.#width, this.#height, this.#targetRatios)
	);

	/** The total calculated screen area in pixels (width * height). */
	public area: number = $derived(this.#width * this.#height);

	/** The pixel length of the smaller viewport dimension. Useful for mobile-first scaling calculations. */
	public shortestEdge: number = $derived(Math.min(this.#width, this.#height));

	/** The current structural aspect orientation: 'tall', 'wide', or 'square'. */
	public orientation: Orientation = $derived(getOrientation(this.#width, this.#height));

	/** The calculated tier classification (0-4) based on total viewport area. */
	public areaTier: Tier = $derived(getTierFromBreakpoints(this.area, areaTierBreaks));

	/** The calculated tier classification (0-4) based on the shortest screen edge. */
	public shortestEdgeTier: Tier = $derived(
		getTierFromBreakpoints(this.shortestEdge, shortestEdgeTierBreaks)
	);

	/** The calculated tier classification (0-4) matching traditional width media queries. */
	public widthTier: Tier = $derived(getTierFromBreakpoints(this.#width, widthTierBreaks));

	/** The readable text descriptor (e.g., 'Medium') matching the current area tier. */
	public areaTierText: TierText = $derived(TIER_TEXT_MAP[this.areaTier]);

	/** The readable text descriptor (e.g., 'Small') matching the shortest edge calculation. */
	public shortestEdgeTierText: TierText = $derived(TIER_TEXT_MAP[this.shortestEdgeTier]);

	/** The readable text descriptor (e.g., 'Large') matching traditional responsive layout width. */
	public widthTierText: TierText = $derived(TIER_TEXT_MAP[this.widthTier]);

	/** The precise decimal value of the current width-to-height aspect ratio. */
	public rawRatio: number = $derived(getRawRatio(this.#width, this.#height));

	/** The text label of the nearest matched aspect ratio configuration (e.g., '16:9'). */
	public closestCommonRatio: string = $derived(this.#closestRatioMatch?.text ?? 'Unknown');

	/** The numerical decimal value of the nearest matched aspect ratio configuration (e.g., 1.777). */
	public closestCommonRatioValue: number = $derived(
		this.#closestRatioMatch?.value ?? this.rawRatio
	);

	/** * A CSS-safe string representation of the closest ratio (e.g., '16-9').
	 * Optimized specifically for HTML data-attributes and custom Tailwind modifiers.
	 */
	public ratioSlug: string = $derived(this.closestCommonRatio.replace(':', '-'));

	/**
	 * Initializes a new viewport tracker instance.
	 * @param customTargets An optional, tailored array of aspect ratios to target for layout snapping.
	 */
	constructor(customTargets?: readonly AspectRatio[]) {
		if (customTargets) {
			this.#targetRatios = customTargets;
		}
		if (typeof window !== 'undefined') {
			this.syncDimensions();
			window.addEventListener('resize', this.handleResize);
		}
	}

	private syncDimensions() {
		this.#width = window.innerWidth;
		this.#height = window.innerHeight;
	}

	private handleResize = () => {
		if (!this.#ticking) {
			this.#ticking = true;
			requestAnimationFrame(() => {
				this.syncDimensions();
				this.#ticking = false;
			});
		}
	};

	/** Reactive getter for the browser's inner width. */
	get width() {
		return this.#width;
	}

	/** Reactive getter for the browser's inner height. */
	get height() {
		return this.#height;
	}

	

	/** Cleans up browser event listener structures to safely prevent memory leaks. */
	destroy() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.handleResize);
		}
	}
}

/**
 * Evaluates a numeric dimension against a sequential breakpoint map to determine its index Tier.
 * * @param value The raw dimension statistic to classify.
 * @param breakpoints The ordered design system limits map.
 * @returns An integer rating representing the assigned responsive tier.
 */
function getTierFromBreakpoints(value: number, breakpoints: TierBreakpoints): Tier {
	const limits = Object.values(breakpoints);

	for (let i = 0; i < limits.length; i++) {
		if (value <= limits[i]) {
			return i as Tier;
		}
	}
	return limits.length as Tier;
}

/**
 * Calculates the categorical direction orientation of given spatial dimensions.
 */
function getOrientation(width: number, height: number): Orientation {
	if (height > width) return 'tall';
	if (height < width) return 'wide';
	return 'square';
}

/**
 * Safeguarded conversion wrapper to acquire a decimal division ratio. Prevents zero division.
 */
function getRawRatio(width: number, height: number): number {
	if (height === 0) return 1;
	return width / height;
}

/**
 * Loops through a collection of custom aspect targets to discover the closest statistical match object.
 * @param width Live window pixel width.
 * @param height Live window pixel height.
 * @param allowedRatios The array of targets assigned to evaluate against.
 * @returns The matched AspectRatio object, or null if the system calculation is currently un-resolvable.
 */
function getClosestAspectRatio(
	width: number,
	height: number,
	allowedRatios: readonly AspectRatio[]
): AspectRatio | null {
	const currentRatio = getRawRatio(width, height);
	if (currentRatio === 0) return null;

	let closestMatch = allowedRatios[0];
	let smallestDelta = Math.abs(currentRatio - closestMatch.value);

	for (let i = 1; i < allowedRatios.length; i++) {
		const currentDelta = Math.abs(currentRatio - allowedRatios[i].value);
		if (currentDelta < smallestDelta) {
			smallestDelta = currentDelta;
			closestMatch = allowedRatios[i];
		}
	}
	return closestMatch;
}
