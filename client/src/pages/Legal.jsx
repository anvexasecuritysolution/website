import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { CONTACT } from '../data/content.js';
import { LEGAL_UPDATED, PRIVACY, TERMS } from '../data/legal.js';

// Replace {email} / {phone} tokens with real links.
function Rich({ text }) {
  return text.split(/(\{email\}|\{phone\})/).map((part, i) => {
    if (part === '{email}') return <a key={i} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;
    if (part === '{phone}') return <a key={i} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>;
    return part;
  });
}

// Highlights the contents entry for the section currently on screen.
function useActiveSection(count) {
  const [active, setActive] = useState(1);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(Number(hit.target.dataset.n));
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    for (let i = 1; i <= count; i += 1) {
      const el = document.getElementById(`s${i}`);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [count]);
  return active;
}

const GLANCE = {
  privacy: [
    { icon: 'lock', label: 'No ads or trackers' },
    { icon: 'shield', label: 'Aligned to India\'s DPDP Act' },
    { icon: 'mail', label: 'Your data is never sold' },
    { icon: 'clock', label: 'Access or delete on request' },
  ],
  terms: [
    { icon: 'filecheck', label: 'Written agreement before any work' },
    { icon: 'shield', label: 'Testing only with authorisation' },
    { icon: 'landmark', label: 'Governed by Indian law' },
    { icon: 'mail', label: 'Report issues to us' },
  ],
};

function LegalPage({ doc, other }) {
  const active = useActiveSection(doc.sections.length);
  return (
    <>
      <Seo title={doc.title} description={doc.description} />
      <PageHero
        label={doc.label}
        title={doc.title}
        aside={<AsideCard title="At a glance" mark="/anvexa-mark.svg" tiles={GLANCE[doc.slug]} />}
      >
        <p><Rich text={doc.intro} /></p>
        <p className="legal-updated">Last updated: {LEGAL_UPDATED}</p>
      </PageHero>

      <div className="wrap">
        <div className="legal-layout">
          <aside className="legal-side">
            <details className="legal-toc" open>
              <summary>On this page</summary>
              <ol>
                {doc.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s${i + 1}`} className={active === i + 1 ? 'on' : undefined}>
                      <span>{i + 1}</span>{s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </aside>

          <div className="legal-body">
            {doc.sections.map((s, i) => (
              <Reveal as="section" key={s.h} id={`s${i + 1}`} data-n={i + 1} className="legal-card" delay={0}>
                <h2><span className="legal-n">{i + 1}</span>{s.h}</h2>
                {s.p?.map((t) => <p key={t}><Rich text={t} /></p>)}
                {s.ul && <ul>{s.ul.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>}
                {s.after && <p><Rich text={s.after} /></p>}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-band">
        <div>
          <h3>Questions about this {doc.slug === 'privacy' ? 'policy' : 'agreement'}?</h3>
          <p>Write to us and a real person will reply. You can also read our <Link to={`/${other.slug}`}>{other.title}</Link>.</p>
        </div>
        <Link to="/contact" className="btn btn-c">Contact us</Link>
      </div>
    </>
  );
}

export const PrivacyPage = () => <LegalPage doc={PRIVACY} other={TERMS} />;
export const TermsPage = () => <LegalPage doc={TERMS} other={PRIVACY} />;
