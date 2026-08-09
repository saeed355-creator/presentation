'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Eye,
  Check,
  RefreshCw,
  LogOut,
  Mic,
  Undo,
  Redo,
  Share2,
  Sparkles,
  Presentation,
  History,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { Presentation as PresentationType, Slide, SlideLayoutType, ThemeType } from '@/lib/types';
import { THEMES } from '@/lib/themes';
import { getPresentationById, savePresentation } from '@/lib/storage';
import { generateFallbackPresentation } from '@/lib/ai';
import { useAuth } from '@/components/AuthProvider';
import SlideThumbnail from '@/components/editor/SlideThumbnail';
import PresentationCanvas from '@/components/editor/PresentationCanvas';
import AICommandBar from '@/components/editor/AICommandBar';
import DesignPanel from '@/components/editor/DesignPanel';
import SourcesPanel from '@/components/editor/SourcesPanel';
import ExportModal from '@/components/editor/ExportModal';
import PracticeCoachModal from '@/components/editor/PracticeCoachModal';

export default function EditorPage() {
  const params = useParams();
  const id = (params?.id as string) || 'demo-deck';
  const { logout } = useAuth();

  const [presentation, setPresentation] = useState<PresentationType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeRightPanel, setActiveRightPanel] = useState<'design' | 'sources'>('design');

  useEffect(() => {
    let deck = getPresentationById(id);
    if (!deck) {
      deck = generateFallbackPresentation('Q4 Strategy Deck', 'professional', 'meeting', 8, 'professional', 'dark-violet');
      deck.id = id;
      savePresentation(deck);
    }
    setPresentation(deck);
  }, [id]);

  if (!presentation) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] text-[#111111] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#111111]" />
          <span>Loading Present.AI Studio Workspace...</span>
        </div>
      </div>
    );
  }

  const activeTheme = THEMES[presentation.theme] || THEMES['dark-violet'];
  const activeSlide = presentation.slides[activeSlideIndex] || presentation.slides[0];

  const handleUpdateActiveSlide = (updated: Partial<Slide>) => {
    const updatedSlides = [...presentation.slides];
    updatedSlides[activeSlideIndex] = {
      ...updatedSlides[activeSlideIndex],
      ...updated,
    };
    const updatedDeck = { ...presentation, slides: updatedSlides };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
  };

  const handleUpdateSlideFull = (newSlide: Slide) => {
    const updatedSlides = [...presentation.slides];
    updatedSlides[activeSlideIndex] = newSlide;
    const updatedDeck = { ...presentation, slides: updatedSlides };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
  };

  const handleChangeTheme = (newTheme: ThemeType) => {
    const updatedDeck = { ...presentation, theme: newTheme };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
  };

  const handleChangeLayout = (newLayout: SlideLayoutType) => {
    handleUpdateActiveSlide({ layout: newLayout });
  };

  const handleAddSlide = () => {
    const newSlideNumber = presentation.slides.length + 1;
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      slideNumber: newSlideNumber,
      title: `New Slide 0${newSlideNumber}`,
      subtitle: 'Add subtitle here',
      layout: 'solution',
      content: ['Actionable key point 1', 'Strategic takeaway 2'],
      speakerNotes: 'Notes for presentation flow.',
    };

    const updatedDeck = {
      ...presentation,
      slideCount: presentation.slides.length + 1,
      slides: [...presentation.slides, newSlide],
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
    setActiveSlideIndex(presentation.slides.length);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = presentation.slides[index];
    const duplicated: Slide = {
      ...target,
      id: `slide-${Date.now()}`,
      slideNumber: index + 2,
      title: `${target.title} (Copy)`,
    };

    const updatedSlides = [...presentation.slides];
    updatedSlides.splice(index + 1, 0, duplicated);

    const renumbered = updatedSlides.map((s, idx) => ({
      ...s,
      slideNumber: idx + 1,
    }));

    const updatedDeck = {
      ...presentation,
      slideCount: renumbered.length,
      slides: renumbered,
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
    setActiveSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (presentation.slides.length <= 1) return;

    const filtered = presentation.slides.filter((_, idx) => idx !== index);
    const renumbered = filtered.map((s, idx) => ({
      ...s,
      slideNumber: idx + 1,
    }));

    const updatedDeck = {
      ...presentation,
      slideCount: renumbered.length,
      slides: renumbered,
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);

    if (activeSlideIndex >= renumbered.length) {
      setActiveSlideIndex(renumbered.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] font-sans flex flex-col h-screen overflow-hidden select-none">
      {/* Studio Top Control Navigation Bar */}
      <header className="h-14 bg-white border-b border-[#E4E1DA] px-4 flex items-center justify-between shrink-0 z-30 shadow-subtle">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif font-extrabold text-base tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-card">
              P
            </div>
            <span>Present.AI</span>
          </Link>

          <div className="h-4 w-px bg-[#E4E1DA]" />

          <div className="flex items-center gap-2 text-xs">
            <button className="p-1 rounded text-[#666664] hover:text-[#111111]">
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded text-[#666664] hover:text-[#111111]">
              <Redo className="w-3.5 h-3.5" />
            </button>
            <span className="bg-[#F0EEE8] border border-[#E4E1DA] text-[#666664] px-2 py-0.5 rounded font-bold text-[10px] uppercase">
              DRAFT
            </span>
            <span className="font-serif font-bold text-sm text-[#111111] max-w-xs truncate">
              {presentation.title}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <Check className="w-3 h-3" />
              Saved just now
            </span>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveRightPanel(activeRightPanel === 'sources' ? 'design' : 'sources')}
            className={`inline-flex items-center gap-1.5 text-xs font-sans font-bold px-3.5 py-2 rounded-xl border transition-all ${
              activeRightPanel === 'sources'
                ? 'bg-[#2D7A58] text-white border-[#2D7A58]'
                : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#2D7A58]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Research Sources</span>
          </button>

          <button
            onClick={() => setIsPracticeOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#F4F4F0] border border-[#E4E1DA] hover:border-[#111111] text-[#111111] font-sans text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-subtle"
          >
            <Mic className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Practice Coach</span>
          </button>

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`inline-flex items-center gap-1.5 text-xs font-sans font-bold px-3.5 py-2 rounded-xl border transition-all ${
              isPreviewMode
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white border-[#E4E1DA] text-[#666664] hover:text-[#111111]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Edit Mode' : 'Preview'}</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-5 py-2 rounded-full shadow-card transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT</span>
          </button>

          <button
            onClick={logout}
            title="Log Out"
            className="p-2 rounded-full border border-[#E4E1DA] text-[#666664] hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 4-Column Studio Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Tools Navigation Bar */}
        {!isPreviewMode && (
          <div className="w-16 bg-white border-r border-[#E4E1DA] flex flex-col items-center py-4 space-y-6 shrink-0 z-20 shadow-subtle">
            <Link href="/generate" title="Editor" className="p-2.5 rounded-xl bg-[#EAE8E2] text-[#111111] shadow-subtle">
              <Presentation className="w-4 h-4" />
            </Link>
            <Link href="/presentations" title="History" className="p-2.5 rounded-xl text-[#666664] hover:text-[#111111] hover:bg-[#F0EEE8]">
              <History className="w-4 h-4" />
            </Link>
            <Link href="/settings" title="Settings" className="p-2.5 rounded-xl text-[#666664] hover:text-[#111111] hover:bg-[#F0EEE8]">
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Slide Thumbnail List Column */}
        {!isPreviewMode && (
          <SlideThumbnail
            slides={presentation.slides}
            activeSlideIndex={activeSlideIndex}
            theme={activeTheme}
            onSelectSlide={setActiveSlideIndex}
            onDuplicateSlide={handleDuplicateSlide}
            onDeleteSlide={handleDeleteSlide}
            onAddSlide={handleAddSlide}
          />
        )}

        {/* Center Presentation Widescreen Canvas */}
        <div className="flex-1 relative flex flex-col bg-[#EAE8E2]">
          <PresentationCanvas
            slide={activeSlide}
            theme={activeTheme}
            totalSlides={presentation.slides.length}
            activeSlideIndex={activeSlideIndex}
            qualityScore={presentation.qualityScore}
            onSelectSlide={setActiveSlideIndex}
            onUpdateSlide={handleUpdateActiveSlide}
          />

          {!isPreviewMode && (
            <AICommandBar
              activeSlide={activeSlide}
              onUpdateActiveSlide={handleUpdateSlideFull}
            />
          )}
        </div>

        {/* Right Inspector Panel */}
        {!isPreviewMode && (
          activeRightPanel === 'sources' ? (
            <SourcesPanel
              presentation={presentation}
              onUpdatePresentation={setPresentation}
            />
          ) : (
            <DesignPanel
              activeSlide={activeSlide}
              activeTheme={presentation.theme}
              onChangeTheme={handleChangeTheme}
              onChangeLayout={handleChangeLayout}
            />
          )
        )}
      </div>

      <ExportModal
        presentation={presentation}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <PracticeCoachModal
        slides={presentation.slides}
        theme={activeTheme}
        isOpen={isPracticeOpen}
        onClose={() => setIsPracticeOpen(false)}
      />
    </div>
  );
}
