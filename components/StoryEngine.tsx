'use client';

import { CheckCircle2, Sparkles } from 'lucide-react';

export default function StoryEngine() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider shadow-subtle font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span>EDITORIAL HIGH-END DESIGN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
              Gallery-Quality Output.
            </h2>

            <p className="text-base text-[#666664] font-light leading-relaxed font-sans">
              Every slide generated is uniquely crafted using principles of high-end editorial design, ensuring your message is delivered with maximum impact.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2 font-sans text-sm text-[#111111] font-medium">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Smart color palettes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Typography pairing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Contextual imagery</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column - Architectural Perspective Slide Preview */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] rounded-3xl p-6 sm:p-8 text-white border border-[#2A2A2A] shadow-dark relative overflow-hidden">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] mb-4">
                Q3 STRATEGY // SLIDE 01
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                    Growth &amp;<br />Expansion
                  </h3>
                  <p className="text-xs text-[#A0A0A0] font-sans font-light">
                    Optimizing resource allocation across international expansion sectors for 2026.
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-[#333333] aspect-[4/3] bg-[#1C1C1C]">
                  {/* High quality architecture texture preview image */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Editorial Architectural Design"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur border border-white/20 text-[#111111] px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                    ✦ GENERATED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
