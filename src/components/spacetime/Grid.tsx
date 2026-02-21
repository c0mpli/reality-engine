import { Line, Text } from '@react-three/drei'

const EXTENT = 5

function AxisTicks() {
  const ticks = []
  for (let i = -EXTENT; i <= EXTENT; i++) {
    if (i === 0) continue
    const label = String(i)

    // t-axis ticks + labels
    ticks.push(
      <group key={`t${i}`}>
        <Line points={[[-0.1, i, 0], [0.1, i, 0]]} color="#a1a1aa" lineWidth={1.5} />
        <Text position={[-0.4, i, 0]} fontSize={0.18} color="#e4e4e7" anchorX="right">{label}</Text>
      </group>
    )

    // x-axis ticks + labels
    ticks.push(
      <group key={`x${i}`}>
        <Line points={[[i, -0.1, 0], [i, 0.1, 0]]} color="#a1a1aa" lineWidth={1.5} />
        <Text position={[i, -0.4, 0]} fontSize={0.18} color="#e4e4e7" anchorY="top">{label}</Text>
      </group>
    )

    // y-axis ticks + labels
    ticks.push(
      <group key={`y${i}`}>
        <Line points={[[0, -0.1, i], [0, 0.1, i]]} color="#a1a1aa" lineWidth={1.5} />
        <Text position={[0.4, -0.4, i]} fontSize={0.18} color="#e4e4e7" anchorX="left">{label}</Text>
      </group>
    )
  }
  return <>{ticks}</>
}

// Grid on the t=0 spatial plane (the "floor")
function SpatialPlaneGrid() {
  const lines = []
  for (let i = -EXTENT; i <= EXTENT; i++) {
    const isAxis = i === 0
    const color = isAxis ? '#71717a' : '#52525b'
    const width = isAxis ? 2.5 : 1.5

    lines.push(
      <Line key={`gx${i}`}
        points={[[-EXTENT, 0, i], [EXTENT, 0, i]]}
        color={color} lineWidth={width} transparent opacity={isAxis ? 1 : 0.6}
      />
    )
    lines.push(
      <Line key={`gy${i}`}
        points={[[i, 0, -EXTENT], [i, 0, EXTENT]]}
        color={color} lineWidth={width} transparent opacity={isAxis ? 1 : 0.6}
      />
    )
  }
  return <>{lines}</>
}

// Vertical lines running along t at each integer x and y
function VerticalGridLines() {
  const lines = []
  for (let i = -EXTENT; i <= EXTENT; i++) {
    lines.push(
      <Line key={`vx${i}`}
        points={[[i, -EXTENT, 0], [i, EXTENT, 0]]}
        color="#3f3f46" lineWidth={1} transparent opacity={0.6}
      />
    )
    lines.push(
      <Line key={`vy${i}`}
        points={[[0, -EXTENT, i], [0, EXTENT, i]]}
        color="#3f3f46" lineWidth={1} transparent opacity={0.6}
      />
    )
  }
  return <>{lines}</>
}

// Horizontal square rings at each integer t — "slices of now"
function TimeSliceRings() {
  const rings = []
  for (let t = -EXTENT; t <= EXTENT; t++) {
    if (t === 0) continue
    const color = '#3f3f46'
    rings.push(
      <Line key={`ring${t}`}
        points={[
          [-EXTENT, t, -EXTENT],
          [ EXTENT, t, -EXTENT],
          [ EXTENT, t,  EXTENT],
          [-EXTENT, t,  EXTENT],
          [-EXTENT, t, -EXTENT],
        ]}
        color={color} lineWidth={1.5} transparent opacity={0.6}
      />
    )
  }
  return <>{rings}</>
}

export function Grid() {
  return (
    <>
      <VerticalGridLines />
      <TimeSliceRings />
      <SpatialPlaneGrid />
      <AxisTicks />
    </>
  )
}
