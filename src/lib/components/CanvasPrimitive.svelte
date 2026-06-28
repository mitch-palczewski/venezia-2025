<script lang="ts" generics="T extends keyof SvelteHTMLElements = 'div'">
	import { Viewport } from '$lib/core';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		as?: T;
		viewport: Viewport;
		baseReference?: number;
		minScale?: number;
		maxScale?: number;
		class?: string;
		style?: string;
		children?: Snippet;
	}

	let {
		as = 'div' as T,
		viewport,
		baseReference = 800,
		minScale = 0.6,
		maxScale = 1.6,
		class: className = '',
		style: customStyle = '',
		children,
		...restProps
	}: Props & Omit<SvelteHTMLElements[T], keyof Props> = $props();

	let scaleFactor = $derived.by(() => {
		const rawScale = viewport.shortestEdge / baseReference;
		return Math.max(minScale, Math.min(maxScale, rawScale));
	});

	let elementStyle = $derived(
		[`font-size: calc(16px * ${scaleFactor})`, customStyle].filter(Boolean).join('; ')
	);
</script>

<svelte:element
	this={as}
	style={elementStyle}
	class="tracking-normal antialiased {className}"
	data-scale={scaleFactor.toFixed(2)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>