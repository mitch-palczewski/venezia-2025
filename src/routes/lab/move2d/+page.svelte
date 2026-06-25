<script lang="ts">
  // Define types for our tracking
  type DragAxis = 'both' | 'x' | 'y';

  // 1. Svelte 5 State Runes
  let box = $state({ x: 150, y: 150 });
  let activeAxis = $state<DragAxis | null>(null);

  // Temporary anchors to calculate distance moved (deltas)
  let startPointer = { x: 0, y: 0 };
  let startBox = { x: 0, y: 0 };

  function handlePointerDown(event: PointerEvent, axis: DragAxis) {
    // Prevent the arrow click from bubbling up to the main box body
    event.stopPropagation(); 
    
    // Set active axis constraint
    activeAxis = axis;
    
    // Capture initial positions
    startPointer = { x: event.clientX, y: event.clientY };
    startBox = { x: box.x, y: box.y };

    // Attach listeners globally so dragging doesn't break if the mouse leaves the element
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!activeAxis) return;

    const deltaX = event.clientX - startPointer.x;
    const deltaY = event.clientY - startPointer.y;

    // 3. Conditional Position Updates based on activeAxis
    if (activeAxis === 'both' || activeAxis === 'x') {
      box.x = startBox.x + deltaX;
    }
    if (activeAxis === 'both' || activeAxis === 'y') {
      box.y = startBox.y + deltaY;
    }
  }

  function handlePointerUp() {
    activeAxis = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }
</script>

<div
  class="absolute p-6 w-48 h-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl text-white cursor-move flex flex-col justify-center items-center group touch-none overflow-visible"
  style="left: {box.x}px; top: {box.y}px;"
  onpointerdown={(e) => handlePointerDown(e, 'both')}
>
  <span class="font-semibold text-sm">Drag Body Freeform</span>
  <span class="text-xs text-slate-400 mt-1">X: {box.x} | Y: {box.y}</span>

  <div class="absolute inset-0 pointer-events-none overflow-visible">
    
    <button
      type="button"
      class="absolute left-full top-1/2 -translate-y-1/2 pl-3 flex items-center cursor-ew-resize active:scale-110 transition-transform z-50 h-8 pointer-events-auto"
      onpointerdown={(e) => handlePointerDown(e, 'x')}
    >
      <div class="w-10 h-1 bg-red-500 shadow-md"></div>
      <svg class="w-3 h-3 text-red-500 fill-current -ml-0.5" viewBox="0 0 24 24">
        <path d="M21 12l-18 9v-18z" />
      </svg>
      <span class="ml-1 text-[10px] font-bold text-red-400">X</span>
    </button>

    <button
      type="button"
      class="absolute top-full left-1/2 -translate-x-1/2 pt-3 flex flex-col items-center cursor-ns-resize active:scale-110 transition-transform z-50 w-8 pointer-events-auto"
      onpointerdown={(e) => handlePointerDown(e, 'y')}
    >
      <div class="w-1 h-10 bg-green-500 shadow-md"></div>
      <svg class="w-3 h-3 text-green-500 fill-current -mt-0.5" viewBox="0 0 24 24">
        <path d="M12 21l-9-18h18z" />
      </svg>
      <span class="mt-1 text-[10px] font-bold text-green-400">Y</span>
    </button>

  </div>
</div>