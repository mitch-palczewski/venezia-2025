<script lang="ts">
	import { ambientManager } from '$lib/audio/ambient.svelte';
	import { audioSettings } from '$lib/audio/audio.svelte';

	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';

	interface Props {
		uiSettings: UiState;
	}
	let { uiSettings: uiState }: Props = $props();
</script>

<div class="my-auto grid h-full grid-cols-2 gap-8 md:px-30">
	<div class="space-y-6">
		<div class="flex flex-col gap-2">
			<label for="speed" class="text-xs font-medium tracking-wider text-white uppercase">
				Graphics Quality
			</label>
			<input
				id="speed"
				type="number"
				min="0"
				max="4"
				step="1"
				bind:value={uiState.performance}
				class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="speed" class="text-xs font-medium tracking-wider text-white uppercase">
				Movement Speed
			</label>
			<input
				id="speed"
				type="number"
				min="0.1"
				step="0.1"
				bind:value={uiState.movementSpeed}
				class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<span class="text-xs font-medium tracking-wider text-white uppercase">Click Interaction</span>
			<div class="flex rounded-md bg-zinc-800 p-1">
				<button
					onclick={() => (uiState.doubleClick = false)}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {!uiState.doubleClick
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Single
				</button>
				<button
					onclick={() => (uiState.doubleClick = true)}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {uiState.doubleClick
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Double
				</button>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<span class="text-xs font-medium tracking-wider text-white uppercase">Movement Controls</span>
			<div class="flex rounded-md bg-zinc-800 p-1">
				<button
					onclick={() => (uiState.app!.state.cameraControls = 'orbit')}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {uiState.app!.state.cameraControls === 'orbit'
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Orbit
				</button>
				<button
					onclick={() => (uiState.app!.state.cameraControls = 'fly')}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {uiState.app!.state.cameraControls === 'fly'
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					Fly
				</button>
				<button
					onclick={() => (uiState.app!.state.cameraControls = 'first_person')}
					class="flex-1 rounded-sm py-1.5 text-sm font-medium transition-all
                        {uiState.app!.state.cameraControls === 'first_person'
						? 'bg-zinc-600 text-white shadow-sm'
						: 'text-zinc-400 hover:text-zinc-200'}"
				>
					First Person
				</button>
			</div>
		</div>
	</div>

	<div class="space-y-4 text-white">
		<label class="flex cursor-pointer items-center justify-between">
			<span class="">Presentation Mode</span>
			<input
				type="checkbox"
				bind:checked={uiState.presentationMode}
				class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
			/>
		</label>
		<label class="flex cursor-pointer items-center justify-between">
			<span class="">Show Grid</span>
			<input
				type="checkbox"
				bind:checked={uiState.showGrid}
				class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
			/>
		</label>
		<label class="flex cursor-pointer items-center justify-between">
			<span class="">Auto Rotate When Idle</span>
			<input
				type="checkbox"
				bind:checked={uiState.isIdleEnabled}
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
					ambientManager.setMute(audioSettings.isMuted);
					audioSettings.SFXIsMuted = audioSettings.isMuted;
					audioSettings.ambientIsMuted = audioSettings.isMuted;
				}}
				class="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-offset-zinc-900"
			/>
		</label>
	</div>
</div>
