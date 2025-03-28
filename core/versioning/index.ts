const LOCAL_STORAGE_KEY = 'app-version';
const CURRENT_VERSION = '1.0.0'; // This can be dynamically set based on your build process

export function getStoredVersion(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function setStoredVersion(version: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, version);
}

export function checkForVersionUpdate(): boolean {
  const storedVersion = getStoredVersion();
  if (storedVersion !== CURRENT_VERSION) {
    setStoredVersion(CURRENT_VERSION);
    return true;
  }
  return false;
}
