'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, LogOut, Presentation, Settings, Plus, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, session, requireAuth, openAuthModal, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = Boolean(user || session);
  const displayEmail = user?.email || 'user@company.com';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F4F4F0]/90 backdrop-blur-md border-b border-[#E4E1DA] py-3.5 shadow-subtle'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Present.AI */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-colors shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#111111]">
            Present<span className="font-sans font-normal text-xs text-[#666664] ml-0.5">.AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#111111] tracking-wide font-sans">
          <Link href="/generate" className="hover:text-[#FF6B35] transition-colors">
            Dashboard
          </Link>
          <Link href="/templates" className="hover:text-[#FF6B35] transition-colors">
            Templates
          </Link>
          <a href="#demo" className="hover:text-[#FF6B35] transition-colors">
            Explore
          </a>
          <a href="#pricing" className="hover:text-[#FF6B35] transition-colors">
            Pricing
          </a>
        </div>

        {/* Actions & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Main Action Button - NEW PRESENTATION (Stitch Pill Button) */}
          <button
            onClick={() => requireAuth()}
            className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-subtle active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
            <span>NEW PRESENTATION</span>
          </button>

          {/* User Account Circular Avatar */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                title="Account Menu"
                className="relative group p-0.5 rounded-full hover:ring-2 hover:ring-[#111111]/30 transition-all focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center overflow-hidden shadow-subtle group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#111111]" fill="currentColor">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
                    <circle cx="50" cy="38" r="17" fill="currentColor" />
                    <path d="M 22 80 C 22 58, 32 54, 50 54 C 68 54, 78 58, 78 80 Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0 shadow-sm" />
              </button>

              {/* User Dropdown Menu Card */}
              {showUserDropdown && (
                <div className="absolute right-0 top-12 z-50 w-64 bg-white border border-[#E4E1DA] rounded-2xl p-3 shadow-2xl space-y-1 font-sans text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-[#F0EEE8] rounded-xl mb-2 border border-[#E4E1DA] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
                      <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" fill="currentColor">
                        <circle cx="50" cy="38" r="17" />
                        <path d="M 22 80 C 22 58, 32 54, 50 54 C 68 54, 78 58, 78 80 Z" />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-[#666664] uppercase font-bold">SIGNED IN AS</div>
                      <div className="text-xs font-bold text-[#111111] truncate">{displayEmail}</div>
                    </div>
                  </div>

                  <Link
                    href="/generate"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#111111]" />
                    <span>Create Presentation</span>
                  </Link>

                  <Link
                    href="/presentations"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors"
                  >
                    <Presentation className="w-4 h-4 text-[#666664]" />
                    <span>My Presentations</span>
                  </Link>

                  <Link
                    href="/templates"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#666664]" />
                    <span>Templates Gallery</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#666664]" />
                    <span>Account Settings</span>
                  </Link>

                  <div className="pt-2 mt-1 border-t border-[#E4E1DA]">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="text-xs font-bold text-[#111111] hover:text-[#FF6B35] px-2 py-1 transition-colors uppercase font-mono"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
