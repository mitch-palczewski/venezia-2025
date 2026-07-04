export interface DragActionOptions {
    draggable: boolean;
    scaleX: number;
    scaleY: number;
    onDragStart?: () => void;
    onDrag: (designDeltaX: number, designDeltaY: number) => void;
    onDragEnd?: (totalMovement: number) => void;
}

export function draggable(node: HTMLElement, options: DragActionOptions) {
    let currentOptions = options;
    let startPointer = { x: 0, y: 0 };
    let totalMovement = 0;

    function handlePointerDown(event: PointerEvent) {
        if (!currentOptions.draggable || event.button !== 0) return;

        currentOptions.onDragStart?.();
        
        startPointer = { x: event.clientX, y: event.clientY };
        totalMovement = 0;

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    }

    function handlePointerMove(event: PointerEvent) {
        const physicalDeltaX = event.clientX - startPointer.x;
        const physicalDeltaY = event.clientY - startPointer.y;

        totalMovement = Math.abs(physicalDeltaX) + Math.abs(physicalDeltaY);

        const designDeltaX = physicalDeltaX / currentOptions.scaleX;
        const designDeltaY = physicalDeltaY / currentOptions.scaleY;

        currentOptions.onDrag(designDeltaX, designDeltaY);
    }

    function handlePointerUp() {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        currentOptions.onDragEnd?.(totalMovement);
    }

    function preventDefaultDrag(e: DragEvent) {
        e.preventDefault();
    }

    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('dragstart', preventDefaultDrag);

    return {
        update(newOptions: DragActionOptions) {
            currentOptions = newOptions;
        },
        destroy() {
            node.removeEventListener('pointerdown', handlePointerDown);
            node.removeEventListener('dragstart', preventDefaultDrag);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
    };
}