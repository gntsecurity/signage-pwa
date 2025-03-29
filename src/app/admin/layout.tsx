import type { ReactNode } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import './admin.css'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="font-bold text-lg">Signage Admin</div>
        <nav className="space-x-4 text-sm">
          <NavLink href="/admin/screens">Screens</NavLink>
          <NavLink href="/admin/playlists">Playlists</NavLink>
          <NavLink href="/admin/logs">Logs</NavLink>
          <NavLink href="/logout">Logout</NavLink>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const isActive = typeof window !== 'undefined' && window.location.pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={clsx(
        'hover:underline',
        isActive && 'font-semibold underline text-white'
      )}
    >
      {children}
    </Link>
  )
}
