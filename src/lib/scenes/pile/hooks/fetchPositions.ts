import type { ObjectPositions } from "../types";
import type { Writable } from "svelte/store";


export async function fetchPositions(
    url:string, 
    data:Writable<ObjectPositions | null>, 
    loading:Writable<boolean>, 
    error:Writable<string | null>
){
		loading.set(true);
		error.set(null);
		try {
			if (!url) throw new Error('Blob URL is not set')
			const response = await fetch(url, {cache: "no-cache"})
			if (!response.ok) throw new Error('Fetch failed: ${res.status} ${res.status.text}')
			const json: ObjectPositions = await response.json();
			console.log(json)
			data.set(json)
		} catch (e) {
			error.set(e instanceof Error ? e.message : String(e))
			data.set(null)
		} finally {
			loading.set(false)
		}
	}