<script lang="ts">
	// 1. Reactive state for the slider value
	let decimalValue = $state(1.5); // 2. Configuration for the slider
	const MIN_VALUE: number = 0.0;
	const MAX_VALUE: number = 5.0;
	const STEP_VALUE: number = 0.1; // This is the key for decimal control
</script>

<div class="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-lg ">
	<h3 class="text-lg font-semibold text-gray-900">Decimal Value Slider</h3>
	<p class="text-2xl font-bold text-indigo-600">
		Value: {decimalValue.toFixed(1)}
	</p>
	<div class="relative pt-1">
		<input
			type="range"
			bind:value={decimalValue}
			min={MIN_VALUE}
			max={MAX_VALUE}
			step={STEP_VALUE}
			class="range-lg tailwind-slider-thumb:w-5 tailwind-slider-thumb:h-5 tailwind-slider-thumb:bg-indigo-600 h-2 w-full cursor-pointer
             appearance-none rounded-lg bg-gray-200"
		/>
		<div class="mt-1 flex justify-between text-xs text-gray-500">
			<span>{MIN_VALUE.toFixed(1)}</span> <span>{MAX_VALUE.toFixed(1)}</span>
		</div>
	</div><label class="block">
		<span class="text-sm text-gray-600">Manual Input (Type a decimal)</span>
		<input
			type="number"
			step={STEP_VALUE}
			bind:value={decimalValue}
			class="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
		/>
	</label>
</div>
