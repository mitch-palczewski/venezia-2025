<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		active?: boolean;
		tooltip?: any;
		tooltipText?: string;
		children: Snippet;
		class?: string;
	}
	let {
		onclick,
		active = false,
		tooltip,
		tooltipText = '',
		children,
		class: className = ''
	}: Props = $props();

	const base =
		'group flex items-center justify-center gap-2 transition-all  backdrop-blur-md border text-sm sm:text-md  h-8 rounded-lg font-medium cursor-pointer';
	const activeStyle = 'bg-stone-100/80 text-stone-900 border-white/90 shadow-lg font-bold';
	const inactiveStyle =
		'bg-stone-900/50 text-stone-200 border-white/10 hover:border-white/30 hover:text-white';
</script>


<button
  {onclick}
  use:tooltip={tooltipText}
  class="{base} {active ? activeStyle : inactiveStyle} {className}"
>
  {@render children()}
</button>