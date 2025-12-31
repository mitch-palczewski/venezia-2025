
	import { useTexture } from '@threlte/extras';
	import {
		EquirectangularReflectionMapping,
		SRGBColorSpace,
		LinearToneMapping,
		Scene,
		WebGLRenderer,
		Texture
	} from 'three';
import { EnvironmentMap, testEnvironments } from './assetInventory/environmentMap';

export class PileEnvironment{
	selectedEnvironment = $state<EnvironmentMap>(testEnvironments[0])
	private scene: Scene;
    private renderer: WebGLRenderer;

	constructor(scene: Scene, renderer: WebGLRenderer, selectedEnvironment?: EnvironmentMap){
		this.scene = scene;
        this.renderer = renderer;
		if (selectedEnvironment){
			this.selectedEnvironment = selectedEnvironment
		}
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
}

