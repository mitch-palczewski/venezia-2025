<script lang="ts">
	// Define the interface for your props
	let { item, isSelected, onclick, image } = $props<{
		item: any;
		isSelected: boolean;
		onclick: () => void;
		image?: string;
	}>();
</script>

<button
	{onclick}
	class="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border transition-all duration-200
    {isSelected
		? 'border-orange-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
		: 'border-white/5 bg-zinc-800/50 hover:border-white/20 hover:bg-zinc-800'}"
>
	<div
		class="mb-1 text-lg opacity-50 transition-transform group-hover:scale-110 group-hover:opacity-100"
	>
		{#if image}
			<img src={image} alt={item.displayName} />
		{:else}
			📦
		{/if}
	</div>

	<span
		class="px-2 text-center text-[9px] leading-tight font-bold tracking-tight uppercase
        {isSelected ? 'text-orange-400' : 'text-zinc-500 group-hover:text-zinc-300'}"
	>
		{item.displayName}
	</span>
</button>
