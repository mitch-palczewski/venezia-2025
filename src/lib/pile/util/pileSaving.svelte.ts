import type { PileApp } from "./pileApp.svelte";

export class AutoSaver {
	private intervalId: ReturnType<typeof setInterval> | null = null;
	private pileApp: PileApp

	constructor(
    pileApp: PileApp,
		private isActivelyWatching: () => boolean
	) {
		this.pileApp = pileApp
	}

	public start(ms: number): void {
		if (typeof window === 'undefined') return; // Safety check for SSR
		this.stop();
		this.intervalId = setInterval(() => {
			this.initiateSave();
		}, ms);
	}

	public stop(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	private initiateSave() {
		if (this.isActivelyWatching()) {
			console.error("REMOVED Attempt Save")
		} else {
			console.log(`Inactive User. Skipping Auto Save`);
		}
	}
}
