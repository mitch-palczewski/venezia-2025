<script lang="ts">
  import { PileNetworkManager, supabase} from '$lib/api/supabaseClient.svelte.js';
  import { onDestroy, onMount } from 'svelte';

  let { data } = $props();
  const pileManager = new PileNetworkManager(supabase, data.pileObjects);

  onMount(() => pileManager.init());
  onDestroy(() => pileManager.destroy());

  async function addFakeObject() {
    await pileManager.addObject({
      id: crypto.randomUUID(),
      name: `New Object ${Math.floor(Math.random() * 100)}`,
      type: 'test',
      pos_x: 0, pos_y: 0, pos_z: 0,
      rot_x: 0, rot_y: 0, rot_z: 0, rot_w: 1,
      scale_x: 1, scale_y: 1, scale_z: 1
    });
  }

  // Generic updater for any field
  async function updateField(id: string, field: string, value: string | number) {
    await pileManager.updateObject(id, { [field]: value });
  }
</script>

<div class="p-4 max-w-full mx-auto font-sans relative">
  <header class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-amber-900">Pile Entity Inspector</h1>
    <button
      class="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 shadow-md transition-all"
      onclick={addFakeObject}
    >
      + Add Object
    </button>
  </header>

  <div class="overflow-x-auto bg-white border border-amber-100 rounded-xl shadow-sm">
    <table class="w-full text-left border-collapse min-w-[1200px]">
      <thead class="bg-amber-50 text-amber-900 uppercase text-[10px] font-black tracking-wider">
        <tr>
          <th class="p-3 border-b">Identify</th>
          <th class="p-3 border-b">Position (X, Y, Z)</th>
          <th class="p-3 border-b">Rotation (X, Y, Z, W)</th>
          <th class="p-3 border-b">Scale (X, Y, Z)</th>
          <th class="p-3 border-b text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each pileManager.store as obj (obj.id)}
          <tr class="border-t border-amber-50 hover:bg-amber-50/30 transition-colors text-sm">
            <td class="p-3 align-top w-64">
              <input 
                type="text" 
                value={obj.name} 
                onchange={(e) => updateField(obj.id, 'name', e.currentTarget.value)}
                class="block w-full font-bold bg-transparent border-b border-transparent focus:border-amber-500 outline-none mb-1"
              />
              <div class="flex gap-2">
                <input 
                  type="text" 
                  value={obj.type} 
                  onchange={(e) => updateField(obj.id, 'type', e.currentTarget.value)}
                  class="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 uppercase w-20 outline-none focus:bg-amber-100"
                />
                <span class="text-[10px] font-mono text-gray-300 truncate">{obj.id.slice(0,8)}...</span>
              </div>
            </td>

            <td class="p-3 align-top">
              <div class="grid grid-cols-3 gap-1">
                {#each ['pos_x', 'pos_y', 'pos_z'] as axis}
                  <div class="flex flex-col">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-[9px] text-gray-400 uppercase">{axis.split('_')[1]}</label>
                    <input 
                      type="number" step="0.1"
                      value={obj[axis as keyof typeof obj]} 
                      onchange={(e) => updateField(obj.id, axis, parseFloat(e.currentTarget.value))}
                      class="w-16 bg-gray-50 p-1 rounded border border-transparent focus:border-blue-400 outline-none text-xs"
                    />
                  </div>
                {/each}
              </div>
            </td>

            <td class="p-3 align-top">
              <div class="grid grid-cols-4 gap-1">
                {#each ['rot_x', 'rot_y', 'rot_z', 'rot_w'] as axis}
                  <div class="flex flex-col">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-[9px] text-gray-400 uppercase">{axis.split('_')[1]}</label>
                    <input 
                      type="number" step="0.01"
                      value={obj[axis as keyof typeof obj]} 
                      onchange={(e) => updateField(obj.id, axis, parseFloat(e.currentTarget.value))}
                      class="w-14 bg-gray-50 p-1 rounded border border-transparent focus:border-purple-400 outline-none text-xs"
                    />
                  </div>
                {/each}
              </div>
            </td>

            <td class="p-3 align-top">
              <div class="grid grid-cols-3 gap-1">
                {#each ['scale_x', 'scale_y', 'scale_z'] as axis}
                  <div class="flex flex-col">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-[9px] text-gray-400 uppercase">{axis.split('_')[1]}</label>
                    <input 
                      type="number" step="0.1"
                      value={obj[axis as keyof typeof obj]} 
                      onchange={(e) => updateField(obj.id, axis, parseFloat(e.currentTarget.value))}
                      class="w-14 bg-gray-50 p-1 rounded border border-transparent focus:border-green-400 outline-none text-xs"
                    />
                  </div>
                {/each}
              </div>
            </td>

            <td class="p-3 text-right align-middle">
              <button 
                onclick={() => pileManager.deleteObject(obj.id)}
                class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Delete Object"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  :global(body) { background-color: #fefaf6; }
  /* Hide arrows in number inputs for cleaner look */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>