import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Select from '../components/Select.jsx';
import Icon from '../components/Icon.jsx';
import Seo from '../components/Seo.jsx';
import { api, ApiError } from '../api/client.js';
import { CONTACT, INDUSTRIES, SERVICES } from '../data/content.js';
import { validateLead, DEVELOPMENT_SERVICE } from '../../shared/leads.js';

const PLAN_TO_SERVICE = { land: SERVICES[0], retain: SERVICES[1], expand: SERVICES[2], development: DEVELOPMENT_SERVICE };
const SERVICE_LABELS = {
  [SERVICES[0]]: 'Security Assessment',
  [SERVICES[1]]: 'Recurring Security Reviews',
  [SERVICES[2]]: 'Monitoring or Incident Support (By Agreement)',
  [DEVELOPMENT_SERVICE]: 'Development Support',
  [SERVICES[4]]: 'Help Choosing a Service',
};
const serviceLabel = (value) => SERVICE_LABELS[value] || value;

function focusInvalidField(fields) {
  const field = document.getElementById(Object.keys(fields)[0]);
  field?.closest('details')?.setAttribute('open', '');
  field?.focus();
}

export default function Contact() {
  const [params] = useSearchParams();
  const emptyForm = () => ({
    firstName: '', lastName: '', email: '', phone: '', company: '', industry: '',
    service: PLAN_TO_SERVICE[params.get('plan')] || '', message: '', website: '',
  });
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (e) => {
    const value = e.target.value;
    setStatus((st) => (st === 'sent' ? 'idle' : st)); // hide the success note once they start a new message
    setForm((f) => ({ ...f, [k]: value }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      const message = validateLead({ ...form, [k]: value }).errors[k];
      if (message) next[k] = message; else delete next[k];
      return next;
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    setFormError('');
    setStatus('idle');
    const err = validateLead(form).errors;
    setErrors(err);
    if (Object.keys(err).length) {
      focusInvalidField(err);
      return;
    }

    setStatus('sending');
    try {
      await api.submitLead(form);
      setForm(emptyForm()); // clear the fields; the form stays on screen
      setStatus('sent');
    } catch (ex) {
      setStatus('idle');
      if (ex instanceof ApiError && ex.fields) {
        setErrors(ex.fields);
        focusInvalidField(ex.fields);
      }
      setFormError(ex.message);
    }
  }

  const fieldProps = (k) => ({ value: form[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const Err = ({ k }) => (errors[k] ? <span className="err" id={`${k}-err`} role="alert">{errors[k]}</span> : null);

  return (
    <>
      <Seo title="Contact" description="Contact Anvexa about security assessments, ongoing monitoring, response support or development requirements. The first call is free." />
      <div className="contact-grid">
        <div className="contact-info">
          <div className="label">Contact</div>
          <h1><TitleCase>Discuss Your Requirements.</TitleCase></h1>
          <p><Emphasis>Tell us what needs testing or where you need support. We’ll follow up to agree the scope and next steps.</Emphasis></p>
          <p className="contact-development-note"><Emphasis>For development work, choose Development Support. Anvexa will coordinate your enquiry with our partner.</Emphasis></p>
          <div className="cdetails">
            <div className="cdetail"><div className="cdetail-icon"><Icon name="mail" size={18} /></div><a href={`mailto:${CONTACT.email}`} style={{ color: 'inherit' }}>{CONTACT.email}</a></div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="phone" size={18} /></div><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{CONTACT.phone}</a></div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="pin" size={18} /></div>{CONTACT.address}</div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="clock" size={18} /></div>We reply within one business day</div>
          </div>
          <div className="free-box"><p><strong>The first call is free.</strong> We'll talk through your setup and take a quick look at your asset list. You don't have to commit to anything.</p></div>
        </div>

        <div>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" type="text" maxLength={80} autoComplete="given-name" placeholder="Your first name" required {...fieldProps('firstName')} />
                  <Err k="firstName" />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" type="text" maxLength={80} autoComplete="family-name" placeholder="Last name" {...fieldProps('lastName')} />
                  <Err k="lastName" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input id="email" type="email" maxLength={160} autoComplete="email" placeholder="you@company.com" required {...fieldProps('email')} />
                <Err k="email" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" inputMode="tel" maxLength={32} autoComplete="tel" placeholder="e.g. +91 98765 43210" required {...fieldProps('phone')} />
                <Err k="phone" />
              </div>
              <div className="field">
                <label htmlFor="company">Company / Organisation</label>
                <input id="company" type="text" maxLength={160} autoComplete="organization" placeholder="Company name" {...fieldProps('company')} />
                <Err k="company" />
              </div>
              <div className="field">
                <label htmlFor="industry">Industry</label>
                <Select id="industry" label="Industry" value={form.industry} onChange={(v) => setForm((f) => ({ ...f, industry: v }))} options={INDUSTRIES} placeholder="Select your industry" />
                <Err k="industry" />
              </div>
              <div className="field">
                <label htmlFor="service">What do you need?</label>
                <Select id="service" label="Service" value={form.service} onChange={(v) => setForm((f) => ({ ...f, service: v }))} options={SERVICES} getOptionLabel={serviceLabel} placeholder="Select a service" />
                <Err k="service" />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" maxLength={4000} placeholder="Describe your security or development requirements and any target dates. Do not include passwords or confidential findings." {...fieldProps('message')} />
                <Err k="message" />
              </div>
              {/* honeypot: hidden from people, tempting to bots */}
              <div className="hp" aria-hidden="true">
                <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
              </div>
              <p className="form-consent"><Emphasis>By sending this message you agree to our <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Service</Link>.</Emphasis></p>
              <button type="submit" className="form-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {/* result message sits directly below the submit button */}
              {status === 'sent' && <div className="form-ok" role="status">✓ Thanks, we've got your message and will reply within one business day.</div>}
              {formError && <div className="form-error" role="alert">{formError}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
