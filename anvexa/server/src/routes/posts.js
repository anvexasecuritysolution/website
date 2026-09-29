import { Router } from 'express';
import { Post } from '../models/Post.js';
import { HttpError } from '../middleware/error.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true })
      .select('-body')
      .sort({ publishedAt: -1 })
      .lean();
    res.json(posts);
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true }).lean();
    if (!post) throw new HttpError(404, 'Article not found.');
    res.json(post);
  } catch (e) { next(e); }
});

export default router;
