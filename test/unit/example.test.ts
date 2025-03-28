import { describe, it, expect, vi } from 'vitest';
import { apiClient } from '@/lib/apiClient'; // Importing the apiClient utility for testing
import { deviceSchema } from '@/schemas/deviceSchema';

describe('API Tests', () => {
  it('should successfully pair a device', async () => {
    const mockDevice = {
      name: 'Test Device',
    };

    vi.spyOn(apiClient, 'POST').mockResolvedValue({
      id: 'device-1',
      token: 'token-123',
    });

    const result = await apiClient('/api/pair', {
      method: 'POST',
      body: JSON.stringify(mockDevice),
    });

    expect(result).toEqual({ id: 'device-1', token: 'token-123' });
  });

  it('should fail to pair a device if name is missing', async () => {
    const mockDevice = {};

    await expect(apiClient('/api/pair', {
      method: 'POST',
      body: JSON.stringify(mockDevice),
    })).rejects.toThrow('Device name is required');
  });
});
