import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles } from 'lucide-react'

interface Module {
  path: string
  title: string
  description: string
  status: 'ready' | 'soon'
}

const modules: Module[] = [
  {
    path: '/spacetime',
    title: 'Spacetime & Light Cones',
    description: 'Events, the spacetime interval s² = t² − x², and why causality is geometric.',
    status: 'ready',
  },
  {
    path: '/lorentz',
    title: 'Lorentz Transformations',
    description: 'See how changing reference frames rotates the spacetime diagram.',
    status: 'ready',
  },
  {
    path: '/worldlines',
    title: 'Worldlines & Proper Time',
    description: 'Trace paths through spacetime and measure what clocks actually tick.',
    status: 'soon',
  },
  {
    path: '/twins',
    title: 'Twin Paradox',
    description: 'Why does the travelling twin age less? The geometry makes it obvious.',
    status: 'soon',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 relative overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      
      {/* Ambient glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />

      <div className="w-full max-w-2xl flex flex-col gap-12 relative z-10 py-20">

        {/* Header */}
        <div className="flex flex-col gap-5 text-center items-center">
          <Badge variant="outline" className="text-xs font-medium px-3.5 py-1.5 bg-zinc-900/50 border-zinc-800 text-zinc-300 backdrop-blur-md gap-1.5 rounded-full inline-flex tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Reality Engine v0.1
          </Badge>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
              Physics By Feel
            </h1>
            <p className="text-base md:text-lg text-zinc-400 max-w-[420px] mx-auto leading-relaxed font-medium">
              Interactive explorations for building physical intuition without the heavy math.
            </p>
          </div>
        </div>

        {/* Module group */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 mb-2 opacity-80">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-zinc-800 flex-1" />
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.25em]">
              Special Relativity
            </p>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-zinc-800 flex-1" />
          </div>
          
          <div className="grid grid-cols-1 gap-3.5">
            {modules.map((m) => (
              m.status === 'ready' ? (
                <Link key={m.path} to={m.path} className="block no-underline group outline-none">
                  <Card 
                    className="relative overflow-hidden bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 ease-out group-hover:-translate-y-[2px] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:shadow-indigo-500/5 rounded-2xl"
                  >
                    {/* Subtle inner top highlight */}
                    <div className="absolute inset-0 border-t border-white/[0.04] rounded-2xl pointer-events-none" />
                    
                    <CardHeader className="p-5 md:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1.5 max-w-[85%]">
                          <CardTitle className="text-base md:text-lg font-semibold text-zinc-200 tracking-tight group-hover:text-white transition-colors">
                            {m.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-zinc-400 leading-relaxed font-normal group-hover:text-zinc-300 transition-colors">
                            {m.description}
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] md:mr-2">
                          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ) : (
                <Card 
                  key={m.path} 
                  className="bg-zinc-900/20 border-zinc-800/30 opacity-60 cursor-not-allowed select-none rounded-2xl relative overflow-hidden"
                >
                  <CardHeader className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1.5 max-w-[85%] grayscale">
                        <CardTitle className="text-base md:text-lg font-medium text-zinc-500 tracking-tight">
                          {m.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-600 leading-relaxed">
                          {m.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 border-zinc-700/50 shrink-0 bg-zinc-900/50 py-1 md:mr-2">
                        Soon
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              )
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
