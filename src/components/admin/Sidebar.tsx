'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Devices', href: '/admin/devices' },
  { label: 'Schedules', href: '/admin/schedules' },
  { label: 'Media', href: '/admin/media' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Settings', href: '/admin/settings' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden lg:block bg-gray-900 border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wide">Signage Admin</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded transition ${
              pathname === item.href
                ? 'bg-white text-black font-semibold'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
