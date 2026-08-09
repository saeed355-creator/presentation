'use client';

import { Sparkles, Puzzle, Palette, Image as ImageIcon, Edit3, Download, ArrowRight } from 'lucide-react';

export default function FeatureCard() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider font-semibold shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>COMPLETE FEATURE SUITE</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Everything needed to go from idea to deck.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#666664] font-sans font-light max-w-lg mx-auto">
            Designed for speed, storytelling, and effortless presentation creation.
          </p>
        </div>

        {/* 6 Visually Distinct Feature Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 01: AI Content Generation */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <Sparkles className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 01
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">✨ AI Content Generation</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Automatically generate titles, explanations, key metric points, and executive summaries formatted for presentation slides.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl font-mono text-xs text-[#666664] space-y-1.5">
              <div className="text-[#2D7A58] font-semibold">✓ Generating slide titles...</div>
              <div className="text-[#111111] font-bold">✦ Executive Summary &amp; Market Impact</div>
            </div>
          </div>

          {/* Feature 02: Smart Story Structure */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <Puzzle className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 02
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">🧩 Smart Story Structure</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Creates logical presentation narrative arcs tailored to your exact target audience.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl flex items-center justify-between text-[11px] font-mono text-[#111111]">
              <span>Problem</span>
              <ArrowRight className="w-3 h-3 text-[#111111]" />
              <span>Solution</span>
              <ArrowRight className="w-3 h-3 text-[#111111]" />
              <span className="text-[#2D7A58] font-bold">Impact</span>
            </div>
          </div>

          {/* Feature 03: Smart Design */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <Palette className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 03
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">🎨 Smart Design</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Automatically selects suitable layouts, typography hierarchy, contrast rules, and spatial layout spacing.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl flex items-center justify-between text-xs text-[#666664]">
              <span>Curated Palettes</span>
              <div className="flex gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#111111]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF6B35]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#8FAF9A]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#8B78A8]"></div>
              </div>
            </div>
          </div>

          {/* Feature 04: Visual Suggestions */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <ImageIcon className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 04
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">🖼 Visual Suggestions</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Recommends images, data charts, comparison matrices, and icon diagrams matching each slide content.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl flex items-center justify-between text-xs text-[#666664]">
              <span>Chart &amp; Diagram Layouts</span>
              <span className="text-[#111111] font-mono text-[11px] font-bold">Auto-Generated</span>
            </div>
          </div>

          {/* Feature 05: Editable Slides */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <Edit3 className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 05
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">✏️ Editable Slides</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Full 3-column presentation editor allowing users to modify text, reorder slides, swap themes, and ask AI to refine single slides.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl flex items-center justify-between text-xs text-[#666664]">
              <span>Inline Editing Canvas</span>
              <span className="text-[#111111] font-mono text-[11px] font-bold">100% Interactive</span>
            </div>
          </div>

          {/* Feature 06: Export PPTX / PDF */}
          <div className="bg-white border border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-subtle">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center mb-6 text-[#111111]">
                <Download className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xs font-mono text-[#666664] font-bold uppercase tracking-widest block mb-1">
                FEATURE 06
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">📤 Native PPTX &amp; PDF Export</h3>
              <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                Export native 16:9 widescreen PowerPoint files (.pptx) and crisp vector PDF documents with one click.
              </p>
            </div>

            <div className="bg-[#F4F4F0] border border-[#E4E1DA] p-3 rounded-2xl flex items-center justify-between text-xs font-mono text-[#111111]">
              <span>.PPTX (PowerPoint)</span>
              <span className="text-[#2D7A58] font-bold">.PDF (Vector)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
