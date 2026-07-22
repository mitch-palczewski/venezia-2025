<script lang="ts">
    import MovableFrame from './MovableFrame.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
	import type { CompassAnchor } from '../util/anchor';
	import type { Point } from '$lib/dom/core/viewport/viewport.types';
	import type { CoordinateProjector } from '$lib/dom/core/projector/coordinateProjector.svelte';

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'draggable'> {
        // Core structural properties to replace the old model wrapper requirement
        position: Point;
        width?: number;
        height?: number;
        anchor?: CompassAnchor;
        src: string;
        alt?: string;
        draggable?: boolean;
        togglableTransformGizmo?: boolean;
        showTransformGizmo?: boolean;
        projector?: CoordinateProjector
        onSelect?: () => void;
        fixedRatio?: boolean;
    }

    let {
        position = $bindable(),
        width = $bindable(),
        height = $bindable(),
        src,
        anchor = 'NW',
        alt = '',
        draggable = true,
        projector,
        togglableTransformGizmo = true,
        showTransformGizmo,
        onSelect,
        class: className = '',
        children,
        fixedRatio = false,
        ...restProps
    }: Props = $props();

    function handleImageLoad(event: Event) {
        const img = event.currentTarget as HTMLImageElement;
        const ratio = img.naturalWidth / img.naturalHeight;

        // If width hasn't been set yet, initialize it dynamically from the image's layout presence
        if (width === undefined) {
            width = img.clientWidth || img.naturalWidth || 300;
        }

        if (fixedRatio) {
            height = width / ratio;
        }
    }
</script>

<MovableFrame
    {position}
    {width}
    {height}
    {draggable}
    {anchor}
    {togglableTransformGizmo}
    {showTransformGizmo}
    {projector}
    {onSelect}
    class={className}
    {...restProps}
>
    <img
        {src}
        {alt}
        onload={handleImageLoad}
        class="pointer-events-none relative block w-full h-full object-cover select-none"
    />

    {#if children}
        <div class=" absolute inset-0 h-full w-full">
            {@render children()}
        </div>
    {/if}
</MovableFrame>