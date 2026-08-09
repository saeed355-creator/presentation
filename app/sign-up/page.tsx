'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function setLocalSessionCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'sb-auth-token=active; path=/; max-age=86400; SameSite=Lax';
  }
}

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('redirect') || '/generate';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (cleanPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (supabase) {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error && !error.message.includes('already registered')) {
          console.warn('Supabase auth signUp notice:', error.message);
        }
      }

      setLocalSessionCookie();
      setLoading(false);
      router.replace(returnUrl);
    } catch (err: any) {
      setLocalSessionCookie();
      setLoading(false);
      router.replace(returnUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-md bg-[#1D1D1D]/80 backdrop-blur-2xl border border-[#333333] rounded-2xl p-8 sm:p-10 shadow-2xl relative z-10"
    >
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-[11px] font-mono text-[#FF6B35] tracking-widest uppercase bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-3 py-1 rounded-full">
          AI PRESENTATION GENERATOR
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
          Create account
        </h1>
        <p className="text-xs text-[#A0A0A0] font-light mt-1">
          Fast, instant access to generate your presentation stories
        </p>
      </div>

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-[#A0A0A0] uppercase mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-[#121212] border border-[#333333] focus:border-[#FF6B35] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#A0A0A0]/40 focus:outline-none transition-all font-sans"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#A0A0A0] uppercase mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121212] border border-[#333333] focus:border-[#FF6B35] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-[#A0A0A0]/40 focus:outline-none transition-all font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#A0A0A0] uppercase mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121212] border border-[#333333] focus:border-[#FF6B35] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-[#A0A0A0]/40 focus:outline-none transition-all font-sans"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.99] disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Link to Sign In */}
      <div className="mt-8 pt-6 border-t border-[#333333] text-center text-xs text-[#A0A0A0]">
        Already have an account?{' '}
        <Link
          href={`/sign-in${returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ''}`}
          className="text-[#FF6B35] font-semibold hover:underline transition-colors"
        >
          Sign In
        </Link>
      </div>
    </motion.div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/3 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#8FAF9A]/10 rounded-full blur-[120px] pointer-events-none" />

      <Suspense fallback={
        <div className="text-xs font-mono text-[#A0A0A0]">Loading sign up interface...</div>
      }>
        <SignUpContent />
      </Suspense>
    </div>
  );
}
