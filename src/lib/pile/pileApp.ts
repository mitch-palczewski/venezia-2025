import { Quaternion, Vector3 } from 'three';
import type { ObjectPositionPayload, RawDataPayload, Transform3D } from './types';
import { ModelInventory, undertowModels, variousModels } from './util/modelInventory';
import { PileObject } from './util/pileObject';
import { PileState } from './util/pileState.svelte';

export class PileApp {
	pileModelInventory = new ModelInventory();
	pileState = new PileState();
	constructor() {
		this.initPileApp();
	}



	private initPileApp() {
		this.pileModelInventory.add(undertowModels);
		this.pileModelInventory.add(variousModels);
	}


	public initObjectPositions(rawPositionData: RawDataPayload) {
		const positionData: ObjectPositionPayload = rawPositionData.data.pile_position_data;
		for (const [key, value] of Object.entries(positionData)) {
			const downloadedModel2 = new PileObject({
				name: value.name,
				id: key,
				modelPath: this.pileModelInventory.get(value.name)?.path ?? '',
				transform3D: value.transform
			});
			this.pileState.pileModels.push(downloadedModel2);
		}
	}

    public getPileObjectPositions(){
        const objectPositionsPayload: ObjectPositionPayload = {};
		let id = 1001;
		this.pileState.pileModels.forEach((model) => {
			try {
				if (!model.shown) {
					return;
				}
				console.log(model.ref);
				const v3Position = new Vector3(0, 0, 0);
				const quatRotation = new Quaternion(0, 0, 0, 0);
				const v3Scale = new Vector3(0, 0, 0);
				model.ref?.children[0].getWorldPosition(v3Position);
				model.ref?.children[0].getWorldQuaternion(quatRotation);
				model.ref?.children[0].getWorldScale(v3Scale);
				const transform: Transform3D = {
					translate: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
					rotation: {
						x: quatRotation.x,
						y: quatRotation.y,
						z: quatRotation.z,
						w: quatRotation.w
					},
					scale: { x: v3Scale.x, y: v3Scale.y, z: v3Scale.z }
				};
				objectPositionsPayload[id] = { transform: transform, name: model.name };
				id += 1;
			} catch (e) {
				console.log(e);
			}
		});

		return { pile_position_data: objectPositionsPayload };
    }
}
