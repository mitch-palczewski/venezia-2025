import { BaseInventory, BaseMap } from './abstractAssetMap';

type EnvironmentFileType = 'jpg' | 'hdr' | 'png' | 'exr';

interface EnvironmentMapOptions {
	name: string;
	displayName?: string;
	path: string;
	fileType: EnvironmentFileType;
}

export class EnvironmentMap extends BaseMap {
	readonly fileType: EnvironmentFileType;

	constructor({ name, displayName, path, fileType }: EnvironmentMapOptions) {
		super(name, path, displayName);
		this.fileType = fileType;
	}
}

export class EnvironmentMapInventory extends BaseInventory<EnvironmentMap> {
    public validate(): void {
        this.validateDuplicates();
        this.items.forEach(item => {
            if (!item.path.toLowerCase().endsWith('.jpg') || !item.path.toLowerCase().endsWith('.png')) {
                throw new Error(`WARNING: Unexpected environment suffix for ${item.name}: ${item.path}`);
            }
        });
        console.log(`✅ Object3D Validated: ${this.items.length} models.`);
    }
}

export class EnvironmentPayload {
	map: EnvironmentMap | undefined;
	shown = true;
	id = "e919bac9-766e-48d8-b721-0552aba9c834";
	objectType = "environment";
	name = "world"

	constructor(map?:EnvironmentMap, name?:string){
		if (map){
			this.map = map
			this.name = map.name
		}
		if(name){
			this.name = name
		}
	}

	public isObject2D(){
		return false
	}
	public isObject3D(){
		return false
	}
	public isEnvironment(){
		return true
	}
}


export const testEnvironments: EnvironmentMap[] = [
	new EnvironmentMap({
		name: 'orchard',
		displayName: 'Citrus Sky',
		path: '/environment/citrus_orchard_road.hdr',
		fileType: 'hdr'
	}),
	new EnvironmentMap({
		name: 'citypile_02',
		displayName: 'Citypile 02',
		path: '/environment/citypile_02.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'citypile_03',
		displayName: 'Citypile 03',
		path: '/environment/citypile_03.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'citypile_04',
		displayName: 'Citypile 04',
		path: '/environment/citypile_04.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'citypile_04_test',
		displayName: 'Citypile 04 test',
		path: '/environment/citypile_04_test.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_01',
		displayName: 'Gradient 01',
		path: '/environment/gradient_01.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_02',
		displayName: 'Gradient 02',
		path: '/environment/gradient_02.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_03',
		displayName: 'Gradient 03',
		path: '/environment/gradient_03.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_05',
		displayName: 'Gradient 05',
		path: '/environment/gradient_05.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_waves_02',
		displayName: 'Gradient Waves 02',
		path: '/environment/gradient_waves_02.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'gradient_waves_03',
		displayName: 'Gradient Waves 03',
		path: '/environment/gradient_waves_03.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'marseille',
		displayName: 'Marseille',
		path: '/environment/marseille.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'studio_01',
		displayName: 'Studio 01',
		path: '/environment/studio_01.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'symbols',
		displayName: 'Symbols',
		path: '/environment/symbols.png',
		fileType: 'png'
	}),
];
