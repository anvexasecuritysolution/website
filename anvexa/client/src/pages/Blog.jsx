import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon, { TAG_ICON } from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { api } from '../api/client.js';

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [tag, setTag] = useState('All');

  useEffect(() => {
    let live = true;
    api.posts().then((d) => live && setPosts(d)).catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, []);

  return (
    <>
      <Seo title="Blog" description="Practical insights on VAPT, compliance, regulatory updates and the threat landscape in India." />
      <PageHero
        label="Threat Intelligence"
        title="Insights from the security front line."
        aside={(
          <AsideCard title="Topics we cover" tiles={[
            { icon: 'scan', label: 'VAPT and risk' },
            { icon: 'lock', label: 'CERT-In and DPDP' },
            { icon: 'landmark', label: 'RBI, SEBI, IRDAI' },
            { icon: 'shieldalert', label: 'Application security' },
            { icon: 'radar', label: 'Continuous monitoring' },
          ]} />
        )}
      >
        <p>Practical insights on VAPT, compliance, CERT-In updates, and what is actually happening in India's threat landscape.</p>
      </PageHero>

      {error && <p className="state-msg" role="alert">Couldn't load articles: {error}</p>}
      {!posts && !error && <p className="state-msg">Loading articles…</p>}
      {posts && posts.length === 0 && <p className="state-msg">No articles yet — check back soon.</p>}

      {posts && posts.length > 0 && (
        <div className="chips" role="group" aria-label="Filter articles by topic">
          {['All', ...new Set(posts.map((p) => p.tag))].map((t) => (
            <button key={t} className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>
          ))}
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="blog-grid">
          {posts.filter((p) => tag === 'All' || p.tag === tag).map((p, i) => (
            <Reveal as={Link} to={`/blog/${p.slug}`} className="bc" key={p.slug} delay={(i % 3) * 70}>
              <div className="bc-img"><Icon name={TAG_ICON[p.tag] || 'shield'} size={40} /><span className="bc-tag">{p.tag}</span></div>
              <div className="bc-body">
                <div className="bc-meta">{fmtDate(p.publishedAt)} · {p.readMinutes} min read</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="bc-read">Read article →</span>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
