import { json, type APIRoute } from 'next/api';
import { scheduleSchema } from '../../../schemas/scheduleSchema';
import { DB } from '../../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const schedules = await DB.prepare('SELECT * FROM schedules').all();
    return json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = scheduleSchema.parse(body); // Validating input using schema

    const scheduleId = uuidv4(); // Generate a new schedule ID
    await DB.execute(
      'INSERT INTO schedules (id, name, layout, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
      [scheduleId, parsedBody.name, JSON.stringify(parsedBody.layout), parsedBody.startTime, parsedBody.endTime]
    );

    return json({ id: scheduleId });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return json({ error: 'Failed to create schedule' }, { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = scheduleSchema.parse(body); // Validating input using schema

    await DB.execute(
      'UPDATE schedules SET name = ?, layout = ?, start_time = ?, end_time = ? WHERE id = ?',
      [parsedBody.name, JSON.stringify(parsedBody.layout), parsedBody.startTime, parsedBody.endTime, body.id]
    );

    return json({ message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return json({ error: 'Failed to update schedule' }, { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    await DB.execute('DELETE FROM schedules WHERE id = ?', [id]);
    return json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return json({ error: 'Failed to delete schedule' }, { status: 400 });
  }
};
