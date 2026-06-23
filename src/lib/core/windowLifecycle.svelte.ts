export class WindowLifecycle {
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

	/**
     * Determines if the application is currently actively viewed and engaged by the user.
     * Evaluates to `true` only when the browser tab is explicitly active (visible) AND 
     * the window currently holds system focus.
     * * @returns {boolean} True if the app is active and focused, false if hidden or blurred.
     */
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
