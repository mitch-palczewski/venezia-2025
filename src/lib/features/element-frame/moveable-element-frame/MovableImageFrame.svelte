<!--
@component

- An image that can be moved by dragging or transform gizmo

```svelte
		movableElement: MovableElementModel
		src:string;
		alt?: string;
		togglableTransformGizmo?: boolean;
		onSelect?: () => void;
		class?: string;
		children?: Snippet;
		fixedRatio?: boolean;
```

@example

```svelte
<MovableImage {movableElement} {src}>
    <div>Content that goes on top of the image</div>
</MovableImage>
```
-->

<script lang="ts">
	import type { MovableElementFrameModel } from './MovableElementFrameModel.svelte';
	import MovableElement from './MovableElementFrame.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		movableElement: MovableElementFrameModel;
		src: string;
		alt?: string;
		togglableTransformGizmo?: boolean;
		onSelect?: () => void;
		fixedRatio?: boolean;
	}

	let {
		movableElement,
		src,
		alt = '',
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

		if (fixedRatio) {
			movableElement.height = movableElement.width / ratio;
		}
	}
</script>

<MovableElement
	movableElementFrameModel={movableElement}
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
</MovableElement>
