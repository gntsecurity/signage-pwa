'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await fetch('/api/schedules');
      if (!res.ok) return;
      const data = await res.json();
      setSchedules(data);
    };

    fetchSchedules();
  }, []);

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-lg mt-8">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="px-4 py-2 border border-gray-700">Name</th>
            <th className="px-4 py-2 border border-gray-700">Media Items</th>
            <th className="px-4 py-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="hover:bg-gray-900 border-t border-gray-800">
              <td className="px-4 py-2 border border-gray-700">{schedule.name}</td>
              <td className="px-4 py-2 border border-gray-700">{schedule.media?.length || 0}</td>
              <td className="px-4 py-2 border border-gray-700">
                <Link
                  href={`/admin/schedules/${schedule.id}/edit`}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {schedules.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                No schedules found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
