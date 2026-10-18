import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import NotFound from './NotFound.jsx';
import { api } from '../api/client.js';
import { fmtDate } from './Blog.jsx';
import { FRAMEWORK_GUIDE } from '../data/frameworks.js';
import { usePrerenderPosts } from '../context/PrerenderContext.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const prerenderPosts = usePrerenderPosts();
  const [post, setPost] = useState(() => prerenderPosts?.find((entry) => entry.slug === slug) || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    setPost(null); setError(null);
    api.post(slug).then((d) => live && setPost(d)).catch((e) => live && setError(e));
    return () => { live = false; };
  }, [slug]);

  if (error?.status === 404) return <NotFound />;
  if (error) return <p className="state-msg" role="alert">We couldn't load this article: {error.message}</p>;
  if (!post) return <p className="state-msg"><Emphasis>Loading…</Emphasis></p>;

  return (
    <>
      <Seo title={post.title} description={post.excerpt} article publishedAt={post.publishedAt} />
      <article className="article">
        <Link to="/blog" className="back-link">← All articles</Link>
        <div className="label">{post.tag}</div>
        <h1><TitleCase>{post.title}</TitleCase></h1>
        <div className="meta">{fmtDate(post.publishedAt)} · {post.readMinutes} min read</div>
        <p className="note">Published by <Link to="/about">Anvexa Security Solutions</Link>.</p>
        {post.body.map((para, i) => <p key={i}><Emphasis>{para}</Emphasis></p>)}
        <section aria-labelledby="article-reading-title">
          <h2 id="article-reading-title">Official Reading</h2>
          <ul>{(post.tag === 'DPDP' ? FRAMEWORK_GUIDE.filter((item) => item.title.startsWith('DPDP')) : post.tag === 'Compliance' ? FRAMEWORK_GUIDE.filter((item) => item.title.startsWith('CERT-In')) : []).flatMap((item) => item.sources).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}<li><a href="https://owasp.org/projects/web-security-testing-guide" target="_blank" rel="noopener noreferrer">OWASP Web Security Testing Guide</a></li></ul>
          <p className="note">General technical guidance. Check the current official sources for requirements and applicability.</p>
        </section>
      </article>
      <div className="cta-band">
        <h3><TitleCase>Want help applying this to your own setup?</TitleCase></h3>
        <Link to="/contact" className="btn btn-c">Talk to us</Link>
      </div>
    </>
  );
}
