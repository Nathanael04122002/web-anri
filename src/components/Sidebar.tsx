// src/components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-600 text-white p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Logoipsum</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard/admin" className="hover:underline">Articles</Link>
        <Link href="/dashboard/category" className="hover:underline">Category</Link>
        <Link href="/logout" className="hover:underline">Logout</Link>
      </nav>
    </div>
  );
}
