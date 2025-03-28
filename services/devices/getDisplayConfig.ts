export async function getDisplayConfig(deviceId: string) {
  const response = await fetch(`/api/devices/${deviceId}/config`);
  if (!response.ok) throw new Error('Failed to fetch device config');
  return await response.json();
}
