interface MediaItem {
  type: 'image' | 'video';
  src: string;
  duration: number;
}

interface Layout {
  media: MediaItem[];
  layoutType: 'grid' | 'single';
}

export function resolveLayout(layout: Layout) {
  const { layoutType, media } = layout;

  if (layoutType === 'grid') {
    // Grid layout - we can split it into multiple rows/columns
    return media.map((item, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
        {item.type === 'image' ? (
          <img src={item.src} alt="Media" className="w-full h-full object-cover" />
        ) : (
          <video src={item.src} className="w-full h-full object-cover" autoPlay muted loop />
        )}
      </div>
    ));
  } else {
    // Single item layout
    const item = media[0];
    return item.type === 'image' ? (
      <img src={item.src} alt="Media" className="w-full h-full object-contain" />
    ) : (
      <video src={item.src} className="w-full h-full object-contain" autoPlay muted loop />
    );
  }
}
