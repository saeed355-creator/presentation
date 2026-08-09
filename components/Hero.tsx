'use client';

import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, FileSpreadsheet, Globe } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { useAuth } from './AuthProvider';

export default function Hero() {
  const { requireAuth } = useAuth();

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#F4F4F0] min-h-[90vh] flex flex-col justify-center">
      {/* Background Depth & Subtle Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E4E1DA_1px,transparent_1px),linear-gradient(to_bottom,#E4E1DA_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E4E1DA] shadow-subtle text-[11px] font-mono font-semibold text-[#111111] tracking-widest uppercase transition-all hover:border-[#111111]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35] animate-pulse" />
            <span>AI PRESENTATION ENGINE 2.0</span>
          </div>

          {/* Editorial Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold text-[#111111] tracking-tight leading-[1.05] max-w-5xl mx-auto">
            From Thought to{' '}
            <span className="font-serif italic font-normal text-[#111111] relative inline-block">
              Presentation
              <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent opacity-60" />
            </span>{' '}
            in Seconds.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#666664] font-light max-w-2xl mx-auto leading-relaxed font-sans">
            The AI-powered storyteller that transforms raw ideas into executive-ready slide decks with grounded research, dynamic charts, and native PPTX export.
          </p>

          {/* CTAs with Micro-Interactions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => requireAuth()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider px-9 py-4 rounded-full shadow-card transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>CREATE PRESENTATION</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0EEE8] text-[#111111] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full border border-[#E4E1DA] shadow-subtle transition-all duration-200 hover:border-[#111111]"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#111111]" />
              <span>WATCH DEMO</span>
            </a>
          </div>

          {/* Product Credibility Signals */}
          <div className="pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-mono text-[#666664]">
            <div className="flex items-center gap-2 bg-white/80 border border-[#E4E1DA] px-3 py-1.5 rounded-full shadow-subtle">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#2D7A58]" />
              <span>Native 16:9 PPTX Export</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 border border-[#E4E1DA] px-3 py-1.5 rounded-full shadow-subtle">
              <Globe className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Real-Time Web Research</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 border border-[#E4E1DA] px-3 py-1.5 rounded-full shadow-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
              <span>AI Story Engine</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Canvas Preview */}
        <div className="mt-14 sm:mt-18">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
