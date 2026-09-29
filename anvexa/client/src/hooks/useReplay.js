import { useEffect, useRef, useState } from 'react';

// Returns [ref, replayKey]. replayKey increments every time the element
// enters the viewport (including the very first time), so anything keyed
// off it — a counter, a progress bar — restarts from zero on every visit.
export function useReplay(threshold = 0.35) {
  const ref = useRef(null);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setReplayKey(1); return undefined; }
    let wasOut = true;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && wasOut) { wasOut = false; setReplayKey((k) => k + 1); }
      if (!entry.isIntersecting) wasOut = true;
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, replayKey];
}
