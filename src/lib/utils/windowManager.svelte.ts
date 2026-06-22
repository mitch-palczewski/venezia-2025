export class WindowManager {
	private windowIsVisible = $state(true);
	private windowIsFocused = $state(true);

	constructor() {
		if (typeof window !== 'undefined') {
			this.handleVisibilityChange();
			this.windowIsFocused = document.hasFocus();

			window.addEventListener('visibilitychange', this.handleVisibilityChange);
			window.addEventListener('focus', this.handleFocus);
			window.addEventListener('blur', this.handleBlur);
		}
	}

	private handleVisibilityChange = () => {
		this.windowIsVisible = document.visibilityState === 'visible';
	}

	private handleFocus = () => {
		this.windowIsFocused = true;
	}

	private handleBlur = () => {
		this.windowIsFocused = false;
	}

    get isActivelyWatching(): boolean {
        return this.windowIsVisible && this.windowIsFocused;
    }

    destroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('visibilitychange', this.handleVisibilityChange);
            window.removeEventListener('focus', this.handleFocus);
            window.removeEventListener('blur', this.handleBlur);
        }
    }
}
