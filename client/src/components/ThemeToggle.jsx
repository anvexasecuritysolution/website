import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

// Fixed at the left edge on desktop and inside the header area on mobile.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      data-mode={theme}
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="tt-knob" aria-hidden="true" />
      <span className="tt-icon tt-sun"><Sun size={18} strokeWidth={2} aria-hidden="true" /></span>
      <span className="tt-icon tt-moon"><Moon size={18} strokeWidth={2} aria-hidden="true" /></span>
    </button>
  );
}
