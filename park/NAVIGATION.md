# Park navigation integration contract (Issue #12)

This is the **single source of truth** for the FUKUI DINO CITY park header,
desktop/mobile menus and footer. Keep the business/concept LP `/` separate.

## Adding a new park page

1. Add an HTML file anywhere under `park/` (nested directories are supported).
   **No edit to `vite.config.ts` is needed**: it automatically discovers all
   `park/**/*.html` inputs, including the seven pages from PR #15 and the two
   pages from PR #16.
2. Replace the **entire** old `<header class="park-header">…</header>`
   with exactly `<!-- PARK_HEADER -->`. Replace the **entire**
   `<footer class="site-footer">…</footer>` with exactly
   `<!-- PARK_FOOTER -->`. Preserve the existing `<main>`, all content,
   page-specific styles and scripts. The Vite HTML transform inserts the
   shared shell and injects `/park/navigation-entry.ts` automatically;
   **do not add another navigation script yourself**. Page-specific entry
   scripts (`app.ts`, `attraction-detail.ts`, `food-pages.ts`) remain.
3. Once that page has been merged and is present in the build, add its
   `{ label, href, description }` record under the appropriate category in
   `park/navigation.ts`. The same array renders PC/mobile/footer links.
   A nested detail route can use `activePrefixes` on its category's
   listing link to highlight the parent category without claiming the
   parent index is the current detail page.
4. Run `npm run typecheck`, `npm run check:links`, `npm run build`.
   `check:links` fails if **any** park HTML has missing/duplicate markers
   or still carries legacy header/footer markup; it also checks registered
   navigation destinations and `#fragment` targets. The build transform
   repeats the marker and legacy checks and refuses to ship old navigation.
5. Browser automation is intentionally omitted from CI; rely on the structural checks and build. If a later manual UI review is needed, inspect mobile/desktop navigation with keyboard and touch.

## Existing parallel PR integration

| PR / Issue | Files / scope | Action to perform **in that PR** |
| --- | --- | --- |
| #15 / #2 | `park/attractions/{skyport,inside,flight,ocean,fossil,coast,night}.html` | Replace seven legacy headers/footers with the two markers; keep both `app.ts` and `attraction-detail.ts` module scripts. `activePrefixes: ['/park/attractions/']` is already supported by the header. |
| #16 / #3 | `park/dining.html`, `park/shops.html` | Replace two legacy headers/footers with markers; preserve `food-pages.ts` and `data-catalog`. The injected `navigation-entry.ts` supplies navigation CSS/JS/icons even though these pages do not import `app.ts`. |
| #17 / #7 | `park/guide.html`, `park/tickets.html`, `park/app.ts`, `package.json` | Keep the shared markers, the navigation build/check scripts and the new schedule logic. Merge changes in `app.ts` around ticket scheduling; avoid reintroducing the old menu handlers. |
| #19 / #5 | `park/access.html`, `package.json` | Keep shared markers and navigation checks while preserving area-map sections, styles, scripts and its own verification command. |

**Do not add links for #15/#16/#17/#19 or future model courses, shows,
events, hotels, transport, etc. until the corresponding HTML exists on the
integration branch.** After merge, update `parkNavGroups` to expose those
routes. The strict shell check intentionally makes an unconverted parallel PR
fail CI when integrated, instead of silently leaving duplicate headers.

## Avoiding merge conflicts

- This PR owns `park/navigation.ts`, `park/navigation.css`,
  `park/navigation-client.ts`, `park/navigation-entry.ts` and the Vite HTML
  shell plugin. New features should favor their own data, CSS and TS modules.
- `park/app.ts` remains the feature behavior entry point, not the navigation
  initializer. The shared navigation is injected even on pages without it.
- `vite.config.ts` dynamically includes new HTML files. **Do not add explicit
  new page inputs** in competing PRs; preserve dynamic discovery on rebasing.
- `package.json` and existing core HTML will still require conflict review
  where PR #17/#19 touch them. Preserve every unrelated build/test command.
- CSS chevrons use local borders instead of a global Lucide barrel import;
  icons used by the shared header/footer come from the small local
  `park/icons.ts` set.

For future optional accessibility review, check Tab/Shift+Tab, Escape, outside-pointer click, focus, and visual overflow. These are **not** automated in this PR. Native `<details>` preserves menu links without JavaScript.


## Issue #3 / PR #16 integration (2026-11-05)
- `/park/dining.html` and `/park/shops.html` now use shared shell markers. Navigation entries are in `park/navigation.ts`.
- `park/food-data.ts` exports `venueHref`, `venuesByArea`, `venuesForAttraction` for future venue crosslinks.
- Food venue geographic IDs are a subset of the canonical `AreaId` in `park/areas-data.ts`. Fictional zone labels remain separate from geography labels.
- The food area links in `park/access.html` and the detail page anchors must stay synchronized.
