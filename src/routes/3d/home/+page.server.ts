import { supabase } from "$lib/api/supabaseClient.svelte";

export const load = async () => {
    const { data } = await supabase
        .from('pile_screenshots')
        .select('*')
        .order('created_at', { ascending: false });

    return { screenshots: data };
};