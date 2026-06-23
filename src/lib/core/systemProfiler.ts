interface GpuProfile {
	gpuName: string;
	maxTextureSize: number;
	glVersion: 'webgpu' | 'webgl2' | 'webgl' | string;
}

export class SystemProfiler {
	public hasTouch = false;
	public memory: number | null = null;
	public cpuCores: number | null = null;
	public gpuName: string | null = null;
	public maxTextureSize: number | null = null;
	public glVersion: 'webgpu' | 'webgl2' | 'webgl' | string | null = null;
	public isDataSaverEnabled = false;
	public dpr = 1;

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
     * * @returns {Promise<void>} Resolves once the background GPU hardware profile is finalized.
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
		this.gpuName = profile.gpuName;
		this.maxTextureSize = profile.maxTextureSize;
		this.glVersion = profile.glVersion;
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
