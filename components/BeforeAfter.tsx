'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRightLeft, CheckCircle2, XCircle } from 'lucide-react';

export default function BeforeAfter() {
  const [activeMode, setActiveMode] = useState<'before' | 'after' | 'split'>('split');

  return (
    <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Stitch Friction of Creation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider mb-4 shadow-subtle font-semibold">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#111111]" />
            <span>THE PARADIGM SHIFT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            The Friction of Creation
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#666664] font-light max-w-xl mx-auto">
            Traditional presentation software forces you to be a designer, formatting text boxes and aligning shapes. We changed the paradigm.
          </p>

          {/* Toggle View Mode Chips */}
          <div className="mt-6 inline-flex bg-white border border-[#E4E1DA] p-1 rounded-full gap-1 shadow-subtle font-sans text-xs">
            <button
              onClick={() => setActiveMode('split')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                activeMode === 'split' ? 'bg-[#111111] text-white' : 'text-[#666664] hover:text-[#111111]'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveMode('before')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                activeMode === 'before' ? 'bg-[#F0EEE8] text-[#111111] border border-[#E4E1DA]' : 'text-[#666664] hover:text-[#111111]'
              }`}
            >
              Hours of Alignment ❌
            </button>
            <button
              onClick={() => setActiveMode('after')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                activeMode === 'after' ? 'bg-[#111111] text-white' : 'text-[#666664] hover:text-[#111111]'
              }`}
            >
              Instant Polish ✓
            </button>
          </div>
        </div>

        {/* Stitch Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* BEFORE CARD: Hours of Alignment */}
          {(activeMode === 'split' || activeMode === 'before') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#EAE8E2] border border-[#E4E1DA] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E1DA] flex items-center justify-center font-serif text-lg font-bold text-[#111111] mb-6">
                  E
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#111111] mb-3">
                  Hours of Alignment
                </h3>

                <p className="text-xs sm:text-sm text-[#666664] leading-relaxed font-sans mb-8">
                  Nudging pixels, searching for stock photos, and struggling with manual slides instead of focusing on your core message.
                </p>

                {/* Mockup skeleton shapes */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E4E1DA]">
                  <div className="h-16 rounded-xl bg-white/60 border border-[#E4E1DA]" />
                  <div className="h-16 rounded-xl bg-white/60 border border-[#E4E1DA]" />
                  <div className="h-16 rounded-xl bg-white/60 border border-[#E4E1DA]" />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E4E1DA] flex items-center justify-between text-xs font-mono text-[#666664]">
                <span>Status: Manual Friction</span>
                <span>4.5 Hours Wasted</span>
              </div>
            </motion.div>
          )}

          {/* AFTER CARD: Instant Polish (Obsidian Dark Box) */}
          {(activeMode === 'split' || activeMode === 'after') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-dark"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center text-white mb-6">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  Instant Polish
                </h3>

                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-sans mb-8">
                  Type your raw thoughts. Our AI structures the narrative, sources high-end imagery, and applies pixel-perfect typography in real-time.
                </p>

                {/* Real-time Generation Progress Bar Container */}
                <div className="bg-[#1C1C1C] border border-[#333333] p-4 rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>• Generative structure...</span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-4/5 rounded-full transition-all duration-1000" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#222222] flex items-center justify-between text-xs font-mono text-[#A0A0A0]">
                <span>Status: Automated Story Engine</span>
                <span className="text-emerald-400">⚡ Saved 4+ Hours</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
