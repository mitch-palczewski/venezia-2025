/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { SupabaseNetworkManager } from './networkManager.svelte';

/**
 * Helper to create a fresh mock client for every test
 */
export const createMockSupabase = () => {
	const mockResponse = { data: null, error: null };

	const chain = {
		select: vi.fn().mockReturnThis(),
		insert: vi.fn().mockResolvedValue(mockResponse),
		update: vi.fn().mockReturnThis(),
		delete: vi.fn().mockReturnThis(),
		eq: vi.fn().mockReturnThis(),
		single: vi.fn().mockResolvedValue(mockResponse)
	};

	const mockChannel = {
		on: vi.fn().mockReturnThis(),
		subscribe: vi.fn().mockReturnThis()
	};

	const mockClient = {
		from: vi.fn().mockReturnValue(chain),
		channel: vi.fn().mockReturnValue(mockChannel),
		removeChannel: vi.fn()
	};

	return { mockClient, chain, mockChannel };
};

describe('SupabaseNetworkManager', () => {
	let mockClient: any;
	let chain: any;
	let manager: SupabaseNetworkManager<any, 'id'>;

	beforeEach(() => {
		vi.clearAllMocks(); // Reset call counts
		const mocks = createMockSupabase();
		mockClient = mocks.mockClient;
		chain = mocks.chain;
		manager = new SupabaseNetworkManager(mockClient, 'test_table', 'id');
	});

	// --- 1. OUTGOING DATABASE CALLS ---

	describe('Outgoing API Calls', () => {
		it('should call insert with correct data', async () => {
			const payload = { name: 'New Item' };
			await manager.insert(payload);
			expect(mockClient.from).toHaveBeenCalledWith('test_table');
			expect(chain.insert).toHaveBeenCalledWith(payload);
		});

		it('should call update with correct ID and changes', async () => {
			const changes = { status: 'complete' };
			await manager.update('row-1', changes);
			expect(chain.update).toHaveBeenCalledWith(changes);
			expect(chain.eq).toHaveBeenCalledWith('id', 'row-1');
		});

		it('should handle custom primary keys correctly', async () => {
			const customManager = new SupabaseNetworkManager(mockClient, 'users', 'uuid');
			await customManager.delete('uuid-99');
			expect(chain.eq).toHaveBeenCalledWith('uuid', 'uuid-99');
		});
	});

	// --- 2. INCOMING REALTIME EVENTS ---

	describe('Realtime Events (Incoming)', () => {
		it('should trigger onInsertAction when INSERT event arrives', () => {
			const spy = vi.fn();
			manager.onInsertAction = spy;

			const mockData = { id: 1, name: 'Hello' };
			(manager as any).handleRealtimeEvent({ eventType: 'INSERT', new: mockData });

			expect(spy).toHaveBeenCalledWith(mockData);
		});

		it('should trigger onDeleteAction with old record', () => {
			const spy = vi.fn();
			manager.onDeleteAction = spy;

			const oldData = { id: 50 };
			(manager as any).handleRealtimeEvent({ eventType: 'DELETE', old: oldData });

			expect(spy).toHaveBeenCalledWith(oldData);
		});

		it('should not crash if an event fires and no listener is attached', () => {
			expect(() => {
				(manager as any).handleRealtimeEvent({ eventType: 'UPDATE', new: {} });
			}).not.toThrow();
		});
	});

	// --- 3. RESILIENCE & CLEANUP ---

	describe('Resilience & Cleanup', () => {
		it('should log an error to console if insert fails', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			chain.insert.mockResolvedValueOnce({ error: { message: 'RLS Policy Error' } });

			await manager.insert({ name: 'Fail' });

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining('Error adding object:'),
				expect.any(Object)
			);
			consoleSpy.mockRestore();
		});

		it('should call removeChannel when destroyed', () => {
			manager.subscribe(); // Connect first
			manager.destroy();

			expect(mockClient.removeChannel).toHaveBeenCalled();
		});

		it('should subscribe to the correct table changes', () => {
			manager.subscribe();
			expect(mockClient.channel).toHaveBeenCalledWith('test_table-changes');
		});
	});
});
