'use client';

import { GraduationCap, Briefcase, Rocket, Users, CheckCircle2, Sparkles } from 'lucide-react';

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: '🎓 Students',
    badge: 'ACADEMIC',
    color: 'text-[#2D7A58]',
    borderColor: 'hover:border-[#111111]',
    bgColor: 'bg-[#F0F5F2]',
    items: ['Seminar Presentations', 'Class Assignments', 'Research Projects'],
    description: 'Transform complex thesis papers and study notes into structured academic decks in seconds.',
  },
  {
    icon: Briefcase,
    title: '💼 Professionals',
    badge: 'BUSINESS',
    color: 'text-[#111111]',
    borderColor: 'hover:border-[#111111]',
    bgColor: 'bg-[#F4F4F0]',
    items: ['Executive Meetings', 'Quarterly Reports', 'Client Proposals'],
    description: 'Structure executive summaries, metrics, and business strategy without design friction.',
  },
  {
    icon: Rocket,
    title: '🚀 Startups',
    badge: 'VENTURE',
    color: 'text-[#FF6B35]',
    borderColor: 'hover:border-[#111111]',
    bgColor: 'bg-orange-50',
    items: ['Investor Pitch Decks', 'Product Demos', 'Go-To-Market Plans'],
    description: 'Craft high-converting pitch stories for investors with Apple-grade visual restraint.',
  },
  {
    icon: Users,
    title: '🏢 Teams',
    badge: 'ENTERPRISE',
    color: 'text-[#8B78A8]',
    borderColor: 'hover:border-[#111111]',
    bgColor: 'bg-purple-50',
    items: ['Employee Training', 'Sales Enablement', 'Internal All-Hands'],
    description: 'Standardize brand presentation quality across your entire organization.',
  },
];

export default function TargetUsers() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider font-semibold shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>VERSATILE APPLICATIONS</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Built for anyone who presents ideas.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#666664] font-sans font-light max-w-lg mx-auto">
            Tailored narrative structures whether you are pitching to VCs or presenting in a seminar.
          </p>
        </div>

        {/* 4 Distinct Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className={`bg-white border border-[#E4E1DA] ${aud.borderColor} rounded-3xl p-6 flex flex-col justify-between transition-all group shadow-subtle hover:shadow-card`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${aud.color}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${aud.bgColor} ${aud.color}`}>
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#111111] mb-2">{aud.title}</h3>
                  <p className="text-xs text-[#666664] font-sans font-light leading-relaxed mb-6">
                    {aud.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EEE8] space-y-2">
                  {aud.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#111111] font-sans">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${aud.color} shrink-0`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
