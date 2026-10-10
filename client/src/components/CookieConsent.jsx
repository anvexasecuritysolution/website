import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, SETTINGS_EVENT, readConsent, saveConsent } from '../privacy/consent.js';

export default function CookieConsent() {
  const [choice, setChoice] = useState(readConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => readConsent()?.preferences === true);
  const [analytics, setAnalytics] = useState(() => readConsent()?.analytics === true);
  const dialog = useRef(null);

  useEffect(() => {
    const changed = () => setChoice(readConsent());
    const open = () => { setPreferences(readConsent()?.preferences === true); setAnalytics(readConsent()?.analytics === true); setSettingsOpen(true); };
    window.addEventListener(CONSENT_EVENT, changed);
    window.addEventListener(SETTINGS_EVENT, open);
    return () => {
      window.removeEventListener(CONSENT_EVENT, changed);
      window.removeEventListener(SETTINGS_EVENT, open);
    };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (settingsOpen && !element.open) element.showModal();
    else if (!settingsOpen && element.open) element.close();
  }, [settingsOpen]);

  const choose = (allowPreferences, allowAnalytics = allowPreferences) => {
    setChoice(saveConsent({ preferences: allowPreferences, analytics: allowAnalytics }));
    setSettingsOpen(false);
  };
  const openSettings = () => { setPreferences(readConsent()?.preferences === true); setAnalytics(readConsent()?.analytics === true); setSettingsOpen(true); };

  return (
    <>
      {!choice && <section className="cookie-banner" aria-label="Cookie choices">
        <div className="cookie-copy">
          <h2>Your cookie choices</h2>
          <p>We use essential storage to remember your choice. With your permission, we also remember your theme and use Google Analytics to understand website visits. <Link to="/privacy">Privacy Policy</Link></p>
        </div>
        <div className="cookie-actions">
          <button type="button" onClick={() => choose(true)}>Accept all</button>
          <button type="button" onClick={() => choose(false)}>Reject optional</button>
          <button type="button" onClick={openSettings}>Settings</button>
        </div>
      </section>}
      <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-description" onCancel={() => setSettingsOpen(false)} onClose={() => setSettingsOpen(false)}>
        <div className="cookie-dialog-header">
          <h2 id="cookie-settings-title">Cookie settings</h2>
          <button type="button" className="cookie-close" aria-label="Close cookie settings" onClick={() => setSettingsOpen(false)}>×</button>
        </div>
        <p id="cookie-settings-description">Choose what this site remembers. You can change your choice anytime using Cookie settings in the footer.</p>
        <div className="cookie-category">
          <div><h3>Essential storage</h3><p>Remembers your consent choice for 180 days and supports admin sign-in.</p></div>
          <span className="cookie-always">Always active</span>
        </div>
        <label className="cookie-category cookie-preference">
          <div><h3>Preferences</h3><p>Remembers your light or dark theme across visits. You can still switch themes when this is off.</p></div>
          <input type="checkbox" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} aria-label="Allow preference storage" />
        </label>
        <label className="cookie-category cookie-preference">
          <div><h3>Analytics</h3><p>Allows Google Analytics to measure visitors and public page views. Contact form details are not sent to Analytics.</p></div>
          <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} aria-label="Allow analytics" />
        </label>
        <p className="cookie-note">Analytics stays off until you allow it. We do not use advertising trackers. <Link to="/privacy" onClick={() => setSettingsOpen(false)}>Privacy Policy</Link></p>
        <div className="cookie-actions">
          <button type="button" onClick={() => choose(preferences, analytics)}>Save choices</button>
          <button type="button" onClick={() => choose(true)}>Accept all</button>
          <button type="button" onClick={() => choose(false)}>Reject optional</button>
        </div>
      </dialog>
    </>
  );
}
