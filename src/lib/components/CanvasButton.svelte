<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Viewport } from '$lib/core';
    import CanvasPrimitive from './CanvasPrimitive.svelte'

	interface Props {
		viewport: Viewport;
		variant?: 'primary' | 'secondary' | 'danger';
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		viewport,
		variant = 'primary',
		onclick,
		disabled = false,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	const variantStyles = {
		primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-[0_0.2em_0.5em_rgba(99,102,241,0.2)]',
		secondary: 'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-[0.05em] border-gray-300 shadow-[0_0.1em_0.3em_rgba(0,0,0,0.05)]',
		danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-[0_0.2em_0.5em_rgba(225,29,72,0.2)]'
	};
</script>

<CanvasPrimitive
	as="button"
	{viewport}
	{onclick}
	{disabled}
	minScale={0.7}  
	maxScale={1.3}  
	class="inline-flex items-center justify-center font-semibold select-none transition-all 
	       duration-150 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none
	       px-[1.2em] py-[0.6em] text-[0.95em] rounded-[0.5em] gap-[0.4em]
	       {variantStyles[variant]} {className}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</CanvasPrimitive>