'use client';

import ScheduleList from '../../components/admin/ScheduleList';
import ScheduleBuilder from '../../components/admin/ScheduleBuilder';

export default function AdminSchedulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Schedules</h1>
      <ScheduleBuilder />
      <ScheduleList />
    </div>
  );
}
