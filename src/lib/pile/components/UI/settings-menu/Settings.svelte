<script lang="ts">
	import { ambientManager } from '$lib/audio/ambient.svelte';
	import { audioSettings} from '$lib/audio/audio.svelte';
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

	interface Props {
		uiSettings: SettingsState;
	}
	let { uiSettings }: Props = $props();
</script>

<div class="md:px-30 grid-cols-2 grid gap-8 my-auto h-full">
	<div class="space-y-6">
		<div class="flex flex-col gap-2">
			<label for="speed" class="text-xs font-medium tracking-wider text-white uppercase">
				Movement Speed
			</label>
			<input
				id="speed"
				type="number"
				min="0.1"
				step="0.1"
				bind:value={uiSettings.movementSpeed}
				class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
			/>
		</div>
		
		

		<div class="flex flex-col gap-2">
			<span class="text-xs font-medium tracking-wider text-white uppercase"
				>Click Interaction</span
			>
			<div class="flex rounded-md bg-zinc-800 p-1">
				<button
					onclick={() => (uiSettings.doubleClick = false)}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {!uiSettings.doubleClick
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Single
				</button>
				<button
					onclick={() => (uiSettings.doubleClick = true)}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {uiSettings.doubleClick
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Double
				</button>
			</div>
		</div>
		</div>

	
		<div class="space-y-4 text-white">
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Presentation Mode</span>
				<input
					type="checkbox"
					bind:checked={uiSettings.presentationMode}
					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Show Grid</span>
				<input
					type="checkbox"
					bind:checked={uiSettings.showGrid}
					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Auto Rotate When Idle</span>
				<input
					type="checkbox"
					bind:checked={uiSettings.isIdleEnabled}
					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Mute SFX</span>
				<input
					type="checkbox"
					bind:checked={audioSettings.SFXIsMuted}
					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Mute Ambient</span>
				<input
					type="checkbox"
					bind:checked={audioSettings.ambientIsMuted}
					onchange={() => ambientManager.setMute(audioSettings.ambientIsMuted)}

					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="">Mute All</span>
				<input
					type="checkbox"
					bind:checked={audioSettings.isMuted}
					onchange={() => {
						ambientManager.setMute(audioSettings.isMuted)
						audioSettings.SFXIsMuted = audioSettings.isMuted
						audioSettings.ambientIsMuted = audioSettings.isMuted
					}}

					class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
				/>
			</label>
		</div>
	
</div>
