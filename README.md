# Reality Engine

An interactive playground for building physical intuition about special relativity — without drowning in the math first.

Built to learn by *doing*: place events, drag sliders, watch the geometry change, then ask "why does that happen?" — the answer is always in the picture.

---

## Modules

### Spacetime & Light Cones (`/spacetime`)
Interactive 3+1D (2 spatial + time) Minkowski diagram.

- **Place events** anywhere in spacetime by setting a t-level and clicking
- **Spacetime interval** s² = t² − x² − y² computed live with step-by-step breakdown
- **Causal classification**: timelike (s²>0, inside cone), lightlike (s²≈0, on cone), spacelike (s²<0, outside cone)
- **Region labels** toggle: Future / Past / Elsewhere
- **Wormhole mode**: Morris-Thorne embedding diagram showing two universes connected at a throat (r = b₀ + z²/4)

Key insight: *The cone isn't a rule you memorize — it's the shape of causality itself. You'd have to exit your local future cone to reach spacelike-separated events, which means moving faster than light.*

---

### Lorentz Transformations (`/lorentz`)
Interactive 1+1D Minkowski diagram showing what happens when you change reference frames.

- **β slider** (−0.95c to +0.95c): drag to boost into a moving frame
- **S frame** (white axes) stays fixed; **S′ frame** (indigo t′, fuchsia x′) tilts toward the light cone
- **Click** to place event E anywhere; watch t′ and x′ update live
- **Boost formulas** shown with numbers substituted in real time:
  - t′ = γ(t − βx)
  - x′ = γ(x − βt)
  - γ = 1/√(1−β²)
- **Invariant hyperbolas** t²−x²=k show that s² never changes under any boost
- **Projection lines** show how E's coordinates are read off in each frame

Key insight: *A Lorentz boost is a hyperbolic rotation. Circles → hyperbolas. The "angle" is rapidity φ = arctanh(β). The light cone is the 45° asymptote that no boost can tilt.*

---

## Stack

- **React** + **TypeScript** + **Vite**
- **React Three Fiber** + **Three.js** for 3D/2D rendering
- **@react-three/drei** — Line, Text, Html, OrbitControls
- **@react-three/postprocessing** — Bloom effects
- **Tailwind CSS v4** + **shadcn/ui** components
- **React Router v7**
- **Bun** as package manager / runtime

## Running

```bash
bun install
bun dev
```

---

## Planned modules

- **Worldlines & Proper Time** — trace paths, measure what clocks tick
- **Twin Paradox** — the geometry that makes the answer obvious
