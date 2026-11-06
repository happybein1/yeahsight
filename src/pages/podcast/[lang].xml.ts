// Podcast feeds (v2.23): /podcast/en.xml and /podcast/fr.xml, one language per feed as Apple
// Podcasts and Spotify expect. Episodes are the articles with audio + audioBytes + audioSeconds +
// audioDate in their front matter; nothing else to update when a new recording is published.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';

// v2.50: each episode carries <itunes:episode>, its place in the six-question reading order (the order of
// the slugs in the menu in astro.config.mjs), so apps such as the HappyBein Podcast can play them in order.
const ORDER = [...readFileSync(`${process.cwd()}/astro.config.mjs`, 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const place = (id: string) => { const i = ORDER.indexOf(id.replace(/^fr\//, '')); return i < 0 ? ORDER.length : i; };
// v2.51: each episode also carries <category>, a short name for its menu question, so apps can group the
// episodes in sections (the HappyBein Podcast shows them as section titles).
const SECTIONS = {
  en: ['', 'Needs', 'The planet', 'How society works', 'Forces of change', 'Solutions', 'Causes'],
  fr: ['', 'Les besoins', 'La planète', 'Comment fonctionne la société', 'Les forces du changement', 'Les solutions', 'Les causes'],
};
const QUESTION = new Map<string, number>();
{
  let q = 0;
  for (const m of readFileSync(`${process.cwd()}/astro.config.mjs`, 'utf8').matchAll(/label: ['"](\d)\. |slug: '([^']+)'/g)) {
    if (m[1]) q = +m[1]; else if (q) QUESTION.set(m[2], q);
  }
}

const FEEDS = {
  en: {
    title: 'YeahSight',
    description: "How society works, and where it's heading. Clear, structured explanations of the forces shaping our world (economy, environment, technology, fairness) and proposals for a fairer, sustainable society. Each episode is a YeahSight article, as a short conversation between Emma and Sam or read aloud. By HappyBein, a small independent not-for-profit foundation.",
    language: 'en',
    home: 'https://yeahsight.happybein.com/',
  },
  fr: {
    title: 'YeahSight (en français)',
    description: "Comprendre comment fonctionne la société, et où elle va. Des explications claires et structurées des forces qui façonnent notre monde (économie, environnement, technologie, justice) et des propositions pour une société plus juste et durable. Chaque épisode est un article de YeahSight, lu à voix haute. Par HappyBein, une petite fondation indépendante à but non lucratif.",
    language: 'fr',
    home: 'https://yeahsight.happybein.com/fr/',
  },
} as const;
type Lang = keyof typeof FEEDS;

export const getStaticPaths: GetStaticPaths = () => Object.keys(FEEDS).map((lang) => ({ params: { lang } }));

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hms = (sec: number) => [Math.floor(sec / 3600), Math.floor(sec / 60) % 60, sec % 60].map((n) => String(n).padStart(2, '0')).join(':');

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const feed = FEEDS[lang];
  const base = String(site).replace(/\/$/, '');
  const self = `${base}/podcast/${lang}.xml`;
  const cover = `${base}/podcast/cover-${lang}.jpg`;
  const docs = await getCollection('docs', (e) =>
    (lang === 'fr') === e.id.startsWith('fr/') && !!e.data.audio && !!e.data.audioBytes && !!e.data.audioSeconds && !!e.data.audioDate);
  const num = new Map([...docs].sort((a, b) => place(a.id) - place(b.id)).map((e, i) => [e.id, i + 1]));
  docs.sort((a, b) => b.data.audioDate!.getTime() - a.data.audioDate!.getTime());
  const items = docs.map((e) => {
    const d = e.data;
    const page = `${base}/${e.id}/`;
    const url = d.audio!.startsWith('http') ? d.audio! : base + d.audio;
    return `
    <item>
      <title>${esc(d.title)}</title>
      <description>${esc(d.description ?? '')} ${lang === 'fr' ? "L'article complet, avec ses sources :" : 'Full article, with sources:'} ${page}</description>
      <link>${page}</link>
      <guid isPermaLink="false">yeahsight-${e.id.replace(/\//g, '-')}${lang === 'en' ? '-en' : ''}</guid>
      <pubDate>${d.audioDate!.toUTCString()}</pubDate>
      <enclosure url="${esc(url)}" length="${d.audioBytes}" type="audio/mpeg"/>
      <itunes:duration>${hms(d.audioSeconds!)}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
      <itunes:episode>${num.get(e.id)}</itunes:episode>${QUESTION.has(e.id.replace(/^fr\//, '')) ? `
      <category>${esc(SECTIONS[lang][QUESTION.get(e.id.replace(/^fr\//, ''))!])}</category>` : ''}
      <itunes:episodeType>full</itunes:episodeType>
    </item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(feed.title)}</title>
    <link>${feed.home}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
    <description>${esc(feed.description)}</description>
    <language>${feed.language}</language>
    <copyright>HappyBein</copyright>
    <itunes:author>HappyBein</itunes:author>
    <itunes:owner><itunes:name>HappyBein</itunes:name><itunes:email>contact@happybein.com</itunes:email></itunes:owner>
    <itunes:image href="${cover}"/>
    <image><url>${cover}</url><title>${esc(feed.title)}</title><link>${feed.home}</link></image>
    <itunes:category text="Society &amp; Culture"/>
    <itunes:category text="Education"/>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
