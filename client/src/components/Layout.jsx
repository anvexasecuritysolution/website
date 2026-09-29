import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

// Every card-like block. Colour is fixed by its position inside its group (7-colour set),
// except tiers / engagement steps which keep Assess cyan · Operate amber · Respond green.
const FX = '.gap-card,.engage-cell,.ab,.phase,.tier,.bc,.stat-item,.step-item,.reg,.free-box,.reassess,.cta-band,.cdetail,.dash-card,.retain-card,.aside-card';
const FIXED = { '.free-box': 2, '.reassess': 2, '.cta-band': 1 };
const MEANING = [1, 2, 4, 3]; // cyan, amber, green, violet

function paint() {
  const seen = new Map();
  document.querySelectorAll(FX).forEach((el) => {
    el.classList.add('fx');
    let c;
    const fixed = Object.keys(FIXED).find((sel) => el.matches(sel));
    if (fixed) c = FIXED[fixed];
    else {
      const i = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, i + 1);
      c = el.matches('.tier,.engage-cell') ? MEANING[i % 4] : (i % 7) + 1;
    }
    el.dataset.c = String(c);
  });
}

function useCards() {
  useEffect(() => {
    paint();
    const mo = new MutationObserver(paint);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}

export default function Layout() {
  useCards();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}
