import type { ObjectPositions } from '../types';
import type { Writable } from 'svelte/store';

export async function fetchPositions(
	url: string,
	data: Writable<ObjectPositions | null>,
	loading: Writable<boolean>,
	error: Writable<string | null>
) {
	console.log("Fetching Postions ...")
	loading.set(true);
	error.set(null);
	try {
		if (!url) throw new Error('Blob URL is not set');
		const response = await fetch(url, { cache: 'no-cache' });
		if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.status}`);
		const json: ObjectPositions = await response.json();
		console.log(json);
		data.set(json);
	} catch (e) {
		error.set(e instanceof Error ? e.message : String(e));
		data.set(null);
		console.log(e)
	} finally {
		loading.set(false);
	}
}
