'use client';

import { useState } from 'react';
import { Slide, SlideLayoutType, ThemeType } from '@/lib/types';
import { THEMES } from '@/lib/themes';
import { Sparkles, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

interface DesignPanelProps {
  activeSlide: Slide;
  activeTheme: ThemeType;
  onChangeTheme: (theme: ThemeType) => void;
  onChangeLayout: (layout: SlideLayoutType) => void;
}

const LAYOUT_OPTIONS: { id: SlideLayoutType; label: string }[] = [
  { id: 'title', label: 'Title Slide' },
  { id: 'problem', label: 'Problem & Bottleneck' },
  { id: 'solution', label: 'Strategic Solution' },
  { id: 'comparison', label: 'Before / After Comparison' },
  { id: 'data', label: 'Data & Metrics' },
  { id: 'summary', label: 'Summary & Conclusion' },
];

export default function DesignPanel({
  activeSlide,
  activeTheme,
  onChangeTheme,
  onChangeLayout,
}: DesignPanelProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'animate'>('design');

  return (
    <div className="w-80 bg-white border-l border-[#E4E1DA] h-full flex flex-col justify-between shrink-0 select-none overflow-y-auto p-5 space-y-6 text-[#111111] font-sans shadow-subtle">
      <div>
        {/* Stitch Image 4 DESIGN | ANIMATE Tabs */}
        <div className="flex border-b border-[#E4E1DA] mb-6 text-xs font-mono font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 pb-3 text-center border-b-2 transition-all ${
              activeTab === 'design' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666664]'
            }`}
          >
            DESIGN
          </button>
          <button
            onClick={() => setActiveTab('animate')}
            className={`flex-1 pb-3 text-center border-b-2 transition-all ${
              activeTab === 'animate' ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666664]'
            }`}
          >
            ANIMATE
          </button>
        </div>

        {/* Stitch Image 4 AI Redesign Card Banner */}
        <div className="bg-[#F0F5F2] border border-[#8FAF9A]/40 rounded-2xl p-4 mb-6 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2D7A58] uppercase">
            <div className="w-5 h-5 rounded-full bg-[#2D7A58] text-white flex items-center justify-center font-bold text-[10px]">
              ✦
            </div>
            <span>AI Redesign</span>
          </div>
          <p className="text-xs text-[#111111] font-light leading-relaxed">
            Try a more aggressive layout or synthesize the text for higher executive impact.
          </p>
        </div>

        {/* TYPOGRAPHY Section */}
        <div className="space-y-4 pb-6 border-b border-[#F0EEE8]">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
            <span>TYPOGRAPHY</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-mono text-[#666664] uppercase mb-1">
                FONT FAMILY
              </label>
              <select className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs font-serif font-bold text-[#111111] focus:outline-none">
                <option value="Playfair Display">Playfair Display (Serif)</option>
                <option value="Inter">Inter (Sans-serif)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono text-[#666664] uppercase mb-1">WEIGHT</label>
                <select className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs font-semibold text-[#111111] focus:outline-none">
                  <option>Bold</option>
                  <option>Medium</option>
                  <option>Regular</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#666664] uppercase mb-1">SIZE</label>
                <input
                  type="text"
                  defaultValue="64"
                  className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-center text-[#111111] focus:outline-none"
                />
              </div>
            </div>

            {/* Alignment Icons Row */}
            <div className="flex bg-[#F4F4F0] border border-[#E4E1DA] p-1 rounded-xl justify-around text-[#666664]">
              <button className="p-1.5 rounded-lg bg-white text-[#111111] shadow-subtle"><AlignLeft className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-lg hover:text-[#111111]"><AlignCenter className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-lg hover:text-[#111111]"><AlignRight className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-lg hover:text-[#111111]"><AlignJustify className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* APPEARANCE & Themes Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
            <span>APPEARANCE &amp; THEME</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(THEMES) as ThemeType[]).map((tId) => {
              const themeConfig = THEMES[tId];
              const isSelected = tId === activeTheme;

              return (
                <button
                  key={tId}
                  onClick={() => onChangeTheme(tId)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#111111] bg-[#EAE8E2] ring-1 ring-[#111111]'
                      : 'border-[#E4E1DA] bg-white hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div
                      className="w-3 h-3 rounded-full border border-[#E4E1DA]"
                      style={{ backgroundColor: themeConfig.bg }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: themeConfig.accent }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-[#111111] truncate">{themeConfig.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#F0EEE8] text-[11px] font-mono text-[#666664] space-y-1">
        <div className="flex justify-between"><span>Format:</span><span className="text-[#111111] font-bold">16:9 Widescreen</span></div>
        <div className="flex justify-between"><span>Engine:</span><span className="text-[#2D7A58] font-bold">Present.AI 2.0</span></div>
      </div>
    </div>
  );
}
