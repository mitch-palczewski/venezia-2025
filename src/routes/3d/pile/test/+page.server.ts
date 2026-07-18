/** Fetches all 'pile_objects' from Supabase for server-side page loading. */
import { supabase } from '$lib/api/supabaseClient.svelte';
import type { PileDatabaseObj } from '$lib/pile/util/api/pileDatabase';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase
        .from('pile_objects_test')
        .select<'pile_objects_test', PileDatabaseObj>();
    if (error) {
        console.error('Error loading pile_objects_test:', error.message);
        return { pileObjects: [] };
    }
    return {
        pileObjects: data ?? []
    };
};
