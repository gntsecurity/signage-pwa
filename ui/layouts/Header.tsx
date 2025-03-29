import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Signage PWA</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Admin</Link></li>
            <li><Link href="/pair">Pair Device</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
