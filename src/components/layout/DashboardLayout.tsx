import { ReactNode } from "react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-6">
        <div className="text-2xl font-bold">Logoipsum</div>
        <nav className="space-y-3">
          <Link href="/dashboard/articles" className="block hover:underline">Articles</Link>
          <Link href="/dashboard/categories" className="block hover:underline">Category</Link>
          <Link href="/logout" className="block hover:underline">Logout</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
