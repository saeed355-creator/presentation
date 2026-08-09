'use client';

import { useState } from 'react';
import { Sparkles, RefreshCw, Send, Wand2 } from 'lucide-react';
import { Slide } from '@/lib/types';

interface AICommandBarProps {
  activeSlide: Slide;
  onUpdateActiveSlide: (updatedSlide: Slide) => void;
}

const PRESET_COMMANDS = [
  'Make Shorter',
  'Make More Professional',
  'Simplify text',
  'Add Example',
  'Add Evidence',
  'Make More Visual',
  'Rewrite for Students',
  'Rewrite for Business',
];

export default function AICommandBar({
  activeSlide,
  onUpdateActiveSlide,
}: AICommandBarProps) {
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyCommand = async (cmdToApply?: string) => {
    const finalCmd = cmdToApply || command;
    if (!finalCmd.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/edit-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: activeSlide, command: finalCmd }),
      });
      const data = await res.json();
      if (data.success && data.slide) {
        onUpdateActiveSlide(data.slide);
        setCommand('');
      }
    } catch (err) {
      console.error('AI Command Bar error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegenerateSlide = async () => {
    handleApplyCommand('Regenerate slide layout, wording, and visual suggestion completely');
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30">
      <div className="bg-[#181818]/90 backdrop-blur-xl border border-[#FF6B35]/30 rounded-2xl p-3 shadow-2xl space-y-2">
        {/* Preset Command Chips & Regenerate Button */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-[10px] font-mono no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#FF6B35] font-bold shrink-0 mr-1">IMPROVE WITH AI:</span>
            {PRESET_COMMANDS.map((preset, idx) => (
              <button
                key={idx}
                disabled={isProcessing}
                onClick={() => handleApplyCommand(preset)}
                className="px-2.5 py-1 rounded-lg bg-[#121212] border border-[#2A2A2A] hover:border-[#FF6B35] text-[#A0A0A0] hover:text-white shrink-0 transition-colors disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>

          <button
            onClick={handleRegenerateSlide}
            disabled={isProcessing}
            className="inline-flex items-center gap-1 bg-[#121212] border border-[#FF6B35]/40 hover:border-[#FF6B35] text-[#FF6B35] hover:text-white px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3 text-[#FF6B35]" />
            <span>Regenerate Slide</span>
          </button>
        </div>

        {/* Floating Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyCommand();
          }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
          </div>

          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={isProcessing}
            placeholder="✨ Ask AI to edit this slide... (e.g., Make this more persuasive for investors)"
            className="flex-1 bg-[#121212] border border-[#2A2A2A] focus:border-[#FF6B35] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-[#A0A0A0]/60 focus:outline-none transition-all font-sans"
          />

          <button
            type="submit"
            disabled={!command.trim() || isProcessing}
            className="inline-flex items-center justify-center gap-1 bg-[#FF6B35] hover:bg-[#E85A24] disabled:bg-[#121212] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md disabled:opacity-40 shrink-0"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Apply</span>
          </button>
        </form>
      </div>
    </div>
  );
}
