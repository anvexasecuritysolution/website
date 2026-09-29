import mongoose from 'mongoose';

export const INDUSTRIES = [
  'Fintech / BFSI',
  'Healthcare / Pharma',
  'E-commerce / Retail',
  'Manufacturing / Logistics',
  'IT / SaaS',
  'Other',
];

export const SERVICES = [
  'Security Assessment (VAPT & Risk)',
  'Continuous Security Operations',
  'Managed MDR + Incident Response',
  'Not sure — need a consultation',
];

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, trim: true, maxlength: 80, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160, index: true },
    company: { type: String, trim: true, maxlength: 160, default: '' },
    industry: { type: String, enum: [...INDUSTRIES, ''], default: '' },
    service: { type: String, enum: [...SERVICES, ''], default: '' },
    message: { type: String, trim: true, maxlength: 4000, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new', index: true },
    ip: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
