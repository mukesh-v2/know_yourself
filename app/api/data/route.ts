import { connectToDatabase } from '@/lib/mongoose'
import Answers from '@/models/Answers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req:NextRequest) {
  try {
    await connectToDatabase()

    const {searchParams}=new URL(req.url)

    const filters:Record<string,string>={}
    searchParams.forEach((value,key)=>{
      filters[key]=value
    })
    const firstVal=Object.values(filters)[0];
    if(firstVal=='All')
    {
        const data = await Answers.find().sort({ createdAt: -1 })
        return NextResponse.json({ success: true, data }, { status: 200 })
    }
    else
    {
      const data=await Answers.find(filters).sort({createdAt:-1})
      return NextResponse.json({ success: true, data }, { status: 200 })
    }
   
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 })
  }
}
