import Icon from './Icon.jsx';

// Small colourful icon tiles — a mosaic, not a table row list.
export function AsideCard({ title, tiles, mark }) {
  return (
    <aside className="aside-card">
      {mark && <img className="aside-mark" src={mark} alt="" width="112" height="96" />}
      {title && <h4>{title}</h4>}
      {tiles && (
        <div className="tile-grid">
          {tiles.map((t, i) => (
            <div className="tile" key={t.label} style={{ '--ti': i }}>
              {t.icon && <div className="tile-icon"><Icon name={t.icon} size={20} /></div>}
              {t.k && <div className="tile-k">{t.k}</div>}
              <div className="tile-label">{t.label}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default function PageHero({ label, title, aside, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <div className="label">{label}</div>
        <h1>{title}</h1>
        {children}
      </div>
      {aside}
    </section>
  );
}

export function SectionHead({ label, title, children }) {
  return (
    <div className="section-head">
      <div className="label">{label}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
