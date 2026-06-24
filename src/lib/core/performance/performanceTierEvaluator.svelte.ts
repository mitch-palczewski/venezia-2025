import type { SystemProfiler } from './systemProfiler.svelte';
import type { Viewport } from '../viewport/viewport.svelte';
import { type PerformanceTier, type PerformanceTierText, PERFORMANCE_TIER_TEXT_MAP } from './performance.types';


/**
 * Evaluates real-time system telemetry and environment constraints to determine
 * a device's rendering capabilities. 
 * * Uses a decoupled, additive point-scoring system to ensure graceful degradation 
 * when specific hardware metadata is hidden by privacy-focused browsers.
 */
export class PerformanceTierEvaluator {
	#profiler: SystemProfiler;
	#screenManager: Viewport | undefined;

	/**
     * Gets or sets the active manual performance profile override.
     * Setting this to null restores automatic hardware telemetry tracking.
     */
	public overridePerformanceTier: PerformanceTier | undefined | null = $state(null);

	/**
     * Constructs a new instance of the performance capability evaluator.
     * * @param profiler - An initialized system scanner containing live hardware specifications.
     * @param screenManager - Optional layout supervisor tracking the visible application bounds.
     * @param overridePerformanceTier - An optional manual override to bypass telemetry tracking loops.
     */
	constructor(
		profiler: SystemProfiler,
		screenManager?: Viewport,
		overridePerformanceTier?: PerformanceTier
	) {
		this.#profiler = profiler;
		this.#screenManager = screenManager;
		this.overridePerformanceTier = overridePerformanceTier;
	}

	/**
     * Resolves the human-readable string representation of the current performance tier.
     * Ideal for displaying the active quality profile profile in configuration settings menus.
     * * @example "Medium", "Ultra High"
     */
	get performanceTierText(): PerformanceTierText {
		return PERFORMANCE_TIER_TEXT_MAP[this.performanceTier];
	}

	/**
     * Runs the multi-variable scoring cascade against available device telemetry
     * to compute a discrete capabilities tier score from 0 (Potato) to 4 (High-End Discrete GPU).
     * * ### Evaluation Sequence
     * 1. **Manual User Override Gate** (Bypasses all math if set)
     * 2. **Network Data Saver Gate** (Forces Tier 0 if active)
     * 3. **Additive Scoring Engine Matrix**
     * * **CPU Cores:** Up to +2 points
     * * **System RAM:** Up to +2 points
     * * **Discrete GPU:** +2 points
     * * *Privacy Fallback:* Screenspace area can award +1 point if RAM or CPU metrics are concealed.
     * * @returns The resolved performance tier index.
     */
	get performanceTier(): PerformanceTier {

		// --- 1. Manual Override ---
		if (this.overridePerformanceTier !== null && this.overridePerformanceTier !== undefined)
			return this.overridePerformanceTier;

		// --- 2. Data Saver Gate ---
		if (this.#profiler.isDataSaverEnabled) return 0;

		let score = 0;

		// --- 3. CPU Core Heuristic ---
		if (this.#profiler.cpuCores) {
			if (this.#profiler.cpuCores >= 8) score += 2;
			else if (this.#profiler.cpuCores >= 4) score += 1;
		} else {
			if (this.#screenManager && this.#screenManager.areaTier >= 2) score += 1;
		}

		// --- 4. Memory Footprint Heuristic ---
		if (this.#profiler.memory) {
			if (this.#profiler.memory >= 8) score += 2;
			else if (this.#profiler.memory > 4) score += 1;
		} else {
			if (this.#screenManager && this.#screenManager.areaTier >= 2) score += 1;
		}

		// --- 5. GPU Acceleration Heuristic ---
		if (this.hasDedicatedGpu()) {
			score += 2;
		}

		// --- 6. Aggregate Point Distribution Mapping ---
		if (score >= 5) return 4; // Ultra High
		if (score === 4) return 3; // High
		if (score === 3) return 2; // Medium
		if (score === 2) return 1; // Low
		return 0;
	}

	private hasDedicatedGpu(): boolean {
		if (!this.#profiler.gpuName) return false;
		const name = this.#profiler.gpuName.toLowerCase();
        if (name.includes('intel') || name.includes('hd graphics') || name.includes('swiftshader')) {
            return false;
        }
		const isDiscreteAmd = name.includes('radeon') && !name.includes('graphics');
		return (
			isDiscreteAmd ||
			name.includes('nvidia') ||
			name.includes('geforce') ||
			name.includes('rtx') ||
			name.includes('radeon pro') ||
			name.includes('apple m')
		);
	}
}
