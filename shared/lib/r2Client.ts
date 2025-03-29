export async function uploadToR2(file: File, path: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`/api/media/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to upload file to R2');
  const data = await res.json();
  return data.url; // Assuming the URL of the uploaded file is returned
}

export async function fetchFromR2(path: string): Promise<string> {
  const res = await fetch(`/api/media/${path}`);
  if (!res.ok) throw new Error('Failed to fetch media from R2');
  const data = await res.json();
  return data.url; // Assuming the URL of the fetched file is returned
}
