'use client';

import { Slide, ThemeConfig } from '@/lib/types';
import { Plus, Copy, Trash2 } from 'lucide-react';
import SlideLayoutRenderer from './SlideLayoutRenderer';

interface SlideThumbnailProps {
  slides: Slide[];
  activeSlideIndex: number;
  theme: ThemeConfig;
  onSelectSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onAddSlide: () => void;
}

export default function SlideThumbnail({
  slides,
  activeSlideIndex,
  theme,
  onSelectSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onAddSlide,
}: SlideThumbnailProps) {
  return (
    <div className="w-40 sm:w-56 bg-white border-r border-[#E4E1DA] h-full flex flex-col justify-between shrink-0 select-none font-sans shadow-subtle">
      {/* Header Bar */}
      <div className="p-4 border-b border-[#E4E1DA] flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
          SLIDES ({slides.length})
        </span>
        <button
          onClick={onAddSlide}
          title="Add New Slide"
          className="w-7 h-7 rounded-lg bg-[#111111] hover:bg-[#2A2A2A] text-white flex items-center justify-center transition-colors shadow-subtle"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Thumbnails Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {slides.map((slide, index) => {
          const isActive = index === activeSlideIndex;

          return (
            <div
              key={slide.id || index}
              onClick={() => onSelectSlide(index)}
              className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all group ${
                isActive
                  ? 'border-[#111111] ring-2 ring-[#111111]/20 shadow-card scale-[1.02]'
                  : 'border-[#E4E1DA] hover:border-[#666664] opacity-80 hover:opacity-100'
              }`}
            >
              {/* Slide Number Badge */}
              <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-md bg-[#111111] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-subtle">
                {index + 1}
              </div>

              {/* Quick Actions Hover Overlay */}
              <div className="absolute top-2 right-2 z-10 hidden group-hover:flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSlide(index);
                  }}
                  title="Duplicate slide"
                  className="p-1 rounded-md bg-white/90 hover:bg-white text-[#111111] shadow-subtle"
                >
                  <Copy className="w-3 h-3" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSlide(index);
                    }}
                    title="Delete slide"
                    className="p-1 rounded-md bg-white/90 hover:bg-white text-red-600 shadow-subtle"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Scaled Slide Thumbnail Preview */}
              <div className="w-full aspect-[16/9] pointer-events-none transform scale-[0.98] origin-top-left">
                <SlideLayoutRenderer slide={slide} theme={theme} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
