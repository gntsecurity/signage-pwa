export async function loginUser(email: string, password: string) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to log in');
  return await response.json();
}
