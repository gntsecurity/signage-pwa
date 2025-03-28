export function getStoredAuthUser(): { email: string } | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('auth-user');
  return raw ? JSON.parse(raw) : null;
}

export function getStoredDeviceToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('device-token');
}

export function clearAuthStorage(): void {
  localStorage.removeItem('auth-user');
  localStorage.removeItem('device-token');
}

export function isAuthenticated(): boolean {
  return !!getStoredAuthUser();
}
