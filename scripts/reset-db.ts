import { DB } from '../lib/db'; // Assuming `DB` is a connection to your database

async function resetDatabase() {
  try {
    // Clear tables
    await DB.execute('DELETE FROM devices');
    await DB.execute('DELETE FROM schedules');
    await DB.execute('DELETE FROM media_items');
    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  }
}

resetDatabase();
