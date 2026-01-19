import type { PageServerLoad } from './$types';
import { supabase} from '$lib/api/supabaseClient.svelte';
import type { PileDatabaseObj } from '$lib/pile/util/api/pileDatabase';






export const load: PageServerLoad = async () => {
  const { data, error } = await supabase.from('pile_objects').select<'pile_objects', PileDatabaseObj>();
  if (error) {
    console.error('Error loading pile_objects:', error.message);
    return { pileObjects: [] };
  }
  console.log(data)
  return {
    pileObjects: data ?? [],
  };
};