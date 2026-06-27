<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
	import type { ContainerModel } from './containerModel.svelte';

	type Props = {
		container: ContainerModel;
		src: string;
		alt?: string;
		showTransformGizmo?: boolean;
		togglableTransformGizmo?: boolean;
		onSelect?: () => void;
		class?: string;
		children?: Snippet;
		fixedRatio?: boolean;
	};

	let {
		container,
		src,
		alt = '',
		showTransformGizmo = $bindable(true),
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
			container.height = container.width / ratio;
		}
	}
</script>

<Container {container} {togglableTransformGizmo} {onSelect} class={className}>
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
</Container>
