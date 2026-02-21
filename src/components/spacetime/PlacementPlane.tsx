import { useRef } from 'react'
import type { ThreeEvent } from "@react-three/fiber"
import type { SpacetimeEvent } from "../../types"

interface PlacementPlaneProps {
  tLevel: number
  onPlace: (event: SpacetimeEvent) => void
}

export function PlacementPlane({ tLevel, onPlace }: PlacementPlaneProps) {
  const downPos = useRef<{ x: number; y: number } | null>(null)

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    downPos.current = { x: e.clientX, y: e.clientY }
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    if (!downPos.current) return
    const dx = e.clientX - downPos.current.x
    const dy = e.clientY - downPos.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Only place if pointer barely moved — distinguish click from orbit drag
    if (dist < 5) {
      e.stopPropagation()
      onPlace({
        id: crypto.randomUUID(),
        t: tLevel,
        x: parseFloat(e.point.x.toFixed(2)),
        y: parseFloat(e.point.z.toFixed(2)), // Three.js Z = our spatial y
      })
    }
    downPos.current = null
  }

  return (
    // A large invisible horizontal plane sitting at the current t-level
    // Three.js Y axis = our time axis, so position.y = tLevel
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, tLevel, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}
