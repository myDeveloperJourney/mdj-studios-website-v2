/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All article diagrams and brand assets are authored in-repo, so we
    // allow SVGs served by next/image. The CSP below blocks any embedded
    // scripts inside those SVGs, which is why next/image disables them by default.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/.well-known/appspecific/com.tesla.3p.public-key.pem",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
