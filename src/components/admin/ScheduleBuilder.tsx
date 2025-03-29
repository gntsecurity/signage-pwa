'use client';

import { useState } from 'react';

export default function ScheduleBuilder({ initialData }: { initialData?: any }) {
  const [name, setName] = useState(initialData?.name || '');
  const [media, setMedia] = useState(
    initialData?.media || [{ type: 'image', src: '', duration: 10 }]
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (index: number, field: string, value: string | number) => {
    const updated = [...media];
    updated[index][field] = value;
    setMedia(updated);
  };

  const addMediaItem = () => {
    setMedia([...media, { type: 'image', src: '', duration: 10 }]);
  };

  const removeMediaItem = (index: number) => {
    const updated = media.filter((_, i) => i !== index);
    setMedia(updated);
  };

  const saveSchedule = async () => {
    setSaving(true);
    const body = { id: initialData?.id, name, media };

    const res = await fetch('/api/schedules', {
      method: initialData ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok && !initialData) {
      setName('');
      setMedia([{ type: 'image', src: '', duration: 10 }]);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl space-y-4">
      <div>
        <label className="block text-sm mb-1">Schedule Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white"
          placeholder="e.g. Lobby Screens"
        />
      </div>

      {media.map((item, index) => (
        <div key={index} className="border-t border-gray-700 pt-4 space-y-2">
          <div className="flex gap-2">
            <select
              value={item.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              className="p-2 rounded bg-gray-900 text-white w-1/3"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              type="text"
              value={item.src}
              onChange={(e) => handleChange(index, 'src', e.target.value)}
              placeholder="https://..."
              className="p-2 rounded bg-gray-900 text-white w-full"
            />
            <input
              type="number"
              value={item.duration}
              onChange={(e) => handleChange(index, 'duration', parseInt(e.target.value))}
              className="w-24 p-2 rounded bg-gray-900 text-white"
              placeholder="sec"
            />
          </div>
          <button
            type="button"
            onClick={() => removeMediaItem(index)}
            className="text-sm text-red-500 hover:underline"
          >
            Remove item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addMediaItem}
        className="px-4 py-2 text-sm bg-white text-black rounded"
      >
        Add Media Item
      </button>

      <button
        type="button"
        onClick={saveSchedule}
        disabled={saving}
        className="px-4 py-2 bg-green-500 text-white rounded font-semibold ml-2"
      >
        {saving ? 'Saving...' : initialData ? 'Update Schedule' : 'Create Schedule'}
      </button>
    </div>
  );
}
