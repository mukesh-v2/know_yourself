import { connectToDatabase } from "@/lib/mongoose";
import Answers from "@/models/Answers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json()
    const { name, designation } = body

    if (!name || !designation) {
      return NextResponse.json({ error: "One of the payload fields is missing" }, { status: 400 })
    }

    console.log(body)

    const answer = new Answers(body)
    await answer.save()
    console.log("Saved in collection:", answer.collection.name)
    console.log("Saved in database:", answer.db.name)

    return NextResponse.json({ success: true, answer }, { status: 201 })
  } catch (error) {
    console.error("❌ Error saving data:", error)
    return NextResponse.json({ error: "Unable to save data" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    msg: "Hello from GET"
  }, { status: 200 })
}