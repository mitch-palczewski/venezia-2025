<script lang="ts">
    import type { Snippet } from 'svelte';
	import type { ProjectedElementModel } from './projectedElementModel.svelte';

    type Props = {
        model: ProjectedElementModel;
        class?: string;
        children?: Snippet;
    };

    let { 
        model, 
        class: className = '', 
        children,
        ...restProps 
    }: Props = $props();
</script>

<div 
    class="touch-none select-none {className}" 
    style={model.cssStyle}
    {...restProps}
>
    {@render children?.()}
</div>