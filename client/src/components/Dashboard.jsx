import { METRICS, ACTIONS } from '../data/content.js';

const TONE = { a: 'var(--amber)', c: 'var(--cyan)', g: '#4ADE80', v: '#9B7FFF' };

// Illustrative example of the customer-facing view — clearly labelled as sample data.
export default function Dashboard() {
  return (
    <div className="dash">
      <div className="dash-card">
        <h4>Executive view</h4>
        <p className="dash-sub">Business owner sees outcomes, not thousands of raw events.</p>
        {METRICS.map((m) => (
          <div className="metric" key={m.label}>
            <div className="metric-row"><span>{m.label}</span><strong>{m.value}%</strong></div>
            <div className="bar" role="img" aria-label={`${m.label} ${m.value}%`}><i style={{ width: `${m.value}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="dash-card">
        <h4>Action queue</h4>
        <div className="table-wrap" style={{ border: 0, marginTop: '.75rem' }}>
          <table className="queue">
            <thead><tr><th>Issue</th><th>Owner</th><th>Status</th></tr></thead>
            <tbody>
              {ACTIONS.map((a) => (
                <tr key={a.issue}>
                  <td>{a.issue}</td>
                  <td>{a.owner}</td>
                  <td><span className="pill" style={{ '--tone': TONE[a.tone] }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
