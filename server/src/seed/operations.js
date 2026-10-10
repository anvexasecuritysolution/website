export function seedOptions(args) {
  const allowed = ['--update-posts', '--prune-posts', '--reset-admin-password'];
  if (args.some((arg) => !allowed.includes(arg))) throw new Error(`Supported options: ${allowed.join(', ')}`);
  return { updatePosts: args.includes('--update-posts'), prunePosts: args.includes('--prune-posts'), resetAdminPassword: args.includes('--reset-admin-password') };
}

export async function seedPosts(Post, posts, options) {
  for (const post of posts) {
    await Post.updateOne({ slug: post.slug }, { [options.updatePosts ? '$set' : '$setOnInsert']: post }, { upsert: true });
  }
  if (options.prunePosts) await Post.deleteMany({ slug: { $nin: posts.map((post) => post.slug) } });
}

export async function seedAdmin(User, email, password, options) {
  const exists = await User.exists({ email });
  if (exists && !options.resetAdminPassword) return 'preserved';
  if (!password || password.length < 12) return 'skipped';
  const passwordHash = await User.hash(password);
  await User.updateOne({ email }, { [options.resetAdminPassword ? '$set' : '$setOnInsert']: { email, passwordHash } }, { upsert: true });
  return exists ? 'reset' : 'created';
}
