'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { THEMES } from '@/lib/themes';
import { ThemeType } from '@/lib/types';

const TEMPLATES: { id: ThemeType; label: string; badge: string; desc: string; sampleTitle: string }[] = [
  {
    id: 'dark-violet',
    label: 'Editorial Dark',
    badge: 'POPULAR',
    desc: 'Warm orange accent on deep charcoal slate. Minimal & authoritative.',
    sampleTitle: 'AI Platform Strategy 2026',
  },
  {
    id: 'cyberpunk-blue',
    label: 'Soft Lavender',
    badge: 'EDITORIAL',
    desc: 'Refined lavender highlights on warm neutral paper canvas.',
    sampleTitle: 'Neural Architecture & Scalability',
  },
  {
    id: 'emerald-executive',
    label: 'Executive Sage',
    badge: 'BUSINESS',
    desc: 'Calming soft green accents over off-white paper canvas.',
    sampleTitle: 'Q4 Performance & Board Overview',
  },
  {
    id: 'sunset-gold',
    label: 'Muted Ochre',
    badge: 'PREMIUM',
    desc: 'Muted warm yellow accents on charcoal obsidian.',
    sampleTitle: 'Venture Pitch Deck & Financial Vision',
  },
  {
    id: 'minimal-monochrome',
    label: 'Minimal Canvas',
    badge: 'CLEAN',
    desc: 'Stark black typography on warm off-white. Pure editorial restraint.',
    sampleTitle: 'Design Principles & Brand Guidelines',
  },
  {
    id: 'neo-crimson',
    label: 'Terracotta Slate',
    badge: 'CREATIVE',
    desc: 'Warm terracotta orange on deep obsidian.',
    sampleTitle: 'Product Launch & Go-To-Market',
  },
];

export default function TemplateCard() {
  const router = useRouter();

  const handleSelectTemplate = (themeId: ThemeType) => {
    router.push(`/generate?theme=${themeId}`);
  };

  return (
    <section id="templates" className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider font-semibold shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>DESIGN STYLES</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Start with a style.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#666664] font-sans font-light max-w-lg mx-auto">
            Six carefully calibrated visual themes designed for maximum readability and visual impact.
          </p>
        </div>

        {/* 6 Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((tmpl) => {
            const themeObj = THEMES[tmpl.id];
            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.id)}
                className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 cursor-pointer shadow-subtle hover:shadow-card hover:-translate-y-1"
              >
                <div>
                  {/* Miniature Slide Mockup Container */}
                  <div
                    className="w-full aspect-[16/9] rounded-2xl border border-[#E4E1DA] p-4 flex flex-col justify-between mb-5 relative overflow-hidden transition-transform group-hover:scale-[1.01]"
                    style={{ backgroundColor: themeObj.bg }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                        style={{ backgroundColor: themeObj.badgeBg, color: themeObj.badgeText }}
                      >
                        {tmpl.badge}
                      </span>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E4E1DA]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E4E1DA]"></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div
                        className="text-sm font-serif font-bold tracking-tight line-clamp-1"
                        style={{ color: themeObj.textPrimary }}
                      >
                        {tmpl.sampleTitle}
                      </div>
                      <div
                        className="text-[10px] font-mono line-clamp-1"
                        style={{ color: themeObj.accent }}
                      >
                        ✦ Present.AI Story Deck
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div className="w-12 h-1 rounded" style={{ backgroundColor: themeObj.accent }}></div>
                      <span className="text-[8px] font-mono text-[#666664]">16:9 Widescreen</span>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white font-sans text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        Preview →
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#111111] mb-1 flex items-center justify-between">
                    {tmpl.label}
                    <ArrowRight className="w-4 h-4 text-[#666664] group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-[#666664] font-sans font-light leading-relaxed mb-4">
                    {tmpl.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E1DA] flex items-center justify-between text-xs text-[#666664]">
                  <span>Palette</span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: themeObj.bg }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: themeObj.surface }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: themeObj.accent }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
