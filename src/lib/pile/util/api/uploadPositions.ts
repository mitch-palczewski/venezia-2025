/*
Formats positionData for upload to Vercel Blob Storage
*/
import { _OBJECT_POSITIONS_FILE_NAME, _PILE_PAGE_PATH } from "$lib/constants";


export async function uploadData(positionsData: object) {
	const signalTimeoutMs = 10000;
	const payload = positionsData;
	const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
	const file = new File([blob], _OBJECT_POSITIONS_FILE_NAME, { type: 'application/json' });

	const form = new FormData();
	form.append('file', file);
	form.append('meta', 'from-client');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), signalTimeoutMs);

	try {
		const res = await fetch(_PILE_PAGE_PATH, {
			method: 'POST',
			body: form,
			signal: controller.signal
		});
		clearTimeout(timeout);

		if (!res.ok) {
			let body;
			try {
				body = await res.json();
			} catch {
				body = await res.text();
			}
			return { ok: false, status: res.status, body };
		}

		const json = await res.json();
		console.log(json);
	} catch (rawErr) {
		const { name, message } = extractErrorInfo(rawErr);
		console.error('upload failed', { name, message, rawErr });
		if (rawErr instanceof DOMException && rawErr.name === 'AbortError') {
			return { ok: false, error: 'timeout' };
		}
		return { ok: false, error: 'network_or_unexpected', details: message };
	}
}

function extractErrorInfo(err: unknown) {
	if (err instanceof Error) {
		return { name: err.name, message: err.message, stack: err.stack };
	}
	if (typeof err === 'object' && err !== null) {
		const anyErr = err as Record<string, unknown>;
		const name = typeof anyErr.name === 'string' ? anyErr.name : 'Error';
		const message = typeof anyErr.message === 'string' ? anyErr.message : JSON.stringify(anyErr);
		return { name, message, stack: undefined };
	}
	return { name: 'Error', message: String(err), stack: undefined };
}
