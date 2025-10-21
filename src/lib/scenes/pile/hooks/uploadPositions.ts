// NO LONGER NEEDED FOR DELETION 

import type { ObjectPositions } from '../types';

export class UploadError extends Error {
	status: number;
	constructor(message: string, status = 500) {
		super(message);
		this.name = 'UploadError';
		this.status = status;
	}
}

export async function uploadPositions(
	url: string,
	token: string,
	positons: ObjectPositions,
	opts?: { contentType?: string; cacheControl?: string }
): Promise<void> {
	if (!url) throw new UploadError('Missing upload URL', 400);
	if (!token) throw new UploadError('Missing upload token', 401);

	const body = JSON.stringify(positons);
	const headers: Record<string, string> = {
		Authorization: `Bearer ${token}`,
		'Content-Type': opts?.contentType ?? 'application/json',
		'Content-Length': String(Buffer.byteLength(body, 'utf8'))
	};

	if (opts?.cacheControl) headers['Cache-Control'] = opts.cacheControl;

	const res = await fetch(url, {
		method: 'PUT',
		headers,
		body
	});

	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new UploadError(`Upload Failed: ${res.status} ${text}`, res.status);
	}
}
