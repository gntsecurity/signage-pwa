'use client';

import DeviceTable from '../../components/admin/DeviceTable';

export default function AdminDevicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Devices</h1>
      <DeviceTable />
    </div>
  );
}
