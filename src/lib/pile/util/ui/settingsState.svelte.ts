import type { TransformControlsMode } from "three/examples/jsm/controls/TransformControls.js";
import type { PileApp } from "../pileApp.svelte";

export interface SettingsStateConfig {
	showGrid?: boolean;
}

interface TrackedStates {
	lastShowCursor:boolean
}

export class SettingsState {
	#presentationMode = $state(false);
	#showSettingsMenu = $state(false)
	public defaultShowGrid;
	public movementSpeed = $state(10)
	public scaleSliderMax = $state(30)
	public showGrid: boolean = $state(false);
	public showUI = $state(true);
	public showAddMenu = $state(false);
	public showCursor = $state(true);
	public transformControlsMode = $state<TransformControlsMode>('translate');
	public app: PileApp | undefined
	public lastState = $state<TrackedStates>({lastShowCursor: this.showCursor})
	public showTooltip = $state(true)
	public tooltipText = $state<string | null>(null)

	public doubleClick = $state(false)
	public canvasContainer: HTMLDivElement | undefined;
	


	constructor(config: SettingsStateConfig) {
		this.defaultShowGrid = config.showGrid || false;
		this.showGrid = this.defaultShowGrid;
	
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

	get showSettingsMenu(){
		return this.#showSettingsMenu
	}
	set showSettingsMenu(value){
		if(value === true){
			this.lastState.lastShowCursor = this.showCursor
			this.showCursor = true
			console.log("Setting Menu Active")
		}
		if(value === false){
			this.showCursor = this.lastState.lastShowCursor
			console.log("Setting Menu Inactive")
		}
		this.#showSettingsMenu = value
	}

	get presentationMode() {
		return this.#presentationMode;
	}
	set presentationMode(value) {
		if (value === true) {
			if(this.showSettingsMenu){
				this.lastState.lastShowCursor = false
			}else{
				this.showCursor = false;
			}
			this.showGrid = false;
			this.showUI = false;
			console.log('Presentation Mode Activate');
		}
		if (value === false) {
			this.showGrid = this.defaultShowGrid;
			this.showUI = true;
			this.showCursor = true;
			console.log('Presentation Mode Inactive');
		}
		this.#presentationMode = value;
	}

	public escape(){
		if (this.showSettingsMenu){
			this.showSettingsMenu = false
			return 
		}
		if (this.presentationMode){
			this.presentationMode = false
			return
		}
		this.showSettingsMenu = true
		
	}

	public static setPointerLock(element: HTMLElement | null, state: boolean) {
		if (!element) return;

		if (!state) {
			document.exitPointerLock();
		} else {
			element.requestPointerLock();
		}
	}

	public hudTooltip(node: HTMLElement, text: string) {
		const show = () => (this.tooltipText = text);
		const hide = () => (this.tooltipText = "");

		node.addEventListener('mouseenter', show);
		node.addEventListener('mouseleave', hide);
		node.addEventListener('focusin', show);
		node.addEventListener('focusout', hide);

		return {
			update(newText: string) {
				text = newText;
			},
			destroy() {
				node.removeEventListener('mouseenter', show);
				node.removeEventListener('mouseleave', hide);
			}
		};
	}
}
