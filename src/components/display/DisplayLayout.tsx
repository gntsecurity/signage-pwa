'use client';

import { useEffect, useState } from 'react';
import MediaRenderer from './MediaRenderer';

export default function DisplayLayout({ layout }: { layout: any }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!layout?.media?.length) return;

    const current = layout.media[index];
    const duration = (current?.duration || 10) * 1000;

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % layout.media.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [index, layout]);

  if (!layout?.media?.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-xl">
        No media scheduled.
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <MediaRenderer item={layout.media[index]} />
    </div>
  );
}
