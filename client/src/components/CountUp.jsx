import { useEffect, useState } from 'react';

// Animates 0 → value on mount. Parents remount this (via `key`) to replay
// the count every time the element re-enters the viewport, so it always
// starts from zero — on first load and on every later visit/scroll-back.
export default function CountUp({ value, duration = 1200 }) {
  const m = String(value).match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(target); return undefined; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]); // eslint-disable-line

  return <>{m ? n : value}{m ? suffix : ''}</>;
}
