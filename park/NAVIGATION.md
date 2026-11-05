# Park navigation

Issue #12 creates a single build-time source for the park site header, mobile navigation and footer.

- Edit `park/navigation.ts` (`parkNavGroups`) to add links when a route from #2–#11 is implemented. **Do not add links to future pages that are not yet available.**
- Add the new HTML page to the `build.rollupOptions.input` map in `vite.config.ts`.
- Put `<!-- PARK_HEADER -->` immediately before `<main>` and `<!-- PARK_FOOTER -->` after `</main>` in new park pages. Vite replaces both placeholders during dev and build, so links remain real HTML even when client JavaScript does not load.
- Use an actual target `id` for section fragments. Run `npm run check:links` to catch missing pages and missing anchors.
- `park/navigation-client.ts` only enhances native `<details>` menus with Escape, outside-click and focus behavior.
- The `/` concept/presentation LP is intentionally not included in the primary park navigation.

Checks: `npm run typecheck`, `npm run check:links`, `npm run build`, then viewport checks at 375, 390, 430, 940, 941 px and desktop. Also test Tab, Shift+Tab, Escape, outside click, mobile scroll and disabling JavaScript.
