export async function checkSystemHealth() {
  const response = await fetch('/api/admin/system-health');
  if (!response.ok) throw new Error('System health check failed');
  return await response.json();
}
