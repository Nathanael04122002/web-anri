'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// ✅ Validasi input pakai zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Nama wajib diisi' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' }),
})

type FormData = z.infer<typeof formSchema>

export default function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', data)
      console.log('Berhasil daftar:', res.data)
      router.push('/dashboard/admin') // redirect ke dashboard
    } catch (err) {
      console.error('Gagal daftar:', err)
      alert('Pendaftaran gagal. Coba lagi.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Mendaftar...' : 'Daftar'}
      </Button>
    </form>
  )
}
