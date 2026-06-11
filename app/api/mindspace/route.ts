import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET() {
  try {
    const today = new Date().toDateString();
    let data = await db.mindSpaceData.findUnique({
      where: { date: today },
    });

    if (!data) {
      data = await db.mindSpaceData.create({
        data: {
          date: today,
          mood: null,
          journal: "",
          todos: [],
        },
      });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET err:", error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const today = new Date().toDateString();

    const updatedData = await db.mindSpaceData.upsert({
      where: { date: today },
      update: {
        ...body,
      },
      create: {
        date: today,
        mood: body.mood || null,
        journal: body.journal || "",
        todos: body.todos || [],
        ...body,
      },
    });

    return NextResponse.json(
      { message: "success", data: updatedData },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST err:", error);
    return NextResponse.json({ error: "error to save" }, { status: 400 });
  }
}
