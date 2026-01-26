<script lang="ts">
	interface KeyBinding {
		label: string;
		key: string;
	}

	interface BindingGroup {
		title: string;
		bindings: KeyBinding[];
	}

	const groups: BindingGroup[] = [
		{
			title: 'General',
			bindings: [
				{ label: 'Menu', key: 'h' },
				{ label: 'Presentation Mode', key: 'p' },
				{ label: 'Show/Hide Grid', key: 'g' }
			]
		},
		{
			title: 'Movement',
			bindings: [
				{ label: 'Move Forward', key: 'w' },
				{ label: 'Move Backward', key: 's' },
				{ label: 'Move Left', key: 'a' },
				{ label: 'Move Right', key: 'd' },
				{ label: 'Move Up', key: 'space' },
				{ label: 'Move Down', key: 'shift' }
			]
		}
	];
</script>

<div class="p-8 text-white ">
	<h1 class="mb-6 text-2xl font-bold tracking-tight">Key Bindings</h1>

	<div class="flex flex-wrap gap-12">
		{#each groups as group}
			<section>
				<h2 class="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
					{group.title}
				</h2>
				<div class="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-3">
					{#each group.bindings as { label, key }}
						<span class="text-gray-300">{label}</span>
						<kbd
							class="min-w-10 rounded border border-gray-600 bg-gray-800 px-2 py-1 text-center font-mono text-sm font-bold text-yellow-400 shadow-[0_2px_0_0_rgba(255,255,255,0.1)]"
						>
							{key}
						</kbd>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>