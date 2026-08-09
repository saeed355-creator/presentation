'use client';

import { FileText, Cpu, Download } from 'lucide-react';

const STITCH_STEPS = [
  {
    num: '01',
    title: 'Brain Dump',
    desc: 'Paste raw text, bullet points, or just start typing. No formatting required.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'AI Synthesis',
    desc: 'Our engine extracts the narrative arc and designs bespoke layouts instantly.',
    icon: Cpu,
    active: true,
  },
  {
    num: '03',
    title: 'Present',
    desc: 'Export to PDF, PowerPoint, or present directly from the web with cinematic transitions.',
    icon: Download,
  },
];

export default function AIWorkflow() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stitch Process Container Box */}
        <div className="bg-[#EAE8E2] border border-[#E4E1DA] rounded-3xl p-8 sm:p-14 shadow-card">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
              The Process
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#666664] font-light max-w-lg mx-auto">
              A radically simplified workflow designed for thinkers, not designers.
            </p>
          </div>

          {/* 3 Step White Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STITCH_STEPS.map((step, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E4E1DA] rounded-2xl p-8 text-center transition-all hover:scale-[1.01] shadow-subtle flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0EEE8] border border-[#E4E1DA] flex items-center justify-center font-mono text-xs font-bold text-[#111111] mb-6">
                    {step.num}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold text-[#111111]">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#666664] leading-relaxed font-sans font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F0EEE8] w-full text-[10px] font-mono text-[#666664] uppercase tracking-wider">
                    {step.active ? '🟢 AI Core Active' : 'Step ' + step.num}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
