import posts from '../_lib/posts.js';

export default function handler(req, res) {
  const post = posts.find((p) => p.slug === String(req.query.slug).toLowerCase());
  if (!post) return res.status(404).json({ message: 'Article not found.' });
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json(post);
}
