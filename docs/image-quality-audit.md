# FUKUI DINO CITY — Image quality audit (2026-11-05)

## Current image filename convention (2026-11-06)

Primary park artwork now uses subject-based filenames without an `-ai` suffix: `skyport.webp`, `inside.webp`, `flight.webp`, `ocean.webp`, `fossil.webp`, `coast.webp`, `night.webp`, and `world-map.webp`. The distinct original images formerly at `inside.webp`, `flight.webp`, `ocean.webp`, `fossil.webp`, and `coast.webp` remain in the second gallery position as `inside-alt.webp`, `flight-alt.webp`, `ocean-alt.webp`, `fossil-alt.webp`, and `coast-alt.webp`. All `-ai.webp` paths were retired.

Images were transferred using their existing Git blobs (no re-encoding, upscaling, or quality change). The 2026-11-05 audit inventory below is historical and retains its earlier filenames for traceability.

## Completed: Issue #3 dining and retail

10 concept SVG illustrations used by three fictional restaurants and two fictional shops have been replaced with original, photorealistic AI-generated JPEGs (1536 × 1024 px):

- `park/assets/dining-forest-room.jpg`
- `park/assets/dining-ocean-room.jpg`
- `park/assets/dining-fossil-room.jpg`
- `park/assets/shop-fossil-interior.jpg`
- `park/assets/shop-city-interior.jpg`
- `park/assets/dining-forest-plate.jpg`
- `park/assets/dining-ocean-plate.jpg`
- `park/assets/dining-fossil-plate.jpg`
- `park/assets/shop-fossil-kit.jpg`
- `park/assets/shop-city-goods.jpg`

All images are concept renderings, not actual photographs of existing venues, goods or food. Five assets were edited with the built-in image generation tool to remove generated lettering; these remain conceptual imagery.
The on-page figure captions and alt text were updated. Price, product, and venue labels remain native HTML text, never baked into images.

## Remaining: older site images (not completed)

The following legacy WebP images are present on the park and business-concept pages and remain at their previous resolution until suitable, clearly differentiated replacement imagery can be generated and reviewed:

- `hero.webp` — park-wide hero and business landing background
- `city.webp` — Fukui city image
- `skyport-ai.webp` — the fictional airport dinosaur ride (must differ from the flight ride)
- `inside-ai.webp`, `inside.webp` — immersive dinosaur anatomy exploration
- `flight-ai.webp`, `flight.webp` — pterosaur simulator (not a dinosaur)
- `ocean-ai.webp`, `ocean.webp` — Mesozoic marine reptiles (not dinosaurs)
- `fossil-ai.webp`, `fossil.webp` — Katsuyama fossil excavation
- `coast-ai.webp`, `coast.webp` — Echizen cliffs with consistent photo-real visual language
- `night-ai.webp` — night attraction
- `map.webp` — decorative existing visual, not a geographically verified navigation map
- `world-map-ai.webp` — fictional park concept map; avoid presenting AI-rendered geography as accurate wayfinding

Keep the accurate vector graphic `fukui-geography.svg` and iconography as vector images for unlimited scale and legibility; do not replace a readable route/map diagram with an inaccurate photorealistic scene.

## Remaining image acceptance criteria

1. Create differentiated photorealistic, original visual assets for every scene, at least ~1536 px on the long side for cards and ~1920 px for hero backgrounds; keep original geographic representations factual.
2. Prefer optimized AVIF/WebP for site performance, keeping full-size source assets where appropriate. Avoid upscaling low-resolution raster originals and calling them high-quality.
3. Ensure all referenced images load via local static assets with correct alt, lazy-load offscreen images, preserve crop/composition at mobile widths and ensure captions disclose generated imagery.
4. Preserve map pin alignment for the conceptual map or retain its current artwork until redesigned with accurate overlay geometry.
5. Run `npm run typecheck` and `npm run build` and confirm no missing asset paths.

These remaining site-wide raster replacements were not completed in this PR.

## Update (2026-11-06): asset cleanup

- `map.webp` was identified as unused in the active site and removed, rather than upscaled or replaced with an inaccurate AI-generated map (see Issue #42). Its CSS references were superseded by later, active attraction image rules.
- `scene.svg` was removed because its initial and mobile park-hero background declarations were superseded by the later shared hero rule and had no active usage.
- The accurate geographical SVG `fukui-geography.svg` and the separate illustrative concept map `world-map-ai.webp` remain untouched.
- Restaurant and retail hero background URLs in `park/food.css` now point to their existing `.jpg` images, rather than missing `.svg` files.
- The inventory above is a historical snapshot from 2026-11-05, not a current list of unresolved image work.
