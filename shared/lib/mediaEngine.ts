export async function uploadMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('media', file);

  const res = await fetch('/api/media', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to upload media');
  const data = await res.json();
  return data.src; // Assuming 'src' is the media URL returned by the server
}

export async function fetchMedia(): Promise<any[]> {
  const res = await fetch('/api/media');
  if (!res.ok) throw new Error('Failed to fetch media');
  return await res.json();
}
