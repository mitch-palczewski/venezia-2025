<script lang="ts">
	import {
		PerformanceTierEvaluator,
		SystemProfiler,
		Viewport,
		type PerformanceTier
	} from '$lib/core';
	import { onMount, onDestroy } from 'svelte';

	// 1. Initialize core tracking engines
	const profiler = new SystemProfiler();
	const viewport = new Viewport();

	// 2. Local reactive state to handle simulations and async state updates
	let overrideTier = $state<PerformanceTier | null>(null);
	let simulateDataSaver = $state(profiler.isDataSaverEnabled);
	let asyncProfilingStatus = $state<'idle' | 'running' | 'success' | 'failed'>('idle');
	let refreshTrigger = $state(0); // Forces structural getter evaluations on state changes

	// 3. Derived evaluator instance bound to our simulations
	let evaluator = $derived.by(() => {
		// Explicitly track dependencies to trigger re-calculation
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		refreshTrigger;
		profiler.isDataSaverEnabled = simulateDataSaver;

		return new PerformanceTierEvaluator(profiler, viewport, overrideTier ?? undefined);
	});

	// 4. Lifecycle setups
	onMount(async () => {
		// Automatically attempt background hardware upgrade on mount
		await handleGpuUpgrade();
	});

	onDestroy(() => {
		viewport.destroy();
	});

	// 5. Upgrade execution block
	async function handleGpuUpgrade() {
		if (asyncProfilingStatus === 'running') return;
		asyncProfilingStatus = 'running';
		try {
			await profiler.profileGpuAsync();
			asyncProfilingStatus = 'success';
			refreshTrigger += 1; // Broadcast pipeline update to reactive elements
		} catch (err) {
			console.error('Async hardware profiling failed:', err);
			asyncProfilingStatus = 'failed';
		}
	}

	// Color mapper helper for tier visual metrics
	const tierColors = {
		0: { bg: 'bg-rose-50 border-rose-200 text-rose-700', badge: 'bg-rose-500' },
		1: { bg: 'bg-orange-50 border-orange-200 text-orange-700', badge: 'bg-orange-500' },
		2: { bg: 'bg-amber-50 border-amber-200 text-amber-700', badge: 'bg-amber-500' },
		3: { bg: 'bg-blue-50 border-blue-200 text-blue-700', badge: 'bg-blue-500' },
		4: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', badge: 'bg-emerald-500' }
	};
</script>

<div
	class="mx-auto max-w-6xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 font-sans text-slate-100 shadow-xl"
