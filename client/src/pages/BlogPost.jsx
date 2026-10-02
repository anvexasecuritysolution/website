import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import NotFound from './NotFound.jsx';
import { api } from '../api/client.js';
import { fmtDate } from './Blog.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    setPost(null); setError(null);
    api.post(slug).then((d) => live && setPost(d)).catch((e) => live && setError(e));
    return () => { live = false; };
  }, [slug]);

  if (error?.status === 404) return <NotFound />;
  if (error) return <p className="state-msg" role="alert">We couldn't load this article: {error.message}</p>;
  if (!post) return <p className="state-msg">Loading…</p>;

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <article className="article">
        <Link to="/blog" className="back-link">← All articles</Link>
        <div className="label">{post.tag}</div>
        <h1>{post.title}</h1>
        <div className="meta">{fmtDate(post.publishedAt)} · {post.readMinutes} min read</div>
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
      </article>
      <div className="cta-band">
        <h3>Want help applying this to your own setup?</h3>
        <Link to="/contact" className="btn btn-c">Talk to us</Link>
      </div>
    </>
  );
}
