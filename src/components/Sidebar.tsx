import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Screens', href: '/admin/screens' },
  { label: 'Playlists', href: '/admin/playlists' },
  { label: 'Users', href: '/admin/users' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 text-xl font-bold text-blue-800">Signage PWA</div>
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`rounded px-3 py-2 text-sm font-medium ${
              pathname === href
                ? 'bg-blue-100 text-blue-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
