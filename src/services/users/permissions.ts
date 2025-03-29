export async function getUserPermissions(userId: string) {
  const response = await fetch(`/api/users/${userId}/permissions`);
  if (!response.ok) throw new Error('Failed to fetch permissions');
  return await response.json();
}
