'use client';

import { useState } from 'react';
import { Sparkles, RefreshCw, Send, Wand2, ChevronDown, ChevronUp } from 'lucide-react';
import { Slide } from '@/lib/types';

interface AICommandBarProps {
  activeSlide: Slide;
  onUpdateActiveSlide: (updatedSlide: Slide) => void;
}

const PRESET_COMMANDS = [
  'Make Shorter',
  'Make Professional',
  'Simplify Text',
  'Add Example',
  'Add Evidence',
  'Make Visual',
];

export default function AICommandBar({
  activeSlide,
  onUpdateActiveSlide,
}: AICommandBarProps) {
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        setIsExpanded(false);
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

  // Compact Collapsed Pill View (Zero Screen Obstruction)
  if (!isExpanded) {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => setIsExpanded(true)}
          className="inline-flex items-center gap-2 bg-[#181818]/90 hover:bg-[#222222] backdrop-blur-xl border border-[#FF6B35]/40 text-white font-sans text-xs font-semibold px-4 py-2 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 group"
        >
          <div className="w-5 h-5 rounded-full bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35]">
            <Sparkles className="w-3 h-3 text-[#FF6B35] animate-pulse" />
          </div>
          <span>Ask AI to Edit Slide</span>
          <ChevronUp className="w-3.5 h-3.5 text-[#A0A0A0] group-hover:text-white transition-colors" />
        </button>
      </div>
    );
  }

  // Expanded Floating Glass Toolbar View
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-[#181818]/95 backdrop-blur-2xl border border-[#FF6B35]/40 rounded-2xl p-3 shadow-2xl space-y-2 relative">
        {/* Header bar with Collapse Button */}
        <div className="flex items-center justify-between pb-1 border-b border-[#2A2A2A]/60">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#FF6B35] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI SLIDE COPILOT</span>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-lg hover:bg-[#2A2A2A] text-[#A0A0A0] hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
            title="Minimize Bar"
          >
            <span>Hide</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Preset Command Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono no-scrollbar">
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

          <button
            onClick={handleRegenerateSlide}
            disabled={isProcessing}
            className="inline-flex items-center gap-1 bg-[#121212] border border-[#FF6B35]/40 hover:border-[#FF6B35] text-[#FF6B35] hover:text-white px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3 text-[#FF6B35]" />
            <span>Regenerate</span>
          </button>
        </div>

        {/* Compact Form Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyCommand();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={isProcessing}
            placeholder="Ask AI to edit slide text, layout, or points..."
            className="flex-1 bg-[#121212] border border-[#2A2A2A] focus:border-[#FF6B35] rounded-xl px-3.5 py-1.5 text-xs text-white placeholder:text-[#A0A0A0]/60 focus:outline-none transition-all font-sans"
          />

          <button
            type="submit"
            disabled={!command.trim() || isProcessing}
            className="inline-flex items-center justify-center gap-1 bg-[#FF6B35] hover:bg-[#E85A24] disabled:bg-[#121212] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md disabled:opacity-40 shrink-0"
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

