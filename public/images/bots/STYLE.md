# Bot Bay image style guide

This file documents how the nine Bot Bay images in this folder were made, so new images can match them. See CREDITS.md for slot and page assignments.

## Important: prompt recovery status

The exact prompt strings are NOT recoverable verbatim. The generation calls were made on 2026-10-19, and the agent session that made them was later compacted into a summary. The full tool call text did not survive. The generated files carry no prompt metadata either: the JPEG originals contain only JFIF data and a C2PA content credential (which names the generator and marks the file as AI generated) and no prompt text.

So every prompt below is labeled as a reconstruction from the session notes. Short phrases in "double quotes" were recorded word for word in those notes. Everything else is a faithful summary, not the exact text. Nothing below should be read as the exact string that was sent.

To lock the style from here on, use the canonical preamble in the "How to make a new image" section. It is written to reproduce the look of these nine images, and it will be the exact, verbatim reference going forward.

## Tool and settings

- Tool: GenerateImage (Grok Bot's built-in image generation tool). The C2PA credential in each original names the generator as Grok Imagine.
- Calls: 9 separate calls, 1 image per call (the tool has no count parameter). Whether any image was regenerated before the kept version is not recorded.
- Parameters: `description` (the prompt) and `aspect_ratio`. No reference images were used. The tool has no seed, model, size or count parameter. Whether the optional `filename` parameter was set is not recorded; the files were saved under content hash names.
- aspect_ratio per image, inferred from the native output sizes below (the exact call arguments were not preserved): 16:9 for bots-hero, tutorial-one-job and setup-hero; 4:3 for the five playbook images; 1:1 for sponsor-slot.

## Shared style preamble (RECONSTRUCTED, not verbatim)

Recorded fragments, in order, with gaps marked by ellipses:

"Cinematic photorealistic 3D render ... original compact industrial robot (matte graphite and brushed steel body, rounded sensor head with a single soft cyan-blue eye light, no human face) ... near-black background, cool white rim/key light, subtle cyan accent, light haze, shallow depth of field, film grain ... Mostly monochrome. Absolutely no text, no letters, no numbers, no logos, no insignia, no people."

## Per image prompts (RECONSTRUCTED, not verbatim)

Each prompt was the shared style above plus one scene. Scene summaries:

1. bots-hero.webp (16:9): a fleet of five distinct robots lined up in a dark rocket hangar launch bay, gantries and work lights overhead, subjects placed in the right half, left side kept dark for the headline.
2. planning-coach.webp (4:3): a robot on a dark factory floor holding a clipboard with blank sheets, standing beside a blank schedule board with empty grid cells and magnetic blocks.
3. messages-assistant.webp (4:3): a robot with a tall signal antenna and a small dish in a dark dockyard bay, sorting glowing blank envelope cards into a rack of slots.
4. writer.webp (4:3): a robot at a steel workbench in a dark workshop writing on a blank sheet with a mechanical stylus under a desk lamp.
5. personal-cfo.webp (4:3): a robot in a dark engineering bay in front of a wall of blank analog gauges with no numbers, holding a closed ledger book. This prompt added "no currency symbols, no coins, no money" and asked for blank gauge faces.
6. chief-of-staff.webp (4:3): a robot on an elevated catwalk directing smaller robots on the hangar floor below, holding a tablet with a blank glowing screen.
7. tutorial-one-job.webp (16:9): a single robot under one spotlight on a huge dark factory floor holding one small glowing tool, dormant robots in the shadows.
8. setup-hero.webp (16:9): a half-assembled robot on a work platform in a dark robotics assembly workshop, robotic arms and tool carts around it, subject on the right, left side darker for the headline.
9. sponsor-slot.webp (1:1): a robot hand resting on a closed unbranded steel tool crate with generic tools on a dark workbench.

## Native output and post-processing

| File | Native output (JPEG) | Aspect | Final file | Final size |
| --- | --- | --- | --- | --- |
| bots-hero.webp | 1280x720 | 16:9 | 1280x720 WebP | 34 KB |
| planning-coach.webp | 1152x864 | 4:3 | 1152x864 WebP | 36 KB |
| messages-assistant.webp | 1152x864 | 4:3 | 1152x864 WebP | 47 KB |
| writer.webp | 1152x864 | 4:3 | 1152x864 WebP | 40 KB |
| personal-cfo.webp | 1152x864 | 4:3 | 1152x864 WebP | 33 KB |
| chief-of-staff.webp | 1152x864 | 4:3 | 1152x864 WebP | 63 KB |
| tutorial-one-job.webp | 1280x720 | 16:9 | 1280x720 WebP | 34 KB |
| setup-hero.webp | 1280x720 | 16:9 | 1280x720 WebP | 50 KB |
| sponsor-slot.webp | 1024x1024 | 1:1 | 600x600 WebP | 29 KB |

Post-processing, the complete list:

1. Visual review of every original for text, logos, people and money symbols. All nine passed with no edits.
2. Conversion with Python Pillow 12.3.0 (libwebp 1.6.0): `Image.open(src).convert('RGB')`, then `im.save(out, 'WEBP', quality=82, method=6)`.
3. sponsor-slot only: resized 1024x1024 to 600x600 with `im.resize((600, 600), Image.LANCZOS)` before saving.
4. No crop, no upscaling, no sharpening, no color, levels, curves or grading change of any kind.
5. Side effect: the conversion drops the JFIF and C2PA metadata, so the WebP files carry none.
6. Display crops happen only in CSS: next/image `fill` with `object-fit: cover`. Positions used: hero `right center`, cards `center 35%`, tutorial article hero `center 40%`, everything else centered.

## Look and vibe

- Palette: near-black and charcoal, graphite and gunmetal greys, cool white highlights. One accent only: a soft cyan-blue glow (eyes, small indicator lights, a few screen or card glows). Small muted teal, slate or olive tiles are fine as props. No warm colors, no saturated color fields.
- Lighting: low-key and cinematic. Overhead cone spotlights or work lights cutting through light haze, cool white rim light separating the robot from the background, deep shadows filling most of the frame, a wet or polished concrete floor catching reflections.
- Robot design: humanoid proportions, slim limbs with visible mechanical joints, a rounded dome helmet head with a single round cyan-blue eye glow and no mouth or face, dark graphite plating with brushed steel and gunmetal details, slightly worn industrial finish. Supporting robots in group shots can be compact tracked or wheeled units with the same graphite plating and cyan lights.
- Scenes: hangar, launch bay, factory floor, dockyard, workshop, engineering bay, assembly platform. Industrial clutter (gantries, racks, pipes, tool walls) stays dim and out of focus.
- Composition: one clear hero subject, usually standing, mid shot or full body, eye level. A single prop that hints at the bot's job (clipboard and board, antenna and envelopes, lamp and paper, ledger and gauges, tablet and catwalk). Shallow depth of field. For heroes, the subject sits on the right and the left third stays dark for text. Film grain, photoreal 3D render feel.
- Avoid: any readable text, letters or numbers (screens, papers, boards and gauges stay blank); logos, insignia, brand marks; anything resembling Grok Bot, xAI or X branding or avatars; real company logos; real people or human faces; money, coins, currency or dollar symbols; bright daylight; color heavy or cartoon styles.

## How to make a new image

Canonical preamble (use this verbatim for all new images):

```
Cinematic photorealistic 3D render. An original industrial robot with humanoid proportions, slim jointed limbs, dark matte graphite plating with brushed steel details, and a rounded dome helmet head with a single soft cyan-blue round eye light and no human face. Dark industrial setting, near-black background, cool white overhead spotlight and rim light, light haze, wet concrete floor reflections, shallow depth of field, subtle film grain. Mostly monochrome with one subtle cyan accent. Absolutely no text, no letters, no numbers, no logos, no insignia, no brand marks, no people, no money or currency symbols. Any screens, papers, boards or gauges are blank.
```

Scene line template (append after the preamble):

```
Scene: the robot [action that hints at the job] in a dark [hangar | factory floor | launch bay | workshop | dockyard], holding or next to [one job prop], [subject placement, for example on the right with the left third dark].
```

Call GenerateImage with that text as `description` and the `aspect_ratio` from the table below. One image per call.

Size table per slot:

| Slot | aspect_ratio to request | Native output | Final file | Notes |
| --- | --- | --- | --- | --- |
| Hero background, 16:9 card or cover | 16:9 | 1280x720 | 1280x720 WebP q82 | Subject right, left third dark. Do not upscale. |
| Playbook illustration, 4:3 (also used for 16:9 cards by CSS crop) | 4:3 | 1152x864 | 1152x864 WebP q82 | Keep head in the upper middle so the 16:9 card crop at center 35% keeps it. |
| Square art, 1:1 | 1:1 | 1024x1024 | 600x600 WebP q82 (LANCZOS) | Small display slot, about 96px. |
| Article hero, 21:9 | 16:9 | 1280x720 | reuse the 16:9 file | CSS crops to 21:9; keep subject inside the middle band. |

Conversion command:

```
python3 -c "from PIL import Image; im=Image.open('in.jpg').convert('RGB'); im.save('out.webp','WEBP',quality=82,method=6)"
```

Review checklist for each new image:

- [ ] No readable text, letters or numbers anywhere, including screens, papers, signs and gauges.
- [ ] No logos, insignia or brand marks; nothing resembling Grok Bot, xAI or X; no real company marks.
- [ ] No people, no human faces, no money or currency symbols.
- [ ] Robot matches: dome helmet head, single cyan-blue eye, graphite plating, humanoid build.
- [ ] Mostly monochrome with one cyan accent; dark background; cool white light; haze.
- [ ] Prop clearly hints at the bot's job.
- [ ] Composition survives the slot crop (check 16:9 card crop and 21:9 crop where used).
- [ ] Side by side with the three anchors below, it looks like the same set.
- [ ] WebP at quality 82, under 250 KB, correct size from the table, no upscaling.
- [ ] Added to CREDITS.md with slot, page, source and date, and its prompt recorded verbatim here.

## Reference anchors

Compare every new image against these three:

- public/images/bots/planning-coach.webp: the single robot portrait standard (pose, head, eye glow, prop, floor, spotlight).
- public/images/bots/chief-of-staff.webp: the large space and depth standard (catwalk, haze, smaller robots below, cyan points of light).
- public/images/bots/bots-hero.webp: the hero composition standard (fleet on the right, dark left third, overhead cone lights).
