'use client';

import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/devices" className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold">Devices</h2>
          <p className="text-sm text-gray-400">View and manage all connected screens</p>
        </Link>
        <Link href="/admin/schedules" className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold">Schedules</h2>
          <p className="text-sm text-gray-400">Create and assign display schedules</p>
        </Link>
        <Link href="/admin/media" className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold">Media Library</h2>
          <p className="text-sm text-gray-400">Upload and manage videos and images</p>
        </Link>
      </div>
    </div>
  );
}
