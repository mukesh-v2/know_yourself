import { connectToDatabase } from '@/lib/mongoose'
import Answers from '@/models/Answers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 })
    }

    const answer = await Answers.findById(id)

    if (!answer) {
      return NextResponse.json({ success: false, error: 'Answer not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, answer }, { status: 200 })
  } catch (error) {
    console.error('Error fetching answer by ID:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
