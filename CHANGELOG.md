# yeahsight — Changelog

Moved out of the repo-wide `CLAUDE.md` on 2026-09-25 to keep that file focused on rules rather than history. Entries below are transcribed verbatim (substance unchanged) from what was previously in `CLAUDE.md`'s per-version table for this app; only pure markdown table syntax (the row-closing ` |`) was stripped. Newest version first.

---

## v2.06

**Every article now shows whether it is an explainer or a HappyBein proposal.** This is step 2 of the content review, scoped by the user to "labels only for now". The roadmap lines, YeahCore links and the reordering of section 3 are not done.

**Why:** neutral explainers and HappyBein's own proposals were mixed with nothing to tell them apart, which weakens trust in both. The user considered splitting YeahSight into two (sites or halves) and chose labels instead, to keep each proposal next to the facts it builds on.

**How it works:**

- `src/content.config.ts` extends Starlight's `docsSchema` with an optional front-matter field, `kind: 'explainer' | 'proposal'`.
- `src/components/overrides/MarkdownContent.astro` renders a pill badge plus a one-line hint above the article, next to the reading time:
  - **📘 Explainer / Explication**: "Facts, how it works and the options, without taking a side." Accent-blue pill.
  - **💡 HappyBein proposal / Proposition HappyBein**: "Our view, open for discussion." Amber pill, with a darker variant in the dark theme.
- Pages without `kind` (home, Foresight Trends) show no badge.

**Tagged, 34 files (EN + FR):**

- **Proposal:** Fair Space Sharing, Universal Allowance, Inheritance, Vision & Roadmap, and Plant-Based Consumption. Plant-Based argues for a choice and feeds roadmap step 2, though it presents pros and cons. It was the one borderline case; to switch it, change `kind` in its two files.
- **Explainer:** Purpose of Society, Societal Systems, Societal Functions, The Economic System, Land per Person, Clean & Safe Energy, Enhanced Automation, Impact of AI, Life After Automation, Managing Regional Migration, Social Redistribution, Fair Globe Sharing.

**Verification:**

- Built in a scratch copy: no warnings.
- Listed every built EN page with its badge text: matches the list above. Checked one FR page: *Terres par personne* shows "📘 Explication".
- A first build dropped the space between emoji and label (JSX whitespace); it is fixed with a template string.
- Not viewed in a browser.

---

## v2.05

**Articles regrouped into four sections that read as one story, from understanding to solutions.** This is step 1 of the content-organization review done with the user the same session. The review found three problems:

- **The foundation was buried.** The "how society works" pages (Purpose of Society, Societal Systems, Societal Functions) sat last, under Social Organization.
- **Social Organization mixed frameworks with issue pages.**
- **The fairness theme was split.** Fair Globe Sharing, Universal Allowance and Inheritance sat under Economy & Equity, while Fair Space Sharing sat under Environment & Energy.

**New structure** (sidebar groups, numbered; EN/FR labels):

1. **How society works / Comment fonctionne la société:** Purpose of Society, Societal Systems, Societal Functions, The Economic System.
2. **Forces shaping the future / Les forces qui façonnent l'avenir:** Land per Person, Clean & Safe Energy, Plant-Based Consumption, Enhanced Automation, Impact of AI, Life After Automation, Managing Regional Migration.
3. **Sharing fairly / Partager équitablement:** Fair Globe Sharing (between people), Fair Space Sharing (with nature), Social Redistribution, Universal Allowance, Inheritance.
4. **Vision & Roadmap.**

Foresight Trends stays at the top. It will become a "How to read YeahSight" or real "Key trends" page in a later step.

**Files moved into three new folders (EN and FR) so that URLs match the sections:**

| Old path | New path |
|---|---|
| `/social-organization/purpose-of-society/` | `/how-society-works/purpose-of-society/` |
| `/social-organization/societal-systems/` | `/how-society-works/societal-systems/` |
| `/social-organization/societal-functions/` | `/how-society-works/societal-functions/` |
| `/economy-equity/the-economical-system/` | `/how-society-works/economic-system/` |
| `/environment-energy/earth-land-view-per-individual/` | `/forces/land-per-person/` |
| `/environment-energy/clean-safe-energy/` | `/forces/clean-safe-energy/` |
| `/environment-energy/plant-based-consumption/` | `/forces/plant-based-consumption/` |
| `/technology-automation/enhanced-automation/` | `/forces/enhanced-automation/` |
| `/technology-automation/impact-of-artificial-intelligence/` | `/forces/impact-of-artificial-intelligence/` |
| `/technology-automation/life-after-automation/` | `/forces/life-after-automation/` |
| `/social-organization/managing-regional-migration/` | `/forces/managing-regional-migration/` |
| `/economy-equity/fair-globe-sharing/` | `/sharing-fairly/fair-globe-sharing/` |
| `/environment-energy/fair-space-sharing/` | `/sharing-fairly/fair-space-sharing/` |
| `/social-organization/social-redistribution/` | `/sharing-fairly/social-redistribution/` |
| `/economy-equity/universal-allowance/` | `/sharing-fairly/universal-allowance/` |
| `/economy-equity/inheritance/` | `/sharing-fairly/inheritance/` |

**Renamed:**

- *The Economical System* → **The Economic System**. "Economical" means thrifty. The slug changed too, `the-economical-system` → `economic-system`.
- *Earth Land — View per Individual* → **Land per Person** (French: *Terres par personne*).

Titles, sidebar labels and every link text that used the old names were updated, in YeahSight and in YeahCore.

**Links:**

- Every internal link in the articles, the home page, Foresight Trends, Vision & Roadmap and `llms.txt` was rewritten to the new paths, EN and FR.
- On the **home page**, "Four domains" is now **"From understanding to solutions, in four steps"**: three section cards with chips plus a fourth card for the roadmap. The bottom chain section is renamed "Part of a chain" to avoid a duplicate heading.
- In **Foresight Trends**, "Key trend areas" is now **"How YeahSight is organized"**, with the four numbered sections and their articles.

**`public/_redirects`:**

- Each old path (EN and FR) now 301s to its new path.
- The v1.x `/articles/…` and WordPress rules point straight at the new paths, with no extra hop.
- `/applications/<old>/` rules are now explicit per article, with `/applications/*` → `/` as the last fallback.

YeahCore's links into YeahSight were updated the same session (core 2.2.2). Core's own `/applications/* → yeahsight/:splat` rule still lands on old paths, which then redirect here: two hops, still correct.

**Verification:**

- Built in a scratch copy: 39 pages, no warnings.
- Scanned every built page for internal links: none broken, apart from Starlight's own `/404/` language link on the 404 page.
- Checked every local destination in `_redirects` against the built pages: all exist.
- Checked every YeahSight URL used in YeahCore's source against YeahSight's built pages: all exist.

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



