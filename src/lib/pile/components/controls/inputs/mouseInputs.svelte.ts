
/**
 * hello world
 */
export interface PointerState {
	isDragging: boolean;
	x: number;
	y: number;
	isConsumed: boolean;
}

export function usePointerInput(onActivity?: () => void, button?: number) {
	const pointer = $state<PointerState>({
		isDragging: false,
		x: 0,
		y: 0,
		isConsumed: false
	});

	const targetButton = button ?? 0;

	function updatePosition(e: PointerEvent) {
		pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
	}

	$effect(() => {
		const handlePointerDown = (e: PointerEvent) => {
			if (e.button !== targetButton) return;
			pointer.isDragging = true;
			pointer.isConsumed = false;
			updatePosition(e);
			onActivity?.();
		};

		const handlePointerMove = (e: PointerEvent) => {
			if (!pointer.isDragging || pointer.isConsumed) return;
			updatePosition(e);
		};

		const handlePointerUp = (e: PointerEvent) => {
			if (e.button !== targetButton) return;
			resetPointer();
		};

		const handlePointerCancel = () => {
			resetPointer();
		};

		const resetPointer = () => {
			pointer.isDragging = false;
			pointer.isConsumed = false;
			pointer.x = 0;
			pointer.y = 0;
		};

		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointerleave', handlePointerCancel);

		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointerleave', handlePointerCancel);
		};
	});

	return pointer;
}
