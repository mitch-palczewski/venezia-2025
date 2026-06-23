import type { SystemProfiler } from "./systemProfiler";
import type { Viewport } from "./viewport/viewport.svelte";


export type PerformanceTier = 0 | 1 | 2 | 3 | 4;
export type PerformanceTierText = 'Ultra Low' | 'Low' | 'Medium' | 'High' | 'Ultra High';

const TIER_TEXT_MAP: PerformanceTierText[] = ['Ultra Low', 'Low', 'Medium', 'High', 'Ultra High'];

export class PerformanceTierEvaluator {
	#profiler: SystemProfiler;
	#screenManager: Viewport | undefined;
	#overridePerformanceTier: PerformanceTier | undefined | null;

	constructor(profiler: SystemProfiler, screenManager?: Viewport, overridePerformanceTier?: PerformanceTier) {
		this.#profiler = profiler;
        this.#screenManager = screenManager;
        this.#overridePerformanceTier = overridePerformanceTier;
	}

	/**
     * The human-readable string representation of the current performance tier.
     * Useful for displaying the active quality profile in UI settings menus 
     * (e.g., 'Ultra Low', 'Medium', 'Ultra High').
     */
	get performanceTierText(): PerformanceTierText {
		return TIER_TEXT_MAP[this.performanceTier];
	}

	/**
     * Evaluates system telemetry and screen constraints to calculate a 
     * rendering capability score from 0 (Potato) to 4 (High-End Discrete GPU).
     * * The evaluation follows a strict priority cascade:
     * 1. Manual User Override
     * 2. Network Data Saver Gate (Forces Tier 0)
     * 3. Hardware Telemetry Absence (Falls back to Screen Size estimation)
     * 4. Safe Minimums Gate (Under 4GB RAM or 4 Cores forces Tier 0)
     * 5. Hardware Specification Matchers (Top-down evaluation)
     * * @returns {PerformanceTier} A discrete integer representing the performance profile.
     */
	get performanceTier(): PerformanceTier {
		const memory = this.#profiler.memory;
        const cpuCores = this.#profiler.cpuCores;

		// --- 1. Manual Override ---
		if (this.#overridePerformanceTier !== null && this.#overridePerformanceTier !== undefined)
			return this.#overridePerformanceTier;

		// --- 2. Data Saver Gate ---
		if (this.#profiler.isDataSaverEnabled) return 0;

		// --- 3. Ultra High Tier Check ---
		if (
			((memory && memory > 4) || (this.#profiler.cpuCores && this.#profiler.cpuCores > 4)) &&
			this.hasDedicatedGpu()
		){
			return 4; //Ultra High
		}
		
		// --- 4. Telemetry Absence Fallback ---
		if (memory === null && this.#profiler.cpuCores === null) {
			return this.getPerformanceByScreenSize();
		}

		// --- 5. Specification Matching Cascade ---
		if (memory && memory >= 8 && cpuCores && cpuCores >= 8) {
			return 3; // High
		}
		if ((memory && memory >= 8) || (cpuCores && cpuCores >= 6)) {
			return 2; //Mid
		}
		if ((memory && memory > 4) || (cpuCores && cpuCores > 4)) {
			return 1; //Low
		}
		if ((memory && memory <= 4) || (cpuCores && cpuCores <= 4)) {
			return 0; //Ultra Low
		}

		return 1;
	}

	private hasDedicatedGpu(): boolean {
		if (!this.#profiler.gpuName) return false;
		const name = this.#profiler.gpuName.toLowerCase();
		if (name.includes('intel') || name.includes('hd graphics') || name.includes('swiftshader')) {
			return false;
		}
		return (
			name.includes('nvidia') ||
			name.includes('geforce') ||
			name.includes('rtx') ||
			name.includes('radeon pro') ||
			name.includes('apple m')
		);
	}

	private getPerformanceByScreenSize(): PerformanceTier {
		if (!this.#screenManager) {
			return 1; //Low
		}
		if (this.#screenManager.areaTier >= 3) {
			if (!this.#profiler.hasTouch) return 3; // High
			return 2; // Medium
		}
		if (this.#screenManager.areaTier >= 2) {
			if (!this.#profiler.hasTouch) return 2; // Medium
			return 1; //Low
		}
		return 1; //Low
	}
}



