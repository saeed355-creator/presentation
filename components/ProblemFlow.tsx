'use client';

import { useState, useEffect } from 'react';
import { Clock, Palette, BrainCircuit, RefreshCw, AlertCircle } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 'research', label: 'Research' },
  { id: 'structure', label: 'Structure' },
  { id: 'content', label: 'Content' },
  { id: 'design', label: 'Design' },
  { id: 'visuals', label: 'Visuals' },
  { id: 'formatting', label: 'Formatting' },
];

const PROBLEMS = [
  {
    icon: Clock,
    title: '⏱ Time-consuming',
    subtitle: 'Hours Wasted on Alignment',
    description:
      'Founders and professionals spend 4 to 8 hours formatting a single deck instead of focusing on strategic execution.',
    badge: '3.5 Hrs Lost/Deck',
  },
  {
    icon: Palette,
    title: '🎨 Design difficulty',
    subtitle: 'The Blank Canvas Trap',
    description:
      'Choosing fonts, picking color palettes, and creating visual hierarchy is hard without dedicated designer skills.',
    badge: 'Design Friction',
  },
  {
    icon: BrainCircuit,
    title: '🧠 Content structuring',
    subtitle: 'Disjointed Narrative Arc',
    description:
      'Dumping unstructured bullets without a clear story arc confuses stakeholders and dilutes key takeaways.',
    badge: 'Weak Messaging',
  },
  {
    icon: RefreshCw,
    title: '🔄 Repetitive editing',
    subtitle: 'Endless Revision Cycles',
    description:
      'Small text tweaks break design layouts, causing tedious pixel nudging and broken alignment loops.',
    badge: 'Broken Layouts',
  },
];

export default function ProblemFlow() {
  const [wastedMinutes, setWastedMinutes] = useState(210);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWastedMinutes((prev) => (prev >= 480 ? 120 : prev + 5));
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const formatHours = (mins: number) => {
    const hrs = (mins / 60).toFixed(1);
    return `${hrs} Hours`;
  };

  return (
    <section className="py-20 sm:py-28 bg-[#111111] border-t border-[#2A2A2A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#222222] border border-[#333333] text-amber-400 text-xs font-mono mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>THE REAL BOTTLENECK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            The blank slide is the bottleneck.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A0A0A0] font-sans font-light">
            Creating a presentation requires much more than writing slides. The manual pipeline is broken.
          </p>
        </div>

        {/* Animated Manual Workflow Pipeline */}
        <div className="mt-12 bg-[#181818] border border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-dark">
          <div className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>Traditional Presentation Creation Pipeline</span>
            <span className="text-amber-400 font-bold">Manual &amp; Fragmented</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#111111] border-white font-bold scale-[1.02] shadow-card'
                      : 'bg-[#111111] border-[#2A2A2A] text-[#A0A0A0]'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#A0A0A0] mb-1">0{idx + 1}</div>
                  <div className="text-xs sm:text-sm font-sans">{step.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wasted Time Counter */}
        <div className="mt-8 bg-[#181818] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-dark">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#222222] border border-[#333333] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#A0A0A0]">Average Time Spent Per Deck</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                {formatHours(wastedMinutes)} <span className="text-xs text-[#A0A0A0] font-normal">/ manual deck</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-[#A0A0A0] font-sans max-w-xs sm:max-w-none">
            <span className="text-white font-medium">82% of time</span> is spent on formatting, layout alignment, and template search — not content.
          </div>
        </div>

        {/* 4 Problem Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#181818] border border-[#2A2A2A] hover:border-white/40 p-6 rounded-3xl transition-all group shadow-dark"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-1">{p.title}</h3>
                <div className="text-xs text-amber-400 font-mono mb-3">{p.subtitle}</div>
                <p className="text-xs text-[#A0A0A0] leading-relaxed font-sans font-light">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
