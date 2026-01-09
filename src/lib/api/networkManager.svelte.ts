/* eslint-disable @typescript-eslint/no-explicit-any */
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export type BaseRecord<K extends string = 'id'> = {
	[P in K]: string | number;
} & {
	[key: string]: any;
};

/**
 * A manager class to synchronize a local Svelte state array with a Supabase table.
 * @template T - The record type
 * @template K - The name of the primary key property (defaults to 'id')
 */
export class SupabaseNetworkManager<T extends BaseRecord<K>, K extends string = 'id'> {
	public onInsertAction?: (newRecord: T) => void;
	public onUpdateAction?: (newRecord: T) => void;
	public onDeleteAction?: (oldRecord: Partial<T>) => void;
	public primaryKeyFeildName: K;
	private supabase: SupabaseClient;
	private channel: RealtimeChannel | null = null;
	private tableName: string;

	constructor(
		supabase: SupabaseClient,
		tableName: string,
		primaryKeyFeildName: K = 'id' as K,
		onInsertAction?: (newRecord: T) => void,
		onUpdateAction?: (newRecord: T) => void,
		onDeleteAction?: (oldRecord: Partial<T>) => void
	) {
		this.supabase = supabase;
		this.tableName = tableName;
		this.primaryKeyFeildName = primaryKeyFeildName;
		if (onInsertAction) {
			this.onInsertAction = onInsertAction;
		}
		if (onUpdateAction) {
			this.onUpdateAction = onUpdateAction;
		}
		if (onDeleteAction) {
			this.onDeleteAction = onDeleteAction;
		}
	}

	/**
	 * Opens a WebSocket connection via Supabase Realtime.
	 * Listens for ALL ('*') changes (INSERT, UPDATE, DELETE) on the specified table.
	 */
	public subscribe() {
		this.channel = this.supabase
			.channel(`${this.tableName}-changes`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: this.tableName
				},
				(payload) => this.handleRealtimeEvent(payload)
			)
			.subscribe();
	}

	/**
	 * Fetches all records from the table and updates the local state.
	 * @returns The array of records
	 */
	public async getAllRecords(): Promise<T[]> {
		const { data, error } = await this.supabase.from(this.tableName).select('*');

		if (error) {
			console.error(`Error fetching all from ${this.tableName}:`, error);
			return [];
		}
		return data;
	}

	/**
	 * Fetches a single record by its ID.
	 * @param id - The unique identifier of the record
	 * @returns The record object or null if not found
	 */
	public async getRecord(id: T[K]): Promise<T | null> {
		const pk = this.primaryKeyFeildName;
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select('*')
			.eq(pk, id)
			.single();

		if (error) {
			console.error(`Error fetching record ${id} from ${this.tableName}:`, error);
			return null;
		}

		return data as T;
	}

	/**
	 * Cleans up the WebSocket connection.
	 * Should be called when the component is unmounted to prevent memory leaks.
	 */
	public destroy() {
		if (this.channel) {
			this.supabase.removeChannel(this.channel);
			this.channel = null;
		}
	}

	/**
	 * Adds a new record to the database.
	 * @param obj - The data to insert (id is omitted as DB usually generates it).
	 */
	public async insert(obj: Partial<T>) {
		const { error } = await this.supabase.from(this.tableName).insert(obj);
		if (error) console.error('Error adding object:', error);
	}

	/**
	 * Updates an existing record by ID.
	 */
	public async update(id: T[K], changes: Partial<T>) {
		const pk = this.primaryKeyFeildName;
		const { error } = await this.supabase.from(this.tableName).update(changes).eq(pk, id);
		if (error) console.error('Error updating object:', error);
	}

	/**
	 * Removes a record from the database by its ID.
	 */
	public async delete(id: T[K]) {
		const pk = this.primaryKeyFeildName;
		const { error } = await this.supabase.from(this.tableName).delete().eq(pk, id);
		if (error) console.error('Error deleting object:', error);
	}

	private handleRealtimeEvent(payload: any) {
		const { eventType, new: newRecord, old: oldRecord } = payload;
		if (eventType === 'INSERT') this.onInsertAction?.(newRecord as T);
		if (eventType === 'UPDATE') this.onUpdateAction?.(newRecord as T);
		if (eventType === 'DELETE') this.onDeleteAction?.(oldRecord as Partial<T>);
	}
}
