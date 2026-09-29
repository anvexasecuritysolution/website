import posts from '../_lib/posts.js';

export default function handler(req, res) {
  const list = [...posts]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map(({ body, ...rest }) => rest);
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json(list);
}
