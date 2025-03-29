export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-800 text-white">
      <header className="p-4 bg-gray-900 text-xl">Signage PWA</header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-gray-900 p-4 text-center">© 2025 Signage PWA</footer>
    </div>
  );
}
