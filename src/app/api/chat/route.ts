import { NextResponse } from "next/server";

export const maxDuration = 30;

const MODEL = "grok-4.7";
const XAI_URL = "https://api.x.ai/v1/chat/completions";
const MAX_MESSAGES = 10;
const MAX_CHARS = 2000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const UPSTREAM_TIMEOUT_MS = 20_000;

const SYSTEM_PROMPT = [
  "You are the assistant on Dan Scott's site, mdjstudios.com.",
  "Help tech professionals with questions about agentic workflows and what the site already says.",
  "Do not invent offers, prices, or services.",
  "Do not pretend to be Dan.",
  "If they want to reach Dan, tell them to use Email Daniel.",
  "No em dashes.",
].join(" ");

type ChatTurn = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 80);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 80);
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      const fresh = times.filter((stamp) => now - stamp < WINDOW_MS);
      if (fresh.length === 0) hits.delete(key);
      else hits.set(key, fresh);
    }
  }
  return false;
}

function unavailable(status = 503) {
  return NextResponse.json(
    { error: "Chat is unavailable right now." },
    { status }
  );
}

function extractReply(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== "object") {
    return null;
  }
  const content = (choices[0] as { message?: { content?: unknown } }).message?.content;
  if (typeof content === "string") {
    const trimmed = content.trim();
    return trimmed || null;
  }
  if (!Array.isArray(content)) return null;
  const text = content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string") {
        return (part as { text: string }).text;
      }
      return "";
    })
    .join("")
    .trim();
  return text || null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not send that message." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Could not send that message." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  // Hidden field. Non-empty means a bot. Reject before any model call.
  if (record.company != null && String(record.company).trim() !== "") {
    return NextResponse.json({ error: "Could not send that message." }, { status: 400 });
  }

  if (!Array.isArray(record.messages)) {
    return NextResponse.json({ error: "Could not send that message." }, { status: 400 });
  }

  const turns: ChatTurn[] = [];
  for (const item of record.messages) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      continue;
    }
    const trimmed = content.trim().slice(0, MAX_CHARS);
    if (!trimmed) continue;
    turns.push({ role, content: trimmed });
  }

  const capped = turns.slice(-MAX_MESSAGES);
  const last = capped[capped.length - 1];
  if (!last || last.role !== "user") {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  const apiKey = process.env.XAI_API_KEY?.trim();
  if (!apiKey) {
    return unavailable(503);
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const upstream = await fetch(XAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...capped],
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      console.error("Chat upstream failed", upstream.status);
      return unavailable(502);
    }

    const reply = extractReply(await upstream.json());
    if (!reply) {
      return unavailable(502);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat upstream error", error instanceof Error ? error.name : "error");
    return unavailable(502);
  }
}
