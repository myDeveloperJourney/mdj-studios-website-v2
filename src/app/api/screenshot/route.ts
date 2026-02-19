import { NextRequest, NextResponse } from "next/server";

const ALLOWED_URLS = [
  "https://listingview.io",
  "https://rogerswildlife.org",
  "https://thewrightfenceco.com",
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !ALLOWED_URLS.includes(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { error: "Screenshot service not configured" },
      { status: 500 }
    );
  }

  const screenshotUrl = new URL("https://api.screenshotone.com/take");
  screenshotUrl.searchParams.set("access_key", accessKey);
  screenshotUrl.searchParams.set("url", url);
  screenshotUrl.searchParams.set("viewport_width", "1280");
  screenshotUrl.searchParams.set("viewport_height", "800");
  screenshotUrl.searchParams.set("format", "webp");
  screenshotUrl.searchParams.set("image_quality", "80");
  screenshotUrl.searchParams.set("block_ads", "true");
  screenshotUrl.searchParams.set("block_cookie_banners", "true");
  screenshotUrl.searchParams.set("delay", "3");

  try {
    const response = await fetch(screenshotUrl.toString(), {
      next: { revalidate: 604800 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to capture screenshot" },
        { status: 502 }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control":
          "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Screenshot service unavailable" },
      { status: 502 }
    );
  }
}
