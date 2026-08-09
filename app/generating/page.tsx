'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2, CheckCircle2, RefreshCw } from 'lucide-react';

const STEPS = [
  'Understanding topic...',
  'Analyzing audience...',
  'Building presentation story...',
  'Generating slide structure...',
  'Creating content...',
  'Selecting layouts...',
  'Preparing visuals...',
  'Presentation ready.',
];

export default function GeneratingPage() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(() => router.push('/editor/demo-deck'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-[#E4E1DA] rounded-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-card">
        <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center mx-auto">
          <Wand2 className="w-7 h-7 text-[#FF6B35] animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#171717]">AI STORY GENERATOR</h2>
          <p className="text-xs font-mono text-[#FF6B35] mt-1">{STEPS[stepIdx]}</p>
        </div>

        <div className="space-y-2 text-left bg-[#F7F6F2] border border-[#E4E1DA] p-4 rounded-xl text-xs font-mono">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between transition-opacity ${
                idx <= stepIdx ? 'opacity-100 text-[#171717]' : 'opacity-30 text-[#6B6B68]'
              }`}
            >
              <span>{step}</span>
              {idx < stepIdx && <CheckCircle2 className="w-4 h-4 text-[#8FAF9A]" />}
              {idx === stepIdx && <RefreshCw className="w-3.5 h-3.5 text-[#FF6B35] animate-spin" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
