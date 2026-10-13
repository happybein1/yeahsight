# yeahsight — Changelog

Moved out of the repo-wide `CLAUDE.md` on 2026-09-25 to keep that file focused on rules rather than history. Entries below are transcribed verbatim (substance unchanged) from what was previously in `CLAUDE.md`'s per-version table for this app; only pure markdown table syntax (the row-closing ` |`) was stripped. Newest version first.

---

## v2.00

**YeahSight rebuilt as its own site, for `yeahsight.happybein.com`.** Major bump: new site structure, new URLs and a new home. Part of the content split agreed with the user. HappyBein holds the "understanding" side: YeahCore is the base (human needs, decision foundation) and YeahSight is the societal view. YeahVibe holds the "solutions" side (tools). yeahsight.com is to redirect here.

**What the repo held before:** two older things.

- A v1.4.0 static HTML site (May 2026): 21 pages under `articles/`, plus `about/`, `disclaimer/` and root `index.html`/`404.html`/`_headers`/`_redirects`/`VERSION`.
- A stale July copy of the whole core (`yeahvibe-astro`) Starlight project under `src/`.

Both are removed from the working tree; they stay in git history.

**Content source: core (`yeahvibe-astro`), which had the newest text of every article.** Compared article by article before moving:

- 14 articles in EN and FR were identical apart from core adding `reading_time` and dropping one stray subtitle line.
- *Enhanced Automation* in core is about 2.7× longer in EN (1,291 vs 482 words) and 3.6× longer in FR (1,630 vs 457).
- *Impact of AI* in core is longer too: 566 vs 511 words in EN, 728 vs 510 in FR.
- *Life After Automation* existed only in core.

**Pages on the new site, EN and FR, no `/applications/` prefix any more:**

- **Home** (`index.mdx`, splash): hero, the four domains with their articles, and a "From understanding to solutions" row of LinkCards (YeahCore → YeahSight → YeahVibe → HappyBein).
- **Foresight Trends**: now says "covered on YeahSight". Its lists gained Fair Space Sharing, Inheritance and Life After Automation and lost the two pages that stay in core. It gained a "Where it leads" link to the roadmap, and the Decision Foundation link now points to YeahCore.
- **Environment & Energy:** Earth Land, Fair Space Sharing (new), Clean & Safe Energy, Plant-Based Consumption.
- **Economy & Equity:** Universal Allowance, The Economical System, Fair Globe Sharing, Inheritance. Inheritance was written in core first from the user's draft, then moved here.
- **Technology & Automation:** Enhanced Automation, Impact of AI, Life After Automation.
- **Social Organization:** Purpose of Society, Societal Systems, Societal Functions, Social Redistribution, Managing Regional Migration.
- **Vision & Roadmap** (new).

**Not moved, stay in core:** *Mastering Finance Basics* and *Time Spent Identification* (personal rather than societal; the user agreed). Links to them from YeahSight articles point to `core.yeahvibe.com`. So do links to the Decision Foundation and human-needs pages.

**New articles:**

- **Fair Space Sharing.** Restored from the v1.x static page *Finding the balance between humans and nature*, which no longer existed in core. The user wanted it kept as its own article with its original stance rather than merged into *Earth Land*. What it keeps and adds:
  - Kept: the 20–30% human-hubs proposal, the fenced hubs with gates, wildlife-transparent transport and the owned-animals transition.
  - Edited lightly, and labelled as "HappyBein's proposed direction".
  - Added: a short "from long-term target to today" list (plant-based food, rewilding, compact living) and related links.
  - Cross-linked from *Earth Land* and *Fair Globe Sharing*.
- **Vision & Roadmap.** Restored from the v1.x page *Towards an optimal world*, kept as the site's closing synthesis with its six steps.
  - Each step got a heading and a "→ Background" link.
  - Dead links were remapped: Goal Setting Basics → YeahCore *Generic Primary Goal Breakdown*; Earth Land Split → *Fair Space Sharing*; Budget Resources → *Universal Allowance*; Inheritance → the new *Inheritance* article.
  - French version written.

**Setup** (copied from core and rebranded):

- `astro.config.mjs`:
  - `site` set to `https://yeahsight.happybein.com`; title YeahSight; GitHub link to the `yeahsight` repo.
  - Sidebar: Home, Foresight Trends, the four domains, Vision & Roadmap, and a "Related" group linking YeahCore, YeahVibe tools and HappyBein.
- `Head.astro`: site URL, site name ("YeahSight by HappyBein"), home title, default descriptions, keywords and JSON-LD rebranded. The bottom-left pill now reads "← HappyBein" (it was "All tools" → yeahvibe.com). Kept unchanged: the consent snippet (GA4 only after Accept), hreflang, TTS bar and language auto-detect.
- New visual identity:
  - `src/assets/logo.svg`: an eye mark plus "Yeah" in blue and "Sight" in green.
  - Favicons generated from the same mark: `favicon.svg`, `.ico`, `.png`, `icon-192.png`, `apple-touch-icon.png`.
  - `og-image.png`: 1200×630, dark background, wordmark, tagline and "A HappyBein initiative".
- Removed: core's `public/images/` (unused by these articles), `logo.png`, `houston.webp` and the unused `LanguageDetect`/`StoreLangPref` components.
- `public/robots.txt`: sitemap now points at this site.
- `public/llms.txt`: rewritten for YeahSight.
- `README.md`: rewritten, including the Cloudflare Pages build settings.
- `src/version.ts`: `2.00`, shown in the footer.

**`public/_redirects`, so old links keep working:**

- Every v1.x `/articles/<slug>/` → its new page.
- The four old "about" pages and `/about/`, `/contact/`, `/disclaimer/` → their happybein.com equivalents.
- The old WordPress URLs (`/uptools/…`, `/upnext/…`) → the new pages.
- `/applications/*` and `/fr/applications/*` → the same path without the prefix, with the two core-only pages sent to core first.

The old `/articles/vision-roadmap/ → /uptools/proposed-roadmap/ 200` rewrite is dropped.

**Not done yet (next steps):**

- Cloudflare: change this Pages project's build settings to build command `npm run build`, output `dist`. The old site was static files at the repo root, so leaving the old settings would serve nothing.
- Cloudflare: add the custom domain `yeahsight.happybein.com`, point yeahsight.com at it, then purge the cache.
- Core still holds its copy of these articles. Remove them and add `core.yeahvibe.com/applications/* → yeahsight.happybein.com/*` redirects; core's `_redirects` currently sends yeahsight.com to its own foresight-trends page.
- Update links on happybein.com and the YeahVibe hub.
- Links to YeahCore still use `core.yeahvibe.com`. They will redirect once core moves to `yeahcore.happybein.com`.

**Verification:**

- `npm ci` + `astro build` in a scratch copy: 39 pages built (EN+FR), no warnings.
- Scanned every built HTML file for internal links: none broken.
- Checked the generated OG image visually.
- The rendered pages were not viewed in a browser (no headless browser available here). Check the home page and an article on the Cloudflare preview after pushing.
- The repo's `src`/`public`/config are byte-identical to the scratch copy that was built.

---

## v1.4



