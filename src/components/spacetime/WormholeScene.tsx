// Wormhole embedding diagram — Morris-Thorne wormhole
//
// A spatial slice (t = const) of the Schwarzschild metric embedded in flat 3D space.
// The embedding surface satisfies: r = b₀ + z² / 4
// where b₀ is the throat radius and z is the height in the embedding space.
//
// This is NOT how wormholes look in spacetime — it's how the *shape of space itself*
// looks when you embed it in one extra dimension so we can visualize its curvature.
// The two funnel mouths are two separate regions of space (or two universes)
// connected through the throat.

import { useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { DoubleSide } from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const THROAT = 0.7   // b₀ — minimum radius at the throat
const Z_MAX  = 4.5   // how far each funnel extends
const N      = 80    // curve resolution

export function WormholeScene() {
  const { upper, lower } = useMemo(() => {
    const upper: THREE.Vector2[] = []
    const lower: THREE.Vector2[] = []

    for (let i = 0; i <= N; i++) {
      const z = (i / N) * Z_MAX
      const r = THROAT + (z * z) / 4   // Morris-Thorne embedding
      upper.push(new THREE.Vector2(r, z))
      lower.push(new THREE.Vector2(r, -z))
    }

    return { upper, lower }
  }, [])

  return (
    <>
      {/* Universe 1 — upper funnel, indigo */}
      <mesh>
        <latheGeometry args={[upper, 64]} />
        <meshPhysicalMaterial
          color="#818cf8"
          transparent opacity={0.13}
          side={DoubleSide}
          emissive="#818cf8"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh>
        <latheGeometry args={[upper, 36]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Universe 2 — lower funnel, fuchsia */}
      <mesh>
        <latheGeometry args={[lower, 64]} />
        <meshPhysicalMaterial
          color="#e879f9"
          transparent opacity={0.13}
          side={DoubleSide}
          emissive="#e879f9"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh>
        <latheGeometry args={[lower, 36]} />
        <meshBasicMaterial color="#e879f9" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Throat ring — the narrowest point */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[THROAT, 0.03, 16, 80]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} />
      </mesh>

      {/* Labels */}
      <Html position={[0, 5, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#818cf8', fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', padding: '3px 10px', background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.3)', borderRadius: 6 }}>
          Universe 1
        </div>
      </Html>

      <Html position={[0, -5, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#e879f9', fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', padding: '3px 10px', background: 'rgba(232,121,249,0.12)', border: '1px solid rgba(232,121,249,0.3)', borderRadius: 6 }}>
          Universe 2
        </div>
      </Html>

      <Html position={[THROAT + 0.4, 0.15, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', padding: '2px 7px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 5 }}>
          Throat  r = {THROAT}
        </div>
      </Html>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.5} intensity={1.5} />
      </EffectComposer>
    </>
  )
}
