import { useState, useEffect } from 'react';
import { apiClient } from '../../shared/lib/apiClient';

export function useDisplayVersion() {
  const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await apiClient('/api/version');
        if (response.latest !== currentVersion) {
          setCurrentVersion(response.latest);
          window.location.reload();
        }
      } catch (error) {
        console.error('Failed to check version', error);
      }
    };

    checkVersion();
  }, [currentVersion]);

  return currentVersion;
}
