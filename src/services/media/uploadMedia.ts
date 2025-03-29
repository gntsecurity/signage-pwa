export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append('media', file);

  const response = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to upload media');
  return await response.json();
}
