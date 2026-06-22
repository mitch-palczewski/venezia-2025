import type { ScreenManager } from './screenManager.svelte';

export type PerformanceTier = 0 | 1 | 2 | 3 | 4;
export type PerformanceTierText = 'Ultra Low' | 'Low' | 'Medium' | 'High' | 'Ultra High';

interface GpuProfile {
    gpuName: string;
    maxTextureSize: number;
    glVersion: 'webgpu' | 'webgl2' | 'webgl';
}

const TIER_TEXT_MAP: PerformanceTierText[] = ['Ultra Low', 'Low', 'Medium', 'High', 'Ultra High'];

export class HardwareManager {
	public hasTouch = false;
	public gpuName: string | null = null;
	public maxTextureSize: number | null = null;
	public dpr = 1;
    public glVersion: 'webgpu' | 'webgl2' | 'webgl' | null = null;

    public memory: number | null = null;
    public cpuCores: number | null = null;
    public isDataSaverEnabled = false;

	#screenManager: ScreenManager | undefined;
	#overridePerformanceTier: PerformanceTier | undefined | null;

	constructor(screenManager?: ScreenManager, overridePerformanceTier?: PerformanceTier) {
		this.#screenManager = screenManager;
		this.#overridePerformanceTier = overridePerformanceTier;
		if (typeof navigator !== 'undefined') {
			this.dpr = window.devicePixelRatio || 1;
			this.hasTouch = navigator.maxTouchPoints > 0;
			this.cpuCores = navigator.hardwareConcurrency || null;
			// @ts-expect-error - navigator.deviceMemory is standard in Chrome/Edge
			this.memory = navigator.deviceMemory || null;
			// @ts-expect-error - connection API is Chromium standard
			this.isDataSaverEnabled = navigator.connection?.saveData === true;



			this.gpuName = this.getGpuName();
		}
	}

    /**
     * Executes the progressive async lookup chain. Call this on application startup.
     */
    public async initGpuCapabilities(): Promise<void> {
        if (typeof window === 'undefined') return;

        const webGpuSpecs = await WebGPUCheck();
        if (webGpuSpecs) {
            this.gpuName = webGpuSpecs.gpuName;
            this.maxTextureSize = webGpuSpecs.maxTextureSize;
            this.glVersion = webGpuSpecs.glVersion as 'webgpu';
            return;
        }

        const webGl2Specs = WebGL2Check();
        if (webGl2Specs) {
            this.gpuName = webGl2Specs.gpuName;
            this.maxTextureSize = webGl2Specs.maxTextureSize;
            this.glVersion = webGl2Specs.glVersion as 'webgl2';
            return;
        }

        const webGlSpecs = WebGLCheck();
        if (webGlSpecs) {
            this.gpuName = webGlSpecs.gpuName;
            this.maxTextureSize = webGlSpecs.maxTextureSize;
            this.glVersion = webGlSpecs.glVersion as 'webgl';
            return;
        }
    }

	private getGpuName(): string | null {
		try {
			const canvas = document.createElement('canvas');
			const gl = (canvas.getContext('webgl') ||
				canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

			if (!gl) return null;

			const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
			if (!debugInfo) return null;

			return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || null;
		} catch {
			return null;
		}
	}

	private hasDedicatedGpu(): boolean {
		if (!this.gpuName) return false;

		const name = this.gpuName.toLowerCase();

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
		if (this.#screenManager.isLargeScreen) {
			if (!this.hasTouch) return 3; // High
			return 2; // Medium
		}
		if (this.#screenManager.isMediumScreen) {
			if (!this.hasTouch) return 2; // Medium
			return 1; //Low
		}
		return 1; //Low
	}

	get performanceTierText(): PerformanceTierText {
		return TIER_TEXT_MAP[this.performanceTier];
	}

	get performanceTier(): PerformanceTier {
		if (this.#overridePerformanceTier !== null && this.#overridePerformanceTier !== undefined)
			return this.#overridePerformanceTier;
		if (this.isDataSaverEnabled) return 0;
		if (
			((this.memory && this.memory > 4) || (this.cpuCores && this.cpuCores > 4)) &&
			this.hasDedicatedGpu()
		)
			return 4; //Ultra High
		if (this.memory === null && this.cpuCores === null) {
			return this.getPerformanceByScreenSize();
		}
		if (this.memory && this.memory >= 8 && this.cpuCores && this.cpuCores >= 8) {
			return 3; // High
		}
		if ((this.memory && this.memory >= 8) || (this.cpuCores && this.cpuCores >= 6)) {
			return 2; //Mid
		}
		if ((this.memory && this.memory > 4) || (this.cpuCores && this.cpuCores > 4)) {
			return 1; //Low
		}
		if ((this.memory && this.memory <= 4) || (this.cpuCores && this.cpuCores <= 4)) {
			return 0; //Ultra Low
		}
		return 1;
	}
}


async function WebGPUCheck() {
	if ('gpu' in navigator) {
		try {
			const adapter = await navigator.gpu.requestAdapter();
			if (adapter) {
				return {
					gpuName: adapter.info.device || adapter.info.vendor || 'Unknown WebGPU Device',
					maxTextureSize: 16384,
					glVersion: 'webgpu'
				};
			}
		} catch { /* empty */ }
	}
}

function WebGL2Check() {
    try {
            const canvas = document.createElement('canvas');
            const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
            if (gl2) {
                const ext = gl2.getExtension('WEBGL_debug_renderer_info');
                return {
                    gpuName: ext ? gl2.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "Unknown WebGL2 Device",
                    maxTextureSize: gl2.getParameter(gl2.MAX_TEXTURE_SIZE), 
                    glVersion: 'webgl2'
                };
            }
        } catch { /* empty */ }
}


function WebGLCheck(){
    try {
            const canvas = document.createElement('canvas');
            const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
            if (gl) {
                const ext = gl.getExtension('WEBGL_debug_renderer_info');
                return {
                    gpuName: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "Unknown WebGL1 Device",
                    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
                    glVersion:'webgl'
                }
            }
        } catch { /* empty */ }
}
