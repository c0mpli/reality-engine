// A spacetime event: a specific point in space AND time
export interface SpacetimeEvent {
  id: string
  t: number  // time coordinate
  x: number  // spatial x
  y: number  // spatial y
}

// Classify an event relative to the origin based on s² = t² - x² - y²
export type CausalType = 'timelike' | 'lightlike' | 'spacelike'

export function spacetimeInterval(e: SpacetimeEvent): number {
  return e.t ** 2 - e.x ** 2 - e.y ** 2
}

export function classifyEvent(e: SpacetimeEvent): CausalType {
  const s2 = spacetimeInterval(e)
  if (Math.abs(s2) < 0.15) return 'lightlike'
  return s2 > 0 ? 'timelike' : 'spacelike'
}

export const CAUSAL_COLORS: Record<CausalType, string> = {
  timelike:  '#10b981',  // emerald green
  lightlike: '#f59e0b',  // amber yellow
  spacelike: '#e11d48',  // rose red
}
