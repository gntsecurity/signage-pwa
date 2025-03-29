import { useState, useEffect } from 'react';
import DisplayLayout from '../../components/display/DisplayLayout';

export default function DisplayLayoutWrapper({ layout }: { layout: any }) {
  const [currentLayout, setCurrentLayout] = useState(layout);

  useEffect(() => {
    if (layout) {
      setCurrentLayout(layout);
    }
  }, [layout]);

  return <DisplayLayout layout={currentLayout} />;
}
