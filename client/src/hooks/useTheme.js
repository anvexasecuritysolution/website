import { useCallback, useSyncExternalStore } from 'react';
import { persistTheme } from '../privacy/consent.js';

const root = () => document.documentElement;
const read = () => (root().dataset.theme === 'light' ? 'light' : 'dark');

function subscribe(cb) {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}

export function applyTheme(t) {
  const el = root();
  el.classList.add('theme-anim');
  el.dataset.theme = t;
  persistTheme(t);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#F3F7FB' : '#07111F');
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', t);
  window.setTimeout(() => el.classList.remove('theme-anim'), 500);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'dark');
  const toggle = useCallback(() => applyTheme(read() === 'dark' ? 'light' : 'dark'), []);
  return { theme, toggle };
}
