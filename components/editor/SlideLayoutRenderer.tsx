'use client';

import { Slide, ThemeConfig } from '@/lib/types';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface SlideLayoutRendererProps {
  slide: Slide;
  theme: ThemeConfig;
  onUpdateSlide?: (updated: Partial<Slide>) => void;
}

export default function SlideLayoutRenderer({
  slide,
  theme,
  onUpdateSlide = () => {},
}: SlideLayoutRendererProps) {
  const handleContentChange = (index: number, newText: string) => {
    const updatedContent = [...slide.content];
    updatedContent[index] = newText;
    onUpdateSlide({ content: updatedContent });
  };

  const layout = slide.layout || 'solution';

  return (
    <div
      className="w-full h-full p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden transition-colors font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: theme.accent }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
          <span>SLIDE 0{slide.slideNumber} // {layout.toUpperCase()}</span>
        </div>
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded"
          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
        >
          {theme.name}
        </span>
      </div>

      {/* Slide Body Content Router by Slide Layout Type */}
      <div className="my-auto space-y-6 z-10">
        {/* LAYOUT 1: TITLE HERO COMPOSITION */}
        {layout === 'title' && (
          <div className="relative rounded-3xl p-8 sm:p-12 border overflow-hidden space-y-6" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            {slide.imageUrl && (
              <div className="absolute inset-0 opacity-15">
                <img src={slide.imageUrl} alt="Hero" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border" style={{ backgroundColor: theme.surfaceSecondary, borderColor: theme.accent, color: theme.accent }}>
                <Sparkles className="w-3 h-3" />
                <span>AI PRESENTATION DESIGN ENGINE</span>
              </div>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => onUpdateSlide({ title: e.target.value })}
                className="w-full bg-transparent text-3xl sm:text-5xl font-serif font-extrabold tracking-tight focus:outline-none"
                style={{ color: theme.textPrimary }}
              />
              {slide.subtitle && (
                <input
                  type="text"
                  value={slide.subtitle}
                  onChange={(e) => onUpdateSlide({ subtitle: e.target.value })}
                  className="w-full bg-transparent text-sm sm:text-xl font-light focus:outline-none"
                  style={{ color: theme.textSecondary }}
                />
              )}
            </div>
          </div>
        )}

        {/* LAYOUT 2: PROBLEM & BOTTLENECK LAYOUT */}
        {layout === 'problem' && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>THE FRICTION POINT</span>
            </div>
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {slide.content.map((bullet, i) => (
                <div key={i} className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                    0{i + 1}
                  </div>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleContentChange(i, e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none"
                    style={{ color: theme.textPrimary }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LAYOUT 3: COMPARISON BENTO GRID */}
        {layout === 'comparison' && slide.comparison && (
          <div className="space-y-6">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <div className="font-serif font-bold text-base text-red-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>{slide.comparison.leftTitle}</span>
                </div>
                <div className="space-y-2">
                  {slide.comparison.leftItems.map((item, i) => (
                    <div key={i} className="text-xs text-[#A0A0A0] flex items-center gap-2 font-light">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: theme.surfaceSecondary, borderColor: theme.accent }}>
                <div className="font-serif font-bold text-base flex items-center gap-2" style={{ color: theme.accent }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{slide.comparison.rightTitle}</span>
                </div>
                <div className="space-y-2">
                  {slide.comparison.rightItems.map((item, i) => (
                    <div key={i} className="text-xs flex items-center gap-2 font-medium" style={{ color: theme.textPrimary }}>
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT 4: PROCESS & TIMELINE FLOW */}
        {(layout === 'process' || layout === 'timeline') && (
          <div className="space-y-6">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {(slide.processSteps || [
                { stepNumber: 1, label: '01 Discovery', description: 'Audience context mapping' },
                { stepNumber: 2, label: '02 Outline', description: 'Narrative arc classification' },
                { stepNumber: 3, label: '03 Design', description: 'Bespoke layout composition' },
                { stepNumber: 4, label: '04 Present', description: 'Widescreen PPTX export' },
              ]).map((step, idx) => (
                <div key={idx} className="p-5 rounded-2xl border space-y-2 flex flex-col justify-between" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <div className="w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center" style={{ backgroundColor: theme.accent, color: '#FFFFFF' }}>
                    0{step.stepNumber || idx + 1}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm" style={{ color: theme.textPrimary }}>{step.label}</div>
                    <div className="text-xs font-light mt-1" style={{ color: theme.textSecondary }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LAYOUT 5: BIG NUMBER & STATISTICS */}
        {(layout === 'statistics' || layout === 'data') && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <input
                type="text"
                value={slide.title}
                onChange={(e) => onUpdateSlide({ title: e.target.value })}
                className="w-full bg-transparent text-3xl sm:text-5xl font-serif font-extrabold tracking-tight focus:outline-none"
                style={{ color: theme.textPrimary }}
              />
              <div className="space-y-2">
                {slide.content.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium" style={{ color: theme.textSecondary }}>
                    <span style={{ color: theme.accent }}>✦</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleContentChange(i, e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 p-8 rounded-3xl border text-center space-y-2 shadow-dark" style={{ backgroundColor: theme.surfaceSecondary, borderColor: theme.accent }}>
              <div className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: theme.textSecondary }}>
                {slide.keyMetric?.label || 'METRIC HIGHLIGHT'}
              </div>
              <div className="text-5xl sm:text-6xl font-serif font-extrabold font-mono" style={{ color: theme.accent }}>
                {slide.keyMetric?.value || '+340%'}
              </div>
              <div className="text-xs font-mono font-bold flex items-center justify-center gap-1 text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{slide.keyMetric?.trend || '↑ 4.2x Growth Trajectory'}</span>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT 6: DATA CHART VISUALIZATION */}
        {layout === 'chart' && (
          <div className="space-y-6">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-2">
                {slide.content.map((bullet, i) => (
                  <div key={i} className="p-3 rounded-xl border text-xs font-medium" style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.textPrimary }}>
                    ✦ {bullet}
                  </div>
                ))}
              </div>

              {/* Visual Bar Chart */}
              <div className="md:col-span-7 p-6 rounded-3xl border space-y-4" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider flex justify-between" style={{ color: theme.textSecondary }}>
                  <span>METRIC GROWTH TRAJECTORY</span>
                  <span style={{ color: theme.accent }}>16:9 VISUAL CHART</span>
                </div>

                <div className="h-40 flex items-end gap-3 pt-6 px-2 border-b border-white/10">
                  {((slide.chartData?.labels) || ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 Target']).map((lbl, idx) => {
                    const val = slide.chartData?.series?.[idx] || (idx + 1) * 22;
                    const heightPercent = Math.min(100, Math.max(20, val));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className="w-full rounded-t-xl transition-all duration-500"
                          style={{ height: `${heightPercent}%`, backgroundColor: idx === 4 ? theme.accent : theme.surfaceSecondary }}
                        />
                        <span className="text-[10px] font-mono text-center opacity-75">{lbl}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT 7: TEXT + IMAGE SPLIT */}
        {layout === 'text-image' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-4">
              <input
                type="text"
                value={slide.title}
                onChange={(e) => onUpdateSlide({ title: e.target.value })}
                className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
                style={{ color: theme.textPrimary }}
              />
              <div className="space-y-2">
                {slide.content.map((bullet, i) => (
                  <div key={i} className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: theme.textSecondary }}>
                    ✦ {bullet}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 aspect-[4/3] rounded-3xl overflow-hidden border relative shadow-dark" style={{ borderColor: theme.border }}>
              <img
                src={slide.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                alt="Slide visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-[#111111] px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                ✦ EDITORIAL VISUAL
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT 8: SOLUTION & CONCLUSION */}
        {(layout === 'solution' || layout === 'conclusion' || layout === 'summary') && (
          <div className="space-y-6">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              className="w-full bg-transparent text-3xl sm:text-4xl font-serif font-extrabold tracking-tight focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slide.content.map((bullet, i) => (
                <div key={i} className="p-6 rounded-3xl border space-y-3 shadow-subtle" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleContentChange(i, e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none"
                    style={{ color: theme.textPrimary }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Tag & Citation Attribution */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono z-10" style={{ color: theme.textSecondary }}>
        <div className="flex items-center gap-2">
          <span>Generated with Present.AI Verified Research Engine</span>
          {slide.citation && (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
              Source: {slide.citation.sourceName}
            </span>
          )}
        </div>
        <span>16:9 Widescreen</span>
      </div>
    </div>
  );
}
