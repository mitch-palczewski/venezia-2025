import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { put } from '@vercel/blob'

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('screenshot') as File;

    if(!file){
        return json({error: 'No file provided' }, { status: 400})
    }

    const blob = await put(`screenshot/${Date.now()}.png`, file, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN
    })

    return json(blob)
}