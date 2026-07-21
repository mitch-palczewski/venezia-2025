export interface KeyState {
	w: boolean;
	a: boolean;
	s: boolean;
	d: boolean;
	space: boolean;
	shift: boolean;
	arrowUp: boolean;
	arrowDown: boolean;
	arrowLeft: boolean;
	arrowRight: boolean;
}

const KEY_MAP: Record<string, keyof KeyState> = {
    w: 'w',
    a: 'a',
    s: 's',
    d: 'd',
    ' ': 'space',
    space: 'space',
    shift: 'shift',
    arrowup: 'arrowUp',
    arrowdown: 'arrowDown',
    arrowleft: 'arrowLeft',
    arrowright: 'arrowRight'
};

export function useKeyboardInput(
    onActivity?: () => void, 
    preventDefault?: boolean 
) {
	const keys = $state<KeyState>({
		w: false,
		a: false,
		s: false,
		d: false,
		space: false,
		shift: false,
		arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false
	});

	function handleKey(e: KeyboardEvent, isPressed: boolean) {
		const target = e.target as HTMLElement | null;
		if (
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
		) {
			return;
		}

		const rawKey = e.key.toLowerCase();
		const mappedKey = KEY_MAP[rawKey] || (e.code === 'Space' ? 'space' : null);

		if (mappedKey in keys) {
			const typedKey = mappedKey as keyof KeyState;

			if (preventDefault && typedKey === 'space') {
				e.preventDefault();
			}

			if (keys[typedKey] !== isPressed) {
				keys[typedKey] = isPressed;
				if (isPressed) {
					onActivity?.();
				}
			}
		}
	}

	$effect(() => {
		const onKeyDown = (e: KeyboardEvent) => handleKey(e, true);
		const onKeyUp = (e: KeyboardEvent) => handleKey(e, false);

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	});

	return keys;
}
