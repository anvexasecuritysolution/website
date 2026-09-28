import { useEffect, useRef, useState } from 'react';

// "84%" -> counts 0→84 and keeps the "%" once it scrolls into view.
export default function CountUp({ value, duration = 1200 }) {
  const m = String(value).match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : '';
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!m) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]); // eslint-disable-line

  return <span ref={ref}>{m ? n : value}{m ? suffix : ''}</span>;
}
