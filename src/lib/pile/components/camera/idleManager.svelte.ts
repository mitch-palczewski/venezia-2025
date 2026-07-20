
export type IdleTimer =  {
			readonly isIdle: boolean;
			readonly isEnabled: boolean;
			stop: () => void;
			reset: () => void;
		};

export function createIdleTimer(idleTimeSec: number, getEnabledSetting: () => boolean) {
	let isIdle = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const stop = () => {
		isIdle = false;
		if (timer) clearTimeout(timer);
	};

	const reset = () => {
		stop();
		if (getEnabledSetting()) {
			timer = setTimeout(() => (isIdle = true), idleTimeSec * 1000);
		}
	};

	$effect(() => {
		if (getEnabledSetting()) {
			reset();
		} else {
			stop();
		}
		return stop()
	});

	return {
		get isIdle() {
			return isIdle;
		},
		get isEnabled() {
			return getEnabledSetting();
		},
		stop,
		reset
	};
}
