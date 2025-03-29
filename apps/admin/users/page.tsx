'use client';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Admin Users</h1>

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-sm text-gray-400">
            <th className="p-3 border border-gray-700">Email</th>
            <th className="p-3 border border-gray-700">Role</th>
            <th className="p-3 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-800">
            <td className="p-3 border border-gray-700">admin@signage.local</td>
            <td className="p-3 border border-gray-700">Owner</td>
            <td className="p-3 border border-gray-700">
              <button className="text-sm px-3 py-1 bg-white text-black rounded">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
