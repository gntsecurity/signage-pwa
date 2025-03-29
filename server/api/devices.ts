import { json, type APIRoute } from 'next/api';
import { deviceSchema } from '@/schemas/deviceSchema';
import { DB } from '@/lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const deviceId = request.url?.split('/').pop(); // Get device ID from URL
    if (!deviceId) {
      return json({ error: 'Device ID is required' }, { status: 400 });
    }

    const device = await DB.prepare('SELECT * FROM devices WHERE id = ?').bind(deviceId).first();
    if (!device) {
      return json({ error: 'Device not found' }, { status: 404 });
    }

    return json(device);
  } catch (error) {
    console.error('Error fetching device:', error);
    return json({ error: 'Failed to fetch device' }, { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = deviceSchema.parse(body); // Validating input using schema

    const deviceId = uuidv4();
    const token = uuidv4(); // Generate a unique device token

    await DB.execute(
      'INSERT INTO devices (id, name, token) VALUES (?, ?, ?)',
      [deviceId, parsedBody.name, token]
    );

    return json({ id: deviceId, token });
  } catch (error) {
    console.error('Error registering device:', error);
    return json({ error: 'Failed to register device' }, { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = deviceSchema.parse(body); // Validating input using schema

    await DB.execute(
      'UPDATE devices SET name = ?, current_schedule_id = ? WHERE id = ?',
      [parsedBody.name, parsedBody.current_schedule_id, body.id]
    );

    return json({ message: 'Device updated successfully' });
  } catch (error) {
    console.error('Error updating device:', error);
    return json({ error: 'Failed to update device' }, { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    await DB.execute('DELETE FROM devices WHERE id = ?', [id]);
    return json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('Error deleting device:', error);
    return json({ error: 'Failed to delete device' }, { status: 400 });
  }
};
