import { NextRequest, NextResponse } from 'next/server';
import { deviceSchema } from '../../../schemas/deviceSchema';
import { DB } from '../../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get('Authorization');

    if (!token) {
      return json({ error: 'Token is required' }, { status: 400 });
    }

    // Fetch the device by token
    const device = await DB.prepare('SELECT * FROM devices WHERE token = ?').bind(token).first();

    if (!device) {
      return json({ error: 'Invalid device token' }, { status: 404 });
    }

    // Fetch the schedule linked to the device
    const schedule = await DB.prepare('SELECT * FROM schedules WHERE id = ?').bind(device.current_schedule_id).first();

    if (!schedule) {
      return json({ error: 'No schedule found for this device' }, { status: 404 });
    }

    return json({ layout: JSON.parse(schedule.layout) });
  } catch (error) {
    console.error('Error fetching device schedule:', error);
    return json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
};
