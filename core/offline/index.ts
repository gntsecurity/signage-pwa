export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}

export function listenToOfflineChanges(callback: (offline: boolean) => void): () => void {
  const update = () => callback(!navigator.onLine);

  window.addEventListener('online', update);
  window.addEventListener('offline', update);

  return () => {
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
  };
}
