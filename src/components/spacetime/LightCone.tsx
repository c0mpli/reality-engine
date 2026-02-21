// The light cone surface: all events reachable by light from the origin
// Surface equation: x² + y² = t²  →  radius = t at every moment
//
// Future cone: t > 0 (light spreading forward in time)
// Past cone:   t < 0 (light that could have reached origin)

import { DoubleSide } from 'three'

interface LightConeProps {
  direction: 'future' | 'past'
  height?: number
}

export function LightCone({ direction, height = 4 }: LightConeProps) {
  const sign = direction === 'future' ? 1 : -1
  const color = direction === 'future' ? '#818cf8' : '#e879f9' // brighter indigo and bright fuchsia

  return (
    <group>
      {/* Outer translucent shell */}
      <mesh
        position={[0, sign * height / 2, 0]}
        rotation={direction === 'future' ? [Math.PI, 0, 0] : [0, 0, 0]}
      >
        <coneGeometry args={[height, height, 64, 1, true]} />
        <meshPhysicalMaterial
          color={color}
          transparent={true}
          opacity={0.15} // Increased opacity
          side={DoubleSide}
          roughness={0.2}
          metalness={0.4} // Reduced metalness to stop it from going black in dark scene
          clearcoat={0.5}
          emissive={color}
          emissiveIntensity={0.2} // Added emissive glow
        />
      </mesh>

      {/* Inner delicate wireframe grid */}
      <mesh
        position={[0, sign * height / 2, 0]}
        rotation={direction === 'future' ? [Math.PI, 0, 0] : [0, 0, 0]}
      >
        <coneGeometry args={[height, height, 32, 8, true]} />
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.4} // Increased wireframe brightness
        />
      </mesh>
    </group>
  )
}
