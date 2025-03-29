import '../styles/globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Signage PWA',
  description: 'Cloudflare-powered digital signage platform by GNT Security',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900 bg-white">{children}</body>
    </html>
  )
}
