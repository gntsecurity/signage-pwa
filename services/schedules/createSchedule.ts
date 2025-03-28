export async function createSchedule(scheduleData: any) {
  const response = await fetch('/api/schedules', {
    method: 'POST',
    body: JSON.stringify(scheduleData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to create schedule');
  return await response.json();
}
