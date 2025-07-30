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

    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: 'Login successful' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
