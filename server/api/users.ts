import { json, type APIRoute } from 'next/api';
import { loginSchema } from '../../../schemas/authSchema';
import { DB } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    
    if (!user || user.password_hash !== password) {
      return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    return json({ message: 'Login successful' });
  } catch (error) {
    return json({ error: 'Login failed' }, { status: 500 });
  }
};
