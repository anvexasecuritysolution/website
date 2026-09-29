import CountUp from './CountUp.jsx';
import { useReplay } from '../hooks/useReplay.js';
import { METRICS, ACTIONS } from '../data/content.js';

const TONE = { a: 'var(--amber)', c: 'var(--cyan)', g: 'var(--green)', v: 'var(--violet)' };

// Shown as a single mock app window rather than another accent-outlined
// card, so it reads as a screenshot of the product. Sample data only —
// counters and bars replay from zero every time this scrolls into view.
export default function Dashboard() {
  const [ref, replayKey] = useReplay(0.3);

  return (
    <div className="dash-window" ref={ref}>
      <div className="dash-titlebar">
        <span className="dash-dot r" /><span className="dash-dot y" /><span className="dash-dot g" />
        <span className="dash-url">app.anvexa.in/dashboard</span>
        <span className="dash-live"><i />Live</span>
      </div>
      <div className="dash-body">
        <div className="dash-pane">
          <h4>Executive view</h4>
          <p className="dash-sub">Business owner sees outcomes, not thousands of raw events.</p>
          {METRICS.map((m, i) => (
            <div className="metric" key={m.label} style={{ '--mc': TONE[m.tone] }}>
              <div className="metric-row">
                <span>{m.label}</span>
                <strong><CountUp key={`n-${replayKey}-${m.label}`} value={`${m.value}%`} /></strong>
              </div>
              <div className="bar" role="img" aria-label={`${m.label} ${m.value}%`}>
                <i key={`b-${replayKey}-${m.label}`} style={{ '--w': `${m.value}%`, animationDelay: `${i * 110}ms` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="dash-divider" aria-hidden="true" />
        <div className="dash-pane">
          <h4>Action queue</h4>
          <div className="queue-list">
            {ACTIONS.map((a, i) => (
              <div className="queue-row" key={`${replayKey}-${a.issue}`} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="q-issue">{a.issue}</span>
                <span className="q-owner">{a.owner}</span>
                <span className="pill" style={{ '--tone': TONE[a.tone] }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
