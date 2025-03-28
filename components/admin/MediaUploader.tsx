'use client';

import { useEffect, useState } from 'react';

export default function MediaUploader() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    const res = await fetch('/api/media');
    if (res.ok) {
      const data = await res.json();
      setMedia(data);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async () => {
    if (!files?.length) return;

    setUploading(true);
    const form = new FormData();
    Array.from(files).forEach((file) => form.append('media', file));

    const res = await fetch('/api/media', {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      setFiles(null);
      fetchMedia();
    }

    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-xl">
        <label className="block mb-2 text-sm">Upload Media</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full text-sm text-white file:bg-white file:text-black file:rounded file:px-4 file:py-2"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !files?.length}
          className="mt-3 px-4 py-2 bg-white text-black rounded font-semibold disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg p-2">
            {item.type === 'image' ? (
              <img src={item.src} alt="" className="rounded max-h-32 object-contain mx-auto" />
            ) : (
              <video src={item.src} className="rounded max-h-32 w-full" controls />
            )}
            <p className="mt-2 text-xs truncate text-center">{item.src.split('/').pop()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
