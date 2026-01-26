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
	public showGrid: boolean = $state(false);
	public showUI = $state(true);
	public showCursor = $state(true);
	
	public lastState = $state<TrackedStates>({lastShowCursor: this.showCursor})

	//deleteMaybe
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
		
	}



	public static setPointerLock(element: HTMLElement | null, state: boolean) {
		if (!element) return;

		if (!state) {
			document.exitPointerLock();
		} else {
			element.requestPointerLock();
		}
	}
}
