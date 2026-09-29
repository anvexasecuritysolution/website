import { useEffect, useRef } from 'react';

// Fades an element in once when it scrolls into view. CSS handles reduced-motion.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('in'); io.disconnect(); }
      },
      { threshold: 0.07 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { '--d': `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
