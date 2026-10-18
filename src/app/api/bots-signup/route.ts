/**
 * Bot Bay email signup endpoint.
 * A provider (or a Google Sheets tab via src/lib/google-sheets.ts) gets wired here later.
 * Until then, valid requests return 503 with connected:false. Do not persist or read env.
 */

import { NextResponse } from "next/server";

const LISTS = ["launch-log", "setup-waitlist"] as const;
type SignupList = (typeof LISTS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isSignupList(value: string): value is SignupList {
  return (LISTS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const record =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const emailRaw = typeof record.email === "string" ? record.email : "";
  const listRaw = typeof record.list === "string" ? record.list : "";

  const email = emailRaw.trim().toLowerCase();
  const list = listRaw.trim();

  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (!isSignupList(list)) {
    return NextResponse.json(
      { ok: false, error: "Invalid list." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      connected: false,
      message:
        "Signups open soon. This form is not connected to a provider yet.",
    },
    { status: 503 }
  );
}
