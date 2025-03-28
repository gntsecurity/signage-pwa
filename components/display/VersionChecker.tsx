'use client';

import { useEffect } from 'react';

export default function VersionChecker({ currentVersion }: { currentVersion: string }) {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch('/api/version');
        const data = await res.json();
        if (data?.latest !== currentVersion) {
          window.location.reload();
        }
      } catch {
        // Silently fail, safe offline fallback
      }
    };

    const interval = setInterval(checkVersion, 30000);
    return () => clearInterval(interval);
  }, [currentVersion]);

  return null;
}
