# MDJ Studios — Studio Website (v2)

The marketing site and content hub for **MDJ Studios**, my web/software development studio serving small businesses. Designed, built, and deployed end to end.

🔗 **Live:** https://www.mdjstudios.com/

## What it does
- **Marketing site** — services, portfolio, and contact, with a mobile-first, performance-minded build.
- **MDX-powered blog/content** — posts authored in MDX and rendered at the edge (reading-time estimates, GitHub-flavored markdown, auto-linked headings).
- **Lead capture** — contact submissions are validated, emailed via Resend, and logged to a Google Sheet for a lightweight CRM with no backend to maintain.
- **Analytics & performance** — Vercel Analytics + Speed Insights wired in.

## Stack
Next.js · React · TypeScript · MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`) · Google Sheets API · Resend (transactional email) · Vercel.

## Notes
Built to be cheap to run and easy to update: content is files, the "CRM" is a spreadsheet, and email is serverless — the kind of pragmatic architecture small-business clients actually need.

*Designed & developed by Daniel J. Scott / MDJ Studios.*
