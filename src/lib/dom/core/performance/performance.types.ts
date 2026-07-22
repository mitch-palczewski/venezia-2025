export type PerformanceTier = 0 | 1 | 2 | 3 | 4;
export type PerformanceTierText = 'Ultra Low' | 'Low' | 'Medium' | 'High' | 'Ultra High';
export const PERFORMANCE_TIER_TEXT_MAP: PerformanceTierText[] = ['Ultra Low', 'Low', 'Medium', 'High', 'Ultra High'];

//System
export interface GpuProfile {
	gpuName: string;
	maxTextureSize: number;
	glVersion: 'webgpu' | 'webgl2' | 'webgl' | string;
}