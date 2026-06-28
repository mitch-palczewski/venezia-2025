import type { PerformanceTier } from "./performance/performance.types";
import { PerformanceTierEvaluator } from "./performance/performanceTierEvaluator.svelte";
import { SystemProfiler } from "./performance/systemProfiler.svelte";
import { useViewport } from "./viewport/viewport.context.svelte";
import { Viewport } from "./viewport/viewport.svelte";
import { WindowLifecycle } from "./performance/windowLifecycle.svelte";


export class DeviceContext {
    // Expose the sub-modules as public read-only properties
    public readonly profiler: SystemProfiler;
    public readonly viewport: Viewport;
    public readonly lifecycle: WindowLifecycle;
    public readonly performance: PerformanceTierEvaluator;

    #isInitialized = $state(false);
    #ownsViewport = false;

    constructor(overridePerformanceTier?: PerformanceTier) {
        // 1. Initialize independent systems
        this.profiler = new SystemProfiler();
        this.lifecycle = new WindowLifecycle();
        const sharedViewport = useViewport();
        if (sharedViewport) {
            this.viewport = sharedViewport;
        } else {
            this.viewport = new Viewport();
            this.#ownsViewport = true; 
        }

        // 2. Initialize dependent systems (injecting the dependencies)
        this.performance = new PerformanceTierEvaluator(
            this.profiler,
            this.viewport, 
            overridePerformanceTier
        );
    }

    /**
     * Reactively indicates whether the asynchronous hardware profiling loop has finalized.
     * Perfect for driving loading states or skeleton screens in your UI layers.
     */
    public get isInitialized(): boolean {
        return this.#isInitialized;
    }

    /**
     * Gets or sets the runtime graphics quality override tier.
     */
    public get qualityOverride(): PerformanceTier | undefined | null {
        return this.performance.overridePerformanceTier;
    }

    public set qualityOverride(value: PerformanceTier | undefined | null) {
        this.performance.overridePerformanceTier = value;
    }

    public resetQuality(){
        this.performance.overridePerformanceTier = null;
    }

    /**
     * Executes the asynchronous subsystem profiling tasks (e.g., WebGPU unmasking).
     * Call this during your app's boot/loading stage inside the browser.
     */
    public async initalize(): Promise<void> {
        try {
            await this.profiler.profileGpuAsync();
        } finally {
            this.#isInitialized = true; 
        }
    }

    /**
     * Orchestrates a cascading cleanup of all underlying DOM event listeners
     * to ensure zero memory leaks during hot-module reloading or route changes.
     */
    public destroy(): void {
        if (this.#ownsViewport) {
            this.viewport.destroy();
        }
        this.lifecycle.destroy();
    }
}