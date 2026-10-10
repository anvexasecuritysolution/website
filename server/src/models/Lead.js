import mongoose from 'mongoose';
import { INDUSTRIES, SERVICES, isValidPhone } from '../../../client/shared/leads.js';
export { INDUSTRIES, SERVICES };

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, trim: true, maxlength: 80, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160, index: true },
    phone: { type: String, required: true, trim: true, maxlength: 32, validate: { validator: isValidPhone, message: 'Enter a valid phone number.' } },
    company: { type: String, trim: true, maxlength: 160, default: '' },
    industry: { type: String, enum: [...INDUSTRIES, ''], default: '' },
    service: { type: String, enum: [...SERVICES, ''], default: '' },
    message: { type: String, trim: true, maxlength: 4000, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new', index: true },
    ip: { type: String, default: '' },
    githubBackup: {
      type: new mongoose.Schema({
        state: { type: String, enum: ['pending', 'saved'], required: true },
        nextAttemptAt: { type: Date, required: true },
        attempts: { type: Number, default: 0 },
      }, { _id: false }),
      select: false,
    },
  },
  { timestamps: true }
);

leadSchema.index({ 'githubBackup.state': 1, 'githubBackup.nextAttemptAt': 1 });

export const Lead = mongoose.model('Lead', leadSchema);
