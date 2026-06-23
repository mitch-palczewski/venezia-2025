import { PerformanceTierEvaluator, type PerformanceTier } from "./performanceTierEvaluator";
import { SystemProfiler } from "./systemProfiler";
import { Viewport } from "./viewport";
import { WindowLifecycle } from "./windowLifecycle.svelte";


export class DeviceContext {
    // Expose the sub-modules as public read-only properties
    public readonly profiler: SystemProfiler;
    public readonly viewport: Viewport;
    public readonly lifecycle: WindowLifecycle;
    public readonly performance: PerformanceTierEvaluator;

    constructor(overridePerformanceTier?: PerformanceTier) {
        // 1. Initialize independent systems
        this.profiler = new SystemProfiler();
        this.viewport = new Viewport();
        this.lifecycle = new WindowLifecycle();

        // 2. Initialize dependent systems (injecting the dependencies)
        this.performance = new PerformanceTierEvaluator(
            this.profiler,
            this.viewport, 
            overridePerformanceTier
        );
    }

    /**
     * Executes the asynchronous subsystem profiling tasks (e.g., WebGPU unmasking).
     * Call this during your app's boot/loading stage inside the browser.
     */
    public async initAsync(): Promise<void> {
        await this.profiler.profileGpuAsync();
    }

    /**
     * Orchestrates a cascading cleanup of all underlying DOM event listeners
     * to ensure zero memory leaks during hot-module reloading or route changes.
     */
    public destroy(): void {
        this.viewport.destroy();
        this.lifecycle.destroy();
    }
}