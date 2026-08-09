'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, User, Shield, CreditCard, Key, Edit, Save, ArrowLeft, Presentation, History, Settings as SettingsIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'billing' | 'apikeys'>('profile');
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [bio, setBio] = useState('Product Architect and Presentation Storyteller.');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#111111] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Stitch Image 8 Left Tools Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#E4E1DA] rounded-3xl p-6 shadow-subtle space-y-4 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#666664] uppercase tracking-wider pb-2 border-b border-[#F0EEE8]">
                <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                <span>Tools</span>
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <Link
                  href="/generate"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#666664] hover:bg-[#F0EEE8] transition-colors"
                >
                  <Presentation className="w-4 h-4" />
                  <span>Editor</span>
                </Link>
                <Link
                  href="/presentations"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#666664] hover:bg-[#F0EEE8] transition-colors"
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#EAE8E2] text-[#111111] font-bold shadow-subtle">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Settings</span>
                </div>
              </div>
            </div>

            {/* Sub-tabs List */}
            <div className="bg-white border border-[#E4E1DA] rounded-3xl p-4 shadow-subtle space-y-1 text-xs font-sans">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#111111] text-white shadow-subtle'
                    : 'text-[#666664] hover:bg-[#F0EEE8]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold transition-all ${
                  activeTab === 'account'
                    ? 'bg-[#111111] text-white shadow-subtle'
                    : 'text-[#666664] hover:bg-[#F0EEE8]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Account</span>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold transition-all ${
                  activeTab === 'billing'
                    ? 'bg-[#111111] text-white shadow-subtle'
                    : 'text-[#666664] hover:bg-[#F0EEE8]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Billing</span>
              </button>
              <button
                onClick={() => setActiveTab('apikeys')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold transition-all ${
                  activeTab === 'apikeys'
                    ? 'bg-[#111111] text-white shadow-subtle'
                    : 'text-[#666664] hover:bg-[#F0EEE8]'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>API Keys</span>
              </button>
            </div>
          </div>

          {/* Stitch Image 8 Right Main Profile Content (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight">
                Public Profile
              </h1>
              <p className="text-base text-[#666664] font-sans font-light">
                This information will be displayed publicly across your presentation links.
              </p>
            </div>

            {/* Elevated White Card Container */}
            <div className="bg-white border border-[#E4E1DA] rounded-3xl p-8 sm:p-12 shadow-card max-w-2xl space-y-8">
              <form onSubmit={handleSave} className="space-y-8 font-sans">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b border-[#F0EEE8]">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#111111] shadow-subtle"
                    />
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-white border border-[#E4E1DA] text-[#111111] flex items-center justify-center absolute bottom-0 right-0 shadow-subtle hover:bg-[#F0EEE8]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#111111]">Avatar</h3>
                    <p className="text-xs text-[#666664] font-mono mt-0.5">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                {/* 2-Column Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#111111] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#111111] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bio Textarea */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#666664] uppercase mb-2">
                    BIO
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-2xl p-4 text-xs sm:text-sm text-[#111111] focus:outline-none resize-none"
                  />
                </div>

                {/* Main Action Button */}
                <div className="pt-4 border-t border-[#F0EEE8] flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-card transition-all"
                  >
                    <span>SAVE CHANGES</span>
                  </button>

                  {savedStatus && (
                    <span className="text-xs font-mono text-emerald-600 font-bold">
                      ✓ Profile changes saved
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
