'use client'

import { useState } from 'react'
import api from '@/lib/api'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AddArticleForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    await api.post('/articles', { title, content })
    window.location.reload()
  }

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Tambah Artikel</h2>
      <Input placeholder="Judul Artikel" className="mb-4" value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea placeholder="Isi Artikel" className="mb-4" value={content} onChange={e => setContent(e.target.value)} />
      <Button onClick={handleSubmit} className="w-full">Tambah Artikel</Button>
    </div>
  )
}
