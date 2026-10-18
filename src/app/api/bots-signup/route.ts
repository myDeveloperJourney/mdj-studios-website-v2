/**
 * Bot Bay email signup endpoint.
 * When BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID are both set (non-empty after trim),
 * valid requests create a Beehiiv subscription and return 200 { ok: true, connected: true }.
 * If Beehiiv is configured but the request fails, return 502 with a generic error.
 * If either env var is missing, return 503 with connected:false (form not wired yet).
 */

import { NextResponse } from "next/server";
import {
  createBeehiivSubscription,
  getBeehiivConfig,
  type SignupList,
} from "@/lib/beehiiv";

const LISTS = ["launch-log", "setup-waitlist"] as const;

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

  const config = getBeehiivConfig(process.env);
  if (!config) {
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

  const result = await createBeehiivSubscription(email, list, config);
  if (result.ok) {
    return NextResponse.json({ ok: true, connected: true }, { status: 200 });
  }

  return NextResponse.json(
    {
      ok: false,
      connected: true,
      error: "Could not sign you up right now. Please try again.",
    },
    { status: 502 }
  );
}
