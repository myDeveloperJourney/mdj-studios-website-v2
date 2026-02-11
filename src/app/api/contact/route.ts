import { NextResponse } from "next/server";
import { appendContactToSheet } from "@/lib/google-sheets";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const sanitizedData = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 200),
      message: message.trim().slice(0, 5000),
    };

    // 1. Save to Google Sheets first
    await appendContactToSheet(sanitizedData);

    // 2. Send email notification (non-blocking — failure doesn't affect the response)
    try {
      await sendContactNotification(sanitizedData);
    } catch (emailError) {
      console.error("Email notification failed (data was still saved):", emailError);
    }

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
