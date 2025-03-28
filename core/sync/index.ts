let syncInterval: NodeJS.Timeout | null = null;

export function startSyncing(callback: () => void, interval: number = 60_000) {
  if (syncInterval) clearInterval(syncInterval);

  syncInterval = setInterval(() => {
    callback();
  }, interval);
}

export function stopSyncing() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}
