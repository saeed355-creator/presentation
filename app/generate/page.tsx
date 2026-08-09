'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Wand2,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronDown,
  Layout,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { AudienceType, PurposeType, ToneType, ThemeType, StoryOutlineItem, SlideLayoutType } from '@/lib/types';
import { THEMES } from '@/lib/themes';
import { savePresentation, getSavedPresentations } from '@/lib/storage';
import { generateFallbackOutline, generateFallbackPresentation } from '@/lib/ai';

const AI_PIPELINE_STEPS = [
  'Parsing topic & target audience parameters...',
  'Constructing logical story outline & narrative flow...',
  'Generating contextual slide summaries & evidence points...',
  'Selecting dynamic slide layouts & visual diagrams...',
  'Compiling widescreen 16:9 presentation structure...',
];

const AUDIENCES: { id: AudienceType; label: string }[] = [
  { id: 'professional', label: 'Executive Board' },
  { id: 'business', label: 'Enterprise Management' },
  { id: 'investor', label: 'Venture Investors' },
  { id: 'student', label: 'Academic & Students' },
  { id: 'startup', label: 'Startup Team' },
  { id: 'general', label: 'General Audience' },
];

const PURPOSES: { id: PurposeType; label: string }[] = [
  { id: 'meeting', label: 'Inform & Educate' },
  { id: 'pitch', label: 'Investment Pitch' },
  { id: 'project', label: 'Project Roadmap' },
  { id: 'sales', label: 'Commercial Demo' },
];

const TONES: { id: ToneType; label: string }[] = [
  { id: 'persuasive', label: 'Visionary' },
  { id: 'professional', label: 'Analytical' },
  { id: 'minimal', label: 'Persuasive' },
  { id: 'academic', label: 'Academic' },
];

import PresentationBriefModal from '@/components/PresentationBriefModal';
import { PresentationBrief } from '@/lib/types';

function GenerateFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Config State - ALWAYS start with empty string topic to avoid landing-page text leaking
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState<AudienceType>('professional');
  const [purpose, setPurpose] = useState<PurposeType>('meeting');
  const [tone, setTone] = useState<ToneType>('professional');
  const [slideCount, setSlideCount] = useState<number>(10);
  const [theme, setTheme] = useState<ThemeType>('dark-violet');
  const [researchMode, setResearchMode] = useState<'quick' | 'standard' | 'deep'>('standard');
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [currentBrief, setCurrentBrief] = useState<PresentationBrief | null>(null);

  // Step 1: Config, Step 2: Outline Review, Step 3: Full Deck Generating
  const [step, setStep] = useState<'config' | 'outline' | 'generating'>('config');
  const [outline, setOutline] = useState<StoryOutlineItem[]>([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [recentDrafts, setRecentDrafts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setRecentDrafts(getSavedPresentations().slice(0, 3));
    const qTopic = searchParams.get('topic');
    if (qTopic) setTopic(decodeURIComponent(qTopic));
  }, [searchParams]);

  // Form Submit -> Opens Smart Presentation Brief Interview Modal
  const handleOpenBriefModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsBriefModalOpen(true);
  };

  // Outline Editing Actions
  const handleUpdateOutlineItem = (index: number, updated: Partial<StoryOutlineItem>) => {
    const nextOutline = [...outline];
    nextOutline[index] = { ...nextOutline[index], ...updated };
    setOutline(nextOutline);
  };

  const handleDeleteOutlineItem = (index: number) => {
    if (outline.length <= 3) return;
    const nextOutline = outline.filter((_, i) => i !== index);
    const reindexed = nextOutline.map((item, i) => ({ ...item, slideNumber: i + 1 }));
    setOutline(reindexed);
  };

  const handleMoveOutlineItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= outline.length) return;
    const nextOutline = [...outline];
    const temp = nextOutline[index];
    nextOutline[index] = nextOutline[targetIdx];
    nextOutline[targetIdx] = temp;
    const reindexed = nextOutline.map((item, i) => ({ ...item, slideNumber: i + 1 }));
    setOutline(reindexed);
  };

  const handleAddOutlineItem = () => {
    const newNumber = outline.length + 1;
    const newItem: StoryOutlineItem = {
      id: `outline-item-${Date.now()}`,
      slideNumber: newNumber,
      title: `Strategic Horizon ${newNumber}`,
      summary: 'Outlining phased rollout and growth targets.',
      layout: 'solution',
    };
    setOutline([...outline, newItem]);
  };

  const handleGenerateOutline = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsGeneratingOutline(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          audience,
          purpose,
          slideCount,
          tone,
          theme,
          mode: 'outline',
        }),
      });
      const data = await res.json();

      let items = data.outline;
      if (!items || items.length === 0) {
        items = generateFallbackOutline(topic, audience, purpose, slideCount);
      }
      setOutline(items);
      setStep('outline');
    } catch (err) {
      console.warn('Outline generation notice, using story engine:', err);
      const fallbackItems = generateFallbackOutline(topic, audience, purpose, slideCount);
      setOutline(fallbackItems);
      setStep('outline');
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const handleGenerateFullPresentation = async () => {
    setStep('generating');
    setCurrentStepIdx(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= AI_PIPELINE_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 650);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          audience,
          purpose,
          slideCount: outline.length > 0 ? outline.length : slideCount,
          tone,
          theme,
          mode: 'full',
          outline,
        }),
      });
      const data = await res.json();

      let deck = data.presentation;
      if (!deck || !data.success) {
        setErrorMessage(data.error || 'Unable to generate a presentation for this topic. Please try again.');
        setStep('config');
        return;
      }

      savePresentation(deck);
      router.push(`/editor/${deck.id}`);
    } catch (err: any) {
      console.error('Full generation error:', err);
      setErrorMessage(err?.message || 'Unable to generate a presentation for this topic. Please try again.');
      setStep('config');
    }
  };

  // Brief Confirmed -> Triggers Full Deck Generation Pipeline
  const handleConfirmBrief = async (brief: PresentationBrief) => {
    setIsBriefModalOpen(false);
    setCurrentBrief(brief);
    setErrorMessage(null);
    setStep('generating');
    setCurrentStepIdx(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= AI_PIPELINE_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 650);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: brief.topic,
          audience: brief.audience,
          purpose: brief.purpose,
          slideCount: brief.slideCount,
          tone: brief.tone,
          theme,
          mode: 'full',
          researchMode: brief.researchLevel,
          brief,
        }),
      });
      const data = await res.json();

      let deck = data.presentation;
      if (!deck || !data.success) {
        setErrorMessage(data.error || 'Unable to generate a presentation for this topic. Please try again.');
        setStep('config');
        return;
      }

      savePresentation(deck);
      router.push(`/editor/${deck.id}`);
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err?.message || 'Unable to generate a presentation for this topic. Please try again.');
      setStep('config');
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full py-8 space-y-12">
      {/* STEP 1: STITCH IMAGE 2 GENERATION DASHBOARD */}
      {step === 'config' && (
        <div className="space-y-12">
          {/* Header Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#111111] tracking-tight">
              What are we building today?
            </h1>
            <p className="text-base text-[#666664] font-light max-w-xl mx-auto font-sans">
              Provide a topic and context, and our AI will craft a stunning presentation ready for your next big meeting.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between text-red-700 text-sm font-sans">
              <div className="flex items-center gap-2">
                <span className="font-bold">Generation Notice:</span>
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-xs font-mono font-semibold underline hover:no-underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Elevated White Card Container */}
          <div className="bg-white border border-[#E4E1DA] rounded-3xl p-8 sm:p-12 shadow-card max-w-3xl mx-auto space-y-8">
            <form onSubmit={handleOpenBriefModal} className="space-y-8">
              {/* CORE TOPIC */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#666664] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                  <span>CORE TOPIC</span>
                </div>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter any topic (e.g., Tata Sierra EV, Solar Energy in India, Cybersecurity Best Practices, History of Space Program)..."
                  className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-2xl p-4 text-[#111111] text-base focus:outline-none transition-all resize-none font-sans"
                />
              </div>

              {/* 2-Column Selects: AUDIENCE & PURPOSE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0EEE8]">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                    AUDIENCE
                  </label>
                  <div className="relative">
                    <select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value as AudienceType)}
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#111111] appearance-none focus:outline-none"
                    >
                      {AUDIENCES.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#666664] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                    PURPOSE
                  </label>
                  <div className="relative">
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as PurposeType)}
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#111111] appearance-none focus:outline-none"
                    >
                      {PURPOSES.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#666664] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* LENGTH (SLIDES) & VISUAL AESTHETIC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0EEE8]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-mono font-bold text-[#666664] uppercase">
                      LENGTH (SLIDES)
                    </label>
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4F4F0] px-2.5 py-0.5 rounded-full border border-[#E4E1DA]">
                      {slideCount}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[6, 8, 10, 12, 15].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSlideCount(num)}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                          slideCount === num
                            ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                            : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#666664]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                    VISUAL AESTHETIC
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'dark-violet', label: 'MINIMAL' },
                      { id: 'professional', label: 'CORPORATE' },
                      { id: 'warm-editorial', label: 'CREATIVE' },
                      { id: 'midnight-executive', label: 'BOLD' },
                    ].map((aest) => (
                      <button
                        key={aest.id}
                        type="button"
                        onClick={() => setTheme(aest.id as ThemeType)}
                        className={`px-3 py-2 rounded-full border text-[11px] font-bold uppercase transition-all ${
                          theme === aest.id
                            ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                            : 'bg-white border-[#E4E1DA] text-[#666664] hover:text-[#111111]'
                        }`}
                      >
                        {aest.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RESEARCH GROUNDING MODE */}
              <div className="pt-4 border-t border-[#F0EEE8] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold text-[#666664] uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2D7A58]" />
                    REAL-TIME WEB RESEARCH MODE
                  </label>
                  <span className="text-[10px] font-mono text-[#2D7A58] font-bold uppercase">
                    GOOGLE SEARCH GROUNDED
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'quick', title: 'QUICK', desc: 'Fast web grounding' },
                    { id: 'standard', title: 'STANDARD', desc: 'Balanced research & citations' },
                    { id: 'deep', title: 'DEEP RESEARCH', desc: 'Exhaustive cross-checking' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setResearchMode(m.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        researchMode === m.id
                          ? 'bg-[#F0F5F2] border-[#2D7A58] text-[#111111] shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#666664] hover:text-[#111111]'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-[#111111]">{m.title}</div>
                      <div className="text-[10px] font-light text-[#666664] mt-0.5">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Action Button */}
              <div className="pt-6 border-t border-[#F0EEE8] text-center space-y-2">
                <button
                  type="submit"
                  disabled={isGeneratingOutline}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider py-4 rounded-full shadow-card transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {isGeneratingOutline ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )}
                  <span>RESEARCH & GENERATE PRESENTATION</span>
                </button>
                <div className="text-[10px] font-mono text-[#666664]">
                  ⏱ Real-time web research + 16:9 presentation generation
                </div>
              </div>
            </form>
          </div>

          {/* Stitch Image 2 Recent Drafts Row */}
          {recentDrafts.length > 0 && (
            <div className="max-w-3xl mx-auto space-y-4 pt-6">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#666664] font-bold">
                <span>RECENT DRAFTS</span>
                <Link href="/presentations" className="hover:text-[#111111] transition-colors">
                  VIEW ALL
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentDrafts.map((draft) => (
                  <Link
                    key={draft.id}
                    href={`/editor/${draft.id}`}
                    className="bg-white border border-[#E4E1DA] p-4 rounded-2xl flex items-center gap-3 hover:border-[#111111] transition-all shadow-subtle group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F4F4F0] border border-[#E4E1DA] flex items-center justify-center text-[#111111] shrink-0 font-bold group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      📊
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-[#111111] truncate">{draft.title}</div>
                      <div className="text-[10px] font-mono text-[#666664]">Edited recently</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: STITCH IMAGE 3 INTERACTIVE STORY OUTLINE EDITOR */}
      {step === 'outline' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#666664] uppercase tracking-widest block mb-1">
                STAGE 2 OF 4
              </span>
              <h2 className="text-4xl font-serif font-extrabold text-[#111111] tracking-tight">
                Story Outline
              </h2>
              <p className="text-xs text-[#666664] font-sans font-light mt-1 max-w-xl">
                Review and refine the generated narrative structure before we design the slides. Drag to reorder, click to edit.
              </p>
            </div>

            <button
              onClick={() => setStep('config')}
              className="text-xs font-mono font-bold text-[#111111] hover:text-[#FF6B35] underline shrink-0"
            >
              ← Edit Topic
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Outline Stack (Left 8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {outline.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white border border-[#E4E1DA] rounded-2xl p-5 shadow-subtle space-y-2 group hover:border-[#111111] transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xs font-mono text-[#666664] font-bold">::</span>
                      <span className="text-xs font-mono text-[#666664] font-bold">0{idx + 1}</span>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateOutlineItem(idx, { title: e.target.value })}
                        className="font-serif font-bold text-base sm:text-lg text-[#111111] bg-transparent focus:outline-none focus:border-b border-[#111111] flex-1"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveOutlineItem(idx, 'up')}
                        className="p-1 rounded bg-[#F4F4F0] border border-[#E4E1DA] text-[#666664] hover:text-[#111111] disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === outline.length - 1}
                        onClick={() => handleMoveOutlineItem(idx, 'down')}
                        className="p-1 rounded bg-[#F4F4F0] border border-[#E4E1DA] text-[#666664] hover:text-[#111111] disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      {outline.length > 3 && (
                        <button
                          onClick={() => handleDeleteOutlineItem(idx)}
                          className="p-1 rounded bg-[#F4F4F0] border border-[#E4E1DA] text-[#666664] hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={item.summary}
                    onChange={(e) => handleUpdateOutlineItem(idx, { summary: e.target.value })}
                    className="w-full bg-transparent text-xs text-[#666664] font-sans font-light focus:outline-none focus:border-b border-[#111111] pl-10"
                  />
                </div>
              ))}

              <button
                onClick={handleAddOutlineItem}
                className="w-full border-2 border-dashed border-[#E4E1DA] hover:border-[#111111] rounded-2xl py-4 flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#111111] uppercase tracking-wider transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>ADD SLIDE</span>
              </button>
            </div>

            {/* Right Side AI Co-pilot Panel (Stitch Image 3 Right 4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#E4E1DA] rounded-3xl p-6 shadow-card space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#F0EEE8]">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  ✦
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#111111]">AI Co-pilot</h3>
                  <div className="text-[10px] font-mono text-[#666664] uppercase">SUGGESTIONS &amp; REFINEMENT</div>
                </div>
              </div>

              <p className="text-xs text-[#666664] font-sans leading-relaxed font-light">
                The current structure is logical, but leans slightly formal. Consider these structural adjustments to increase narrative tension.
              </p>

              {/* Suggestions Cards */}
              <div className="space-y-3">
                <div className="bg-[#F0F5F2] border border-[#8FAF9A]/40 p-3.5 rounded-xl space-y-1 text-xs">
                  <div className="font-mono text-[10px] font-bold text-[#2D7A58] uppercase flex items-center gap-1">
                    <span>💡 LEAD WITH THE PROBLEM</span>
                  </div>
                  <p className="text-[#111111] font-light">
                    Swap slide 01 and 02. Starting with friction points hooks the audience immediately.
                  </p>
                </div>

                <div className="bg-[#F0F5F2] border border-[#8FAF9A]/40 p-3.5 rounded-xl space-y-1 text-xs">
                  <div className="font-mono text-[10px] font-bold text-[#2D7A58] uppercase flex items-center gap-1">
                    <span>✏️ PUNCHIER TITLES</span>
                  </div>
                  <p className="text-[#111111] font-light">
                    Rewrite titles to be action-oriented. e.g., &quot;The Genesis of the Idea&quot; → &quot;Igniting the Spark&quot;.
                  </p>
                </div>
              </div>

              {/* ADJUST TONE Chips */}
              <div className="space-y-2 pt-2 border-t border-[#F0EEE8]">
                <div className="text-[10px] font-mono font-bold text-[#666664] uppercase">ADJUST TONE</div>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`px-3 py-1 rounded-full text-[11px] border font-sans transition-all ${
                        tone === t.id
                          ? 'bg-[#111111] border-[#111111] text-white font-bold'
                          : 'bg-white border-[#E4E1DA] text-[#666664]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-emerald-600 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>READY TO ASSIST</span>
              </div>
            </div>
          </div>

          {/* Stitch Image 3 Bottom Dual Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E4E1DA]">
            <button
              onClick={() => handleGenerateOutline({ preventDefault: () => {} } as any)}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F0EEE8] text-[#111111] font-sans text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-[#E4E1DA] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REGENERATE OUTLINE</span>
            </button>

            <button
              onClick={handleGenerateFullPresentation}
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-full shadow-card transition-all"
            >
              <span>PROCEED TO DESIGN</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PIPELINE */}
      {step === 'generating' && (
        <div className="bg-white border border-[#E4E1DA] rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-card max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#111111] text-white flex items-center justify-center mx-auto">
            <Wand2 className="w-7 h-7 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-[#111111]">AI Story Engine Active</h2>
            <p className="text-xs font-mono text-[#666664] mt-2 uppercase tracking-wider">{AI_PIPELINE_STEPS[currentStepIdx]}</p>
          </div>

          <div className="max-w-md mx-auto space-y-2.5 text-left bg-[#F4F4F0] border border-[#E4E1DA] p-5 rounded-2xl text-xs font-mono">
            {AI_PIPELINE_STEPS.map((stepText, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between transition-opacity ${
                  idx <= currentStepIdx ? 'opacity-100 text-[#111111]' : 'opacity-30 text-[#666664]'
                }`}
              >
                <span>{stepText}</span>
                {idx < currentStepIdx && <CheckCircle2 className="w-4 h-4 text-[#2D7A58]" />}
                {idx === currentStepIdx && <RefreshCw className="w-3.5 h-3.5 text-[#111111] animate-spin" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SMART PRESENTATION BRIEF INTERVIEW MODAL */}
      <PresentationBriefModal
        isOpen={isBriefModalOpen}
        topic={topic}
        onClose={() => setIsBriefModalOpen(false)}
        onConfirmBrief={handleConfirmBrief}
      />
    </div>
  );
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-[#E4E1DA]">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#666664] hover:text-[#111111] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <span className="text-[10px] font-mono text-[#111111] bg-white border border-[#E4E1DA] px-3 py-1 rounded-full uppercase font-bold">
          ✦ PRESENT.AI STORY ENGINE
        </span>
      </div>

      <Suspense fallback={
        <div className="py-20 text-center text-xs font-mono text-[#666664]">
          Loading Present.AI Dashboard...
        </div>
      }>
        <GenerateFormContent />
      </Suspense>

      <div className="text-center text-xs text-[#666664] font-mono py-4 border-t border-[#E4E1DA] max-w-5xl mx-auto w-full">
        Present.AI Story Engine // IDEA → STORY OUTLINE → SLIDES → DESIGN → EXPORT
      </div>
    </div>
  );
}
