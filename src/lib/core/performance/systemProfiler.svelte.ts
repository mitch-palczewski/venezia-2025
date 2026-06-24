import type { GpuProfile } from "./performance.types";

/**
 * Orchestrates synchronous baseline and asynchronous advanced telemetry scans 
 * of client hardware capabilities including CPU thread counts, memory boundaries, 
 * network optimization flags, and hardware-accelerated graphics architectures.
 */
export class SystemProfiler {

	
	/** * Indicates whether the device environment supports active touch interaction parameters.
     */
	public hasTouch = false;

	/** * The approximate amount of system RAM allocated to the device in gigabytes (GB). 
     * @remarks Frequently returns `null` on privacy-hardened or Apple mobile platforms to mitigate browser fingerprinting tracking.
     */
	public memory: number | null = null;

	/** * The number of logical CPU core execution threads available to the current application thread. 
     */
	public cpuCores: number | null = null;

	/** * The unmasked hardware renderer identifier or vendor marketing string of the system's graphics core.
     */
	public get gpuName() { return this.#gpuName; }
	#gpuName = $state<string | null>(null);

	/** * The maximum dimension boundary (width or height) permitted for 2D texture arrays within the current graphics engine context.
     */
	public get maxTextureSize() { return this.#maxTextureSize; }
	#maxTextureSize = $state<number | null>(null);

	/** * The specific web graphics layer execution driver currently bound to the profiling canvas.
     */
	public get glVersion() { return this.#glVersion; }
	#glVersion = $state<'webgpu' | 'webgl2' | 'webgl' | string | null>(null);

	/** * Indicates whether the user's browser or operating system network stack has flagged active data conservation constraints.
     */
	public isDataSaverEnabled = false;

	/** * The backing store pixel resolution scale metric of the system's physical display display matrix.
     */
	public dpr = 1;

	/**
     * Initializes the system profiler instance, gathers synchronous device configuration metrics,
     * and performs an immediate fallback WebGL context validation.
     */
	constructor() {
		if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

		this.dpr = window.devicePixelRatio || 1;
		this.hasTouch = navigator.maxTouchPoints > 0;
		this.cpuCores = navigator.hardwareConcurrency || null;
		// @ts-expect-error - deviceMemory standard
		this.memory = navigator.deviceMemory || null;
		// @ts-expect-error - connection standard
		this.isDataSaverEnabled = navigator.connection?.saveData === true;

		this.probeWebGL();
	}

    /**
     * Asynchronously attempts to upgrade the system profile using the modern WebGPU API.
     * * Since WebGPU requires asynchronous hardware negotiation to prevent main-thread blocking,
     * this should be called during your application's initial loading phase (e.g., inside 
     * Svelte's `onMount`). If the browser supports WebGPU, this method safely replaces the 
     * synchronous WebGL baseline specs with clean, unmasked hardware details.
     * * @returns Resolves once the background GPU hardware profile is finalized.
     */
	public async profileGpuAsync(): Promise<void> {
		if (typeof window === 'undefined') return;

		const webGpuSpecs = await WebGPUCheck();
		if (webGpuSpecs) {
			this.applyProfile(webGpuSpecs);
		}
	}

	private probeWebGL() {
		if (typeof window === 'undefined') return;

		const webGl2Specs = WebGL2Check();
		if (webGl2Specs) {
			this.applyProfile(webGl2Specs);
			return;
		}

		const webGlSpecs = WebGLCheck();
		if (webGlSpecs) {
			this.applyProfile(webGlSpecs);
		}
	}

	private applyProfile(profile: GpuProfile | null) {
		if (!profile) return;
		this.#gpuName = profile.gpuName;
		this.#maxTextureSize = profile.maxTextureSize;
		this.#glVersion = profile.glVersion;
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
		} catch {
			/* empty */
		}
	}
	return null;
}

function WebGL2Check() {
	try {
		const canvas = document.createElement('canvas');
		const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
		if (gl2) {
			const ext = gl2.getExtension('WEBGL_debug_renderer_info');
			return {
				gpuName: ext ? gl2.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'Unknown WebGL2 Device',
				maxTextureSize: gl2.getParameter(gl2.MAX_TEXTURE_SIZE),
				glVersion: 'webgl2'
			};
		}
	} catch {
		/* empty */
	}
	return null;
}

function WebGLCheck() {
	try {
		const canvas = document.createElement('canvas');
		const gl = (canvas.getContext('webgl') ||
			canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
		if (gl) {
			const ext = gl.getExtension('WEBGL_debug_renderer_info');
			return {
				gpuName: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'Unknown WebGL1 Device',
				maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
				glVersion: 'webgl'
			};
		}
	} catch {
		/* empty */
	}
	return null;
}
