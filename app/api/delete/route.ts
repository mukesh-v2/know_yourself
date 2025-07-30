import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoose'
import Answers from '@/models/Answers'

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 })
    }

    const deleted = await Answers.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Document deleted', data: deleted })
  } catch (error: unknown) {
    console.error(error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: false, message: 'Unknown server error' }, { status: 500 })
  }
}
