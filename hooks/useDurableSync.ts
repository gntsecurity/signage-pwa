import { useEffect, useState } from 'react';

export function useDurableSync() {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const syncData = async () => {
      try {
        const response = await fetch('/api/sync');
        if (response.ok) {
          setIsSynced(true);
        }
      } catch (error) {
        console.error('Sync failed:', error);
      }
    };

    syncData();
  }, []);

  return isSynced;
}
