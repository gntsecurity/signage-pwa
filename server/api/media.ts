import { NextRequest, NextResponse } from 'next/server';
import { mediaSchema } from '../../../schemas/mediaSchema';
import { DB } from '../../../lib/db';
import fs from 'fs';
import path from 'path';

const mediaDir = path.resolve(__dirname, '../public/media'); // Placeholder directory for media files

export const GET: APIRoute = async () => {
  try {
    const mediaItems = await DB.prepare('SELECT * FROM media_items').all();
    return json(mediaItems);
  } catch (error) {
    console.error('Error fetching media:', error);
    return json({ error: 'Failed to fetch media' }, { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('media') as File;

    if (!file) {
      return json({ error: 'No media file uploaded' }, { status: 400 });
    }

    const filePath = path.join(mediaDir, file.name);
    const fileStream = fs.createWriteStream(filePath);
    file.stream().pipe(fileStream);

    const mediaId = uuidv4();
    const mediaType = file.type.startsWith('image') ? 'image' : 'video';

    await DB.execute(
      'INSERT INTO media_items (id, type, src, duration) VALUES (?, ?, ?, ?)',
      [mediaId, mediaType, filePath, 0] // Duration would be calculated for video files
    );

    return json({ id: mediaId, src: filePath });
  } catch (error) {
    console.error('Error uploading media:', error);
    return json({ error: 'Failed to upload media' }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    const mediaItem = await DB.prepare('SELECT * FROM media_items WHERE id = ?').bind(id).first();

    if (!mediaItem) {
      return json({ error: 'Media item not found' }, { status: 404 });
    }

    fs.unlinkSync(mediaItem.src); // Delete media file from the server
    await DB.execute('DELETE FROM media_items WHERE id = ?', [id]);

    return json({ message: 'Media item deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return json({ error: 'Failed to delete media' }, { status: 500 });
  }
};
