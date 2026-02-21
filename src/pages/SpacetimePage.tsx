import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SpacetimeScene } from '@/components/spacetime/SpacetimeScene'
import { WormholeScene } from '@/components/spacetime/WormholeScene'
import type { SpacetimeEvent } from '@/types'
import { classifyEvent, spacetimeInterval, CAUSAL_COLORS } from '@/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Trash2, Grid3X3, Layers } from 'lucide-react'

export default function SpacetimePage() {
  const [mode, setMode] = useState<'flat' | 'wormhole'>('flat')
  const [events, setEvents] = useState<SpacetimeEvent[]>([])
  const [tLevel, setTLevel] = useState(0)
  const [showGrid, setShowGrid] = useState(true)
  const [showRegions, setShowRegions] = useState(false)

  return (
    <div className="w-screen h-screen relative bg-[#09090b] font-sans">
      <Canvas camera={{ position: [6, 5, 8], fov: 50 }}>
        <color attach="background" args={['#09090b']} />
        <ambientLight intensity={0.4} />
        {mode === 'flat' ? (
          <SpacetimeScene
            events={events}
            tLevel={tLevel}
            showGrid={showGrid}
            showRegions={showRegions}
            onPlace={e => setEvents(prev => [...prev, e])}
          />
        ) : (
          <WormholeScene />
        )}
        <OrbitControls enablePan enableZoom />
      </Canvas>

      {/* Back and Grid Toggle */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowRegions(!showRegions)}
          className={`bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md transition-all rounded-full ${showRegions ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'}`}
          title="Toggle Region Labels"
        >
          <Layers className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowGrid(!showGrid)}
          className={`bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md transition-all rounded-full ${showGrid ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'}`}
          title="Toggle Grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" asChild className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all rounded-full px-4">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </Button>
      </div>

      {/* Control panel */}
      <Card className="absolute top-6 left-6 w-72 bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 border-t border-white/[0.04] rounded-2xl pointer-events-none" />
        
        <CardHeader className="px-4 pt-4 pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-zinc-200">Spacetime Engine</CardTitle>
            <Badge variant="outline" className="text-xs bg-zinc-800/50 border-zinc-700/50 text-zinc-400 font-mono py-0">c = 1</Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 flex flex-col gap-4 relative z-10">

          {/* Mode switcher */}
          <div className="flex gap-1.5 bg-zinc-950/50 p-1 rounded-xl border border-zinc-800/40">
            {(['flat', 'wormhole'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all duration-200 ${
                  mode === m
                    ? 'bg-zinc-700/80 text-zinc-100 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {m === 'flat' ? 'Flat Spacetime' : 'Wormhole'}
              </button>
            ))}
          </div>

          {/* Wormhole explanation */}
          {mode === 'wormhole' && (
            <div className="flex flex-col gap-2 bg-zinc-900/30 rounded-lg p-2.5 border border-zinc-800/30">
              <p className="text-sm font-medium text-zinc-300">Morris-Thorne Wormhole</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                This is a spatial slice (t = const) of curved spacetime, embedded in a flat extra dimension so we can see its shape.
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The two funnels are two regions of space connected at the <span className="text-amber-400 font-mono">throat</span>. You'd punch through here — staying inside your local cone the whole time.
              </p>
              <div className="font-mono text-xs text-zinc-600 pt-1 border-t border-zinc-800/50">
                r = b₀ + z² / 4
              </div>
            </div>
          )}

          {/* Flat spacetime controls */}
          {mode === 'flat' && (
            <>
              {/* t-level */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-400">Placement level</p>
                  <span className="text-sm font-mono font-semibold text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded-md border border-zinc-700/50">
                    t = {tLevel.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline" size="icon"
                    className="h-7 w-7 shrink-0 rounded-full bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    onClick={() => setTLevel(t => parseFloat((t - 0.5).toFixed(1)))}
                  >−</Button>
                  <div className="flex-1 h-1.5 bg-zinc-800/50 rounded-full relative overflow-hidden border border-zinc-700/30">
                    <div
                      className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `${((tLevel + 4) / 8) * 100}%` }}
                    />
                  </div>
                  <Button
                    variant="outline" size="icon"
                    className="h-7 w-7 shrink-0 rounded-full bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    onClick={() => setTLevel(t => parseFloat((t + 0.5).toFixed(1)))}
                  >+</Button>
                </div>
                <p className="text-xs text-zinc-500 text-center">Click in scene to place an event</p>
              </div>

              <Separator className="bg-zinc-800/50" />

              {/* Legend */}
              <div className="flex flex-col gap-2 bg-zinc-900/30 rounded-lg p-2.5 border border-zinc-800/30">
                {(['timelike', 'lightlike', 'spacelike'] as const).map(type => (
                  <div key={type} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]" style={{ background: CAUSAL_COLORS[type], color: CAUSAL_COLORS[type] }} />
                    <span className="text-sm text-zinc-400 capitalize font-medium">{type}</span>
                    <span className="text-xs text-zinc-500 ml-auto font-mono bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">
                      {type === 'timelike' ? 's² > 0' : type === 'lightlike' ? 's² ≈ 0' : 's² < 0'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Formula breakdown for last placed event */}
              {events.length > 0 && (() => {
                const e = events[events.length - 1]
                const t2 = parseFloat((e.t ** 2).toFixed(2))
                const x2 = parseFloat((e.x ** 2).toFixed(2))
                const y2 = parseFloat((e.y ** 2).toFixed(2))
                const s2 = parseFloat(spacetimeInterval(e).toFixed(2))
                const type = classifyEvent(e)
                const color = CAUSAL_COLORS[type]
                return (
                  <>
                    <Separator className="bg-zinc-800/50" />
                    <div className="flex flex-col gap-2 bg-zinc-900/30 rounded-lg p-2.5 border border-zinc-800/30">
                      <p className="text-sm font-medium text-zinc-400">Interval — last event</p>
                      <div className="font-mono text-xs flex flex-col gap-1 text-zinc-400 leading-relaxed">
                        <div className="text-zinc-500">s² = t² − x² − y²</div>
                        <div>= ({e.t.toFixed(1)})² − ({e.x.toFixed(1)})² − ({e.y.toFixed(1)})²</div>
                        <div>= {t2} − {x2} − {y2}</div>
                        <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/50 mt-0.5">
                          <span className="text-zinc-200 font-semibold">= {s2}</span>
                          <span
                            className="text-[11px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ml-auto"
                            style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
                          >
                            {type}
                          </span>
                        </div>
                        <div className="text-zinc-500 text-[11px] pt-0.5">
                          {type === 'timelike' && 's² > 0 → inside the cone'}
                          {type === 'lightlike' && 's² ≈ 0 → on the cone surface'}
                          {type === 'spacelike' && 's² < 0 → outside the cone'}
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}

              {/* Events list */}
              {events.length > 0 && (
                <>
                  <Separator className="bg-zinc-800/50" />
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-400">Events ({events.length})</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" onClick={() => setEvents([])}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                      {events.map((e, i) => {
                        const type = classifyEvent(e)
                        const s2 = spacetimeInterval(e)
                        return (
                          <div key={e.id} className="flex items-center gap-2.5 bg-zinc-900/30 p-2 rounded-lg border border-zinc-800/30">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_5px_currentColor]" style={{ background: CAUSAL_COLORS[type], color: CAUSAL_COLORS[type] }} />
                            <span className="text-xs font-mono text-zinc-400 flex-1 flex justify-between">
                              <span>E{i + 1} ({e.t.toFixed(1)}, {e.x.toFixed(1)}, {e.y.toFixed(1)})</span>
                              <span className="text-zinc-500">s²={s2.toFixed(1)}</span>
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
