'use client';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-gray-400">Polling Interval (ms)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="e.g. 60000"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-400">Default Transition Style</label>
          <select className="w-full p-2 rounded bg-gray-800 text-white">
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="none">None</option>
          </select>
        </div>

        <button className="mt-4 px-4 py-2 bg-white text-black rounded font-semibold">
          Save Settings
        </button>
      </div>
    </div>
  );
}
