<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MovableElementModel } from './MovableElementModel.svelte';
	import MovableElement from './MovableElement.svelte';
	


	type Props = {
		movableElement: MovableElementModel
		src:string;
		alt?: string;
		togglableTransformGizmo?: boolean;
		onSelect?: () => void;
		class?: string;
		children?: Snippet;
		fixedRatio?: boolean;
	};

	let {
		movableElement,
		src,
		alt = '',
		togglableTransformGizmo = true,
		onSelect,
		class: className = '',
		children,
		fixedRatio = false
	}: Props = $props();

	function handleImageLoad(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		const ratio = img.naturalWidth / img.naturalHeight;

		if (fixedRatio) {
			movableElement.height = movableElement.width / ratio;
		}
	}
</script>

<MovableElement moveableElement={movableElement} {togglableTransformGizmo} {onSelect} class={className}>
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
