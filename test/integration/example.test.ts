import { describe, it, expect, vi } from 'vitest';
import { apiClient } from '@/lib/apiClient';

describe('Integration Tests', () => {
  it('should create a new schedule and return it', async () => {
    const mockSchedule = {
      name: 'Morning Display',
      layout: { media: ['media-1', 'media-2'] },
      startTime: '08:00',
      endTime: '12:00',
    };

    vi.spyOn(apiClient, 'POST').mockResolvedValue({
      id: 'schedule-1',
    });

    const result = await apiClient('/api/schedules', {
      method: 'POST',
      body: JSON.stringify(mockSchedule),
    });

    expect(result).toEqual({ id: 'schedule-1' });
  });

  it('should update a schedule and return the updated schedule', async () => {
    const updatedSchedule = {
      id: 'schedule-1',
      name: 'Updated Morning Display',
      layout: { media: ['media-1'] },
      startTime: '08:00',
      endTime: '11:00',
    };

    vi.spyOn(apiClient, 'PUT').mockResolvedValue({
      message: 'Schedule updated successfully',
    });

    const result = await apiClient('/api/schedules', {
      method: 'PUT',
      body: JSON.stringify(updatedSchedule),
    });

    expect(result).toEqual({ message: 'Schedule updated successfully' });
  });

  it('should delete a schedule and return confirmation', async () => {
    const scheduleId = 'schedule-1';

    vi.spyOn(apiClient, 'DELETE').mockResolvedValue({
      message: 'Schedule deleted successfully',
    });

    const result = await apiClient('/api/schedules', {
      method: 'DELETE',
      body: JSON.stringify({ id: scheduleId }),
    });

    expect(result).toEqual({ message: 'Schedule deleted successfully' });
  });
});
