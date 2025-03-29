'use client';

import { useEffect, useState } from 'react';

export default function DeviceTable() {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const res = await fetch('/api/devices');
      if (!res.ok) return;
      const data = await res.json();
      setDevices(data);
    };

    fetchDevices();
  }, []);

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="px-4 py-2 border border-gray-700">Name</th>
            <th className="px-4 py-2 border border-gray-700">Last Seen</th>
            <th className="px-4 py-2 border border-gray-700">Schedule</th>
            <th className="px-4 py-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="border-t border-gray-800 hover:bg-gray-900">
              <td className="px-4 py-2 border border-gray-700">{device.name}</td>
              <td className="px-4 py-2 border border-gray-700">{device.last_seen}</td>
              <td className="px-4 py-2 border border-gray-700">{device.current_schedule_name || '—'}</td>
              <td className="px-4 py-2 border border-gray-700">
                <button className="text-sm px-3 py-1 bg-red-600 text-white rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {devices.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                No devices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
