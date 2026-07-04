<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	type Props = {
		side: 'left' | 'right' | 'top' | 'bottom';
		color: 'red' | 'green' | 'blue' | 'sky';
		ondrag: (delta: number) => void;
		length?: number;
		width?: number;
		padding?: number;
		headSize?: number;
	};

	let { side, color, ondrag, length = 10, width = 2, padding = 6, headSize = 10 }: Props = $props();

	const colorMap = {
		red: { text: 'text-red-500 group-hover:text-red-400', bg: 'bg-red-500 group-hover:bg-red-400' },
		green: {
			text: 'text-green-500 group-hover:text-green-400',
			bg: 'bg-green-500 group-hover:bg-green-400'
		},
		blue: {
			text: 'text-blue-500 group-hover:text-blue-400',
			bg: 'bg-blue-500 group-hover:bg-blue-400'
		},
		sky: { text: 'text-sky-500 group-hover:text-sky-400', bg: 'bg-sky-500 group-hover:bg-sky-400' }
	};

	const axis = $derived(side === 'left' || side === 'right' ? 'x' : 'y');
	const direction = $derived(side === 'left' || side === 'top' ? -1 : 1);

	const placementClass = $derived.by(() => {
		switch (side) {
			case 'left':
				return 'right-full top-1/2 -translate-y-1/2';
			case 'right':
				return 'left-full top-1/2 -translate-y-1/2';
			case 'top':
				return 'bottom-full left-1/2 -translate-x-1/2';
			case 'bottom':
				return 'top-full left-1/2 -translate-x-1/2';
		}
	});

	const label = $derived(`Drag ${side.charAt(0).toUpperCase() + side.slice(1)}`);

	const marginOffset = $derived(
		axis === 'x'
			? direction === 1
				? '-ml-0.5'
				: '-mr-0.5'
			: direction === 1
				? '-mt-0.5'
				: '-mb-0.5'
	);

	const rotation = $derived(
		axis === 'x'
			? direction === 1
				? 'none'
				: 'rotate(180deg)'
			: direction === 1
				? 'rotate(90deg)'
				: 'rotate(-90deg)'
	);

	const shaftRounded = $derived.by(() => {
		if (axis === 'x') return direction === 1 ? 'rounded-l' : 'rounded-r';
		return direction === 1 ? 'rounded-t' : 'rounded-b';
	});

	const shaftWidth = $derived(axis === 'x' ? 'var(--arrow-len)' : 'var(--arrow-width)');

	const shaftHeight = $derived(axis === 'x' ? 'var(--arrow-width)' : 'var(--arrow-len)');

	let startPointer = 0;

	function handlePointerDown(event: PointerEvent) {
		event.stopPropagation();
		if (event.button !== 0) return;

		startPointer = axis === 'x' ? event.clientX : event.clientY;

		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	}

	function handlePointerMove(event: PointerEvent) {
		const currentPointer = axis === 'x' ? event.clientX : event.clientY;
		const delta = currentPointer - startPointer;

		startPointer = currentPointer;

		ondrag(delta);
	}

	function handlePointerUp() {
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
	}

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		}
	});
</script>

{#snippet arrowHead()}
	<svg
		class="fill-current drop-shadow filter transition-colors {colorMap[color].text} {marginOffset}"
		style="width: var(--arrow-head); height: var(--arrow-head); transform: {rotation};"
		viewBox="0 0 24 24"
	>
		<path d="M21 12l-18 9v-18z" />
	</svg>
{/snippet}

{#snippet arrowShaft()}
	<div
		class="shadow-md transition-colors {colorMap[color].bg} {shaftRounded}"
		style="width: {shaftWidth}; height: {shaftHeight};"
	></div>
{/snippet}

<button
	type="button"
	class="group pointer-events-auto absolute z-50 flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-transform active:scale-110 {placementClass}"
	style="
        --arrow-len: {length}px;
        --arrow-width: {width}px;
        --arrow-pad: {padding}px;
        --arrow-head: {headSize}px;
        cursor: {axis === 'x' ? 'ew-resize' : 'ns-resize'};
        {axis === 'x' ? `padding-${direction === 1 ? 'left' : 'right'}: var(--arrow-pad);` : ''}
        {axis === 'y' ? `padding-${direction === 1 ? 'top' : 'bottom'}: var(--arrow-pad);` : ''}
    "
	onpointerdown={handlePointerDown}
	aria-label={label}
>
	<div class="flex {axis === 'y' ? 'flex-col' : 'flex-row'} items-center justify-center">
		{#if direction === -1}
			{@render arrowHead()}
		{/if}

		{@render arrowShaft()}

		{#if direction === 1}
			{@render arrowHead()}
		{/if}
	</div>
</button>
