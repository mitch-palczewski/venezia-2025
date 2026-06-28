export { DeviceContext } from './deviceContext.svelte';

// viewport
export { Viewport } from './viewport/viewport.svelte';
export {
	useViewport,
	setViewportContext
} from './viewport/viewport.context.svelte';
export { CanvasScaler, type ScalerConfig } from './viewport/canvasScaler.svelte';
export {
	COMMON_RATIOS,
	PHOTOGRAPHY_RATIOS,
	MINIMAL_TARGET_RATIOS,
	type Orientation,
	type Tier,
	type TierText
} from './viewport/viewport.types';

// performance
export { PerformanceTierEvaluator } from './performance/performanceTierEvaluator.svelte';
export type { PerformanceTier, PerformanceTierText } from './performance/performance.types';
export { SystemProfiler } from './performance/systemProfiler.svelte';
