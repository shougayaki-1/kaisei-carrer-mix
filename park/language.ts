export type Language = 'ja' | 'en';
const storageKey = 'fdc-language';
export function getLanguage(): Language {
 const fromUrl = new URLSearchParams(window.location.search).get('lang');
 if (fromUrl === 'ja' || fromUrl === 'en') {
  try { localStorage.setItem(storageKey, fromUrl); } catch { /* Storage is optional. */ }
  return fromUrl;
 }
 try { return localStorage.getItem(storageKey) === 'en' ? 'en' : 'ja'; } catch { return 'ja'; }
}
export function setLanguage(language: Language): void {
 try { localStorage.setItem(storageKey, language); } catch { /* URL remains a usable fallback. */ }
 const url = new URL(window.location.href);
 url.searchParams.set('lang', language);
 window.location.assign(url.href);
}
