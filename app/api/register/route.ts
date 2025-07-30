import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectToDatabase } from '@/lib/mongoose'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await connectToDatabase()

    const existing = await User.findOne({ username })
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashed })
    await user.save()

    return NextResponse.json({ success: true, message: 'User registered' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
