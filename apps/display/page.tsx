



'use client';

import { useEffect, useState } from 'react';
import DisplayLayout from '../../components/display/DisplayLayout';
import OfflineFallback from '../../components/display/OfflineFallback';
import VersionChecker from '../../components/display/VersionChecker';
import { useOffline } from '../../hooks/useOffline';
import { useDisplayVersion } from '../../hooks/useDisplayVersion';

export default function DisplayPage() {
  const [layoutData, setLayoutData] = useState<any>(null);
  const [error, setError] = useState(false);
  const isOffline = useOffline();
  const { versionCheck } = useDisplayVersion();

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await fetch('/api/fetch', {
          headers: { Authorization: localStorage.getItem('device-token') || '' },
        });

        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setLayoutData(data);
        versionCheck(data?.version || 'latest');
      } catch {
        setError(true);
      }
    };

    fetchLayout();
    const interval = setInterval(fetchLayout, 60_000);
    return () => clearInterval(interval);
  }, [versionCheck]);

  if (error || isOffline) return <OfflineFallback />;
  if (!layoutData) return null;

  return <DisplayLayout layout={layoutData} />;
}

