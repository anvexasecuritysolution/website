import '../config/env.js';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import posts from '../../../client/shared/posts.js';
import { seedOptions, seedPosts, seedAdmin } from './operations.js';

const options = seedOptions(process.argv.slice(2));
await connectDB();
try {
  await seedPosts(Post, posts, options);
  console.log(`Seeded ${posts.length} posts (${options.updatePosts ? 'updated existing articles' : 'preserved existing articles'})`);
  const email = (process.env.ADMIN_EMAIL || 'admin@anvexa.in').toLowerCase();
  const result = await seedAdmin(User, email, process.env.ADMIN_PASSWORD, options);
  console.log(result === 'skipped' ? 'Skipped admin: set ADMIN_PASSWORD (12+ chars).' : `Admin ${result}: ${email}`);
} finally {
  await mongoose.disconnect();
}
