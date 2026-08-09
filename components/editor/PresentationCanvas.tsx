'use client';

import { useState } from 'react';
import { Slide, ThemeConfig, QualityScore } from '@/lib/types';
import SlideLayoutRenderer from './SlideLayoutRenderer';
import { ChevronLeft, ChevronRight, MessageSquare, AlertTriangle, Sparkles, Award } from 'lucide-react';

interface PresentationCanvasProps {
  slide: Slide;
  theme: ThemeConfig;
  totalSlides: number;
  activeSlideIndex: number;
  qualityScore?: QualityScore;
  onSelectSlide: (index: number) => void;
  onUpdateSlide: (updated: Partial<Slide>) => void;
}

export default function PresentationCanvas({
  slide,
  theme,
  totalSlides,
  activeSlideIndex,
  qualityScore,
  onSelectSlide,
  onUpdateSlide,
}: PresentationCanvasProps) {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showQualityDetails, setShowQualityDetails] = useState(false);
  const [isSimplifying, setIsSimplifying] = useState(false);

  // Content density heuristic: count total words on active slide
  const totalWords =
    (slide.title || '').split(' ').length +
    (slide.subtitle || '').split(' ').length +
    (slide.content || []).join(' ').split(' ').length;

  const isTextHeavy = totalWords > 45;

  const handleSimplifyWithAI = async () => {
    setIsSimplifying(true);
    try {
      const res = await fetch('/api/edit-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slide,
          command: 'Simplify text and reduce word density while retaining core meaning',
        }),
      });
      const data = await res.json();
      if (data.success && data.slide) {
        onUpdateSlide(data.slide);
      }
    } catch (err) {
      console.error('Simplify error:', err);
    } finally {
      setIsSimplifying(false);
    }
  };

  return (
    <div className="flex-1 bg-[#101010] flex flex-col justify-between overflow-hidden relative p-4 sm:p-8">
      {/* Top Toolbar: Quality Score & Speaker Notes */}
      <div className="flex items-center justify-between mb-4">
        {/* Quality Score Indicator */}
        <div className="flex items-center gap-3">
          {qualityScore ? (
            <div className="relative">
              <button
                onClick={() => setShowQualityDetails(!showQualityDetails)}
                className="inline-flex items-center gap-1.5 bg-[#181818] border border-[#2A2A2A] hover:border-[#FF6B35] px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-[#A0A0A0]">Quality:</span>
                <span className="text-white font-bold">{qualityScore.overall} / 100</span>
              </button>

              {/* Quality Details Dropdown Card */}
              {showQualityDetails && (
                <div className="absolute top-10 left-0 z-40 bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 w-72 shadow-2xl space-y-3 text-xs font-mono">
                  <div className="font-bold text-white pb-2 border-b border-[#2A2A2A] flex justify-between">
                    <span>PRESENTATION QUALITY</span>
                    <span className="text-[#FF6B35]">{qualityScore.overall} / 100</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#A0A0A0]">
                    <div className="flex justify-between"><span>Story Narrative:</span><span className="text-white">{qualityScore.story}%</span></div>
                    <div className="flex justify-between"><span>Clarity:</span><span className="text-white">{qualityScore.clarity}%</span></div>
                    <div className="flex justify-between"><span>Structure:</span><span className="text-white">{qualityScore.structure}%</span></div>
                    <div className="flex justify-between"><span>Visual Balance:</span><span className="text-white">{qualityScore.visualBalance}%</span></div>
                    <div className="flex justify-between"><span>Content Density:</span><span className="text-white">{qualityScore.contentDensity}%</span></div>
                  </div>
                  {qualityScore.recommendations.length > 0 && (
                    <div className="pt-2 border-t border-[#2A2A2A] text-[10px] text-[#8FAF9A]">
                      💡 {qualityScore.recommendations[0]}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs font-mono text-[#A0A0A0]">Widescreen 16:9 Canvas</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
              showSpeakerNotes
                ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-white'
                : 'bg-[#181818] border-[#2A2A2A] text-[#A0A0A0] hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Speaker Notes
          </button>
        </div>
      </div>

      {/* Content Density Warning Banner */}
      {isTextHeavy && (
        <div className="max-w-4xl mx-auto w-full mb-3 bg-[#E8C547]/10 border border-[#E8C547]/30 text-[#E8C547] text-xs font-mono px-4 py-2 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#E8C547] shrink-0" />
            <span>⚠ This slide may be too text-heavy ({totalWords} words).</span>
          </div>
          <button
            onClick={handleSimplifyWithAI}
            disabled={isSimplifying}
            className="inline-flex items-center gap-1 bg-[#171717] hover:bg-[#FF6B35] text-white px-3 py-1 rounded-lg text-[11px] font-bold transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3 text-orange-200" />
            <span>{isSimplifying ? 'Simplifying...' : 'Simplify with AI'}</span>
          </button>
        </div>
      )}

      {/* Main 16:9 Slide Canvas Frame */}
      <div className="flex-1 flex items-center justify-center relative w-full overflow-x-auto p-2 sm:p-0">
        <div
          id="slide-canvas-container"
          className="w-full max-w-4xl aspect-[16/9] rounded-2xl shadow-dark overflow-hidden border border-[#2A2A2A] transition-all min-w-[280px]"
        >
          <SlideLayoutRenderer slide={slide} theme={theme} onUpdateSlide={onUpdateSlide} />
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div className="mt-4 bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 max-w-4xl mx-auto w-full">
          <div className="text-xs font-mono text-[#FF6B35] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>SPEAKER NOTES</span>
            <span className="text-[10px] text-[#A0A0A0]">Editable</span>
          </div>
          <textarea
            rows={2}
            value={slide.speakerNotes || ''}
            onChange={(e) => onUpdateSlide({ speakerNotes: e.target.value })}
            placeholder="Add presenter talking points here..."
            className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#FF6B35] rounded-lg p-2.5 text-xs text-white placeholder:text-[#A0A0A0]/50 focus:outline-none resize-none font-sans"
          />
        </div>
      )}

      {/* Bottom Navigation Controls */}
      <div className="mt-4 flex items-center justify-between max-w-4xl mx-auto w-full pt-4 border-t border-[#2A2A2A]">
        <button
          disabled={activeSlideIndex === 0}
          onClick={() => onSelectSlide(activeSlideIndex - 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2A2A2A] text-xs text-[#A0A0A0] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-xs font-mono text-[#A0A0A0]">
          Slide <span className="text-white font-bold">{activeSlideIndex + 1}</span> of{' '}
          <span className="text-white font-bold">{totalSlides}</span>
        </span>

        <button
          disabled={activeSlideIndex === totalSlides - 1}
          onClick={() => onSelectSlide(activeSlideIndex + 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2A2A2A] text-xs text-[#A0A0A0] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
