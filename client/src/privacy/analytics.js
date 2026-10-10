import posts from '../../shared/posts.js';
import { PUBLIC_PATHS } from '../../shared/site.js';

const paths = new Set([...PUBLIC_PATHS, ...posts.map((post) => `/blog/${post.slug}`)]);

export function clearAnalyticsCookies(documentImpl, hostname) {
  const names = documentImpl.cookie.split(';').map((entry) => entry.trim().split('=')[0]).filter((name) => /^_ga(?:_|$)/.test(name));
  const parts = hostname.split('.');
  for (const name of names) {
    documentImpl.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    for (let i = 0; i < parts.length - 1; i++) {
      documentImpl.cookie = `${name}=; Max-Age=0; Path=/; Domain=${parts.slice(i).join('.')}; SameSite=Lax`;
    }
  }
}

// Basic consent mode: no Google script or requests before explicit permission.
export function createAnalytics({ measurementId, enabled, origin, windowImpl, documentImpl }) {
  let started = false;
  let active = false;
  let lastPath = null;
  let script;
  const disableKey = `ga-disable-${measurementId}`;
  const valid = enabled && /^G-[A-Z0-9]+$/.test(measurementId || '');
  const tag = (...args) => windowImpl.gtag(...args);
  function sync(pathname, consent) {
    const allowed = valid && consent?.analytics === true && paths.has(pathname);
    windowImpl[disableKey] = !allowed;
    if (!allowed) {
      lastPath = null;
      if (active && consent?.analytics !== true) {
        active = false;
        // The GA opt-out flag also blocks its already-loaded background collectors.
        script?.remove();
        clearAnalyticsCookies(documentImpl, windowImpl.location.hostname);
      }
      return;
    }
    active = true;
    const location = origin + pathname;
    if (!started) {
      windowImpl.dataLayer = windowImpl.dataLayer || [];
      windowImpl.gtag = function () { windowImpl.dataLayer.push(arguments); };
      tag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      tag('consent', 'update', { analytics_storage: 'granted' });
      tag('js', new Date());
      tag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 63072000, page_location: location, page_referrer: '', page_title: 'Anvexa Security Solutions' });
      script = documentImpl.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      const nonce = documentImpl.querySelector('script[nonce]')?.nonce;
      if (nonce) script.nonce = nonce;
      documentImpl.head.appendChild(script);
      started = true;
    }
    if (lastPath === pathname) return;
    tag('event', 'page_view', { send_to: measurementId, page_location: location, page_referrer: lastPath ? origin + lastPath : '', page_title: pathname === '/' ? 'Anvexa Security Solutions' : `Anvexa · ${pathname}` });
    lastPath = pathname;
  }
  return { sync, pause: () => { windowImpl[disableKey] = true; } };
}
