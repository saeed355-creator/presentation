'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Trash2,
  Copy,
  Sparkles,
  ArrowLeft,
  LayoutGrid,
  List,
} from 'lucide-react';
import { Presentation } from '@/lib/types';
import { getSavedPresentations, savePresentation, deletePresentation } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PresentationsPage() {
  const router = useRouter();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'starred' | 'archived'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    setPresentations(getSavedPresentations());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePresentation(id);
    setPresentations(getSavedPresentations());
    setActiveMenuId(null);
  };

  const handleDuplicate = (deck: Presentation, e: React.MouseEvent) => {
    e.stopPropagation();
    const dup: Presentation = {
      ...deck,
      id: `deck-${Date.now()}`,
      title: `${deck.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    savePresentation(dup);
    setPresentations(getSavedPresentations());
    setActiveMenuId(null);
  };

  const filtered = presentations.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full flex-1 space-y-10">
        {/* Stitch Image 6 Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#111111] tracking-tight">
              My Presentations
            </h1>
            <p className="text-base text-[#666664] font-sans font-light">
              Organize, manage, and create your intelligent presentations.
            </p>
          </div>

          {/* Search Bar & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#666664] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search presentations..."
                className="bg-white border border-[#E4E1DA] rounded-full pl-11 pr-5 py-3 text-xs sm:text-sm text-[#111111] placeholder:text-[#666664]/60 focus:outline-none focus:border-[#111111] w-64 sm:w-80 shadow-subtle transition-all font-sans"
              />
            </div>

            <button
              title="Filter"
              className="w-11 h-11 rounded-full bg-white border border-[#E4E1DA] flex items-center justify-center text-[#111111] hover:bg-[#F0EEE8] transition-colors shadow-subtle"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs & View Mode Row */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E1DA]">
          <div className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider text-[#666664]">
            <button
              onClick={() => setActiveTab('recent')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'recent'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent hover:text-[#111111]'
              }`}
            >
              🕒 Recent
            </button>
            <button
              onClick={() => setActiveTab('starred')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'starred'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent hover:text-[#111111]'
              }`}
            >
              ⭐ Starred
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'archived'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent hover:text-[#111111]'
              }`}
            >
              📁 Archived
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#666664]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg border ${viewMode === 'grid' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white border-[#E4E1DA]'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg border ${viewMode === 'list' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white border-[#E4E1DA]'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stitch Image 6 Presentation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: + Blank Presentation */}
          <Link
            href="/generate"
            className="bg-[#EAE8E2] border-2 border-dashed border-[#E4E1DA] hover:border-[#111111] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[280px] transition-all group shadow-subtle"
          >
            <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white shadow-card group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#111111]">Blank Presentation</h3>
              <p className="text-xs text-[#666664] font-sans font-light mt-1 max-w-[200px]">
                Start from scratch or use an AI prompt.
              </p>
            </div>
          </Link>

          {/* Saved Presentation Cards */}
          {filtered.map((deck) => (
            <div
              key={deck.id}
              onClick={() => router.push(`/editor/${deck.id}`)}
              className="bg-white border border-[#E4E1DA] rounded-3xl overflow-hidden shadow-subtle hover:shadow-card hover:border-[#111111] transition-all cursor-pointer flex flex-col justify-between group relative"
            >
              {/* Thumbnail Container */}
              <div className="h-44 bg-[#111111] relative p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] font-mono font-bold uppercase bg-white/90 text-[#111111] px-2 py-0.5 rounded-md backdrop-blur">
                    ✦ AI Generated
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === deck.id ? null : deck.id);
                    }}
                    className="p-1 rounded-full bg-white/80 hover:bg-white text-[#111111] transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {activeMenuId === deck.id && (
                  <div className="absolute top-12 right-4 z-30 bg-white border border-[#E4E1DA] rounded-xl p-2 shadow-2xl space-y-1 font-mono text-xs text-[#111111]">
                    <button
                      onClick={(e) => handleDuplicate(deck, e)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F0EEE8] font-bold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={(e) => handleDelete(deck.id, e)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 text-red-600 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                {/* Cover Text Preview */}
                <div className="z-10 mt-auto">
                  <div className="text-lg font-serif font-bold text-white line-clamp-1">
                    {deck.title}
                  </div>
                  <div className="text-[11px] font-sans text-[#A0A0A0] line-clamp-1 font-light">
                    {deck.subtitle || deck.topic}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 border-t border-[#F0EEE8] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#111111] truncate max-w-[180px]">
                    {deck.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666664] mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Edited recently</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
