import { Line, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { LightCone } from './LightCone'
import { Grid } from './Grid'
import { EventMarker } from './EventMarker'
import { PlacementPlane } from './PlacementPlane'
import { RegionLabels } from './RegionLabels'
import type { SpacetimeEvent } from '../../types'

// In our scene:
//   Y-axis (up)    = time t
//   X-axis (right) = space x
//   Z-axis (depth) = space y
//
// Units: 1 unit = 1 light-second (so c = 1)

const AXIS_LENGTH = 5

function Axes() {
  return (
    <>
      {/* Time axis — vertical */}
      <Line
        points={[[0, -AXIS_LENGTH, 0], [0, AXIS_LENGTH, 0]]}
        color="#e4e4e7" // brighter zinc-200
        lineWidth={2.5}
      />
      <Text position={[0, AXIS_LENGTH + 0.4, 0]} fontSize={0.25} color="#ffffff">
        t
      </Text>

      {/* Space x axis — horizontal right */}
      <Line
        points={[[-AXIS_LENGTH, 0, 0], [AXIS_LENGTH, 0, 0]]}
        color="#e4e4e7" // brighter zinc-200
        lineWidth={2.5}
      />
      <Text position={[AXIS_LENGTH + 0.4, 0, 0]} fontSize={0.25} color="#ffffff">
        x
      </Text>

      {/* Space y axis — depth */}
      <Line
        points={[[0, 0, -AXIS_LENGTH], [0, 0, AXIS_LENGTH]]}
        color="#e4e4e7" // brighter zinc-200
        lineWidth={2.5}
      />
      <Text position={[0, 0, AXIS_LENGTH + 0.4]} fontSize={0.25} color="#ffffff">
        y
      </Text>
    </>
  )
}

interface SpacetimeSceneProps {
  events: SpacetimeEvent[]
  tLevel: number
  showGrid: boolean
  showRegions: boolean
  onPlace: (event: SpacetimeEvent) => void
}

export function SpacetimeScene({ events, tLevel, showGrid, showRegions, onPlace }: SpacetimeSceneProps) {
  return (
    <>
      {showGrid && <Grid />}
      <Axes />
      <LightCone direction="future" height={AXIS_LENGTH} />
      <LightCone direction="past" height={AXIS_LENGTH} />
      {showRegions && <RegionLabels />}
      <PlacementPlane tLevel={tLevel} onPlace={onPlace} />
      {events.map(e => <EventMarker key={e.id} event={e} />)}

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.5} intensity={1.5} />
      </EffectComposer>
    </>
  )
}
