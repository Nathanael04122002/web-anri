// src/app/api/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (email === 'admin@gmail.com' && password === 'admin123') {
    return NextResponse.json({ message: 'Login berhasil', token: 'dummy-token' })
  }

  return NextResponse.json({ message: 'Login gagal' }, { status: 401 })
}
