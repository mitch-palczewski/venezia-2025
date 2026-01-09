/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, describe, vi } from 'vitest';
import { SupabaseNetworkManager } from './networkManager.svelte';
import { supabase } from './supabaseClient.svelte';

export class TestPileNetwork {
	testInventory = $state<any[]>([]);
    network = new SupabaseNetworkManager(supabase, 'pile_objects')
    primaryKeyFeildName = 'id'

    constructor(){
        this.network.onDeleteAction = this.defaultOnDeleteObject
        this.network.onInsertAction = this.defaultOnInsertObject
        this.network.onUpdateAction = this.defaultOnUpdateObject
    }

	public defaultOnInsertObject = (newRecord: any) => {
		this.testInventory.unshift(newRecord);
		console.warn(
			`Attemping to handle INSERT of new Record. Set NetworkManager onInsertObject(newRecord:any) => void`,
			newRecord
		);
	}

	public defaultOnUpdateObject = (newRecord: any) => {
		const pk = this.primaryKeyFeildName as keyof any;
		const index = this.testInventory.findIndex((item) => item[pk] === newRecord[pk]);
		if (index !== -1) {
			this.testInventory[index] = newRecord;
		}
		console.warn(
			`Attemping to handle UPDATE of Record. Set NetworkManager onUpdateObject(newRecord:any) => void`,
			newRecord
		);
	}

	public defaultOnDeleteObject= (oldRecord: Partial<any>) => {
		const pk = this.primaryKeyFeildName;
		this.testInventory = this.testInventory.filter((item) => item[pk] !== oldRecord[pk]);
		console.warn(
			`Attemping to handle Delete of Record. Set NetworkManager onDeleteObject(newRecord:any) => void`,
			oldRecord
		);
	}
}

export const createMockSupabase = () => {
    // We create spies for the "leaf" nodes (the functions that actually return data)
    const mockResponse = { data: null, error: null };
    
    // This is the "chain" object
    const chain = {
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockResolvedValue(mockResponse),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(mockResponse),
        // Add other methods like .order(), .limit() as needed
    };

    const mockClient = {
        from: vi.fn().mockReturnValue(chain),
        channel: vi.fn().mockReturnValue({
            on: vi.fn().mockReturnThis(),
            subscribe: vi.fn().mockReturnThis(),
        }),
        removeChannel: vi.fn(),
    };

    return { mockClient, chain };
};

describe('SupabaseNetworkManager', () => {
    it('should call delete with the correct table and primary key', async () => {
        // 1. Arrange
        const { mockClient, chain } = createMockSupabase();
        const manager = new SupabaseNetworkManager(mockClient as any, 'profiles', 'uuid');

        // 2. Act
        await manager.delete('user-123');

        // 3. Assert
        // Check if we targeted the right table
        expect(mockClient.from).toHaveBeenCalledWith('profiles');
        
        // Check if the chain called .delete() and then .eq() correctly
        expect(chain.delete).toHaveBeenCalled();
        expect(chain.eq).toHaveBeenCalledWith('uuid', 'user-123');
    });
});