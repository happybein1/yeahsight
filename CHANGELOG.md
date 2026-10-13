# yeahsight — Changelog

Moved out of the repo-wide `CLAUDE.md` on 2026-09-25 to keep that file focused on rules rather than history. Entries below are transcribed verbatim (substance unchanged) from what was previously in `CLAUDE.md`'s per-version table for this app; only pure markdown table syntax (the row-closing ` |`) was stripped. Newest version first.

---

## v2.04

**Landing hero now shows the mountain-view photo the user supplied** (a person on a rock looking over a sea of clouds towards a peak). It fits "where society is heading". User request.

- **Image:** the original is 3300×2271. The user saved it into the wrong repo's folder (`yeahvibe-astro/public/images/`); it was moved to `yeahsight/public/images/` and deleted from core.
- **Two versions:** `hero-view.jpg` (1800px wide, about 169 KB) and `hero-view-sm.jpg` (900px, about 36 KB, used on small screens), both JPEG at quality 78, progressive.
- **Position:** `--yv-hero-pos: 55% 60%`.
- **Layout (CSS block appended to `src/styles/custom.css`, identical in both sites):**
  - The hero becomes a dark panel (`#0d1620`, `min-height: clamp(340px, 42vw, 460px)`).
  - On screens of 64rem and wider, the photo fills the right 58% of the panel through a `::after` layer. A left-to-right mask fades it from transparent to opaque, so the text column on the left (max 30rem) stays readable.
  - Below 64rem the photo fills the whole panel, under a top-to-bottom dark gradient.
  - Hero text colours are fixed to light tones, so they work in both themes.
- **Per-site variables** at the end of `custom.css`: `--yv-hero-img`, an optional `--yv-hero-img-sm` and `--yv-hero-pos`.
- **Removed:** the drawn SVG mark (`hero.image.html`) from the hero front matter of `index.mdx` (EN+FR), since the photo replaces it.
- **Checked:** at a 1280px viewport in the built-in browser, with a stand-in gradient in place of the photo, the text column ends at 529px. The photo layer starts at 454px but is still nearly transparent there; it is fully opaque only from about 736px. The real photo was not viewed in the browser.
- **Licence:** the source of the photo was not confirmed. If it is from Unsplash or Pexels, no credit is required, though a credit is courteous.

---

## v2.03

**New landing page design, and brand colours instead of Starlight's default purple.** User request: "could the landing page … be a bit more appealing". YeahCore got the same treatment the same session (2.1.0).

**`src/content/docs/index.mdx` (EN+FR), rewritten.** It is still a Starlight splash page.

- **Hero:**
  - The title is the two-colour wordmark ("Yeah" in blue, "Sight" in green).
  - The tagline has a smaller sub-line.
  - The image is a large inline-SVG eye mark with a gradient and dashed orbit rings. It floats gently, and the motion turns off with `prefers-reduced-motion`.
  - Two buttons: the primary has a blue→green gradient; "Vision & Roadmap" is now a minimal button.
- **"Four domains":** four cards, each with a coloured top bar, an icon, a one-line description and chips linking to every article in that domain. This replaces Starlight `Card`s with bullet lists.
- **"New on YeahSight":** three clickable cards with a "New" badge, for Fair Space Sharing, Inheritance and Vision & Roadmap.
- **"From understanding to solutions":** a three-step strip, YeahCore → **YeahSight** → YeahVibe. The current site is highlighted. The strip stacks vertically under 40rem. A "A HappyBein initiative · happybein.com" line sits under it.

**`src/styles/custom.css`** gains a shared block, identical in YeahCore:

- Starlight accent variables set to the brand blue for dark and light themes, so links, buttons and focus rings everywhere lose the default purple.
- Hero glow background, wordmark colours, centred section titles on splash pages.
- Card, chip and chain styles.
- The reading-time line is hidden on splash pages, where it said "1 min read".

**Verification:**

- Built in a scratch copy: no warnings.
- Previewed in the built-in browser by injecting the built page's `<main>` and the new CSS into the live page. Desktop: hero, the four domain cards and the "New" row look as intended. Mobile (375px): cards stack in one column and chips wrap.

---

## v2.02

**Links to YeahCore now point to `yeahcore.happybein.com`.** Core was renamed YeahCore and moved off `core.yeahvibe.com` the same session (yeahvibe-astro 2.0.0). Updated:

- Every `https://core.yeahvibe.com…` link in the articles: Foresight Trends, Vision & Roadmap, Inheritance, The Economical System and the home page, EN and FR.
- The sidebar's "YeahCore ↗" link, `public/llms.txt` and `public/_redirects`.

The links to *Mastering Finance Basics* and *Time Spent Identification* used their old `/applications/…` core paths. They now go straight to the new `/personal-effectiveness/…` paths (core 1.8.0), skipping a redirect hop.

**Verification:** every `yeahcore.happybein.com` URL in the source (12 distinct) was checked against YeahCore's built page list: all exist. Rebuilt in the scratch copy with no warnings.

---

## v2.01

**Every page now has its own title and description, and French pages show French labels.** Found on the live site right after v2.00 went up: the article page `/vision-roadmap/` had the `<title>` "YeahSight | YeahSight by HappyBein" and the site-wide default description instead of its own.

**Root cause** (inherited from core's `Head.astro`, `Footer.astro` and `MarkdownContent.astro`): Starlight 0.32+ no longer passes route data as component props. It lives in `Astro.locals.starlightRoute`. The overrides still read `Astro.props.entry` / `Astro.props.lang`, which are now always `undefined`. As a result:

- every page fell back to the default title and description
- `og:locale` was always `en_US`
- the footer ("Contact us", "Cookie settings") and the reading-time label were English on French pages

On top of that, Starlight's own `<Default>` head still emitted its correct `<title>`, description, canonical and OG tags. So each page carried **two** titles and two descriptions, conflicting.

**Fix:**

- All three overrides now read from `Astro.locals.starlightRoute`.
- `Head.astro` removes Starlight's own title, description, canonical, `og:*` and `twitter:*` entries from `route.head` before rendering `<Default>`, so only one set is emitted.

**Verification:** rebuilt in the scratch copy (no warnings) and checked the built HTML:

- `/vision-roadmap/` → one `<title>` "Vision & Roadmap | YeahSight by HappyBein", its own description and canonical, `og:locale` `en_US`.
- `/fr/vision-roadmap/` → "Vision et feuille de route | YeahSight par HappyBein", its French description, `og:locale` `fr_FR`, footer "Nous contacter".
- Home → "YeahSight — Understand society and where it is heading".

The same bug exists in core (`yeahvibe-astro`) and is fixed there in the same session.

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



