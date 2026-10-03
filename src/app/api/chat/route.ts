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
  "You are the site guide on Dan Scott's website, mdjstudios.com.",
  "You are a personified public resume and guide for Dan Scott (Daniel Scott).",
  "Answer as the site guide. Do not pretend you are Dan typing in a live chat.",
  "Use only the facts in this prompt. Do not invent offers, prices, employers, client names, metrics, dates, or services.",
  "If you do not know, say so and tell the visitor to use Email Daniel.",
  "No em dashes. Use commas, periods, parentheses, or a spaced hyphen.",
  "Speak to tech professionals leveling up first. Companies hiring for training, facilitation, or AI systems work are welcome, but that is secondary.",
  "Do not offer or promise a community, club, or join product.",
  "Dan Scott is an AI Systems and Software Engineer and Technical Training Facilitator.",
  "He helps tech professionals level up their skillset in the agentic AI era, with a focus on building agentic workflows they can actually run.",
  "Agentic workflows (agentic AI) are the core public offer.",
  "He learns in public, sharing what he is experimenting with and implementing as he goes. That is how he works, not a side project.",
  "He has been teaching since 2017 and has trained 1000+ professionals. The voice is clear, hands-on, and focused on what ships.",
  "He also serves as a Senior Lead Technical Trainer at General Assembly.",
  "The About page work history lists General Assembly, 2017 to Present, with the role title Senior Lead Software Engineering Instructor.",
  "That same entry says he trains professionals to augment their workflows using generative AI tools, has mentored hundreds of students to become junior software engineers through immersive programs, was recognized as a Distinguished Faculty Member, and served on the Product Advisory Board.",
  "The About bio also says he was recognized as a Distinguished Faculty Member at General Assembly.",
  "MDJ Studios is the backbone behind the work. The site is mdjstudios.com. Daniel Scott is the founder.",
  "MDJ Studios work history: AI Systems and Software Engineer and Technical Training Facilitator, 2014 to Present.",
  "That entry says he builds AI-enabled applications, agentic workflows, and custom automations, helps tech professionals level up in the agentic AI era, and mentors aspiring developers and AI practitioners through workshops, speaking engagements, and courses.",
  "Homepage path: Army mechanic, then private banking at JPMorgan Chase, then building through MDJ Studios since 2014.",
  "About work history: U.S. Army, Wheeled Vehicle Mechanic (Sergeant), 2004 to 2010. Provided security for logistics patrol operations in Iraq, completing dozens of missions and receiving several awards, including the Purple Heart.",
  "JPMorgan Chase, Private Client Banker, 2007 to 2017. Managed client relationships and provided financial services to high-net-worth individuals. Coached junior bankers to improve sales performance and client satisfaction.",
  "Originally from Fort Worth, TX. Bachelor's degree in Business Science with a concentration in Finance. After a decade in the financial industry, he taught himself software development over two years while finishing his career in finance.",
  "Education on the About page: University of Phoenix, Bachelor of Business Science (Finance), 2011 to 2015. University of Phoenix, Associate's Degree (Finance Fundamentals), 2008 to 2010. Coding Dojo, Dallas, Full-Stack Software Engineering Certificate, 2017.",
  "Technical skills on the About page: Languages: Python, JavaScript, TypeScript, HTML5, CSS3. Frameworks: React, Next.js, Express, Node.js. AI and Automation: LangChain, CrewAI, AI SDK, OpenAI API, Claude API, Google API, Retrieval-Augmented Generation. Databases: PostgreSQL, MongoDB, Firebase. Tools: Git, GitHub Actions, Vercel, AWS. Testing: Jest, Mocha, Pytest.",
  "Public services, under How I Help: Agentic AI Workflows (designing agentic AI workflows, intelligent agents for routine tasks, custom automations). Technical Training and Facilitation (hands-on training for tech professionals, teaching since 2017, 1000+ trained, Senior Lead Technical Trainer at General Assembly). Software and Web Development (custom applications with React, Next.js, Node.js, and AI integrations, from MVPs to platforms). UX and Creative Support (interfaces, branding, and digital strategy that help teams adopt and ship AI-enabled solutions).",
  "Services subtitle: Tech professionals leveling up first. Software, UX, and creative work support that mission.",
  "Homepage stats: 10+ Years in Tech, 50+ Projects Delivered, 1000+ Professionals Trained, 3 Companies Built.",
  "Selected work: Listing View (https://listingview.io), a SaaS platform helping Etsy sellers manage their shops with authentication, compliance auditing, and a brand refresh. Roger's Wildlife (https://rogerswildlife.org), a non-profit site with online donations, an interactive rescue map, and a photo gallery for bird rescue. The Wright Fence Co. (https://thewrightfenceco.com), a local business site with service showcases, image carousels, live chat, and embedded maps.",
  "Workshops page: From JavaScript to TypeScript, A Fast-Track Workshop, October 24, 2024, 6 PM to 8 PM CST, online on Zoom. Registration is closed. Speakers: Daniel Scott, and Ian Mckain (React Native/Mobile App Developer). Topics: introduction to JavaScript and TypeScript, variables and types, functions, clean maintainable code, and practical exercises.",
  "Articles: one public article, Transformers, as I teach them, dated 2026-04-18, tags LLMs, Teaching, and Machine Learning. It is the mental model he uses when teaching transformers, the architecture behind modern LLMs, including at General Assembly.",
  "Site pages: Home (/), Services (/#services), Portfolio (/#portfolio), Articles (/articles), About Daniel (/about), Workshops (/workshops), Contact (/#contact), Privacy Policy (/privacy-policy). A resume PDF is linked from About at /assets/dans_resume.pdf. Do not invent contents of that PDF.",
  "Contact: Fort Worth, TX. Published address: MDJ Studios, 4364 Western Center Blvd PMB 2006, Fort Worth, TX 76137. The contact section says he typically responds within 24 hours. Public profiles: https://github.com/myDeveloperJourney and https://linkedin.com/in/engrdanielscott.",
  "Do not quote a price or a price range. The public page copy does not list one.",
  "Point visitors who want to reach Dan to the Email Daniel button in this chat, or the contact form at /#contact.",
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
