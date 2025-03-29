'use client';

export default function MediaRenderer({ item }: { item: any }) {
  if (!item?.src) return null;

  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt=""
        className="w-full h-full object-contain"
        draggable={false}
      />
    );
  }

  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        className="w-full h-full object-contain"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <div className="text-white text-lg">
      Unsupported media type: {item.type}
    </div>
  );
}
