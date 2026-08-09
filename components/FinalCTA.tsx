'use client';

import { ArrowRight } from 'lucide-react';
import { useAuth } from './AuthProvider';

export default function FinalCTA() {
  const { requireAuth } = useAuth();

  return (
    <section className="py-24 sm:py-32 bg-[#F4F4F0] border-t border-[#E4E1DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social Proof Logos Ribbon */}
        <div className="mb-20 pb-16 border-b border-[#E4E1DA]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666664] mb-8 font-semibold">
            TRUSTED BY FORWARD-THINKING TEAMS
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 font-mono text-sm sm:text-base font-bold text-[#666664] opacity-70">
            <span>ACME Corp</span>
            <span>GLOBALSPACE</span>
            <span className="font-serif italic font-normal text-lg">Vertex</span>
            <span className="border border-[#E4E1DA] px-2 py-0.5 rounded text-xs">NEO</span>
          </div>
        </div>

        {/* Main CTA */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Stop Formatting.<br />Start Presenting.
          </h2>

          <p className="text-base sm:text-lg text-[#666664] font-light max-w-md mx-auto">
            Join thousands of professionals saving hours every week.
          </p>

          <div className="pt-4">
            <button
              onClick={() => requireAuth()}
              className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-9 py-4.5 rounded-full shadow-card transition-all duration-200 active:scale-[0.98]"
            >
              <span>EXPERIENCE THE FUTURE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
