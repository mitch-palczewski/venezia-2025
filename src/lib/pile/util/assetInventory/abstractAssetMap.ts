export abstract class BaseMap {
	readonly name: string;
	readonly displayName: string;
	readonly path: string;

	constructor(name: string, path: string, displayName?: string) {
		this.name = name;
		this.path = path;
		this.displayName = displayName ?? name;
	}
}

export abstract class BaseInventory<T extends BaseMap> {
	protected items: T[] = [];

	constructor(initalItems?: T[]) {
		if (initalItems) {
			this.add(initalItems);
		}
	}

	public add(items: T[]): void {
		this.items = [...this.items, ...items];
	}

	public exitsts(name: string): boolean {
		return this.items.some((m) => m.name === name);
	}

	public getAll(): T[] {
		return [...this.items];
	}

	public get(name: string): T | undefined {
		const foundObject = this.items.findLast((m) => m.name === name);
		if (!foundObject) {
			console.warn(`WARNING: did not find ${name} in ${this.constructor.name}`);
		}
		return foundObject;
	}

	protected validateDuplicates(): {
		names: Set<string>;
		displayNames: Set<string>;
		paths: Set<string>;
	} {
		const names = new Set<string>();
		const displayNames = new Set<string>();
		const paths = new Set<string>();
		this.items.forEach((item) => {
			if (names.has(item.name)) throw new Error(`Duplicate Name: "${item.name}"`);
			if (displayNames.has(item.displayName))
				throw new Error(`Duplicate Display Name: "${item.displayName}"`);
			if (paths.has(item.path)) throw new Error(`Duplicate Path: "${item.path}"`);

			names.add(item.name);
			displayNames.add(item.displayName);
			paths.add(item.path);
		});
		return { names, displayNames, paths };
	}

	// Force children to implement specific file extension checks
	public abstract validate(): void;
}
