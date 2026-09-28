import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav aria-label="Primary">
        <div className="nav-inner">
          <Link to="/" className="logo" aria-label="Anvexa home">Anvexa<em>.</em></Link>
          <ul className="nav-links">
            {NAV.map((l) => (
              <li key={l.to}><NavLink to={l.to} end={l.end}>{l.label}</NavLink></li>
            ))}
          </ul>
          <div className="nav-right">
            <Link to="/contact" className="nav-btn">Get Protected</Link>
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
        <Link to="/contact" className="nav-btn">Get Protected</Link>
      </div>
    </>
  );
}
