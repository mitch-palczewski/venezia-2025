import type { SvelteMap } from 'svelte/reactivity';
import type { PileDatabaseObj } from './api/pileDatabase';
import type { PileObject3D } from './pileObject.svelte';
import { toPileObj } from './api/pileMapper';
import type { PerformanceTier } from '$lib/core';

interface dbObjectsType {
	object2D: PileDatabaseObj[];
	object3D: PileDatabaseObj[];
	environment: PileDatabaseObj[];
}

export async function loadPayload(
	dbObjects: PileDatabaseObj[],
	state3DObj: SvelteMap<string, PileObject3D>,
    readyFlag: boolean,
    performanceTier: PerformanceTier = 2
) {
	const chunkSize = performanceTier === 0 ? 5 : performanceTier === 1 ? 15 : 40;;
	const frameGapMs = 16;
	const dbObjectTypes = parseObjectType(dbObjects);
	const dbModels = dbObjectTypes.object3D;
	for (let i = 0; i <= dbModels.length; i += chunkSize) {
		const chunk = dbModels.slice(i, i + chunkSize);
		for (const dbModel of chunk) {
			const model = toPileObj(dbModel) as PileObject3D;
            if(!model || !model.transform3D) continue
			state3DObj.set(model.id, model);
		}
        await new Promise((resolve) => setTimeout(resolve, frameGapMs));
	}
    readyFlag = true;
}

function parseObjectType(objects: PileDatabaseObj[]): dbObjectsType {
	const objectsTypes: dbObjectsType = {
		object2D: [],
		object3D: [],
		environment: []
	};
	objects.forEach((obj) => {
		if (obj.type === 'object2D') {
			objectsTypes.object2D.push(obj);
		}
		if (obj.type === 'object3D') {
			objectsTypes.object3D.push(obj);
		}
		if (obj.type === 'environment') {
			objectsTypes.object3D.push(obj);
		}
	});
	return objectsTypes;
}
