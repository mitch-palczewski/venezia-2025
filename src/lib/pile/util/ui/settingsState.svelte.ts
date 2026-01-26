export interface SettingsStateConfig {
	showGrid?: boolean;
}

export class SettingsState {
	#presentationMode = $state(false);
	public defaultShowGrid;
	public showGrid: boolean = $state(false);
	public showUI = $state(true);
	public showCursor = $state(true);
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

	get presentationMode() {
		return this.#presentationMode;
	}
	set presentationMode(value) {
		if (value === true) {
			this.showGrid = false;
			this.showUI = false;
			this.showCursor = false;
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

	public static setPointerLock(element: HTMLElement | null, state: boolean) {
		if (!element) return;

		if (!state) {
			document.exitPointerLock();
		} else {
			element.requestPointerLock();
		}
	}
}
