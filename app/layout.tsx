import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signage PWA',
  description: 'High-performance digital signage platform',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192.png' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192.png' }
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black text-white min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
