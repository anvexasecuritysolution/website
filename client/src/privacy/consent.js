export const CONSENT_COOKIE = 'anvexa_consent';
export const THEME_KEY = 'anvexa-theme';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60;
export const CONSENT_EVENT = 'anvexa-consent-change';
export const SETTINGS_EVENT = 'anvexa-cookie-settings';

export function parseConsent(cookie, now = Date.now()) {
  try {
    const entry = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(CONSENT_COOKIE + '='));
    if (!entry) return null;
    const value = JSON.parse(decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)));
    if (value.version !== 2 || value.necessary !== true || typeof value.preferences !== 'boolean' || typeof value.analytics !== 'boolean' || !Number.isFinite(value.savedAt)) return null;
    if (now - value.savedAt >= CONSENT_MAX_AGE * 1000 || value.savedAt > now + 60_000) return null;
    return value;
  } catch { return null; }
}

export function createConsentStore({ documentImpl = globalThis.document, storage = globalThis.localStorage, locationImpl = globalThis.location, now = Date.now, dispatch = () => {} } = {}) {
  let sessionChoice = null;
  const read = () => {
    if (sessionChoice) return sessionChoice;
    try { return parseConsent(documentImpl.cookie, now()); } catch { return null; }
  };
  function persistTheme(theme) {
    try {
      if (read()?.preferences === true) storage.setItem(THEME_KEY, theme === 'light' ? 'light' : 'dark');
      else storage.removeItem(THEME_KEY);
    } catch { /* The current theme still works when storage is blocked. */ }
  }
  function save(options) {
    const preferences = typeof options === 'boolean' ? options : options?.preferences;
    sessionChoice = { version: 2, necessary: true, preferences: preferences === true, analytics: options?.analytics === true, savedAt: now() };
    try {
      documentImpl.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(sessionChoice))}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${locationImpl?.protocol === 'https:' ? '; Secure' : ''}`;
      const stored = parseConsent(documentImpl.cookie, now());
      if (stored?.savedAt === sessionChoice.savedAt && stored.preferences === sessionChoice.preferences && stored.analytics === sessionChoice.analytics) sessionChoice = null;
    } catch { /* Keep the choice for this page if cookies are unavailable. */ }
    persistTheme(documentImpl?.documentElement?.dataset.theme === 'light' ? 'light' : 'dark');
    const choice = read();
    dispatch(choice);
    return choice;
  }
  return { read, save, persistTheme };
}

// Access browser storage lazily; blocked localStorage must never stop the site loading.
const browserStore = createConsentStore({
  storage: { setItem: (...args) => globalThis.localStorage.setItem(...args), removeItem: (...args) => globalThis.localStorage.removeItem(...args) },
  dispatch: (choice) => window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice })),
});
export const readConsent = browserStore.read;
export const saveConsent = browserStore.save;
export const persistTheme = browserStore.persistTheme;
export const openCookieSettings = () => window.dispatchEvent(new Event(SETTINGS_EVENT));
