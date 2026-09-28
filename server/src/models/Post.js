import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    emoji: { type: String, default: '🛡️' },
    readMinutes: { type: Number, default: 5 },
    body: { type: [String], default: [] }, // one entry per paragraph
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
