export default function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-white py-10 space-y-2">
      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
      {label && <p className="text-sm text-gray-400">{label}</p>}
    </div>
  );
}
