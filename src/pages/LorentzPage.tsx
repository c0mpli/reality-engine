import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { LorentzScene } from '@/components/lorentz/LorentzScene'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft } from 'lucide-react'

export default function LorentzPage() {
  const [beta, setBeta] = useState(0)
  const [event, setEvent] = useState({ t: 3, x: 1.5 })

  const gamma = useMemo(() => 1 / Math.sqrt(1 - beta * beta), [beta])
  const tPrime = gamma * (event.t - beta * event.x)
  const xPrime = gamma * (event.x - beta * event.t)
  const s2 = parseFloat((event.t ** 2 - event.x ** 2).toFixed(3))
  const s2prime = parseFloat((tPrime ** 2 - xPrime ** 2).toFixed(3))

  return (
    <div className="w-screen h-screen relative bg-[#09090b] font-sans">
      <Canvas
        orthographic
        camera={{ zoom: 75, position: [0, 0, 10] }}
      >
        <color attach="background" args={['#09090b']} />
        <LorentzScene
          beta={beta}
          event={event}
          onPlace={(t, x) => setEvent({ t, x })}
        />
        <OrbitControls
          enableRotate={false}
          enablePan
          enableZoom
          zoomSpeed={0.5}
        />
      </Canvas>

      {/* Back button */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline" size="sm" asChild
          className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all rounded-full px-4"
        >
          <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
        </Button>
      </div>

      {/* Control panel */}
      <Card className="absolute top-6 left-6 w-80 bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 border-t border-white/[0.04] rounded-2xl pointer-events-none" />

        <CardHeader className="px-4 pt-4 pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-zinc-200">Lorentz Boost</CardTitle>
            <Badge variant="outline" className="text-xs bg-zinc-800/50 border-zinc-700/50 text-zinc-400 font-mono py-0">c = 1</Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 flex flex-col gap-4 relative z-10">

          {/* β slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">Velocity β</p>
              <span className="text-sm font-mono font-semibold text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded-md border border-zinc-700/50">
                {beta >= 0 ? '+' : ''}{beta.toFixed(2)}c
              </span>
            </div>
            <Slider
              min={-95}
              max={95}
              step={1}
              value={[Math.round(beta * 100)]}
              onValueChange={([v]) => setBeta(v / 100)}
            />
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono px-0.5">
              <span>−0.95c</span>
              <span>0</span>
              <span>+0.95c</span>
            </div>
          </div>

          {/* Lorentz factor */}
          <div className="flex items-center justify-between bg-zinc-900/30 rounded-lg px-3 py-2 border border-zinc-800/30">
            <span className="text-sm text-zinc-400 font-medium font-mono">γ = 1/√(1−β²)</span>
            <span className="font-mono text-sm text-indigo-300 font-semibold">{gamma.toFixed(4)}</span>
          </div>

          <Separator className="bg-zinc-800/50" />

          {/* Event coordinates */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-zinc-400">
              Event E
              <span className="text-xs text-zinc-600 font-normal ml-2">click diagram to move</span>
            </p>

            {/* S frame */}
            <div className="bg-zinc-900/30 rounded-lg p-2.5 border border-zinc-800/30">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1.5">Frame S</p>
              <div className="font-mono text-xs text-zinc-400 flex gap-5">
                <span>t = <span className="text-zinc-100 font-semibold">{event.t.toFixed(2)}</span></span>
                <span>x = <span className="text-zinc-100 font-semibold">{event.x.toFixed(2)}</span></span>
              </div>
            </div>

            {/* S' frame */}
            <div className="bg-zinc-900/30 rounded-lg p-2.5 border border-indigo-900/40">
              <p className="text-[10px] text-indigo-500/80 font-mono uppercase tracking-wider mb-1.5">Frame S′</p>
              <div className="font-mono text-xs text-zinc-400 flex gap-5">
                <span>t′ = <span className="text-indigo-300 font-semibold">{tPrime.toFixed(2)}</span></span>
                <span>x′ = <span className="text-fuchsia-300 font-semibold">{xPrime.toFixed(2)}</span></span>
              </div>
            </div>

            {/* Invariant */}
            <div className="flex items-center gap-2 bg-zinc-900/20 rounded-lg px-3 py-2 border border-zinc-800/20">
              <span className="font-mono text-xs text-zinc-500">s² = t²−x²</span>
              <div className="ml-auto flex items-center gap-1.5 font-mono text-xs">
                <span className="text-zinc-300">{s2}</span>
                <span className="text-zinc-600">=</span>
                <span className="text-zinc-300">{s2prime}</span>
                <span className="text-emerald-500 text-[10px] font-bold ml-1">invariant</span>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-800/50" />

          {/* Boost formulas */}
          <div className="flex flex-col gap-3 bg-zinc-900/30 rounded-lg p-2.5 border border-zinc-800/30">
            <p className="text-sm font-medium text-zinc-400">Boost equations</p>

            <div className="font-mono text-xs flex flex-col gap-1 text-zinc-400 leading-relaxed">
              <div className="text-zinc-500">t′ = γ(t − βx)</div>
              <div>
                = {gamma.toFixed(2)} × ({event.t.toFixed(2)} − {beta.toFixed(2)} · {event.x.toFixed(2)})
              </div>
              <div className="text-indigo-300 font-semibold pt-0.5">= {tPrime.toFixed(4)}</div>
            </div>

            <div className="h-px bg-zinc-800/50" />

            <div className="font-mono text-xs flex flex-col gap-1 text-zinc-400 leading-relaxed">
              <div className="text-zinc-500">x′ = γ(x − βt)</div>
              <div>
                = {gamma.toFixed(2)} × ({event.x.toFixed(2)} − {beta.toFixed(2)} · {event.t.toFixed(2)})
              </div>
              <div className="text-fuchsia-300 font-semibold pt-0.5">= {xPrime.toFixed(4)}</div>
            </div>
          </div>

          {/* Legend hint */}
          <div className="flex flex-col gap-1 text-[11px] text-zinc-600 leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-amber-500/70 inline-block shrink-0" />
              <span>Light cone — fixed for all observers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-indigo-400/70 inline-block shrink-0" />
              <span>t′ axis tilts toward cone as β → c</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-fuchsia-400/70 inline-block shrink-0" />
              <span>x′ axis tilts symmetrically</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-500/50 inline-block shrink-0" />
              <span>Hyperbolas — curves of constant s²</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
