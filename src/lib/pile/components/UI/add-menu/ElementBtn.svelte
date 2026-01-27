<script lang="ts">
    let {selectedElement, item, isSelected} = $props()
</script>

<button
	onclick={() => (selectedElement = item)}
	class="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border transition-all duration-200
                        {isSelected
		? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
		: 'border-white/5 bg-zinc-800/50 hover:border-white/20 hover:bg-zinc-800'}"
>
	{#if isSelected}
		<div
			class="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
		></div>
	{/if}

	<div
		class="mb-1 text-lg opacity-50 transition-transform group-hover:scale-110 group-hover:opacity-100"
	>
		📦
	</div>

	<span
		class="px-2 text-center text-[9px] leading-tight font-bold tracking-tight uppercase
                            {isSelected
			? 'text-blue-400'
			: 'text-zinc-500 group-hover:text-zinc-300'}"
	>
		{item.displayName}
	</span>

	<div class="absolute inset-0 bg-white/0 transition-colors group-active:bg-white/5"></div>
</button>
