import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createAnalytics } from '../privacy/analytics.js';
import { CONSENT_EVENT, readConsent } from '../privacy/consent.js';

const origin = import.meta.env.VITE_SITE_URL;
const analytics = createAnalytics({
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  enabled: import.meta.env.PROD && globalThis.window?.location.origin === origin,
  origin, windowImpl: globalThis.window, documentImpl: globalThis.document,
});

export default function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    const sync = () => analytics.sync(pathname, readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => { window.removeEventListener(CONSENT_EVENT, sync); analytics.pause(); };
  }, [pathname]);
  return null;
}
