/* eslint-disable @typescript-eslint/no-unused-vars */
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { supabase } from '$lib/api/supabaseClient.svelte';
import { json, type RequestHandler } from '@sveltejs/kit';
import { put } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('screenshot') as File;
    //const name = (formData.get('name') as string) || null;

    if (!file || file.size === 0) {
        return json({ error: 'No file provided' }, { status: 400 });
    }

    try {
        const blob = await put(`screenshots/${Date.now()}.webp`, file, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        const { data, error } = await supabase
            .from('pile_screenshots')
            .insert([{ name: "test", url: blob.url }])
            .select()
            .single(); 

        if (error) {
            return json({ error: `Database error: ${error.message}` }, { status: 500 });
        }

        return json({ success: true });
    } catch (err) {
        console.error(err);
        return json({ error: 'Server error during upload' }, { status: 500 });
    }
};
