<script lang="ts">
    import MovableFrame from './MovableFrame.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Point } from '$lib/core/viewport/viewport.types';

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'draggable'> {
        // Core structural properties to replace the old model wrapper requirement
        position: Point;
        width?: number;
        height?: number;
        
        src: string;
        alt?: string;
        draggable?: boolean;
        togglableTransformGizmo?: boolean;
        onSelect?: () => void;
        fixedRatio?: boolean;
    }

    let {
        position = $bindable(),
        width = $bindable(),
        height = $bindable(),
        src,
        alt = '',
        draggable = true,
        togglableTransformGizmo = true,
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
    {togglableTransformGizmo}
    {onSelect}
    class={className}
    {...restProps}
>
    <img
        {src}
        {alt}
        onload={handleImageLoad}
        class="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
    />

    {#if children}
        <div class="pointer-events-none absolute inset-0 h-full w-full">
            {@render children()}
        </div>
    {/if}
</MovableFrame>