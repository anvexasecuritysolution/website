import { useRef, useState, useEffect } from 'react';
import { RING_NODES } from '../data/content.js';

const CX = 230, CY = 230, R = 190;
const DUR = '56s'; // one full lap
const color = (tone) => (tone === 'a' ? 'var(--amber)' : 'var(--cyan)');

export default function PipelineRing() {
  const svg = useRef(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // pause the orbit while the pointer is over the ring so a step can be read
  const pause = () => svg.current?.pauseAnimations?.();
  const play = () => svg.current?.unpauseAnimations?.();

  return (
    <svg
      ref={svg} onMouseEnter={pause} onMouseLeave={play}
      viewBox="-150 -30 760 520" role="img" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-label="Eight-step security lifecycle: asset discovery, VAPT, remediation, retest, control mapping, monitoring, incident response and evidence"
    >
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: 'var(--cyan)' }} stopOpacity=".08" />
          <stop offset="100%" style={{ stopColor: 'var(--cyan)' }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="210" fill="url(#ringGlow)" />
      <circle cx={CX} cy={CY} r={R} style={{ stroke: 'var(--cyan)' }} strokeOpacity=".22" strokeDasharray="4 8" />
      <circle cx={CX} cy={CY} r="140" style={{ stroke: 'var(--amber)' }} strokeOpacity=".14" strokeDasharray="3 6" />

      {/* orbit: the whole node set travels around the centre */}
      <g>
        {!still && (
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur={DUR} repeatCount="indefinite" />
        )}
        {RING_NODES.map((node, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const x = CX + R * Math.sin(a), y = CY - R * Math.cos(a);
          return (
            <g key={node.label} transform={`translate(${x} ${y})`}>
              {/* counter-rotation keeps every label upright while it orbits */}
              <g>
                {!still && (
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur={DUR} repeatCount="indefinite" />
                )}
                <g className="ring-node">
                  <title>{`${i + 1}. ${node.label}`}</title>
                  <circle r="22" style={{ fill: 'var(--ink2)', stroke: color(node.tone) }} strokeWidth="1.75" />
                  <text y="6" textAnchor="middle" fontSize="16" fontWeight="700" style={{ fill: color(node.tone) }} fontFamily="Roboto Slab, serif">{i + 1}</text>
                  <text
                    y="46" textAnchor="middle" fontSize="18" fontWeight="500" fontFamily="Roboto Slab, serif"
                    style={{ fill: node.tone === 'a' ? 'var(--amber)' : 'var(--text)', stroke: 'var(--ink)' }} strokeWidth="5" paintOrder="stroke" strokeLinejoin="round"
                  >{node.label}</text>
                </g>
              </g>
            </g>
          );
        })}
      </g>

      <text x={CX} y="212" textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: 'var(--text)' }} fontFamily="Roboto Slab, serif">Find · Fix</text>
      <text x={CX} y="238" textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: 'var(--text)' }} fontFamily="Roboto Slab, serif">Verify · Monitor</text>
      <text x={CX} y="264" textAnchor="middle" fontSize="20" fontWeight="800" style={{ fill: 'var(--cyan)' }} fontFamily="Roboto Slab, serif">Prove</text>
    </svg>
  );
}
