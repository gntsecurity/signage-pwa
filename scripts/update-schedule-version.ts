import { DB } from '@/lib/db';

async function updateScheduleVersion(scheduleId: string, version: string) {
  try {
    await DB.execute('UPDATE schedules SET version = ? WHERE id = ?', [version, scheduleId]);
    console.log(`Schedule ${scheduleId} updated to version ${version}`);
  } catch (error) {
    console.error('Failed to update schedule version:', error);
  }
}

updateScheduleVersion('schedule-1', '1.0.1');
