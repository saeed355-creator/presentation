'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, Activity } from 'lucide-react';

const DEMO_SLIDES = [
  {
    step: '01 Introduction',
    title: 'Artificial Intelligence in Healthcare',
    subtitle: 'Transforming Patient Care & Clinical Diagnostics',
    metric: { label: 'Diagnostic Speed', value: '4.8x Faster' },
    tag: 'STORY ARC 01',
  },
  {
    step: '02 Clinical Bottlenecks',
    title: 'The Data & Overload Challenge',
    subtitle: 'Physicians spend 4.5 hrs daily on documentation',
    metric: { label: 'Burnout Rate', value: '62%' },
    tag: 'STORY ARC 02',
  },
  {
    step: '03 AI Solution Architecture',
    title: 'Neural Diagnosis & Automated Synthesis',
    subtitle: 'Real-time multi-modal medical imaging analysis',
    metric: { label: 'Accuracy Rate', value: '99.4%' },
    tag: 'STORY ARC 03',
  },
  {
    step: '04 Real-World Impact',
    title: 'Enterprise Adoption & ROI',
    subtitle: 'Deployed across 120+ hospital networks',
    metric: { label: 'Time Reclaimed', value: '18 Hrs/Wk' },
    tag: 'STORY ARC 04',
  },
];

export default function HeroCanvas() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DEMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = DEMO_SLIDES[activeSlide];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 sm:mt-12">
      <div className="relative bg-white border border-[#E4E1DA] rounded-2xl overflow-hidden shadow-card">
        {/* Window Topbar */}
        <div className="bg-[#F0EEE8] px-4 py-3 border-b border-[#E4E1DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]"></div>
            <span className="ml-3 text-xs font-mono text-[#6B6B68] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
              AI Story Engine // Interactive Canvas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#171717] bg-[#E4E1DA] px-2 py-0.5 rounded">
              Slide {activeSlide + 1} of {DEMO_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Presentation Canvas View */}
        <div className="p-6 sm:p-10 min-h-[340px] sm:min-h-[400px] flex flex-col justify-between relative bg-white">
          {/* Top Tag & Progress Line */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono tracking-wider text-[#FF6B35] uppercase bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-3 py-1 rounded-full">
              {slide.tag}
            </span>
            <div className="flex gap-1.5">
              {DEMO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? 'w-8 bg-[#FF6B35]' : 'w-2 bg-[#E4E1DA]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Animated Content Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-3 my-auto"
            >
              <div className="text-xs font-mono text-[#6B6B68] uppercase tracking-widest">
                {slide.step}
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight">
                {slide.title}
              </h3>

              <p className="text-sm sm:text-lg text-[#6B6B68] max-w-2xl font-light">
                {slide.subtitle}
              </p>

              {/* Dynamic Metric Highlight Card */}
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <div className="bg-[#F7F6F2] border border-[#E4E1DA] p-4 rounded-xl flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B6B68]">{slide.metric.label}</div>
                    <div className="text-lg font-bold text-[#171717] font-mono">{slide.metric.value}</div>
                  </div>
                </div>

                <div className="bg-[#F7F6F2] border border-[#E4E1DA] p-4 rounded-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8FAF9A]" />
                  <span className="text-xs text-[#171717] font-medium">Story & Layout Applied</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Flow Ribbon */}
          <div className="pt-6 border-t border-[#E4E1DA] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B68]">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-[#171717] font-semibold">IDEA</span>
              <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
              <span className="text-[#FF6B35] font-semibold">AI STORY</span>
              <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
              <span className="text-[#171717] font-semibold">PRESENTATION</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FAF9A]"></span>
              <span className="text-[#171717] font-medium">100% Native PPTX & PDF Export</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
