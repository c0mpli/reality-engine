// Region labels for the three causal zones:
//   FUTURE  — inside the forward light cone (t > 0, s² > 0)
//   PAST    — inside the backward light cone (t < 0, s² > 0)
//   ELSEWHERE — outside both cones (spacelike, s² < 0)

import { Html } from '@react-three/drei'

function RegionTag({ color, label }: { color: string; label: string }) {
  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
      background: `${color}18`,
      border: `1px solid ${color}40`,
      padding: '3px 9px',
      borderRadius: 6,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </div>
  )
}

export function RegionLabels() {
  return (
    <>
      {/* Future cone interior */}
      <Html position={[0.5, 3.0, 0.5]} style={{ pointerEvents: 'none' }}>
        <RegionTag color="#818cf8" label="Future" />
      </Html>

      {/* Past cone interior */}
      <Html position={[0.5, -3.0, 0.5]} style={{ pointerEvents: 'none' }}>
        <RegionTag color="#e879f9" label="Past" />
      </Html>

      {/* Spacelike exterior — left and right */}
      <Html position={[3.5, 0.2, 0]} style={{ pointerEvents: 'none' }}>
        <RegionTag color="#e11d48" label="Elsewhere" />
      </Html>

      <Html position={[-3.5, 0.2, 0]} style={{ pointerEvents: 'none' }}>
        <RegionTag color="#e11d48" label="Elsewhere" />
      </Html>
    </>
  )
}
