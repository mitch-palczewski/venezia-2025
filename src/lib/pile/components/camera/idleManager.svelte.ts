export function createIdleManage(idleTimeSec: number, getEnabledSetting: () => boolean) {
	let autoRotate = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const stop = () => {
		autoRotate = false;
		if (timer) clearTimeout(timer);
	};

	const reset = () => {
		stop();
		if (getEnabledSetting()) {
			timer = setTimeout(() => (autoRotate = true), idleTimeSec * 1000);
		}
	};

	return {
		get autoRotate() {
			return autoRotate;
		},
		get isEnabled() {
			return getEnabledSetting();
		},
		stop,
		reset
	};
}
