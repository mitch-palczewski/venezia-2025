<script lang="ts">
	import ArrowGizmo, { type ArrowGizmoOptions } from './ArrowGizmo.svelte';

    export interface TransformGizmoOptions {
		showLeft?: boolean;
		showRight?: boolean;
		showTop?: boolean;
		showBottom?: boolean;
		xColor?: 'red' | 'green' | 'blue' | 'sky';
		yColor?: 'red' | 'green' | 'blue' | 'sky';
		arrowGizmoProps?: ArrowGizmoOptions;
	};

	interface Props extends TransformGizmoOptions {
		ondrag: (side: 'left' | 'right' | 'top' | 'bottom', delta: number) => void;
	};

	let {
		ondrag,
		showLeft = true,
		showRight = true,
		showTop = true,
		showBottom = true,
		xColor = 'red',
		yColor = 'green',
		arrowGizmoProps
	}: Props = $props();
</script>

<div class="pointer-events-none absolute inset-0 z-50 overflow-visible">
	{#if showLeft}
		<ArrowGizmo
			side="left"
			color={xColor}
			ondrag={(d) => ondrag('left', d)}
			length={arrowGizmoProps?.length}
			width={arrowGizmoProps?.width}
			padding={arrowGizmoProps?.padding}
			headSize={arrowGizmoProps?.headSize}
		/>
	{/if}

	{#if showRight}
		<ArrowGizmo
			side="right"
			color={xColor}
			ondrag={(d) => ondrag('right', d)}
			length={arrowGizmoProps?.length}
			width={arrowGizmoProps?.width}
			padding={arrowGizmoProps?.padding}
			headSize={arrowGizmoProps?.headSize}
		/>
	{/if}

	{#if showTop}
		<ArrowGizmo
			side="top"
			color={yColor}
			ondrag={(d) => ondrag('top', d)}
			length={arrowGizmoProps?.length}
			width={arrowGizmoProps?.width}
			padding={arrowGizmoProps?.padding}
			headSize={arrowGizmoProps?.headSize}
		/>
	{/if}

	{#if showBottom}
		<ArrowGizmo
			side="bottom"
			color={yColor}
			ondrag={(d) => ondrag('bottom', d)}
			length={arrowGizmoProps?.length}
			width={arrowGizmoProps?.width}
			padding={arrowGizmoProps?.padding}
			headSize={arrowGizmoProps?.headSize}
		/>
	{/if}
</div>
