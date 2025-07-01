'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', { email, password })
      const token = res.data.token
      localStorage.setItem('token', token)
      router.push('/admin')
    } catch (err) {
      setError('Login gagal: Email atau Password salah')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border p-2 mb-4 rounded"
      />
      <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded">
        Login
      </button>
    </div>
  )
}
