import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { env } from '$env/dynamic/private';


export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const file = form.get('file') as File;

		if (!file) {
			throw error(400, { message: 'No file to upload.' });
		}
		console.log('uploading file ...');
		const { url } = await put('object_positions.json', file, {
			token: env.BLOB_READ_WRITE_TOKEN ,
			access: 'public',
			allowOverwrite: true
		});
		return { success: true, url };
	}
};
