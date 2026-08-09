'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Activity,
  Layers,
  LayoutGrid,
  Image as ImageIcon,
  RotateCcw,
  Check,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';

// Animation Sequence Stages:
// 0: Clean Slide Canvas
// 1: Moving to Title -> "✦ Adding title"
// 2: Title Appears -> Moving to Layout -> "◇ Choosing layout"
// 3: Layout Rearranges -> Moving to Visual -> "◌ Inserting visual"
// 4: Visual Fades & Scales -> Moving to Content -> "✓ Aligning content"
// 5: Grid Snapping -> Completed Polished Slide

type AnimationStage = 0 | 1 | 2 | 3 | 4 | 5;

const STAGE_LABELS: Record<AnimationStage, string | null> = {
  0: null,
  1: '✦ Adding title',
  2: '◇ Choosing layout',
  3: '◌ Inserting visual',
  4: '✓ Aligning content',
  5: null,
};

// Target cursor coordinates (% relative to canvas area) for each stage
const CURSOR_TARGETS: Record<AnimationStage, { x: string; y: string; opacity: number }> = {
  0: { x: '92%', y: '90%', opacity: 0 },
  1: { x: '24%', y: '24%', opacity: 1 }, // Title Area
  2: { x: '82%', y: '16%', opacity: 1 }, // Layout Selector Tool
  3: { x: '72%', y: '50%', opacity: 1 }, // Visual Box Region
  4: { x: '28%', y: '72%', opacity: 1 }, // Content Cards Region
  5: { x: '92%', y: '88%', opacity: 0.3 }, // Completed retreat
};

const DEMO_SLIDES = [
  {
    id: 1,
    tag: 'STORY ARC 01',
    title: 'Artificial Intelligence in Healthcare',
    subtitle: 'Transforming Patient Care & Clinical Diagnostics',
    metricLabel: 'Diagnostic Speed',
    metricValue: '4.8x Faster',
    accuracy: '99.4% Accuracy',
    bullet1: 'Real-time multi-modal medical imaging analysis',
    bullet2: 'Automated clinical documentation & notes synthesis',
  },
  {
    id: 2,
    tag: 'STORY ARC 02',
    title: 'Clinical Bottlenecks & Data Overload',
    subtitle: 'Physicians spend 4.5 hrs daily on documentation',
    metricLabel: 'Burnout Rate',
    metricValue: '62% Reduction',
    accuracy: '18 Hrs Saved/Wk',
    bullet1: 'Eliminates administrative backlog across departments',
    bullet2: 'Instant patient history Summarization & alerts',
  },
  {
    id: 3,
    tag: 'STORY ARC 03',
    title: 'Enterprise Adoption & Proven ROI',
    subtitle: 'Deployed across 120+ top-tier hospital networks',
    metricLabel: 'Cost Saved',
    metricValue: '$4.2M / Year',
    accuracy: '100% HIPAA Compliant',
    bullet1: 'Seamless EHR integration with existing hospital software',
    bullet2: 'Zero learning curve for diagnostic specialists',
  },
];

