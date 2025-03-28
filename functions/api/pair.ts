import { json, type APIRoute } from 'next/api';
import { v4 as uuidv4 } from 'uuid';
import { deviceSchema } from '@/schemas/deviceSchema';
import { DB } from '@/lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = deviceSchema.parse(body); // Validating input using schema

    const token = uuidv4();
    const deviceId = uuidv4();

    // Insert device into database
    await DB.execute(
      'INSERT INTO devices (id, name, token) VALUES (?, ?, ?)',
      [deviceId, parsedBody.name, token]
    );

    return json({ id: deviceId, token });
  } catch (error) {
    console.error('Error pairing device:', error);
    return json({ error: 'Failed to pair device' }, { status: 400 });
  }
};
