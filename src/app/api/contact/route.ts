import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, eventType, eventDate, message } = body;

    // 1. Basic validation
    if (!name || !phone || !eventType || !eventDate || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Log to server console (visible in terminal logs)
    console.log("==========================================");
    console.log("NEW CONSULTATION INQUIRY RECEIVED!");
    console.log(`Name:       ${name}`);
    console.log(`Phone:      ${phone}`);
    console.log(`Event Type: ${eventType}`);
    console.log(`Event Date: ${eventDate}`);
    console.log(`Message:    ${message}`);
    console.log("==========================================");

    return NextResponse.json({ success: true, message: "Inquiry logged to server console" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
