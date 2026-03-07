/* eslint-disable @typescript-eslint/no-explicit-any */
import { PerspectiveCamera } from 'three';
import type { Transform3D } from '../types';
import { allModels } from './assetInventory/assetsMap';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { EnvironmentMapInventory, testEnvironments } from './assetInventory/environmentMap';
import { PileEnvironment } from './pileEnvironment.svelte';
import { useThrelte } from '@threlte/core';
import { Object3DMapInventory } from './assetInventory/object3DMap';
import { Object2DMapInventory } from './assetInventory/object2DMap';
import { PileDatabase, type PileDatabaseObj } from './api/pileDatabase';
import { toPileObj } from './api/pileMapper';
import type { SettingsState } from './ui/settingsState.svelte';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { uploadScreenshot } from './api/screenshotApi';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	imageInventory = new Object2DMapInventory();
	environmentInventory = new EnvironmentMapInventory();
	database = new PileDatabase();
	state = new PileState(this.database);
	environment: PileEnvironment;
	cameraRef = $state<PerspectiveCamera>();
	controlsRef = $state<ThreeOrbitControls>();
	quality = $state<'low' | 'medium' | 'high'>('medium');
	autosave = true;
	uiSettings;
	isActivlyWatching: () => boolean;
	captureScreenshot: () => Promise<Blob>;

	constructor(
		isActivlyWatching: () => boolean,
		captureScreenshot: () => Promise<Blob>,
		uiSettings: SettingsState,
		initalDatabaseObjects?: any
	) {
		this.uiSettings = uiSettings;
		this.isActivlyWatching = isActivlyWatching;
		this.captureScreenshot = captureScreenshot;
		this.initInventories();
		const { scene, renderer } = useThrelte();
		this.environment = new PileEnvironment(
			scene,
			renderer,
			this.environmentInventory,
			undefined,
			this.database
		);
		this.state.app = this;
		this.state.uiSettings = uiSettings;
		this.uiSettings.app = this;
		if (initalDatabaseObjects) {
			this.initPileObjects(initalDatabaseObjects);
		}
	}

	private initInventories() {
		this.modelInventory.add(allModels);
		this.environmentInventory.add(testEnvironments);
	}

	public initPileObjects(rawPositionData: any) {
		const pileDatabaseObjects = rawPositionData.pileObjects as PileDatabaseObj[];
		pileDatabaseObjects.forEach((object) => {
			const pileObject = toPileObj(object);
			if (!pileObject) {
				return;
			}
			if (object.type === 'object2D') {
				this.state.objects2D.set(pileObject.id, pileObject as PileObject2D);
			}
			if (object.type === 'object3D') {
				this.state.objects3D.set(pileObject.id, pileObject as PileObject3D);
			}
			if (object.type === 'environment') {
				const environmentMap = this.environmentInventory.get(object.name);
				if (environmentMap) this.environment.setEnvironement(environmentMap);
			}
		});
	}

	public addSupabaseObject(object: PileDatabaseObj) {
		if (object.type === 'object2D') {
			initSupabaseObject(
				object,
				this.imageInventory,
				(obj) => {
					this.state.objects2D.set(obj.id, new PileObject2D(obj));
				},
				'2D Model'
			);
		}
		if (object.type === 'object3D') {
			initSupabaseObject(
				object,
				this.modelInventory,
				(obj) => {
					this.state.objects3D.set(obj.id, new PileObject3D(obj));
				},
				'3D Model'
			);
		}
	}

	async initCaptureScreenshot() {
		if (!this.captureScreenshot) return;
		const blob = await this.captureScreenshot();
		if (!blob) return;
		await uploadScreenshot(blob);
		downloadBlob(blob)
	}
}
export function downloadBlob(blob: Blob, filename = 'pilepilepile.png') {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename; 
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function initSupabaseObject(
	i: PileDatabaseObj,
	inventory: Object2DMapInventory | Object3DMapInventory,
	onCreated: (params: any) => void,
	context: string
) {
	const objectMap = inventory.get(i.name);
	if (!objectMap) {
		console.warn(`[${context} Inventory] Missing item: ${i.name}`);
		return null;
	}
	const transform: Transform3D = {
		translate: { x: i.pos_x, y: i.pos_y, z: i.pos_z },
		rotation: { x: i.rot_x, y: i.rot_y, z: i.rot_z, w: i.rot_w },
		scale: { x: i.scale_x, y: i.scale_y, z: i.scale_z }
	};
	onCreated({
		name: i.name,
		id: i.id,
		objectMap: objectMap,
		transform3D: transform,
		uniformScale: (i.scale_x + i.scale_y + i.scale_z) / 3
	});
}
