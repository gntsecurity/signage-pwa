import { json, type APIRoute } from 'next/api';

const CURRENT_VERSION = '1.0.0'; // This would ideally come from your build system

export const GET: APIRoute = async () => {
  try {
    return json({ latest: CURRENT_VERSION });
  } catch (error) {
    console.error('Error checking version:', error);
    return json({ error: 'Failed to check version' }, { status: 500 });
  }
};
