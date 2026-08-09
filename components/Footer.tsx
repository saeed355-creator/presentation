'use client';

import { Globe, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#EAE8E2] border-t border-[#E4E1DA] py-8 text-xs font-mono text-[#666664]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Legal Links */}
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-[#111111] transition-colors uppercase tracking-wider">
            LEGAL
          </Link>
          <Link href="#" className="hover:text-[#111111] transition-colors uppercase tracking-wider">
            PRIVACY
          </Link>
          <Link href="#" className="hover:text-[#111111] transition-colors uppercase tracking-wider">
            COOKIES
          </Link>
        </div>

        {/* Center Made with AI Tag */}
        <div className="inline-flex items-center gap-1.5 bg-white/80 border border-[#E4E1DA] px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#111111]">
          <span>✦ MADE WITH AI</span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-[#666664]">
          <button title="Language Selector" className="hover:text-[#111111] transition-colors">
            <Globe className="w-4 h-4" />
          </button>
          <button title="Share Present.AI" className="hover:text-[#111111] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
