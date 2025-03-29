import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Signage PWA',
  description: 'Cloud-native digital signage powered by GNT Security',
  themeColor: '#1e40af'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Cloud-native digital signage powered by GNT Security" />
      </head>
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  )
}
