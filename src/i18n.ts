// v2.64 (owner, 2026-11-10: "go ahead with yeahcore and yeahsight full website translation in Spanish and dutch"):
// the site's own texts in its four languages. pick(lang, {...}) falls back to English for a missing language.
export type Lang = 'en' | 'fr' | 'es' | 'nl';
export const LANGS: Lang[] = ['en', 'fr', 'es', 'nl'];
export const asLang = (l: string | undefined): Lang => (LANGS.includes(l as Lang) ? (l as Lang) : 'en');
export const pick = <T>(lang: string | undefined, o: Partial<Record<Lang, T>> & { en: T }): T => o[asLang(lang)] ?? o.en;
// The home page of a language: '/' for English, '/fr/', '/es/', '/nl/'.
export const homeOf = (lang: string | undefined) => (asLang(lang) === 'en' ? '/' : `/${asLang(lang)}/`);
