import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <nav aria-label="Primary" className={scrolled ? 'scrolled' : undefined}>
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Anvexa Security Solutions — home">
            <img src="/anvexa-mark.svg" alt="" width="47" height="40" />
            <span className="brand-text"><b>ANVEXA</b><small>Security Solutions</small></span>
          </Link>
          <ul className="nav-links">
            {NAV.map((l) => (
              <li key={l.to}><NavLink to={l.to} end={l.end}>{l.label}</NavLink></li>
            ))}
          </ul>
          <div className="nav-right">
            <Link to="/contact" className="nav-btn">Book a Demo</Link>
            <button
              className="hamburger"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobileMenu"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
        {NAV.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
        ))}
        <Link to="/contact" className="nav-btn">Book a Demo</Link>
      </div>
    </>
  );
}
