import { BaseInventory, BaseMap } from './abstractAssetMap';

type EnvironmentFileType = 'jpg' | 'hdr' | 'png';

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
		name: 'world',
		displayName: 'Marseille',
		path: '/images/environment/world.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'trees',
		displayName: 'Trees',
		path: '/images/environment/trees.jpg',
		fileType: 'jpg'
	}),
	new EnvironmentMap({
		name: 'yellow',
		displayName: 'Yellow',
		path: '/images/environment/yellow.png',
		fileType: 'png'
	}),
	new EnvironmentMap({
		name: 'Studio_Mitch',
		displayName: 'Studio',
		path: '/images/environment/Studio_Mitch.png',
		fileType: 'png'
	})
];
