import { useTexture } from '@threlte/extras';
import {
	EquirectangularReflectionMapping,
	SRGBColorSpace,
	LinearToneMapping,
	Scene,
	WebGLRenderer,
	Texture
} from 'three';
import {
	EnvironmentMap,
	EnvironmentMapInventory,
	EnvironmentPayload,
	testEnvironments
} from './assetInventory/environmentMap';
import type { PileDatabase } from './api/pileDatabase';

export const PileEnvironmentID = 'e919bac9-766e-48d8-b721-0552aba9c834';
export const PileEnvironmentType = 'environment';

export class PileEnvironment {
	public selectedEnvironment = $state<EnvironmentMap>(testEnvironments[0]);
	public inventory: EnvironmentMapInventory;
	public objectType = PileEnvironmentType;
	private scene: Scene;
	private renderer: WebGLRenderer;
	private database: PileDatabase | undefined;
	private textureStore;

	constructor(
		scene: Scene,
		renderer: WebGLRenderer,
		inventory: EnvironmentMapInventory,
		selectedEnvironment?: EnvironmentMap,
		database?: PileDatabase
	) {
		this.scene = scene;
		this.renderer = renderer;
		this.inventory = inventory;
		if (database) this.database = database;
		if (selectedEnvironment) this.selectedEnvironment = selectedEnvironment;
		this.textureStore = $derived.by(() => {
			return useTexture(this.selectedEnvironment.path, {
				transform: (t: Texture) => {
					t.mapping = EquirectangularReflectionMapping;
					t.colorSpace = SRGBColorSpace;
					return t;
				}
			});
		});

		$effect.pre(() => {
			const store = this.textureStore;
			const unsubscribe = store.subscribe((currentTexture) => {
				if (currentTexture) {
					this.applyToScene(currentTexture);
				}
			});
			return unsubscribe;
		});
	}

	private applyToScene(texture: Texture) {
		this.scene.background = texture;
		this.scene.environment = texture;
		this.renderer.toneMapping = LinearToneMapping;
		this.renderer.toneMappingExposure = 0.8;
	}
	private applyEnvironment() {
		const texture = this.textureStore;
		const unsubscribe = texture.subscribe((currentTexture) => {
			if (currentTexture) {
				this.scene.background = currentTexture;
				this.scene.environment = currentTexture;
				this.renderer.toneMapping = LinearToneMapping;
				this.renderer.toneMappingExposure = 0.8;
			}
		});
		return () => unsubscribe();
	}

	public uploadEnvironment() {
		const payload = new EnvironmentPayload(this.selectedEnvironment);
		this.database?.update(payload);
	}

	public setEnvironement(environmentMap: EnvironmentMap) {
		this.selectedEnvironment = environmentMap;
	}
}