>
	<header
		class="flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between"
	>
		<div>
			<h1 class="flex items-center gap-2 text-2xl font-black tracking-tight text-white">
				System Capability & Performance Matrix
			</h1>
			<p class="mt-1 font-mono text-xs text-slate-400">
				Hardware Telemetry + Multi-variable Execution Cascade Analysis
			</p>
		</div>

		<div
			class="flex items-center gap-3 self-start rounded-xl border border-slate-800 bg-slate-950 p-2.5 md:self-center"
		>
			<span class="block font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase"
				>Calculated Profile</span
			>
			<div
				class="flex items-center gap-2 rounded-md px-3 py-1 font-mono text-xs font-bold tracking-wide uppercase transition-all duration-300 {tierColors[
					evaluator.performanceTier
				].bg}"
			>
				<span
					class="h-2 w-2 animate-pulse rounded-full {tierColors[evaluator.performanceTier].badge}"
				></span>
				T{evaluator.performanceTier} — {evaluator.performanceTierText}
			</div>
		</div>
	</header>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<section
			class="flex flex-col justify-between space-y-6 rounded-xl border border-slate-800 bg-slate-950 p-5"
		>
			<div class="space-y-4">
				<div>
					<h2 class="font-mono text-sm font-bold tracking-wider text-indigo-400 uppercase">
						Control Suite
					</h2>
					<p class="mt-1 text-xs text-slate-400">
						Simulate network spikes, runtime restrictions, or test UI response degradation
						parameters.
					</p>
				</div>

				<div
					class="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900 p-4"
				>
					<div class="space-y-0.5">
						<label
							for="data-saver-toggle"
							class="block cursor-pointer text-xs font-semibold text-slate-200"
							>Data Saver Mode</label
						>
						<span class="block text-[10px] text-slate-400"
							>Forces profile to Ultra Low (Tier 0)</span
						>
					</div>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						id="data-saver-toggle"
						onclick={() => (simulateDataSaver = !simulateDataSaver)}
						class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none {simulateDataSaver
							? 'bg-indigo-600'
							: 'bg-slate-700'}"
					>
						<span
							class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform {simulateDataSaver
								? 'translate-x-6'
								: 'translate-x-1'}"
						></span>
					</button>
				</div>

				<div class="space-y-2.5 rounded-lg border border-slate-800/60 bg-slate-900 p-4">
					<div class="space-y-0.5">
						<label for="override-select" class="block text-xs font-semibold text-slate-200"
							>Manual Tier Override</label
						>
						<span class="block text-[10px] text-slate-400"
							>Bypasses cascade hardware profiling checking loops</span
						>
					</div>
					<select
						id="override-select"
						bind:value={overrideTier}
						class="w-full rounded border border-slate-700 bg-slate-950 p-2 font-mono text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
					>
						<option value={null}>No Override (Active Profiling Engine)</option>
						<option value={0}>Tier 0 — Ultra Low Quality</option>
						<option value={1}>Tier 1 — Low Quality</option>
						<option value={2}>Tier 2 — Medium Quality</option>
						<option value={3}>Tier 3 — High Quality</option>
						<option value={4}>Tier 4 — Ultra High Quality</option>
					</select>
				</div>
			</div>

			<div class="space-y-3 border-t border-slate-800/80 pt-4">
				<span class="block font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase"
					>Hardware Capabilities Call</span
				>
				<button
					onclick={handleGpuUpgrade}
					disabled={asyncProfilingStatus === 'running'}
					class="hover:bg-slate-850 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-indigo-300 shadow-sm transition-all disabled:bg-slate-950 disabled:text-slate-600"
				>
					{#if asyncProfilingStatus === 'running'}
						<span
							class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent"
						></span>
						Interrogating Core APIs...
					{:else if asyncProfilingStatus === 'success'}
						Upgrade Request Verified
					{:else}
						Query Async WebGPU Specs
					{/if}
				</button>
			</div>
		</section>

		<div class="space-y-6 lg:col-span-2">
			<section class="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
				<h3 class="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
					Device Baseline Profile
				</h3>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div class="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
						<span class="block text-[10px] font-semibold text-slate-400 uppercase"
							>CPU Execution Cores</span
						>
						<p class="mt-0.5 font-mono text-xl font-bold text-white">
							{profiler.cpuCores ?? 'Unknown'}
						</p>
					</div>
					<div class="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
						<span class="block text-[10px] font-semibold text-slate-400 uppercase"
							>Device Memory</span
						>
						<p class="mt-0.5 font-mono text-xl font-bold text-white">
							{profiler.memory ? `≈ ${profiler.memory} GB` : 'Unreported'}
						</p>
					</div>
					<div class="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
						<span class="block text-[10px] font-semibold text-slate-400 uppercase"
							>Pixel Density Ratio</span
						>
						<p class="mt-0.5 font-mono text-xl font-bold text-white">{profiler.dpr}x</p>
					</div>
					<div class="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
						<span class="block text-[10px] font-semibold text-slate-400 uppercase"
							>Input Mechanism</span
						>
						<p class="mt-1.5 font-mono text-sm font-bold text-white">
							{profiler.hasTouch ? 'Touch Enabled' : 'Mouse / Pointer'}
						</p>
					</div>
				</div>
			</section>

			<section class="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
				<h3 class="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
					GPU Interrogation Metrics
				</h3>

				<div class="space-y-3 font-mono text-xs">
					<div
						class="grid grid-cols-3 items-center rounded border border-slate-800/60 bg-slate-900 p-3"
					>
						<span class="font-sans text-[10px] text-slate-400 uppercase">Active Context Driver</span
						>
						<span class="col-span-2 font-bold tracking-wider text-indigo-400 uppercase"
							>{profiler.glVersion ?? 'None'}</span
						>
					</div>

					<div
						class="grid grid-cols-3 items-center rounded border border-slate-800/60 bg-slate-900 p-3"
					>
						<span class="font-sans text-[10px] text-slate-400 uppercase"
							>Unmasked Renderer String</span
						>
						<span
							class="col-span-2 truncate text-xs text-slate-200"
							title={profiler.gpuName ?? 'Unknown'}
						>
							{profiler.gpuName ?? 'Unresolved / Masked Hardware'}
						</span>
					</div>

					<div
						class="grid grid-cols-3 items-center rounded border border-slate-800/60 bg-slate-900 p-3"
					>
						<span class="font-sans text-[10px] text-slate-400 uppercase">Max Texture Envelope</span>
						<span class="col-span-2 text-slate-200">
							{profiler.maxTextureSize ? `${profiler.maxTextureSize.toLocaleString()} px²` : 'N/A'}
						</span>
					</div>
				</div>
			</section>

			<section class="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
				<h3 class="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
					Fallback Tracking State (Screen Space Bounds)
				</h3>

				<div class="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
					<div
						class="flex items-center justify-between rounded border border-slate-800/60 bg-slate-900 p-3"
					>
						<span class="font-sans text-[10px] text-slate-400 uppercase"
							>Active Screen Area Tier</span
						>
						<span class="text-slate-200">T{viewport.areaTier} ({viewport.areaTierText})</span>
					</div>
					<div
						class="flex items-center justify-between rounded border border-slate-800/60 bg-slate-900 p-3"
					>
						<span class="font-sans text-[10px] text-slate-400 uppercase"
							>Touch Screen Adjustment</span
						>
						<span class={profiler.hasTouch ? 'font-semibold text-amber-400' : 'text-slate-400'}>
							{profiler.hasTouch ? '-1 Tier Penalty Applied' : 'No Impact'}
						</span>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
