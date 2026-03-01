import { useTexture } from '@threlte/extras';
import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    Scene,
    WebGLRenderer,
    Texture,
    LinearSRGBColorSpace,
    ACESFilmicToneMapping
} from 'three';
import {
    EnvironmentMap,
    EnvironmentMapInventory,
    EnvironmentPayload,
    testEnvironments
} from './assetInventory/environmentMap';
import type { PileDatabase } from './api/pileDatabase';
import { useLoader } from '@threlte/core';
// Import both loaders
import { EXRLoader, HDRLoader} from 'three/examples/jsm/Addons.js';

export const PileEnvironmentID = 'e919bac9-766e-48d8-b721-0552aba9c834';
export const PileEnvironmentType = 'environment';

export class PileEnvironment {
    public selectedEnvironment = $state<EnvironmentMap>(testEnvironments[0]);
    public inventory: EnvironmentMapInventory;
    public objectType = PileEnvironmentType;
	public isLoading = $state(false);

    private unsubscribe: (() => void) | undefined;
    private scene: Scene;
    private renderer: WebGLRenderer;
    private database: PileDatabase | undefined;

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

        $effect(() => {
            const path = this.selectedEnvironment.path;
			this.isLoading = true;
            const isExr =  path.toLowerCase().endsWith('.exr');
            const isHdr =  path.toLowerCase().endsWith('.hdr');
            const isDataTexture = isExr || isHdr;

            const transform = (t: Texture) => {
                t.mapping = EquirectangularReflectionMapping;

                if (isDataTexture) {
                    t.colorSpace = LinearSRGBColorSpace;
                } else {
                    t.colorSpace = SRGBColorSpace;
                }
                t.needsUpdate = true;
                return t;
            };

            let loaderStore;
            if (isExr) {
                loaderStore = useLoader(EXRLoader).load(path, { transform });
            } else if (isHdr) {
                loaderStore = useLoader(HDRLoader).load(path, { transform });
            } else {
                loaderStore = useTexture(path, { transform });
            }

            if (this.unsubscribe) this.unsubscribe();

            this.unsubscribe = loaderStore.subscribe((currentTexture) => {
                if (currentTexture) {
                    this.applyToScene(currentTexture);
					this.isLoading = false;
                }
            });

            return () => {
                if (this.unsubscribe) this.unsubscribe();
            };
        });
    }

    private applyToScene(texture: Texture) {
        this.scene.background = texture;
        this.scene.environment = texture;
        this.scene.environmentIntensity = 0.1;
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.8;
    }

    public uploadEnvironment() {
        const payload = new EnvironmentPayload(this.selectedEnvironment);
        this.database?.update(payload);
    }

    public setEnvironement(environmentMap: EnvironmentMap) {
        this.selectedEnvironment = environmentMap;
    }
}