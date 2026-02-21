// Lorentz transformation diagram — 1+1D Minkowski spacetime
//
// Coordinate convention:
//   X-axis (right) = space x
//   Y-axis (up)    = time t
//
// The S' frame moves at velocity β relative to S.
// The t' axis tilts toward the light cone: direction (β, 1) in (x, t).
// The x' axis tilts symmetrically:          direction (1, β) in (x, t).
//
// Boost formulas (c = 1):
//   t' = γ(t − βx)
//   x' = γ(x − βt)
//   γ  = 1 / √(1 − β²)
//
// Invariant hyperbolas t²−x²=k show that s² is preserved under any boost.

import { useMemo } from 'react'
import { Line, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { ThreeEvent } from '@react-three/fiber'

const EXTENT = 5

// Compute points on t²−x²=k using hyperbolic parameterization (no singularities)
function hyperbola(
  k: number,
  branch: 'future' | 'past' | 'right' | 'left',
  n = 80
): [number, number, number][] {
  const r = Math.sqrt(Math.abs(k))
  if (r === 0 || EXTENT / r < 1) return []
  const thetaMax = Math.acosh(EXTENT / r)
  const pts: [number, number, number][] = []

  if (k > 0 && branch === 'future') {
    for (let i = 0; i <= n; i++) {
      const θ = -thetaMax + (2 * thetaMax * i) / n
      pts.push([r * Math.sinh(θ), r * Math.cosh(θ), 0])
    }
  } else if (k > 0 && branch === 'past') {
    for (let i = 0; i <= n; i++) {
      const θ = -thetaMax + (2 * thetaMax * i) / n
      pts.push([r * Math.sinh(θ), -r * Math.cosh(θ), 0])
    }
  } else if (k < 0 && branch === 'right') {
    for (let i = 0; i <= n; i++) {
      const θ = -thetaMax + (2 * thetaMax * i) / n
      pts.push([r * Math.cosh(θ), r * Math.sinh(θ), 0])
    }
  } else if (k < 0 && branch === 'left') {
    for (let i = 0; i <= n; i++) {
      const θ = -thetaMax + (2 * thetaMax * i) / n
      pts.push([-r * Math.cosh(θ), r * Math.sinh(θ), 0])
    }
  }
  return pts
}

// Scale direction (dx, dy) so the endpoint hits the ±EXTENT boundary
function extendToExtent(dx: number, dy: number): [number, number] {
  if (dx === 0 && dy === 0) return [0, 0]
  const sx = dx !== 0 ? EXTENT / Math.abs(dx) : Infinity
  const sy = dy !== 0 ? EXTENT / Math.abs(dy) : Infinity
  const s = Math.min(sx, sy)
  return [dx * s, dy * s]
}

function Grid() {
  const lines = []
  for (let i = -EXTENT; i <= EXTENT; i++) {
    if (i === 0) continue
    lines.push(
      <Line key={`h${i}`} points={[[-EXTENT, i, 0], [EXTENT, i, 0]]} color="#27272a" lineWidth={1} />,
      <Line key={`v${i}`} points={[[i, -EXTENT, 0], [i, EXTENT, 0]]} color="#27272a" lineWidth={1} />
    )
  }
  return <>{lines}</>
}

function SAxes() {
  const ticks = []
  for (let i = -EXTENT; i <= EXTENT; i++) {
    if (i === 0) continue
    ticks.push(
      <Line key={`tx${i}`} points={[[i, -0.12, 0], [i, 0.12, 0]]} color="#52525b" lineWidth={1.5} />,
      <Line key={`ty${i}`} points={[[-0.12, i, 0], [0.12, i, 0]]} color="#52525b" lineWidth={1.5} />
    )
  }
  return (
    <>
      <Line points={[[-EXTENT, 0, 0], [EXTENT, 0, 0]]} color="#52525b" lineWidth={2} />
      <Line points={[[0, -EXTENT, 0], [0, EXTENT, 0]]} color="#52525b" lineWidth={2} />
      <Text position={[EXTENT + 0.4, 0.1, 0]} fontSize={0.3} color="#71717a">x</Text>
      <Text position={[0.15, EXTENT + 0.35, 0]} fontSize={0.3} color="#71717a">t</Text>
      {ticks}
    </>
  )
}

function LightCone() {
  return (
    <>
      <Line points={[[-EXTENT, -EXTENT, 0], [EXTENT, EXTENT, 0]]} color="#f59e0b" lineWidth={2.5} />
      <Line points={[[-EXTENT, EXTENT, 0], [EXTENT, -EXTENT, 0]]} color="#f59e0b" lineWidth={2.5} />
    </>
  )
}

function Hyperbolas() {
  const curves = useMemo(() => {
    const result: { pts: [number, number, number][]; color: string; key: string }[] = []
    for (const k of [1, 2, 3]) {
      const f = hyperbola(k, 'future')
      const p = hyperbola(k, 'past')
      if (f.length >= 2) result.push({ pts: f, color: '#10b981', key: `hf${k}` })
      if (p.length >= 2) result.push({ pts: p, color: '#10b981', key: `hp${k}` })
    }
    for (const k of [-1, -2, -3]) {
      const r = hyperbola(k, 'right')
      const l = hyperbola(k, 'left')
      if (r.length >= 2) result.push({ pts: r, color: '#e11d48', key: `hr${k}` })
      if (l.length >= 2) result.push({ pts: l, color: '#e11d48', key: `hl${k}` })
    }
    return result
  }, [])

  return (
    <>
      {curves.map(({ pts, color, key }) => (
        <Line key={key} points={pts} color={color} lineWidth={1} transparent opacity={0.22} />
      ))}
    </>
  )
}

interface SprimeAxesProps {
  beta: number
  gamma: number
}

function SprimeAxes({ beta, gamma }: SprimeAxesProps) {
  // t' axis direction: (β, 1) in (x, t)
  // x' axis direction: (1, β) in (x, t)
  const [tpX, tpY] = extendToExtent(beta, 1)
  const [xpX, xpY] = extendToExtent(1, beta)

  // Tick marks on S' axes
  // t' tick at t'=n: S frame coords = (β·γ·n, γ·n)
  // x' tick at x'=n: S frame coords = (γ·n, β·γ·n)
  const norm = Math.sqrt(1 + beta * beta)
  const tpPerpX = 1 / norm     // perpendicular to t' axis
  const tpPerpY = -beta / norm
  const xpPerpX = -beta / norm // perpendicular to x' axis
  const xpPerpY = 1 / norm
  const tickSize = 0.1
  const ticks = []

  for (let n = 1; n <= 5; n++) {
    // t' ticks (positive and negative)
    for (const sign of [1, -1]) {
      const cx = sign * beta * gamma * n
      const cy = sign * gamma * n
      if (Math.abs(cx) <= EXTENT && Math.abs(cy) <= EXTENT) {
        ticks.push(
          <Line key={`tpt${sign}${n}`}
            points={[
              [cx - tickSize * tpPerpX, cy - tickSize * tpPerpY, 0],
              [cx + tickSize * tpPerpX, cy + tickSize * tpPerpY, 0],
            ]}
            color="#818cf8" lineWidth={1.5}
          />
        )
      }
    }
    // x' ticks (positive only — right side)
    const cx = gamma * n
    const cy = beta * gamma * n
    if (Math.abs(cx) <= EXTENT && Math.abs(cy) <= EXTENT) {
      ticks.push(
        <Line key={`xpt${n}`}
          points={[
            [cx - tickSize * xpPerpX, cy - tickSize * xpPerpY, 0],
            [cx + tickSize * xpPerpX, cy + tickSize * xpPerpY, 0],
          ]}
          color="#e879f9" lineWidth={1.5}
        />
      )
    }
  }

  return (
    <>
      <Line points={[[-tpX, -tpY, 0], [tpX, tpY, 0]]} color="#818cf8" lineWidth={2.5} />
      <Text position={[tpX + 0.15, tpY + 0.25, 0]} fontSize={0.27} color="#818cf8">t′</Text>

      <Line points={[[-xpX, -xpY, 0], [xpX, xpY, 0]]} color="#e879f9" lineWidth={2.5} />
      <Text position={[xpX + 0.25, xpY + 0.1, 0]} fontSize={0.27} color="#e879f9">x′</Text>

      {ticks}
    </>
  )
}

interface EventMarkerProps {
  event: { t: number; x: number }
  beta: number
}

function EventMarker({ event, beta }: EventMarkerProps) {
  const { t, x } = event
  const denom = 1 - beta * beta

  // Projection from E onto t' axis (line parallel to x' axis)
  // x' axis direction (1, β), t' axis line: x = β·t (i.e. t = x/β)
  // Line from E parallel to x' (dir (1,β)): (x+λ, t+λβ)
  // On t' axis: x+λ = β(t+λβ) → λ = (βt−x)/denom
  const λ_tp = denom !== 0 ? (beta * t - x) / denom : 0
  const tp_proj: [number, number, number] = [x + λ_tp, t + λ_tp * beta, 0]

  // Projection from E onto x' axis (line parallel to t' axis)
  // t' axis direction (β,1), x' axis line: t = β·x
  // Line from E parallel to t' (dir (β,1)): (x+λβ, t+λ)
  // On x' axis: t+λ = β(x+λβ) → λ = (βx−t)/denom
  const λ_xp = denom !== 0 ? (beta * x - t) / denom : 0
  const xp_proj: [number, number, number] = [x + λ_xp * beta, t + λ_xp, 0]

  const ev: [number, number, number] = [x, t, 0]

  return (
    <>
      {/* S-frame coord lines (faint) — horizontal to t-axis, vertical to x-axis */}
      <Line points={[[0, t, 0], ev]} color="#52525b" lineWidth={1} transparent opacity={0.7} />
      <Line points={[[x, 0, 0], ev]} color="#52525b" lineWidth={1} transparent opacity={0.7} />

      {/* S'-frame coord lines — parallel projections onto S' axes */}
      <Line points={[ev, tp_proj]} color="#818cf8" lineWidth={1.5} transparent opacity={0.55} />
      <Line points={[ev, xp_proj]} color="#e879f9" lineWidth={1.5} transparent opacity={0.55} />

      {/* Dot markers at projection endpoints */}
      <mesh position={tp_proj}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#818cf8" toneMapped={false} />
      </mesh>
      <mesh position={xp_proj}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#e879f9" toneMapped={false} />
      </mesh>

      {/* Event dot */}
      <mesh position={ev}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <Text position={[x + 0.28, t + 0.2, 0]} fontSize={0.24} color="#ffffff">E</Text>
    </>
  )
}

export interface LorentzSceneProps {
  beta: number
  event: { t: number; x: number }
  onPlace: (t: number, x: number) => void
}

export function LorentzScene({ beta, event, onPlace }: LorentzSceneProps) {
  const gamma = useMemo(() => 1 / Math.sqrt(1 - beta * beta), [beta])

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()
    const rawX = e.point.x
    const rawT = e.point.y
    // Clamp to scene extent with margin
    const x = Math.max(-EXTENT + 0.2, Math.min(EXTENT - 0.2, rawX))
    const t = Math.max(-EXTENT + 0.2, Math.min(EXTENT - 0.2, rawT))
    onPlace(t, x)
  }

  return (
    <>
      <Grid />
      <SAxes />
      <LightCone />
      <Hyperbolas />
      <SprimeAxes beta={beta} gamma={gamma} />
      <EventMarker event={event} beta={beta} />

      {/* Transparent click plane behind all geometry */}
      <mesh onClick={handleClick} position={[0, 0, -0.5]}>
        <planeGeometry args={[EXTENT * 2, EXTENT * 2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.5} intensity={1.2} />
      </EffectComposer>
    </>
  )
}
