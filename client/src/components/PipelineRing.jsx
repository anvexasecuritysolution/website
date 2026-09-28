import { RING_NODES } from '../data/content.js';

const CX = 230, CY = 230, R = 190;
const color = (tone) => (tone === 'a' ? '#F4A523' : '#00D4E8');

export default function PipelineRing() {
  return (
    <svg viewBox="-150 -30 760 520" role="img" aria-label="Eight-step security lifecycle: discovery, scan, risk, remediation, re-test, compliance, monitoring and evidence" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4E8" stopOpacity=".08" />
          <stop offset="100%" stopColor="#00D4E8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="210" fill="url(#ringGlow)" />
      <g className="ring-spin">
        <circle cx={CX} cy={CY} r={R} stroke="#00D4E8" strokeOpacity=".12" strokeDasharray="4 8" />
        <circle cx={CX} cy={CY} r="140" stroke="#F4A523" strokeOpacity=".10" strokeDasharray="3 6" />
      </g>

      {RING_NODES.map((node, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const s = Math.sin(a), c = Math.cos(a);
        const x = CX + R * s, y = CY - R * c;
        const lx = CX + (R + 36) * s, ly = CY - (R + 40) * c + 4;
        const anchor = s > 0.3 ? 'start' : s < -0.3 ? 'end' : 'middle';
        const lyAdj = Math.abs(s) <= 0.3 ? ly + (c > 0 ? -6 : 8) : ly;
        return (
          <g key={node.label} className="ring-node"><title>{`${i + 1}. ${node.label}`}</title>
            <circle cx={x} cy={y} r="20" fill="#0E1F35" stroke={color(node.tone)} strokeWidth="1.5" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fontWeight="600" fill={color(node.tone)} fontFamily="DM Sans, sans-serif">{i + 1}</text>
            <text x={anchor === 'middle' ? x : lx} y={anchor === 'middle' ? lyAdj : ly} textAnchor={anchor} fontSize="18" fill={node.tone === 'a' ? '#F4A523' : '#6A8AAA'} fontFamily="DM Sans, sans-serif">{node.label}</text>
          </g>
        );
      })}

      <text x={CX} y="212" textAnchor="middle" fontSize="20" fontWeight="700" fill="#E0EAF4" fontFamily="Syne, sans-serif">Find · Fix</text>
      <text x={CX} y="236" textAnchor="middle" fontSize="20" fontWeight="700" fill="#E0EAF4" fontFamily="Syne, sans-serif">Verify · Monitor</text>
      <text x={CX} y="260" textAnchor="middle" fontSize="20" fontWeight="800" fill="#00D4E8" fontFamily="Syne, sans-serif">Prove</text>
    </svg>
  );
}
