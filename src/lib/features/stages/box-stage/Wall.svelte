<!-- Wall.svelte -->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
        side: 'top' | 'bottom' | 'left' | 'right' | 'back';
        depth: number;
        img?: string;
        slices?: number;
        children?: Snippet<[{ sliceIndex: number }]>;
    }

    let {
        side,
        depth: resolution,
        img = '',
        slices = 1,
        class: className = '',
        style = '',
        children,
        ...restProps
    }: Props = $props();

    const getBgStyle = (url: string) => (url ? `background-image: url('${url}');` : '');

    let wallConfig = $derived.by(() => {
        switch (side) {
            case 'left':
                return {
                    classes: 'border-r bg-neutral-850',
                    styles: `
                        top: 0; 
                        left: 0; 
                        height: 100dvh; 
                        width: ${resolution}px; 
                        transform-origin: left center; 
                        transform: rotateY(90deg);
                    `
                };
            case 'right':
                return {
                    classes: 'border-l bg-neutral-800',
                    styles: `
                        top: 0; 
                        right: 0; 
                        height: 100dvh; 
                        width: ${resolution}px; 
                        transform-origin: right center; 
                        transform: rotateY(-90deg);
                    `
                };
            case 'top':
                return {
                    classes: 'border-b bg-neutral-950',
                    styles: `
                        top: 0; 
                        left: 0; 
                        width: 100%; 
                        height: ${resolution}px; 
                        transform-origin: center top; 
                        transform: rotateX(-90deg);
                    `
                };
            case 'back':
                return {
                    classes: 'bg-neutral-900 bg-cover bg-center bg-no-repeat',
                    styles: `
                        top: 0; 
                        left: 0; 
                        width: 100%; 
                        height: 100dvh; 
                        transform: translateZ(-${resolution}px);
                    `
                };
            case 'bottom':
                return {
                    classes: 'border-t bg-neutral-700',
                    styles: `
                        bottom: 0; 
                        left: 0; 
                        width: 100%; 
                        height: ${resolution}px; 
                        transform-origin: center bottom; 
                        transform: rotateX(90deg);
                    ` 
                };
            default:
                return { classes: '', styles: '' };
        }
    });

    let sliceHeight = $derived(resolution / slices);
</script>

{#if side === 'bottom' && slices > 1}
    {#each Array.from({ length: slices }) as _, i}
        {@const reverseIndex = slices - 1 - i}
        <div
            class="absolute border-t border-neutral-700/50 bg-neutral-700 {className}"
            style="
                height: {sliceHeight}px;
                bottom: 0;
                left: 0;
                width: 100%;
                transform-origin: center bottom;
                transform: translateZ(-{sliceHeight * i}px) rotateX(90deg);
                background-size: 100% {resolution}px;
                background-position: center calc({(reverseIndex / (slices - 1)) * 100}%);
                {getBgStyle(img)}
                {style}
            "
            {...restProps}
        >
            {#if children}
                {@render children({ sliceIndex: i })}
            {/if}
        </div>
    {/each}
{:else}
    <!-- STANDARD SINGLE WALL MODE -->
    <div
        class="absolute border-neutral-700/50 {wallConfig.classes} {className}"
        style="
            {wallConfig.styles}
            {getBgStyle(img)}
            {style}
        "
        {...restProps}
    >
        {#if children}
            {@render children({ sliceIndex: 0 })}
        {/if}
    </div>
{/if}