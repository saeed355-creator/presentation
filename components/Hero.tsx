'use client';

import { Sparkles, ArrowRight, Play } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { useAuth } from './AuthProvider';

export default function Hero() {
  const { requireAuth } = useAuth();

  return (
    <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#F4F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Stitch Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E4E1DA] shadow-subtle text-[11px] font-mono font-semibold text-[#111111] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>INTRODUCING PRESENT.AI 2.0</span>
          </div>

          {/* Stitch Serif Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#111111] tracking-tight leading-[1.08]">
            From Thought to Presentation in <span className="font-serif italic font-normal text-[#111111]">Seconds.</span>
          </h1>

          {/* Stitch Subtitle */}
          <p className="text-base sm:text-xl text-[#666664] font-light max-w-2xl mx-auto leading-relaxed font-sans">
            The AI-powered storyteller that turns your raw ideas into award-winning, cinematic slide decks without touching a single design tool.
          </p>

          {/* Stitch Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => requireAuth()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-full shadow-card transition-all duration-200 active:scale-[0.98]"
            >
              <span>EXPERIENCE THE FUTURE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0EEE8] text-[#111111] font-sans text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-full border border-[#E4E1DA] transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#111111]" />
              <span>WATCH DEMO</span>
            </a>
          </div>

          {/* Features Ribbon */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-xs font-mono text-[#666664]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
              <span>100% Native PPTX Export</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A58]"></span>
              <span>Vector PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></span>
              <span>Audience Narrative Engine</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Canvas Preview */}
        <div className="mt-16 sm:mt-20">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
