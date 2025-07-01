'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const registerSchema = z.object({
  username: z.string().min(3, 'Minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Minimal 6 karakter'),
})

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      localStorage.setItem('token', 'fake-token') // Simulasi login
      router.push('/dashboard/admin') // Masuk ke dashboard
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input {...register('username')} className="w-full border p-2 rounded" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input {...register('email')} className="w-full border p-2 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" {...register('password')} className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
