import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import ScrollProgress from './ScrollProgress.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

// Every card-like block. Colour is fixed by its position inside its group (7-colour set),
// except tiers / engagement steps which keep Assess cyan · Operate amber · Respond green.
const FX = '.gap-card,.engage-cell,.ab,.phase,.tier,.bc,.stat-item,.step-item,.reg,.free-box,.reassess,.cta-band,.cdetail,.retain-card,.aside-card';
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
  animateCards();
}

// Cards fade/rise in as they enter the viewport, staggered by their place in the group.
let cardIO;
function animateCards() {
  if (!('IntersectionObserver' in window)) return;
  if (!cardIO) {
    cardIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('seen'); cardIO.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  }
  const groups = new Map();
  document.querySelectorAll(FX).forEach((el) => {
    if (el.dataset.anim) return;
    const n = groups.get(el.parentElement) || 0;
    groups.set(el.parentElement, n + 1);
    el.dataset.anim = '1';
    el.style.setProperty('--i', String(Math.min(n, 6)));
    cardIO.observe(el);
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
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <ThemeToggle />
      <main id="main"><div className="page-fade" key={pathname}><Outlet /></div></main>
      <Footer />
    </>
  );
}
