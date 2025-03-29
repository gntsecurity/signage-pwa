export async function getMedia() {
  const response = await fetch('/api/media');
  if (!response.ok) throw new Error('Failed to fetch media');
  return await response.json();
}
