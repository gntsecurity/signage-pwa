import { DB } from '../lib/db'; // Assuming `DB` is your database connection

async function seedDatabase() {
  try {
    // Insert some sample devices
    const devices = [
      { id: 'device-1', name: 'Lobby Screen', token: 'token-123', current_schedule_id: 'schedule-1' },
      { id: 'device-2', name: 'Conference Room', token: 'token-456', current_schedule_id: 'schedule-2' }
    ];
    for (const device of devices) {
      await DB.execute('INSERT INTO devices (id, name, token, current_schedule_id) VALUES (?, ?, ?, ?)', 
        [device.id, device.name, device.token, device.current_schedule_id]);
    }

    // Insert some sample media items
    const media = [
      { id: 'media-1', type: 'image', src: '/media/lobby.jpg', duration: 30 },
      { id: 'media-2', type: 'video', src: '/media/intro.mp4', duration: 60 }
    ];
    for (const mediaItem of media) {
      await DB.execute('INSERT INTO media_items (id, type, src, duration) VALUES (?, ?, ?, ?)', 
        [mediaItem.id, mediaItem.type, mediaItem.src, mediaItem.duration]);
    }

    // Insert some sample schedules
    const schedules = [
      { id: 'schedule-1', name: 'Morning Display', start_time: '08:00', end_time: '12:00', layout: JSON.stringify({ media: ['media-1'] }) },
      { id: 'schedule-2', name: 'Afternoon Display', start_time: '12:00', end_time: '17:00', layout: JSON.stringify({ media: ['media-2'] }) }
    ];
    for (const schedule of schedules) {
      await DB.execute('INSERT INTO schedules (id, name, start_time, end_time, layout) VALUES (?, ?, ?, ?, ?)', 
        [schedule.id, schedule.name, schedule.start_time, schedule.end_time, schedule.layout]);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
