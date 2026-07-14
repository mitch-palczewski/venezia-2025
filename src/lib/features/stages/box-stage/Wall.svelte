<!-- Wall.svelte -->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    // We use Omit here to clear out the default HTML children property
    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
        side: 'top' | 'bottom' | 'left' | 'right' | 'back';
        resolution: number;
        img?: string;
        slices?: number;
        // Now we can safely define our custom typed snippet
        children?: Snippet<[{ sliceIndex: number }]>;
    }

    let {
        side,
        resolution,
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
                    classes: 'top-0 left-0 h-full border-r bg-neutral-850',
                    styles: `width: ${resolution}px; transform-origin: left center; transform: rotateY(90deg);`
                };
            case 'right':
                return {
                    classes: 'top-0 right-0 h-full border-l bg-neutral-800',
                    styles: `width: ${resolution}px; transform-origin: right center; transform: rotateY(-90deg);`
                };
            case 'top':
                return {
                    classes: 'top-0 left-0 w-full border-b bg-neutral-950',
                    styles: `height: ${resolution}px; transform-origin: center top; transform: rotateX(-90deg);`
                };
            case 'back':
                return {
                    classes: 'inset-0 bg-neutral-900 bg-cover bg-center bg-no-repeat',
                    styles: `transform: translateZ(-${resolution}px);`
                };
            case 'bottom':
                return {
                    classes: 'bottom-0 left-0 w-full border-t bg-neutral-700',
                    styles: '' 
                };
        }
    });

    let sliceHeight = $derived(resolution / slices);
</script>

{#if side === 'bottom' && slices > 1}
    <!-- MULTI-SLICE FLOOR MODE -->
    {#each Array.from({ length: slices }) as _, i}
        {@const reverseIndex = slices - 1 - i}
        <div
            class="absolute border-t border-neutral-700/50 bg-neutral-700 {className}"
            style="
                height: {sliceHeight}px;
                transform-origin: center bottom;
                transform: translateY(-{sliceHeight * reverseIndex}px) translateZ(-{sliceHeight * reverseIndex}px) rotateX(90deg);
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
            <!-- Pass a fallback sliceIndex of 0 for non-sliced walls -->
            {@render children({ sliceIndex: 0 })}
        {/if}
    </div>
{/if}