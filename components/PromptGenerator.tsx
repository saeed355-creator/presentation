'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from './AuthProvider';

const EXAMPLE_PROMPTS = [
  'Future of AI in Healthcare for Hospital Executives',
  'Startup Pitch Deck for Seed Stage FinTech App',
  'Quarterly Business Review for Marketing Team',
  'Cybersecurity Best Practices for Remote Employees',
];

export default function PromptGenerator() {
  const { requireAuth } = useAuth();
  const [prompt, setPrompt] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    requireAuth(() => {
      window.location.href = `/generate?topic=${encodeURIComponent(prompt)}`;
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider font-semibold shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>ONE PROMPT ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Turn one sentence into a presentation story.
          </h2>

          <p className="text-base sm:text-lg text-[#666664] font-sans font-light max-w-lg mx-auto">
            Type your topic or idea below and watch our AI story engine structure your deck.
          </p>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="bg-white border border-[#E4E1DA] focus-within:border-[#111111] rounded-3xl p-3 sm:p-4 shadow-card transition-all flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Artificial Intelligence in Enterprise Healthcare..."
              className="flex-1 bg-transparent text-[#111111] text-base sm:text-lg placeholder:text-[#666664]/50 focus:outline-none px-4 py-2 font-sans"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-full shadow-card transition-all active:scale-[0.98] shrink-0"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>GENERATE DECK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Example Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 justify-center">
            <span className="text-xs font-mono text-[#666664]">Try example:</span>
            {EXAMPLE_PROMPTS.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(ex)}
                className="text-xs text-[#666664] hover:text-[#111111] bg-white hover:bg-[#F0EEE8] border border-[#E4E1DA] px-3.5 py-1.5 rounded-full transition-colors font-sans font-medium shadow-subtle"
              >
                {ex}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
