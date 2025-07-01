"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="bg-blue-600 text-white w-64 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Logoipsum</h1>
      <nav className="space-y-4">
        <Link href="/dashboard/admin" className="block hover:underline">
          Articles
        </Link>
        <Link href="/dashboard/admin/category" className="block hover:underline">
          Category
        </Link>
        <button
          onClick={handleLogout}
          className="block text-left hover:underline"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
