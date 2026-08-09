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
      title: `Slide Title ${newSlideNumber}`,
      subtitle: 'Add subtitle context here',
      layout: 'solution',
      content: ['New slide key point 1', 'New slide key point 2', 'New slide key point 3'],
      visualSuggestion: {
        type: 'diagram',
        description: 'New slide diagram',
        iconName: 'Sparkles',
      },
    };
    const updatedSlides = [...presentation.slides, newSlide];
    const updatedDeck = {
      ...presentation,
      slides: updatedSlides,
      slideCount: updatedSlides.length,
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
    setActiveSlideIndex(updatedSlides.length - 1);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = presentation.slides[index];
    const duplicated: Slide = {
      ...target,
      id: `slide-${Date.now()}`,
      slideNumber: presentation.slides.length + 1,
      title: `${target.title} (Copy)`,
    };
    const updatedSlides = [...presentation.slides];
    updatedSlides.splice(index + 1, 0, duplicated);
    const updatedDeck = {
      ...presentation,
      slides: updatedSlides,
      slideCount: updatedSlides.length,
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
    setActiveSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (presentation.slides.length <= 1) return;
    const updatedSlides = presentation.slides.filter((_, i) => i !== index);
    const reindexed = updatedSlides.map((s, i) => ({ ...s, slideNumber: i + 1 }));
    const updatedDeck = {
      ...presentation,
      slides: reindexed,
      slideCount: reindexed.length,
    };
    setPresentation(updatedDeck);
    savePresentation(updatedDeck);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  return (
    <div className="h-screen w-screen bg-[#F4F4F0] text-[#111111] flex flex-col overflow-hidden select-none">
      {/* Stitch Image 4 Top Navbar Header */}
      <header className="h-16 bg-white border-b border-[#E4E1DA] px-4 sm:px-6 flex items-center justify-between shrink-0 z-40 shadow-subtle">
        <div className="flex items-center gap-4">
          <Link
            href="/presentations"
            className="p-2 rounded-xl text-[#666664] hover:text-[#111111] hover:bg-[#F0EEE8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link href="/" className="font-serif text-lg font-bold text-[#111111]">
            Present<span className="font-sans font-normal text-xs text-[#666664]">.AI</span>
          </Link>

          <div className="h-4 w-[1px] bg-[#E4E1DA]" />

          {/* Undo/Redo & Document Title */}
          <div className="flex items-center gap-2 font-mono text-xs">
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
        <div className="flex items-center gap-3">
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

      {/* 4-Column Studio Layout (Stitch Image 4) */}
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
          <DesignPanel
            activeSlide={activeSlide}
            activeTheme={presentation.theme}
            onChangeTheme={handleChangeTheme}
            onChangeLayout={handleChangeLayout}
          />
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
