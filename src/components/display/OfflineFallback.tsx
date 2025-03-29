export default function OfflineFallback() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <h1 className="text-3xl font-bold mb-4">Offline Mode</h1>
      <p className="text-lg text-gray-400 max-w-md">
        This device is currently offline or unable to fetch its schedule. Display will resume automatically once a connection is restored.
      </p>
    </div>
  );
}
