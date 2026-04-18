# Article images

All images referenced from posts in `content/articles/*.mdx` live here.

## Conventions

- **File naming:** kebab-case, matching the post slug where possible.
  - Cover: `{post-slug}-cover.jpg`
  - Inline figures: `{post-slug}-{short-desc}.png`
- **Dimensions:**
  - Covers: `1600×900` (16:9). Render at ~200 KB after compression.
  - Inline: width up to `1600px` for 2x retina on a max-width 800px column.
- **Format:** JPG for photos, PNG for screenshots with hard edges, SVG for diagrams.
- **Compression:** run through [Squoosh](https://squoosh.app/) or `sharp-cli` before committing. Covers > 400 KB get flagged in review.

## Referencing from MDX

**Cover (frontmatter):**

```yaml
---
cover: "/images/articles/hello-world-cover.jpg"
coverAlt: "Hands on a keyboard, overhead shot"
---
```

**Inline, standard markdown:**

```markdown
![A diagram of the MDX build pipeline](/images/articles/hello-world-pipeline.svg)
```

**Inline, JSX with custom sizing (for precision):**

```jsx
<img
  src="/images/articles/hello-world-pipeline.svg"
  alt="A diagram of the MDX build pipeline"
  style={{ maxWidth: 480, margin: "2rem auto" }}
/>
```

Paths are always absolute from the public root (`/images/articles/...`), never relative to the MDX file.

## Placeholder

`placeholder-cover.svg` is a throwaway you can clone/rename when setting up a new post. Delete once real art is in place.
