export default function DisplayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      {children}
    </div>
  );
}
