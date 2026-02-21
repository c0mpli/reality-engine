import { Html } from '@react-three/drei'
import type { SpacetimeEvent } from '../../types'
import { classifyEvent, spacetimeInterval, CAUSAL_COLORS } from '../../types'

interface EventMarkerProps {
  event: SpacetimeEvent
}

export function EventMarker({ event }: EventMarkerProps) {
  const type = classifyEvent(event)
  const color = CAUSAL_COLORS[type]
  const s2 = spacetimeInterval(event)

  // In our scene: Three.js Y = time t, Three.js X = space x, Three.js Z = space y
  return (
    <group position={[event.x, event.t, event.y]}>
      {/* The event itself — a glowing emissive sphere */}
      <mesh>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Outer subtle glow */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent={true}
          opacity={0.15}
        />
      </mesh>

      {/* Floating label showing coordinates and interval */}
      <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#e4e4e7', // zinc-200
          fontSize: 10,
          fontFamily: 'monospace',
          background: 'rgba(24, 24, 27, 0.85)', // zinc-900 with high opacity
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `0 4px 20px -2px ${color}33, 0 0 0 1px rgba(0,0,0,0.5)`,
          whiteSpace: 'nowrap',
          lineHeight: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ color: '#a1a1aa' }}>Coords</span>
            <span>t={event.t.toFixed(1)} x={event.x.toFixed(1)} y={event.y.toFixed(1)}</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '2px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#a1a1aa' }}>Interval</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>s²={s2.toFixed(1)}</span>
              <span style={{ 
                color,
                fontWeight: 600,
                fontSize: 9, 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: `${color}15`,
                padding: '1px 4px',
                borderRadius: '4px'
              }}>{type}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
