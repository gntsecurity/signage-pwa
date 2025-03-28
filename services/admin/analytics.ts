export async function getAnalytics() {
  const response = await fetch('/api/admin/analytics');
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return await response.json();
}
