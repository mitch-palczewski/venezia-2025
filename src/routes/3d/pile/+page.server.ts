/*
Uploads and Downloads Object Positions from Vercel Blob Storage. 
*/

import { error, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { _OBJECT_POSITIONS_FILE_NAME, _OBJECT_POSITIONS_PATH } from '../../../constants';



export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(_OBJECT_POSITIONS_PATH);
  if (!res.ok) throw error(res.status, 'Failed to fetch data');
  const data = (await res.json());
  return { data: data };
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const file = form.get('file');

		//File Check
		if (!file) {
			throw fail(400, { message: 'No file to upload.' });
		}
		if (!(file instanceof File)) {
			return fail(400, { ok: false, error: 'Uploaded field is not a file' });
		}
		const mime = file.type || '';
		if (mime !== 'application/json' && !mime.startsWith('text/')) {
			return fail(415, { ok: false, error: 'Unsupported file type, expected JSON' });
		}

		//Content Check
		let text: string;
		try {
			text = await file.text();
		} catch {
			return fail(400, { ok: false, error: 'Failed to read file' });
		}
		let json: unknown;
		try {
			json = JSON.parse(text);
		} catch {
			return fail(400, { ok: false, error: 'Invalid JSON' });
		}

		try {
			const { url } = await put(_OBJECT_POSITIONS_FILE_NAME, file, {
				token: env.BLOB_READ_WRITE_TOKEN,
				access: 'public',
				allowOverwrite: true
			});
			return { success: true, url, parsed: json };
		} catch (e) {
			console.error('upload error', e);
			throw error(502, 'Failed to upload to blob storage');
		}
	}
};
