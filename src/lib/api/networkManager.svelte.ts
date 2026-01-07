/* eslint-disable @typescript-eslint/no-explicit-any */
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export interface BaseRecord {
	id: string;
	[key: string]: any;
}

/**
 * A manager class to synchronize a local Svelte state array with a Supabase table.
 * @template T - A type extending BaseRecord (must have an 'id' field).
 */
export class SupabaseNetworkManager<T extends BaseRecord> {
	public testInventory = $state<T[]>([]);
	private supabase: SupabaseClient;
	private channel: RealtimeChannel | null = null;
	private tableName: string;
	private onInsertAction: (newRecord: T) => void = this.defaultOnInsertObject;
	private onUpdateAction: (newRecord: T) => void = this.defaultOnUpdateObject;
	private onDeleteAction: (oldRecord: Partial<T>) => void = this.defaultOnDeleteObject;

	constructor(
		supabase: SupabaseClient,
		tableName: string,
		onInsertAction?: (newRecord: T) => void,
		onUpdateAction?: (newRecord: T) => void,
		onDeleteAction?: (oldRecord: Partial<T>) => void
	) {
		this.supabase = supabase;
		this.tableName = tableName;
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
	public async getRecord(id: T['id']): Promise<T | null> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select('*')
			.eq('id', id)
			.single(); // Use .single() because IDs are unique

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
	public async update(id: T['id'], changes: Partial<T>) {
		const { error } = await this.supabase.from(this.tableName).update(changes).eq('id', id);
		if (error) console.error('Error updating object:', error);
	}

	/**
	 * Removes a record from the database by its ID.
	 */
	public async delete(id: T['id']) {
		console.log('Deleting id: ', id);
		const { error } = await this.supabase.from(this.tableName).delete().eq('id', id);
		if (error) console.error('Error deleting object:', error);
	}

	private handleRealtimeEvent(payload: any) {
		const { eventType, new: newRecord, old: oldRecord } = payload;
		switch (eventType) {
			case 'INSERT':
				this.onInsertAction(newRecord as T);
				break;

			case 'UPDATE': {
				this.onUpdateAction(newRecord as T);
				break;
			}

			case 'DELETE':
				this.onDeleteAction(oldRecord as Partial<T>);
				break;
		}
	}

	private defaultOnInsertObject(newRecord: T) {
		this.testInventory.unshift(newRecord);
		console.warn(
			`Attemping to handle INSERT of new Record. Set NetworkManager onInsertObject(newRecord:any) => void`,
			newRecord
		);
	}

	private defaultOnUpdateObject(newRecord: T) {
		const index = this.testInventory.findIndex((item) => item.id === newRecord.id);
		if (index !== -1) {
			this.testInventory[index] = newRecord;
		}
		console.warn(
			`Attemping to handle UPDATE of Record. Set NetworkManager onUpdateObject(newRecord:any) => void`,
			newRecord
		);
	}

	private defaultOnDeleteObject(oldRecord: Partial<T>) {
		this.testInventory = this.testInventory.filter((item) => item.id !== oldRecord.id);
		console.warn(
			`Attemping to handle Delete of Record. Set NetworkManager onDeleteObject(newRecord:any) => void`,
			oldRecord
		);
	}
}
