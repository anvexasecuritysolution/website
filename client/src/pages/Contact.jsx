import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../components/Select.jsx';
import Icon from '../components/Icon.jsx';
import Seo from '../components/Seo.jsx';
import { api, ApiError } from '../api/client.js';
import { CONTACT, INDUSTRIES, SERVICES } from '../data/content.js';

const PLAN_TO_SERVICE = { land: SERVICES[0], fix: SERVICES[1], retain: SERVICES[2], expand: SERVICES[3] };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', industry: '',
    service: PLAN_TO_SERVICE[params.get('plan')] || '', message: '', website: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = 'First name is required';
    if (!EMAIL_RE.test(form.email.trim())) err.email = 'Enter a valid work email';
    return err;
  };

  async function onSubmit(e) {
    e.preventDefault();
    setFormError('');
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus('sending');
    try {
      await api.submitLead(form);
      setStatus('sent');
    } catch (ex) {
      setStatus('idle');
      if (ex instanceof ApiError && ex.fields) setErrors(ex.fields);
      setFormError(ex.message);
    }
  }

  const fieldProps = (k) => ({ value: form[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const Err = ({ k }) => (errors[k] ? <span className="err" id={`${k}-err`} role="alert">{errors[k]}</span> : null);

  return (
    <>
      <Seo title="Contact" description="Talk to Anvexa about a one-time assessment or continuous security. Free initial discovery call." />
      <div className="contact-grid">
        <div className="contact-info">
          <div className="label">Talk to Us</div>
          <h1>Your security gap is a conversation away from closing.</h1>
          <p>Whether you need a one-time assessment to understand your exposure, or a continuous security partner for the long term — we start every engagement by understanding your environment first.</p>
          <div className="cdetails">
            <div className="cdetail"><div className="cdetail-icon"><Icon name="mail" size={18} /></div><a href={`mailto:${CONTACT.email}`} style={{ color: 'inherit' }}>{CONTACT.email}</a></div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="phone" size={18} /></div><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{CONTACT.phone}</a></div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="pin" size={18} /></div>India · Remote Engagements Available Nationwide</div>
            <div className="cdetail"><div className="cdetail-icon"><Icon name="clock" size={18} /></div>Response within 1 business day</div>
          </div>
          <div className="free-box"><p><strong>Free initial assessment.</strong> Every new engagement begins with a complimentary discovery call and a brief asset inventory review — no commitment required.</p></div>
        </div>

        <div>
          {status === 'sent' ? (
            <div className="form-ok" role="status">✓ Message received. We'll be in touch within one business day.</div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" type="text" autoComplete="given-name" placeholder="Your first name" required {...fieldProps('firstName')} />
                  <Err k="firstName" />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" type="text" autoComplete="family-name" placeholder="Last name" {...fieldProps('lastName')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@company.com" required {...fieldProps('email')} />
                <Err k="email" />
              </div>
              <div className="field">
                <label htmlFor="company">Company / Organisation</label>
                <input id="company" type="text" autoComplete="organization" placeholder="Company name" {...fieldProps('company')} />
              </div>
              <div className="field">
                <label htmlFor="industry">Industry</label>
                <Select id="industry" label="Industry" value={form.industry} onChange={(v) => setForm((f) => ({ ...f, industry: v }))} options={INDUSTRIES} placeholder="Select your industry" />
              </div>
              <div className="field">
                <label htmlFor="service">What do you need?</label>
                <Select id="service" label="Service" value={form.service} onChange={(v) => setForm((f) => ({ ...f, service: v }))} options={SERVICES} placeholder="Select a service" />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" maxLength={4000} placeholder="Describe your situation, environment, or what you'd like assessed..." {...fieldProps('message')} />
              </div>
              {/* honeypot: hidden from people, tempting to bots */}
              <div className="hp" aria-hidden="true">
                <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
              </div>
              {formError && <div className="form-error" role="alert">{formError}</div>}
              <button type="submit" className="form-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
