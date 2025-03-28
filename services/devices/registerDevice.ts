import { DB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function registerDevice(name: string): Promise<{ id: string, token: string }> {
  const deviceId = uuidv4();
  const token = uuidv4(); // Generate token for new device

  try {
    await DB.execute(
      'INSERT INTO devices (id, name, token) VALUES (?, ?, ?)',
      [deviceId, name, token]
    );

    return { id: deviceId, token };
  } catch (error) {
    throw new Error('Device registration failed');
  }
}
