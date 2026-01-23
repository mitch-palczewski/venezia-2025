
	import { useTexture } from '@threlte/extras';
	import {
		EquirectangularReflectionMapping,
		SRGBColorSpace,
		LinearToneMapping,
		Scene,
		WebGLRenderer,
		Texture
	} from 'three';
import { EnvironmentMap, EnvironmentMapInventory, EnvironmentPayload, testEnvironments } from './assetInventory/environmentMap';
import type { PileDatabase, PileDatabaseObj } from './api/pileDatabase';

export const PileEnvironmentID = "e919bac9-766e-48d8-b721-0552aba9c834"
export const PileEnvironmentType = "environment"

export class PileEnvironment{
	selectedEnvironment = $state<EnvironmentMap>(testEnvironments[0])
	private scene: Scene;
    private renderer: WebGLRenderer;
    private database: PileDatabase | undefined;
    public inventory: EnvironmentMapInventory;
    public objectType = PileEnvironmentType

	constructor(scene: Scene, renderer: WebGLRenderer, inventory: EnvironmentMapInventory, selectedEnvironment?: EnvironmentMap, database?: PileDatabase){
		this.scene = scene;
        this.renderer = renderer;
        this.inventory = inventory;
        if (database) this.database = database
		if (selectedEnvironment) this.selectedEnvironment = selectedEnvironment
		$effect.pre(() => {
            this.applyEnvironment();
        });
	}

	get textureStore() {
        return useTexture(this.selectedEnvironment.path, {
            transform: (t: Texture) => {
                t.mapping = EquirectangularReflectionMapping;
                t.colorSpace = SRGBColorSpace;
                return t;
            }
        });
    }
	private applyEnvironment() {
		const texture = this.textureStore
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

    public uploadEnvironment(){
        const payload = new EnvironmentPayload(this.selectedEnvironment)
        this.database?.update(payload)
    }

    public static convertEnvironmentPayloadToDatabaseObj(payload: EnvironmentPayload): Partial<PileDatabaseObj>{
        const dbObject: Partial<PileDatabaseObj> = {
			id: payload.id,
			name: payload.map?.name,
			type: payload.objectType as "environment",
			pos_x: 0,
			pos_y: 0,
			pos_z: 0,
			rot_x: 0,
			rot_y: 0,
			rot_z: 0,
			rot_w: 0,
			scale_x: 0,
			scale_y: 0,
			scale_z: 0
		};
        return dbObject
    }


}

