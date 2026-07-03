<!--
@component

- Projects an element onto a virtual stage

@Props 

```svelte
    model: ProjectedElementModel
    class: string
    children: Snippet
    ...restProps
```

@example

```svelte
<ProjectedElement model={projectedElementModel} class="bg-blue" onpointerdown={handlePointerEvent}>
    <h1> This element is projected onto a virtual stage </h1>
<ProjectedElement/>
```
-->
<script lang="ts">
	import type { ProjectedElementModel } from './projectedElementModel.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLDivElement> {
        model: ProjectedElementModel;
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