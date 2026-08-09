'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Bookmark, LayoutGrid, List, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates', count: 24 },
  { id: 'business', label: 'Business', count: 8 },
  { id: 'pitch', label: 'Pitch Deck', count: 5 },
  { id: 'creative', label: 'Creative', count: 7 },
  { id: 'education', label: 'Education', count: 4 },
];

const STITCH_TEMPLATES = [
  {
    id: 'executive-minimal',
    title: 'Executive Minimal',
    desc: 'Sharp, authoritative layouts for high-stakes earnings reports.',
    category: 'BUSINESS',
    tag: 'POPULAR',
    bgImg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    theme: 'dark-violet',
  },
  {
    id: 'editorial-focus',
    title: 'Editorial Focus',
    desc: 'Magazine-style asymmetric grids for visual architecture portfolios.',
    category: 'CREATIVE',
    tag: '✦ TRENDING',
    bgImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    theme: 'warm-editorial',
  },
  {
    id: 'series-a-vanguard',
    title: 'Series A Vanguard',
    desc: 'Data-rich slides designed to secure venture investment capital.',
    category: 'PITCH DECK',
    tag: 'FEATURED',
    bgImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    theme: 'midnight-executive',
  },
  {
    id: 'cognitive-flow',
    title: 'Cognitive Flow',
    desc: 'Structured for maximum retention and clear academic narrative.',
    category: 'EDUCATION',
    tag: 'NEW',
    bgImg: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    theme: 'professional',
  },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = STITCH_TEMPLATES.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category.toLowerCase().includes(activeCategory);
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full flex-1 space-y-12">
        {/* Stitch Image 5 Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-5xl sm:text-7xl font-serif font-extrabold text-[#111111] tracking-tight">
            The Gallery
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#666664] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles..."
                className="bg-white border border-[#E4E1DA] rounded-full pl-11 pr-5 py-3 text-xs sm:text-sm text-[#111111] placeholder:text-[#666664]/60 focus:outline-none focus:border-[#111111] w-64 sm:w-80 shadow-subtle transition-all font-sans"
              />
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#E4E1DA] p-1 rounded-xl shadow-subtle">
              <button className="p-1.5 rounded-lg bg-[#111111] text-white">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-[#666664]">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Main Section: Sidebar (Left 4 cols) + Grid (Right 8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Category Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-[#E4E1DA] rounded-3xl p-6 shadow-subtle space-y-4">
              <div className="text-xs font-mono font-bold text-[#666664] uppercase tracking-wider pb-2 border-b border-[#F0EEE8]">
                Curated Collections
              </div>

              <div className="space-y-1">
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-sans transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[#EAE8E2] text-[#111111] font-extrabold shadow-subtle'
                        : 'text-[#666664] hover:bg-[#F0EEE8]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono text-[11px] opacity-60">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bespoke Template Box */}
            <div className="bg-[#EAE8E2] border border-[#E4E1DA] rounded-3xl p-8 space-y-4 shadow-subtle">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold">
                ✏️
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#111111]">
                Need something bespoke?
              </h3>
              <p className="text-xs text-[#666664] font-sans font-light leading-relaxed">
                Describe your ideal presentation, and our AI will generate a unique starting point.
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider py-3.5 rounded-full shadow-subtle transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>GENERATE TEMPLATE</span>
              </Link>
            </div>
          </div>

          {/* Right Main Templates Grid */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border border-[#E4E1DA] rounded-3xl overflow-hidden shadow-subtle hover:shadow-card hover:border-[#111111] transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                    <img
                      src={template.bgImg}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#111111]/80 backdrop-blur text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                        {template.category}
                      </span>
                      {template.tag && (
                        <span className="bg-white/90 backdrop-blur text-[#111111] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                          {template.tag}
                        </span>
                      )}
                    </div>

                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#111111] transition-colors shadow-subtle">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif font-bold text-2xl text-[#111111]">{template.title}</h3>
                    <p className="text-xs text-[#666664] font-sans font-light leading-relaxed">
                      {template.desc}
                    </p>

                    <div className="pt-3 border-t border-[#F0EEE8] flex justify-between items-center">
                      <Link
                        href={`/generate?theme=${template.theme}`}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-extrabold text-[#111111] hover:text-[#FF6B35] transition-colors uppercase tracking-wider"
                      >
                        <span>Use Style</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button className="inline-flex items-center gap-2 bg-white hover:bg-[#F0EEE8] border border-[#E4E1DA] text-[#111111] font-sans text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-subtle transition-all">
                <span>LOAD MORE STYLES</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
