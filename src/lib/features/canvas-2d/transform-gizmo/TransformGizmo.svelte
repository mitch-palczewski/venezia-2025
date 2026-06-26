<script lang="ts">
    import ArrowGizmo from './ArrowGizmo.svelte';

    type Props = {
        ondrag: (side: 'left' | 'right' | 'top' | 'bottom', delta: number) => void;
        showLeft?: boolean;
        showRight?: boolean;
        showTop?: boolean;
        showBottom?: boolean;
        xColor?: 'red' | 'green' | 'blue' | 'sky';
        yColor?: 'red' | 'green' | 'blue' | 'sky';
    };

    let {
        ondrag,
        showLeft = true,
        showRight = true,
        showTop = true,
        showBottom = true,
        xColor = 'red',
        yColor = 'green'
    }: Props = $props();
</script>

<div class="pointer-events-none absolute inset-0 z-50 overflow-visible">
    {#if showLeft}
        <ArrowGizmo side="left" color={xColor} ondrag={(d) => ondrag('left', d)} />
    {/if}

    {#if showRight}
        <ArrowGizmo side="right" color={xColor} ondrag={(d) => ondrag('right', d)} />
    {/if}

    {#if showTop}
        <ArrowGizmo side="top" color={yColor} ondrag={(d) => ondrag('top', d)} />
    {/if}

    {#if showBottom}
        <ArrowGizmo side="bottom" color={yColor} ondrag={(d) => ondrag('bottom', d)} />
    {/if}
</div>