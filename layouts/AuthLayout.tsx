export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg">{children}</div>
    </div>
  );
}
