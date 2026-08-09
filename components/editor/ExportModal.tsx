'use client';

import { useState } from 'react';
import { Presentation } from '@/lib/types';
import { exportToPPTX } from '@/lib/pptx';
import { exportToPDF } from '@/lib/pdf';
import { X, Download, RefreshCw } from 'lucide-react';

interface ExportModalProps {
  presentation: Presentation;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({
  presentation,
  isOpen,
  onClose,
}: ExportModalProps) {
  const [exportingType, setExportingType] = useState<'pptx' | 'pdf' | null>(null);
  const [exportStep, setExportStep] = useState<string>('');

  if (!isOpen) return null;

  const handleExportPPTX = async () => {
    setExportingType('pptx');
    setExportStep('Preparing widescreen presentation slides...');
    await new Promise((r) => setTimeout(r, 600));

    setExportStep('Generating native PowerPoint shapes & typography...');
    await exportToPPTX(presentation);

    setExportStep('Ready ✓ Presentation downloaded!');
    await new Promise((r) => setTimeout(r, 1000));
    setExportingType(null);
    onClose();
  };

  const handleExportPDF = async () => {
    setExportingType('pdf');
    setExportStep('Rendering slide canvas vectors...');
    await new Promise((r) => setTimeout(r, 600));

    setExportStep('Compiling PDF page layout...');
    await exportToPDF(presentation);

    setExportStep('Ready ✓ PDF downloaded!');
    await new Promise((r) => setTimeout(r, 1000));
    setExportingType(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0A0A0] hover:text-white p-1 rounded-lg hover:bg-[#2A2A2A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-[#FF6B35]" />
          </div>
          <h3 className="text-xl font-bold text-white">Export Presentation</h3>
          <p className="text-xs text-[#A0A0A0] mt-1 font-light">
            Select your preferred export format for &quot;{presentation.title}&quot;
          </p>
        </div>

        {exportingType ? (
          <div className="py-8 text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto" />
            <div className="text-sm font-bold text-white font-mono">{exportStep}</div>
            <div className="text-xs text-[#A0A0A0]">Please wait while your deck builds.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* PPTX Export Button */}
            <button
              onClick={handleExportPPTX}
              className="w-full bg-[#121212] border border-[#2A2A2A] hover:border-[#FF6B35] p-4 rounded-xl flex items-center justify-between text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8C547]/10 border border-[#E8C547]/30 flex items-center justify-center text-[#E8C547] font-bold text-xs font-mono">
                  PPTX
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#FF6B35] transition-colors">
                    PowerPoint (.pptx)
                  </div>
                  <div className="text-xs text-[#A0A0A0]">
                    Native 16:9 widescreen editable presentation
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#A0A0A0] group-hover:text-white" />
            </button>

            {/* PDF Export Button */}
            <button
              onClick={handleExportPDF}
              className="w-full bg-[#121212] border border-[#2A2A2A] hover:border-[#8FAF9A] p-4 rounded-xl flex items-center justify-between text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8FAF9A]/10 border border-[#8FAF9A]/30 flex items-center justify-center text-[#5E7E6A] font-bold text-xs font-mono">
                  PDF
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#5E7E6A] transition-colors">
                    PDF Document (.pdf)
                  </div>
                  <div className="text-xs text-[#A0A0A0]">
                    High-resolution vector document export
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#A0A0A0] group-hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
