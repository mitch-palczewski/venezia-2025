export interface SettingsStateConfig {
	showGrid?: boolean;
}

export class SettingsState {
	#presentationMode = $state(false);
	public defaultShowGrid;
	public showGrid:boolean = $state(false);
	public showUI = $state(true);

	get presentationMode() {
		return this.#presentationMode;
	}
	set presentationMode(value) {
        this.showGrid = this.defaultShowGrid;
		this.showUI = true;
		if (value === true) {
			this.showGrid = false;
			this.showUI = false;
		}
	}

	constructor(config: SettingsStateConfig) {
		this.defaultShowGrid = config.showGrid || false;
		this.showGrid = this.defaultShowGrid;
	}
}
