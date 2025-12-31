type EnvironmentFileType = 'jpg' | 'hdr' | 'png';

interface EnvironmentMapOptions {
	name: string;
	displayName?: string;
	path: string;
	fileType: EnvironmentFileType;
}

export class EnvironmentMap {
	readonly name: string;
	readonly displayName: string;
	readonly path: string;
	readonly fileType: EnvironmentFileType;
	constructor({ name, displayName, path, fileType }: EnvironmentMapOptions) {
		this.name = name;
		this.path = path;
		this.displayName = displayName ?? name;
		this.fileType = fileType;
	}
}

export class EnvironmentMapInventory {
	private items: EnvironmentMap[] = [];
	constructor(environments?: EnvironmentMap[]) {
		if (environments) {
			this.items = environments;
		}
	}
	public validate(): void {
		const names = new Set<string>();
		const displayNames = new Set<string>();
		const paths = new Set<string>();

		this.items.forEach((environment) => {
			if (
				!environment.path.toLowerCase().endsWith('.png') ||
				!environment.path.toLowerCase().endsWith('.svg')
			) {
				console.log(
					`WARNING: Unexpected Model suffix. ${environment.name} with path: ${environment.path}`
				);
			}
			if (names.has(environment.name)) {
				throw new Error(`Duplicate Name: "${environment.name}"`);
			}
			if (displayNames.has(environment.displayName)) {
				throw new Error(`Duplicate Display Name: "${environment.displayName}"`);
			}
			if (paths.has(environment.path)) {
				throw new Error(`Duplicate Path: "${environment.path}"`);
			}

			names.add(environment.name);
			displayNames.add(environment.displayName);
			paths.add(environment.path);
		});
	}
	public exists(name: string): boolean {
		return this.items.some((m) => m.name === name);
	}
	public add(models: EnvironmentMap[]): void {
		this.items = [...this.items, ...models];
	}
	public get(name: string): EnvironmentMap | undefined {
		const foundObject = this.items.find((m) => m.name === name);
		if (!foundObject) {
			console.log(`WARNING: did not find ${name} in EnvironmentMapInventory`);
            return this.items[0]
		}
		return foundObject;
	}
	public getAll(): EnvironmentMap[] {
		return [...this.items];
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
    })
]