export default function HeroCanvas() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [stage, setStage] = useState<AnimationStage>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = DEMO_SLIDES[activeSlideIndex];

  // Auto sequence driver
  const advanceStage = useCallback(() => {
    setStage((prev) => {
      if (prev === 5) return 0;
      return (prev + 1) as AnimationStage;
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage(5);
      return;
    }

    if (!isPlaying) return;

    // Stage timing configuration (ms):
    // Stage 0: 600ms (clean canvas before cursor enters)
    // Stage 1: 1200ms (adding title)
    // Stage 2: 1200ms (choosing layout)
    // Stage 3: 1300ms (inserting visual)
    // Stage 4: 1200ms (aligning grid)
    // Stage 5: 3800ms (hold completed slide)
    const timings: Record<AnimationStage, number> = {
      0: 600,
      1: 1200,
      2: 1200,
      3: 1300,
      4: 1200,
      5: 3800,
    };

    timerRef.current = setTimeout(() => {
      advanceStage();
    }, timings[stage]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stage, isPlaying, advanceStage, shouldReduceMotion]);

  // Pause sequence when tab is inactive to save CPU
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStage(0);
    setIsPlaying(true);
  };

  const handleSelectSlide = (index: number) => {
    setActiveSlideIndex(index);
    handleReplay();
  };

  const cursorTarget = CURSOR_TARGETS[stage];
  const currentLabel = STAGE_LABELS[stage];

  // Visual element visibility flags based on sequence stage
  const showTitle = stage >= 1;
  const isSplitLayout = stage >= 2;
  const showVisual = stage >= 3;
  const isGridAligned = stage >= 4;
  const isCompleted = stage === 5;

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 sm:mt-12 select-none">
      {/* Outer Card Editor Container */}
      <div className="relative bg-white border border-[#E4E1DA] rounded-2xl overflow-hidden shadow-card">
        {/* Editor Window Topbar */}
        <div className="bg-[#F0EEE8] px-4 py-3 border-b border-[#E4E1DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4E1DA]" />
            </div>
            <span className="ml-3 text-xs font-mono text-[#6B6B68] hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              AI Presentation Canvas // AI Assistant Active
            </span>
          </div>

          {/* Interactive Topbar Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Step Sequence Timeline Indicator */}
            <div className="hidden md:flex items-center gap-1 bg-white/70 border border-[#E4E1DA] rounded-full px-2.5 py-1 text-[10px] font-mono text-[#666664]">
              <span className={stage >= 1 ? 'text-[#FF6B35] font-bold' : 'opacity-40'}>Title</span>
              <span className="text-[#D1CDC4]">•</span>
              <span className={stage >= 2 ? 'text-[#FF6B35] font-bold' : 'opacity-40'}>Layout</span>
              <span className="text-[#D1CDC4]">•</span>
              <span className={stage >= 3 ? 'text-[#FF6B35] font-bold' : 'opacity-40'}>Visual</span>
              <span className="text-[#D1CDC4]">•</span>
              <span className={stage >= 4 ? 'text-[#FF6B35] font-bold' : 'opacity-40'}>Grid</span>
            </div>

            {/* Replay AI Animation Button */}
            <button
              onClick={handleReplay}
              title="Replay AI Generation Sequence"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#E4E1DA] bg-white hover:bg-[#F4F4F0] text-[11px] font-mono font-medium text-[#111111] transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#FF6B35]" />
              <span className="hidden sm:inline">Replay AI</span>
            </button>

            <span className="text-[11px] font-mono text-[#171717] bg-[#E4E1DA] px-2 py-0.5 rounded">
              Slide {activeSlideIndex + 1} of {DEMO_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Main Presentation Editor Workspace */}
        <div className="flex flex-col sm:flex-row min-h-[380px] sm:min-h-[420px] bg-[#FAF9F5]">
          {/* Left Slide Thumbnail Navigation Sidebar */}
          <div className="w-full sm:w-48 bg-[#F4F4F0] border-b sm:border-b-0 sm:border-r border-[#E4E1DA] p-3 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto">
            <div className="hidden sm:flex items-center justify-between pb-2 mb-1 border-b border-[#E4E1DA] text-[10px] font-mono text-[#666664] uppercase tracking-wider font-semibold">
              <span>SLIDES DECK</span>
              <SlidersHorizontal className="w-3 h-3" />
            </div>

            {DEMO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSelectSlide(idx)}
                className={`flex-shrink-0 sm:w-full text-left p-2.5 rounded-xl border transition-all duration-200 ${
                  activeSlideIndex === idx
                    ? 'bg-white border-[#FF6B35] shadow-subtle'
                    : 'bg-[#F4F4F0] hover:bg-white/60 border-transparent text-[#666664]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#111111] mb-1">
                  <span>0{s.id}</span>
                  {activeSlideIndex === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  )}
                </div>
                <div className="text-[11px] font-sans font-semibold text-[#111111] truncate">
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Central Active Slide Canvas Area */}
          <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between relative bg-white min-h-[340px]">
            {/* Alignment Grid Overlay Lines (Fades in during Step 4: Aligning Content) */}
            <AnimatePresence>
              {stage === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between"
                >
                  <div className="w-full border-b border-dashed border-[#FF6B35]/40 h-1/2" />
                  <div className="absolute inset-y-0 left-1/2 border-r border-dashed border-[#FF6B35]/40" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[9px] font-mono text-[#FF6B35]">
                    <span>[GRID SNAP: 12px]</span>
                    <span>[ALIGNED: 100%]</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide Top Tag Badge & Layout Selector Indicator */}
            <div className="flex items-center justify-between mb-4 z-0">
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {showTitle ? (
                    <motion.span
                      key="tag-visible"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-[10px] sm:text-xs font-mono tracking-wider text-[#FF6B35] uppercase bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-3 py-1 rounded-full font-semibold"
                    >
                      {slide.tag}
                    </motion.span>
                  ) : (
                    <motion.div
                      key="tag-skeleton"
                      className="h-6 w-24 bg-[#F0EEE8] rounded-full animate-pulse"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Top Right Layout Mode Tool Badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-300 ${
                  stage === 2
                    ? 'bg-[#111111] text-white border-[#111111] scale-105 shadow-md'
                    : 'bg-[#F7F6F2] text-[#666664] border-[#E4E1DA]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isSplitLayout ? 'Split Grid' : 'Standard Stack'}
                </span>
              </div>
            </div>

            {/* Main Slide Content Grid Body */}
            <div className="my-auto z-0 transition-all duration-500">
              <div
                className={`grid gap-6 transition-all duration-500 ${
                  isSplitLayout ? 'grid-cols-1 md:grid-cols-12 items-center' : 'grid-cols-1'
                }`}
              >
                {/* Left Header & Text Column */}
                <div className={isSplitLayout ? 'md:col-span-7 space-y-4' : 'space-y-4 max-w-xl'}>
                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    {showTitle ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <h3 className="text-xl sm:text-3xl font-serif font-extrabold text-[#111111] tracking-tight leading-tight">
                          {slide.title}
                        </h3>
                        <p className="text-xs sm:text-base text-[#666664] font-light mt-1.5 leading-relaxed">
                          {slide.subtitle}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-2 pt-2">
                        <div className="h-7 bg-[#F0EEE8] rounded-md w-4/5 animate-pulse" />
                        <div className="h-4 bg-[#F0EEE8] rounded-md w-3/5 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Bullet Highlights / Content Cards */}
                  <div className="pt-2">
                    {showTitle ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{
                          opacity: 1,
                          y: isGridAligned ? 0 : 4,
                          scale: isGridAligned ? 1 : 0.99,
                        }}
                        transition={{ duration: 0.4 }}
                        className="space-y-2"
                      >
                        <div className="p-3 rounded-xl bg-[#F7F6F2] border border-[#E4E1DA] flex items-center gap-2.5 text-xs text-[#111111] font-medium shadow-subtle">
                          <CheckCircle2 className="w-4 h-4 text-[#2D7A58] flex-shrink-0" />
                          <span>{slide.bullet1}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F7F6F2] border border-[#E4E1DA] flex items-center gap-2.5 text-xs text-[#111111] font-medium shadow-subtle">
                          <CheckCircle2 className="w-4 h-4 text-[#2D7A58] flex-shrink-0" />
                          <span>{slide.bullet2}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-10 bg-[#F0EEE8] rounded-xl w-full animate-pulse" />
                        <div className="h-10 bg-[#F0EEE8] rounded-xl w-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Visual / Metric Chart Box */}
                {isSplitLayout && (
                  <div className="md:col-span-5">
                    {showVisual ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{
                          opacity: 1,
                          scale: isGridAligned ? 1 : 0.98,
                          y: isGridAligned ? 0 : 4,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="bg-[#F7F6F2] border border-[#E4E1DA] p-4 sm:p-5 rounded-2xl shadow-card space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#666664] uppercase tracking-wider flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-[#FF6B35]" />
                            VISUAL GRAPHIC
                          </span>
                          <span className="text-[10px] font-mono text-[#2D7A58] bg-[#2D7A58]/10 border border-[#2D7A58]/20 px-2 py-0.5 rounded font-semibold">
                            {slide.accuracy}
                          </span>
                        </div>

                        {/* Sparkline Graphic Bars */}
                        <div className="bg-white border border-[#E4E1DA] p-3 rounded-xl space-y-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs text-[#666664] font-medium">
                              {slide.metricLabel}
                            </span>
                            <span className="text-lg font-extrabold text-[#111111] font-mono">
                              {slide.metricValue}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-[#F0EEE8] rounded-full overflow-hidden flex gap-1 p-0.5">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: '75%' }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full bg-[#FF6B35] rounded-full"
                            />
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: '25%' }}
                              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                              className="h-full bg-[#8FAF9A] rounded-full"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#666664] font-mono pt-1">
                          <span className="flex items-center gap-1 text-[#2D7A58] font-bold">
                            <TrendingUp className="w-3.5 h-3.5" /> Optimal Target
                          </span>
                          <span>Verified AI Output</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-36 bg-[#F0EEE8] rounded-2xl border border-dashed border-[#D1CDC4] flex items-center justify-center text-xs font-mono text-[#666664]">
                        <span>[Visual Area Ready]</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Flow Ribbon & Status Pill */}
            <div className="pt-4 border-t border-[#E4E1DA] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666664] z-0">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-[#111111] font-semibold">RAW IDEA</span>
                <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
                <span className="text-[#FF6B35] font-semibold">AI ACTIONS</span>
                <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
                <span className="text-[#111111] font-semibold">PROFESSIONAL SLIDE</span>
              </div>

              {/* Status Pill Indicator */}
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D7A58]/10 border border-[#2D7A58]/30 text-[11px] font-mono text-[#2D7A58] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    ✦ Slide Built in 1.4s
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#666664]">
                    <span className="w-2 h-2 rounded-full bg-[#8FAF9A] animate-pulse" />
                    <span>100% Native PPTX & PDF Export</span>
                  </span>
                )}
              </div>
            </div>

            {/* CUSTOM AI CURSOR & FLOATING ACTION BADGE */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ left: '92%', top: '90%', opacity: 0 }}
                animate={{
                  left: cursorTarget.x,
                  top: cursorTarget.y,
                  opacity: cursorTarget.opacity,
                }}
                transition={{
                  duration: stage === 0 ? 0.4 : 0.8,
                  ease: [0.25, 0.1, 0.25, 1.0], // smooth cubic-bezier curve
                }}
                className="absolute z-30 pointer-events-none transform -translate-x-1 -translate-y-1"
              >
                {/* Sleek SVG Mouse Cursor */}
                <div className="relative">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md"
                  >
                    <path
                      d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
                      fill="#111111"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Tiny Glowing AI Sparkle Ring attached to Cursor Tip */}
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-sm animate-pulse">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>

                  {/* Compact Glassmorphism Floating Action Label */}
                  <AnimatePresence mode="wait">
                    {currentLabel && (
                      <motion.div
                        key={currentLabel}
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-6 top-1 bg-[#111111]/90 text-white backdrop-blur-md text-[11px] font-mono border border-white/20 shadow-xl px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>{currentLabel}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

