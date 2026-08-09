'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, LogOut, Presentation, Settings, Plus, LayoutGrid, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 sm:py-3 px-3 sm:px-6'
          : 'py-4 sm:py-5 px-3 sm:px-6'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 rounded-2xl ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl border border-[#E4E1DA]/80 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
            : 'bg-[#F4F4F0]/70 backdrop-blur-xl border border-[#E4E1DA]/50 py-3.5 shadow-subtle'
        }`}
      >
        {/* Brand Logo - Present.AI */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-all shadow-subtle group-hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#111111]">
            Present<span className="font-sans font-normal text-xs text-[#666664] ml-0.5">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#111111] tracking-wide font-sans">
          <Link href="/generate" className="hover:text-[#FF6B35] transition-colors py-1">
            Dashboard
          </Link>
          <Link href="/templates" className="hover:text-[#FF6B35] transition-colors py-1">
            Templates
          </Link>
          <a href="#demo" className="hover:text-[#FF6B35] transition-colors py-1">
            Explore
          </a>
          <a href="#pricing" className="hover:text-[#FF6B35] transition-colors py-1">
            Pricing
          </a>
        </div>

        {/* Actions & User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Main Action Button - NEW PRESENTATION (Stitch Pill Button) */}
          <button
            onClick={() => requireAuth()}
            className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all shadow-subtle active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
            <span className="hidden sm:inline">NEW PRESENTATION</span>
            <span className="sm:hidden">CREATE</span>
          </button>

          {/* User Account Circular Avatar */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                title="Account Menu"
                className="relative group p-0.5 rounded-full hover:ring-2 hover:ring-[#111111]/30 transition-all focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <div className="w-9 h-9 rounded-full bg-white/90 border-2 border-[#111111] flex items-center justify-center overflow-hidden shadow-subtle group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#111111]" fill="currentColor">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
                    <circle cx="50" cy="38" r="17" fill="currentColor" />
                    <path d="M 22 80 C 22 58, 32 54, 50 54 C 68 54, 78 58, 78 80 Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0 shadow-sm" />
              </button>

              {/* User Dropdown Menu Glass Card */}
              {showUserDropdown && (
                <div className="absolute right-0 top-12 z-50 w-64 bg-white/90 backdrop-blur-2xl border border-[#E4E1DA] rounded-2xl p-3 shadow-2xl space-y-1 font-sans text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-[#F0EEE8]/80 backdrop-blur-md rounded-xl mb-2 border border-[#E4E1DA] flex items-center gap-3">
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
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors min-h-[44px]"
                  >
                    <Plus className="w-4 h-4 text-[#111111]" />
                    <span>Create Presentation</span>
                  </Link>

                  <Link
                    href="/presentations"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors min-h-[44px]"
                  >
                    <Presentation className="w-4 h-4 text-[#666664]" />
                    <span>My Presentations</span>
                  </Link>

                  <Link
                    href="/templates"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors min-h-[44px]"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#666664]" />
                    <span>Templates Gallery</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F0EEE8] text-[#111111] font-medium transition-colors min-h-[44px]"
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
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold min-h-[44px]"
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
              className="text-xs font-bold text-[#111111] hover:text-[#FF6B35] px-2.5 py-2 transition-colors uppercase font-mono min-h-[44px] flex items-center"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] hover:text-[#FF6B35] rounded-xl border border-[#E4E1DA] bg-white shadow-subtle focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#F4F4F0]/95 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            <div className="text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">NAVIGATION</div>
            <div className="flex flex-col space-y-3 font-serif text-2xl font-bold text-[#111111]">
              <Link
                href="/generate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FF6B35] transition-colors py-2 border-b border-[#E4E1DA]/60 min-h-[44px] flex items-center"
              >
                Dashboard
              </Link>
              <Link
                href="/templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FF6B35] transition-colors py-2 border-b border-[#E4E1DA]/60 min-h-[44px] flex items-center"
              >
                Templates
              </Link>
              <Link
                href="/presentations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FF6B35] transition-colors py-2 border-b border-[#E4E1DA]/60 min-h-[44px] flex items-center"
              >
                My Presentations
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FF6B35] transition-colors py-2 border-b border-[#E4E1DA]/60 min-h-[44px] flex items-center"
              >
                Settings
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#E4E1DA]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                requireAuth();
              }}
              className="w-full bg-[#111111] text-white font-sans text-sm font-extrabold uppercase tracking-wider py-4 rounded-2xl shadow-card flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-white stroke-[3]" />
              <span>Create Presentation</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-red-600 font-sans text-sm font-bold py-3 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({displayEmail})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="w-full border border-[#111111] text-[#111111] font-sans text-sm font-bold py-3 rounded-2xl flex items-center justify-center min-h-[44px]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
