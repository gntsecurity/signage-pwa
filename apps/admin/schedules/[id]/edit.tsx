'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ScheduleBuilder from '../../components/admin/ScheduleBuilder';

export default function EditSchedulePage() {
  const params = useParams();
  const id = params?.id as string;
  const [schedule, setSchedule] = useState<any>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch(`/api/schedules?id=${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setSchedule(data);
    };

    if (id) fetchSchedule();
  }, [id]);

  if (!schedule) return <p className="text-gray-400">Loading schedule...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Schedule</h1>
      <ScheduleBuilder initialData={schedule} />
    </div>
  );
}
