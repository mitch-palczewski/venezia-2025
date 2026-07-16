import type { TransformControlsMode } from 'three/examples/jsm/controls/TransformControls.js';
import type { PileApp } from '../pileApp.svelte';
import type { AddMenuState } from '$lib/pile/components/UI/add-menu/AddMenu.svelte';
import type { DeviceContext, PerformanceTier } from '$lib/core';



interface TrackedStates {
	lastShowCursor: boolean;
}

export class UiState {
	#presentationMode = $state(false);
	#showSettingsMenu = $state(false);
	#performance:PerformanceTier = $state(2)
	public movementSpeed = $state(300);
	public scaleSliderMax = $state(100);
	public defaultModelSize = $state(15)
	public showGrid: boolean = $state(false);
	public showUI = $state(true);
	public showAddMenu = $state(false);
	public showCursor = $state(true);
	public transformControlsMode = $state<TransformControlsMode>('translate');
	public app: PileApp | undefined;
	public lastState = $state<TrackedStates>({ lastShowCursor: this.showCursor });
	public showTooltip = $state(true);
	public tooltipText = $state<string | null>(null);
	public isIdleEnabled = $state(true);
	public showScreenshotBtn = $state(true)
	public isFullscreen = $state(false)
	public doubleClick = $state(false);
	public addMenuState = $state<AddMenuState>('object3D');
	public canvasContainer: HTMLDivElement | undefined;
	public deviceContext: DeviceContext;
	public showMiniMap = $state(false)
	

	constructor(deviceContext:DeviceContext) {
		this.deviceContext = deviceContext
		$effect.root(() => {
			$effect(() => {
				if (!this.showCursor) {
					document.body.classList.add('no-cursor');
				} else {
					document.body.classList.remove('no-cursor');
				}
			});
		});
	}

	get performance() {
		return this.#performance
	}
	set performance(value:PerformanceTier) {
		this.deviceContext.qualityOverride = value
		this.#performance = value
	}

	get showSettingsMenu() {
		return this.#showSettingsMenu;
	}
	set showSettingsMenu(value) {
		if (value === true) {
			this.lastState.lastShowCursor = this.showCursor;
			this.showCursor = true;
			console.log('Setting Menu Active');
		}
		if (value === false) {
			this.showCursor = this.lastState.lastShowCursor;
			console.log('Setting Menu Inactive');
		}
		this.#showSettingsMenu = value;
	}

	get presentationMode() {
		return this.#presentationMode;
	}
	set presentationMode(value) {
		if (value === true) {
			if (this.showSettingsMenu) {
				this.lastState.lastShowCursor = false;
			} else {
				this.showCursor = false;
			}
			this.showGrid = false;
			this.showUI = false;
			this.showTooltip = false;
			console.log('Presentation Mode Activate');
		}
		if (value === false) {
			this.showUI = true;
			this.showCursor = true;
			this.showTooltip = true;
			console.log('Presentation Mode Inactive');
		}
		this.#presentationMode = value;
	}

	public escape() {
		if (this.showSettingsMenu) {
			this.showSettingsMenu = false;
			return;
		}
		if (this.presentationMode) {
			this.presentationMode = false;
			return;
		}
		this.showSettingsMenu = true;
	}

	public static setPointerLock(element: HTMLElement | null, state: boolean) {
		if (!element) return;

		if (!state) {
			document.exitPointerLock();
		} else {
			element.requestPointerLock();
		}
	}

	public hudTooltip = (node: HTMLElement, text: string) => {
		const show = () => (this.tooltipText = text);
		const hide = () => (this.tooltipText = '');

		node.addEventListener('mouseenter', show);
		node.addEventListener('mouseleave', hide);
		node.addEventListener('focusin', show);
		node.addEventListener('focusout', hide);

		return {
			update: (newText: string) => {
				if (this.tooltipText === text) {
					this.tooltipText = newText;
				}
				text = newText;
			},
			destroy() {
				node.removeEventListener('mouseenter', show);
				node.removeEventListener('mouseleave', hide);
			}
		};
	}
}
