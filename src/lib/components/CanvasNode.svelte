<script lang="ts">
	import type { Snippet } from 'svelte';
	import CanvasPrimitive from './CanvasPrimitive.svelte';
	import type { Viewport } from '$lib/core';

	interface Props {
		viewport: Viewport;
		title: string;
		status?: 'active' | 'idle' | 'error';
		class?: string;
		children?: Snippet;
	}

	let {
		viewport,
		title,
		status = 'idle',
		class: className = '',
		children
	}: Props = $props();

	const statusColors = {
		active: 'bg-emerald-500',
		idle: 'bg-amber-500',
		error: 'bg-rose-500'
	};
</script>

<CanvasPrimitive
	as="div"
	{viewport}
	class="bg-white border-[0.1em] border-gray-200/80 rounded-[1em] p-[1.5em] 
	       shadow-[0_0.8em_2em_rgba(0,0,0,0.06)] w-[22em] flex flex-col gap-[1em] 
	       transition-shadow hover:shadow-[0_1em_2.5em_rgba(0,0,0,0.1)] {className}"
>
	<div class="flex items-center justify-between border-b-[0.05em] border-gray-100 pb-[0.75em]">
		<h3 class="text-[1.2em] font-bold text-gray-900 tracking-tight">{title}</h3>
		<span class="w-[0.6em] h-[0.6em] rounded-full {statusColors[status]}" title={status}></span>
	</div>

	<div class="text-[0.95em] text-gray-600 leading-relaxed">
		{#if children}
			{@render children()}
		{/if}
	</div>
</CanvasPrimitive>