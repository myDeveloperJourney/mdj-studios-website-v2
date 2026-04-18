import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles";

export const alt = "MDJ Studios article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-article OpenGraph preview image, generated at build time.
 * Renders the title, author, date, and tag chips on a brand-colored
 * gradient. Falls back to a generic card if the slug is unknown
 * (e.g., during stale builds).
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? "MDJ Studios";
  const author = article?.author.name ?? "MDJ Studios";
  const date = article?.date
    ? new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";
  const tags = article?.tags.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #4f46e5 0%, #4338ca 50%, #312e81 100%)",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#eeb30d",
            }}
          />
          MDJ Studios
        </div>

        {/* Title row. flex: 1 pushes the meta row to the bottom */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 64 : 76,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        {/* Tag row */}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.15)",
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        )}

        {/* Author + date row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            opacity: 0.9,
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", fontWeight: 600 }}>{author}</div>
          {date && <div style={{ display: "flex" }}>{date}</div>}
        </div>
      </div>
    ),
    { ...size },
  );
}
