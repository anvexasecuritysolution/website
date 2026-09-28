import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Fully styled dropdown so the option list is always dark and readable on every OS/browser.
export default function Select({ id, label, value, onChange, options, placeholder = 'Select…' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef(null);
  const listId = useId();

  useEffect(() => {
    const away = (e) => root.current && !root.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, []);

  const choose = (v) => { onChange(v); setOpen(false); };

  function onKey(e) {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      if (!open) { setOpen(true); setActive(Math.max(options.indexOf(value), 0)); return; }
      setActive((i) => (e.key === 'ArrowDown' ? (i + 1) % options.length : (i - 1 + options.length) % options.length));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && active >= 0) choose(options[active]); else setOpen(true);
    } else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div className="dd" ref={root}>
      <button
        type="button" id={id} className={`dd-btn${value ? '' : ' empty'}`}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-label={label}
        onClick={() => setOpen((o) => !o)} onKeyDown={onKey}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={18} aria-hidden="true" className={open ? 'flip' : ''} />
      </button>
      {open && (
        <ul className="dd-list" id={listId} role="listbox" aria-labelledby={id}>
          {options.map((o, i) => (
            <li
              key={o} role="option" aria-selected={o === value}
              className={`dd-opt${i === active ? ' act' : ''}${o === value ? ' sel' : ''}`}
              onMouseEnter={() => setActive(i)} onMouseDown={(e) => { e.preventDefault(); choose(o); }}
            >
              <span>{o}</span>{o === value && <Check size={16} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
