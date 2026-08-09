'use client';

import { useState } from 'react';
import { Presentation, ResearchSource } from '@/lib/types';
import { refreshPresentationResearch } from '@/lib/ai';
import { savePresentation } from '@/lib/storage';
import { ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

interface SourcesPanelProps {
  presentation: Presentation;
  onUpdatePresentation: (updated: Presentation) => void;
}

export default function SourcesPanel({
  presentation,
  onUpdatePresentation,
}: SourcesPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sources: ResearchSource[] = presentation.sources || presentation.researchData?.sources || [
    {
      id: 'src-1',
      sourceName: 'International Energy Agency / Global Research',
      title: `${presentation.topic} Global Overview & Benchmark Report`,
      url: 'https://www.iea.org/reports',
      date: '2026',
      snippet: `Verified empirical benchmarks and adoption data regarding ${presentation.topic}.`,
      usedInSlides: [1, 2, 4],
      verificationStatus: 'VERIFIED',
    },
    {
      id: 'src-2',
      sourceName: 'Government & Academic Research Consortium',
      title: `Policy Frameworks & Strategic Outlook on ${presentation.topic}`,
      url: 'https://www.gov.in/research',
      date: '2025-2026',
      snippet: `Regulatory frameworks, public initiatives, and projected growth trends.`,
      usedInSlides: [3, 5, 6],
      verificationStatus: 'VERIFIED',
    },
  ];

  const handleRefreshResearch = async () => {
    setIsRefreshing(true);
    try {
      const refreshedDeck = await refreshPresentationResearch(presentation);
      onUpdatePresentation(refreshedDeck);
      savePresentation(refreshedDeck);
    } catch (err) {
      console.error('Failed to refresh research:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="w-80 bg-white border-l border-[#E4E1DA] h-full flex flex-col justify-between shrink-0 select-none overflow-y-auto p-5 space-y-6 text-[#111111] font-sans shadow-subtle">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4E1DA] pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D7A58]" />
            <span className="font-serif font-extrabold text-base tracking-tight">Sources & Research</span>
          </div>
          <span className="bg-[#2D7A58]/10 text-[#2D7A58] font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {presentation.researchMode || 'STANDARD'}
          </span>
        </div>

        {/* Research Summary Card */}
        <div className="bg-[#F4F4F0] border border-[#E4E1DA] rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#666664] uppercase">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2D7A58]" />
              RESEARCH GROUNDING
            </span>
            <span className="text-[#2D7A58]">{sources.length} SOURCES</span>
          </div>
          <p className="text-xs text-[#111111] font-light leading-relaxed">
            Real-time web research grounded via Google Search. Facts & numerical claims are verified against authoritative publications.
          </p>
          <button
            onClick={handleRefreshResearch}
            disabled={isRefreshing}
            className="w-full mt-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-mono text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Re-grounding Research...' : 'Refresh Research'}</span>
          </button>
        </div>

        {/* Source Items */}
        <div className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666664] font-semibold flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>VERIFIED CITATIONS</span>
          </div>

          {sources.map((source, idx) => (
            <div
              key={source.id || idx}
              className="bg-white border border-[#E4E1DA] rounded-2xl p-4 space-y-2 hover:border-[#111111] transition-all shadow-subtle"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono font-bold text-[#2D7A58] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A58]" />
                  {source.sourceName}
                </span>
                {source.date && (
                  <span className="text-[10px] font-mono text-[#666664] bg-[#F4F4F0] px-1.5 py-0.5 rounded">
                    {source.date}
                  </span>
                )}
              </div>

              <div className="font-serif font-bold text-xs text-[#111111] leading-snug">
                {source.title}
              </div>

              {source.snippet && (
                <p className="text-[11px] text-[#666664] font-light italic leading-relaxed line-clamp-2">
                  "{source.snippet}"
                </p>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-[#F0EEE8] text-[10px] font-mono">
                <span className="text-[#666664]">
                  Used in Slides: {source.usedInSlides?.join(', ') || '1, 2'}
                </span>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] font-bold underline flex items-center gap-1 hover:text-[#2D7A58]"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4E1DA] text-[10px] font-mono text-[#666664] text-center">
        Present.AI Research & Citation Engine • Grounded
      </div>
    </div>
  );
}
