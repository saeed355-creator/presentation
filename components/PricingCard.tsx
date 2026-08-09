'use client';

import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthProvider';

const PLANS = [
  {
    name: 'FREE',
    price: '₹0',
    period: 'forever free',
    description: 'Perfect for trying out the AI presentation story engine.',
    features: [
      '3 AI Presentation generations/mo',
      'Standard presentation templates',
      'Basic PDF Export',
      'Web presentation player',
    ],
    cta: 'START FREE',
    popular: false,
    badge: 'FREE TIER',
  },
  {
    name: 'PRO',
    price: '₹299',
    period: 'per month',
    description: 'For professionals, founders, and students who present frequently.',
    features: [
      'Unlimited AI Story generations',
      'All 6 Premium Design Themes',
      'Native Widescreen .PPTX Export',
      'AI Command Bar single-slide editor',
      'Custom theme palette controls',
      'Priority AI generation speeds',
    ],
    cta: 'GET PRO ACCESS',
    popular: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'TEAM',
    price: 'Custom',
    period: 'per organization',
    description: 'For teams requiring shared presentation assets & enterprise admin.',
    features: [
      'Everything in Pro tier',
      'Team workspace & shared decks',
      'Custom brand color & logo templates',
      'Role-based access controls',
      'Dedicated API integration',
      'Priority support SLA',
    ],
    cta: 'CONTACT SALES',
    popular: false,
    badge: 'ENTERPRISE',
  },
];

export default function PricingCard() {
  const { requireAuth } = useAuth();

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F4F4F0] border-t border-[#E4E1DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E4E1DA] text-[11px] font-mono text-[#111111] uppercase tracking-wider font-semibold shadow-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
            <span>PROPOSED BUSINESS MODEL</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
            Simple pricing. Scalable business.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#666664] font-sans font-light max-w-lg mx-auto">
            Clear tier structure designed to scale from individual creators to enterprise teams.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all shadow-subtle ${
                plan.popular
                  ? 'border-2 border-[#111111] shadow-card scale-[1.02]'
                  : 'border border-[#E4E1DA] hover:border-[#111111]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[10px] font-mono font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-card">
                  ★ MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#666664] font-bold uppercase tracking-widest">
                    {plan.badge}
                  </span>
                  <span className="text-xs text-[#111111] font-mono font-bold">{plan.name}</span>
                </div>

                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#666664] ml-2 font-mono">{plan.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#666664] font-sans font-light mb-6">
                  {plan.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-[#F0EEE8]">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#111111] font-sans font-medium">
                      <Check className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F0EEE8]">
                <button
                  onClick={() => requireAuth()}
                  className={`w-full inline-flex items-center justify-center gap-2 font-sans text-xs font-extrabold uppercase tracking-wider py-4 rounded-full transition-all ${
                    plan.popular
                      ? 'bg-[#111111] text-white hover:bg-[#2A2A2A] shadow-card'
                      : 'bg-[#F4F4F0] border border-[#E4E1DA] text-[#111111] hover:bg-[#EAE8E2]'
                  }`}
                >
                  {plan.popular && <Sparkles className="w-3.5 h-3.5 text-white" />}
                  <span>{plan.cta}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
