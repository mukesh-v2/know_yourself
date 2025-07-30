import { connectToDatabase } from '@/lib/mongoose'
import Answers from '@/models/Answers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const filters: Record<string, unknown> = {}

    searchParams.forEach((value, key) => {
      if (key === 'name') {
        // Use regex for case-insensitive partial name match
        filters.name = { $regex: value, $options: 'i' }
      } else {
        filters[key] = value
      }
    })

    const data = await Answers.find(filters).limit(10) // Limit to 10 results for performance
    return NextResponse.json({ success: true, data }, { status: 200 })

  } catch (error:unknown) {
    console.error('❌ Error fetching answers:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 })
  }
}
