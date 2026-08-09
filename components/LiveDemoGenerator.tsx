'use client';

import { useState } from 'react';
import { Sparkles, CheckCircle2, Download, RefreshCw, Wand2 } from 'lucide-react';
import { AudienceType, Presentation, ThemeType } from '@/lib/types';
import { generateFallbackPresentation } from '@/lib/ai';
import { exportToPPTX } from '@/lib/pptx';

const AI_STEPS = [
  'Understanding topic context...',
  'Analyzing target audience expectations...',
  'Building presentation story arc...',
  'Generating structured slide content...',
  'Selecting visual layouts & spatial hierarchy...',
  'Preparing PPTX export bundle...',
];

export default function LiveDemoGenerator() {
  const [topic, setTopic] = useState('Future of Artificial Intelligence in Healthcare');
  const [audience, setAudience] = useState<AudienceType>('professional');
  const [slideCount, setSlideCount] = useState<number>(8);
  const [theme, setTheme] = useState<ThemeType>('dark-violet');

  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [generatedDeck, setGeneratedDeck] = useState<Presentation | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const handleRunLiveDemo = async () => {
    setIsGenerating(true);
    setStepIndex(0);
    setGeneratedDeck(null);

    for (let i = 0; i < AI_STEPS.length; i++) {
      setStepIndex(i);
      await new Promise((res) => setTimeout(res, 450));
    }

    const deck = generateFallbackPresentation(topic, audience, 'meeting', slideCount, 'professional', theme);
    setGeneratedDeck(deck);
    setActiveSlideIdx(0);
    setIsGenerating(false);
  };

  const handleExport = async () => {
    if (!generatedDeck) return;
    await exportToPPTX(generatedDeck);
  };

  return (
    <section id="demo" className="py-20 sm:py-28 bg-[#111111] border-t border-[#2A2A2A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#222222] border border-[#333333] text-white text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>LIVE INTERACTIVE DEMO</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build One.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A0A0A0] font-sans font-light">
            Test the live generation workflow right here on this page in 10 seconds.
          </p>
        </div>

        {/* Interactive Demo Workstation Box */}
        <div className="bg-[#181818] border border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-dark">
          {!generatedDeck && !isGenerating && (
            <div className="space-y-8 max-w-3xl mx-auto font-sans">
              {/* Step 1 Input */}
              <div>
                <div className="text-[11px] font-mono text-[#A0A0A0] uppercase tracking-wider mb-2 font-bold">
                  STEP 01 // WHAT DO YOU WANT TO PRESENT?
                </div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#111111] border border-[#2A2A2A] focus:border-white rounded-2xl px-5 py-4 text-white text-base focus:outline-none transition-all font-sans"
                />
              </div>

              {/* Step 2 Audience & Step 3 Slides */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-[11px] font-mono text-[#A0A0A0] uppercase tracking-wider mb-3 font-bold">
                    STEP 02 // AUDIENCE
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['academic', 'professional', 'startup'] as AudienceType[]).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAudience(a)}
                        className={`py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                          audience === a
                            ? 'bg-white border-white text-[#111111] font-bold shadow-card'
                            : 'bg-[#111111] border-[#2A2A2A] text-[#A0A0A0]'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#A0A0A0] uppercase tracking-wider mb-3 font-bold">
                    STEP 03 // SLIDES
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 8, 10, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSlideCount(num)}
                        className={`py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                          slideCount === num
                            ? 'bg-white border-white text-[#111111] shadow-card'
                            : 'bg-[#111111] border-[#2A2A2A] text-[#A0A0A0]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4 Generate Button */}
              <div className="pt-4 border-t border-[#2A2A2A]">
                <button
                  onClick={handleRunLiveDemo}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0EEE8] text-[#111111] font-sans text-xs font-extrabold uppercase tracking-wider py-4 rounded-full shadow-card transition-all active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-[#111111]" />
                  <span>GENERATE PRESENTATION</span>
                </button>
              </div>
            </div>
          )}

          {/* AI Thinking Progress State */}
          {isGenerating && (
            <div className="py-16 text-center max-w-md mx-auto space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#111111] flex items-center justify-center mx-auto shadow-card">
                <Wand2 className="w-7 h-7 text-[#111111] animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-white">AI Engine Active</h3>
                <p className="text-xs font-mono text-white mt-1 uppercase tracking-wider">{AI_STEPS[stepIndex]}</p>
              </div>

              <div className="space-y-2 text-left bg-[#111111] border border-[#2A2A2A] p-4 rounded-2xl text-xs font-mono">
                {AI_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between transition-opacity ${
                      idx <= stepIndex ? 'opacity-100 text-white' : 'opacity-30 text-[#A0A0A0]'
                    }`}
                  >
                    <span>{step}</span>
                    {idx < stepIndex && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {idx === stepIndex && <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Deck Interactive Preview Screen */}
          {generatedDeck && (
            <div className="space-y-6 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1 font-bold">
                    ✦ GENERATED PRESENTATION READY
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">{generatedDeck.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGeneratedDeck(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-xs font-mono text-[#A0A0A0] hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>

                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F0EEE8] text-[#111111] text-xs font-extrabold uppercase tracking-wider transition-all shadow-card"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export PPTX
                  </button>
                </div>
              </div>

              {/* Mini Slide Canvas View */}
              {generatedDeck.slides[activeSlideIdx] && (
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 min-h-[300px] flex flex-col justify-between shadow-dark">
                  <div className="flex justify-between text-xs font-mono text-amber-400 mb-4 font-bold">
                    <span>SLIDE 0{activeSlideIdx + 1} OF 0{generatedDeck.slides.length}</span>
                    <span className="uppercase">{generatedDeck.slides[activeSlideIdx].layout} LAYOUT</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-2xl font-serif font-bold text-white">
                      {generatedDeck.slides[activeSlideIdx].title}
                    </h4>
                    {generatedDeck.slides[activeSlideIdx].subtitle && (
                      <p className="text-sm text-[#A0A0A0] font-light">
                        {generatedDeck.slides[activeSlideIdx].subtitle}
                      </p>
                    )}

                    <div className="pt-4 space-y-2">
                      {generatedDeck.slides[activeSlideIdx].content.map((bullet, i) => (
                        <div key={i} className="text-xs text-white flex items-center gap-2">
                          <span className="text-[#8FAF9A]">✦</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#A0A0A0]">
                    <span>Present.AI Story Engine</span>
                    <span className="text-emerald-400 font-mono">16:9 Widescreen</span>
                  </div>
                </div>
              )}

              {/* Thumbnail Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {generatedDeck.slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold shrink-0 transition-all ${
                      idx === activeSlideIdx
                        ? 'bg-white border-white text-[#111111] shadow-card'
                        : 'bg-[#111111] border-[#2A2A2A] text-[#A0A0A0]'
                    }`}
                  >
                    Slide {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
