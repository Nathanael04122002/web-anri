'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/register') // ⬅️ akan redirect otomatis ke halaman register
  }, [router])

  return null
}
