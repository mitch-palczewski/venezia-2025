import type { PageServerLoad } from './$types';
import { supabase} from '$lib/api/supabaseClient.svelte';
import type { PilePayloadObject } from '$lib/pile';





export const load: PageServerLoad = async () => {
  const { data, error } = await supabase.from('pile_objects').select<'pile_objects', PilePayloadObject>();
  if (error) {
    console.error('Error loading pile_objects:', error.message);
    return { pileObjects: [] };
  }
  console.log(data)
  return {
    pileObjects: data ?? [],
  };
};