'use client';

import MediaUploader from '@/components/admin/MediaUploader';

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Media Library</h1>
      <MediaUploader />
    </div>
  );
}
