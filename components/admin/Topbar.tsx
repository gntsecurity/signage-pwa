'use client';

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
      <div className="text-sm text-gray-400">Admin Portal</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">admin@signage.local</span>
        <button className="text-sm text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
          Logout
        </button>
      </div>
    </header>
  );
}
