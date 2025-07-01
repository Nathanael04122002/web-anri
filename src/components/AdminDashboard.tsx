'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Cek token dari localStorage (contoh validasi auth)
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login') // redirect jika belum login
    }
  }, [router])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      {/* Konten dashboard */}
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Judul</th>
            <th className="p-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Artikel Contoh</td>
            <td className="p-2">Edit | Hapus</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
