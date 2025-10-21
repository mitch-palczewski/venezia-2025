import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN || "";
		console.log(Boolean(process.env.VITE_BLOB_READ_WRITE_TOKEN))

export const actions = {
	upload: async ({ request }) => {
		const form = await request.formData();
		const file = form.get('file') as File;
		

		if (!file) {
			throw error(400, { message: 'No file to upload.' });
		}
    	console.log("uploading file ...")
		const { url } = await put(
			'object_positions.json', 
			file, 
			{token, access: 'public', allowOverwrite: true });
		return { success: true, url };
	}
};
