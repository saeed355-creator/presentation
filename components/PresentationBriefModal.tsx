'use client';

import { useState, useEffect } from 'react';
import { PresentationBrief, ResearchMode } from '@/lib/types';
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Globe,
  Sliders,
  FileText,
  Palette,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface PresentationBriefModalProps {
  isOpen: boolean;
  topic: string;
  onClose: () => void;
  onConfirmBrief: (brief: PresentationBrief) => void;
}

export default function PresentationBriefModal({
  isOpen,
  topic,
  onClose,
  onConfirmBrief,
}: PresentationBriefModalProps) {
  const [stepIdx, setStepIdx] = useState<number>(0);

  // Form State
  const [purpose, setPurpose] = useState<string>('Business / Professional');
  const [purposeCustom, setPurposeCustom] = useState<string>('');

  const [audience, setAudience] = useState<string>('Business Professionals');
  const [audienceCustom, setAudienceCustom] = useState<string>('');

  const [style, setStyle] = useState<string>('Minimal & Clean');
  const [styleCustom, setStyleCustom] = useState<string>('');

  const [depth, setDepth] = useState<string>('Balanced');
  const [depthCustom, setDepthCustom] = useState<string>('');

  const [slideCount, setSlideCount] = useState<number>(10);

  const [visualPreferences, setVisualPreferences] = useState<string[]>(['Mix of Everything']);
  const [visualsCustom, setVisualsCustom] = useState<string>('');

  const [researchLevel, setResearchLevel] = useState<ResearchMode>('standard');

  const [sourcePreference, setSourcePreference] = useState<string>('Sources + clickable links');
  const [sourceCustom, setSourceCustom] = useState<string>('');

  const [tone, setTone] = useState<string>('Professional');
  const [toneCustom, setToneCustom] = useState<string>('');

  const [language, setLanguage] = useState<string>('English');
  const [languageCustom, setLanguageCustom] = useState<string>('');

  const [specialRequirements, setSpecialRequirements] = useState<string>('');

  // Smart Pre-selection Classifier based on Topic Keywords
  useEffect(() => {
    if (!topic) return;
    const lower = topic.toLowerCase();

    if (lower.includes('pitch') || lower.includes('startup') || lower.includes('investor') || lower.includes('raise')) {
      setPurpose('Startup / Pitch');
      setAudience('Investors');
      setStyle('Modern Startup');
      setTone('Persuasive');
      setSlideCount(10);
    } else if (lower.includes('student') || lower.includes('college') || lower.includes('paper') || lower.includes('class') || lower.includes('lecture')) {
      setPurpose('Academic / College');
      setAudience('Students');
      setStyle('Academic');
      setTone('Academic');
      setResearchLevel('deep');
    } else if (lower.includes('teach') || lower.includes('workshop') || lower.includes('learn') || lower.includes('course')) {
      setPurpose('Teaching / Workshop');
      setAudience('Students');
      setStyle('Creative & Visual');
      setTone('Conversational');
    }
  }, [topic]);

  if (!isOpen) return null;

  const toggleVisualPref = (val: string) => {
    if (val === 'Mix of Everything') {
      setVisualPreferences(['Mix of Everything']);
      return;
    }
    const filtered = visualPreferences.filter((v) => v !== 'Mix of Everything');
    if (filtered.includes(val)) {
      const next = filtered.filter((v) => v !== val);
      setVisualPreferences(next.length === 0 ? ['Mix of Everything'] : next);
    } else {
      setVisualPreferences([...filtered, val]);
    }
  };

  const handleNext = () => {
    if (stepIdx < 4) {
      setStepIdx(stepIdx + 1);
    } else {
      // Build Final Brief & Submit
      const brief: PresentationBrief = {
        topic,
        purpose,
        purposeCustom: purpose === 'Other' ? purposeCustom : undefined,
        audience,
        audienceCustom: audience === 'Other' ? audienceCustom : undefined,
        style,
        styleCustom: style === 'Other' ? styleCustom : undefined,
        depth,
        depthCustom: depth === 'Custom' ? depthCustom : undefined,
        slideCount,
        visualPreferences,
        visualsCustom: visualPreferences.includes('Other') ? visualsCustom : undefined,
        researchLevel,
        sourcePreference,
        sourceCustom: sourcePreference === 'Other' ? sourceCustom : undefined,
        tone,
        toneCustom: tone === 'Other' ? toneCustom : undefined,
        language,
        languageCustom: language === 'Other' ? languageCustom : undefined,
        specialRequirements: specialRequirements.trim() || undefined,
      };
      onConfirmBrief(brief);
    }
  };

  const stepLabels = ['Purpose & Audience', 'Style & Depth', 'Visuals & Research', 'Tone & Requirements', 'Confirmation'];

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E4E1DA] rounded-3xl w-full max-w-2xl overflow-hidden shadow-card flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E4E1DA] flex items-center justify-between bg-[#F4F4F0] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-card">
              ✦
            </div>
            <div>
              <h2 className="font-serif font-extrabold text-lg text-[#111111] tracking-tight">
                Let's Shape Your Presentation
              </h2>
              <p className="text-xs text-[#666664] font-mono truncate max-w-md">
                Topic: "{topic}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E4E1DA] text-[#666664] hover:text-[#111111] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-white border-b border-[#F0EEE8] flex items-center justify-between shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111111]">STEP 0{stepIdx + 1}</span>
            <span className="text-[#666664]">• {stepLabels[stepIdx]}</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === stepIdx
                    ? 'w-6 bg-[#111111]'
                    : i < stepIdx
                    ? 'w-3 bg-[#2D7A58]'
                    : 'w-2 bg-[#E4E1DA]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* STEP 0: PURPOSE & AUDIENCE */}
          {stepIdx === 0 && (
            <div className="space-y-6">
              {/* Question 1: Purpose */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                  1. WHAT IS THIS PRESENTATION FOR?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Academic / College',
                    'Business / Professional',
                    'Startup / Pitch',
                    'Research',
                    'Teaching / Workshop',
                    'Marketing',
                    'General Knowledge',
                    'Conference / Seminar',
                    'Other',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPurpose(item)}
                      className={`p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        purpose === item
                          ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span>{item}</span>
                      {purpose === item && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {purpose === 'Other' && (
                  <input
                    type="text"
                    value={purposeCustom}
                    onChange={(e) => setPurposeCustom(e.target.value)}
                    placeholder="Tell us what you're creating this for..."
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                )}
              </div>

              {/* Question 2: Audience */}
              <div className="space-y-3 pt-4 border-t border-[#F0EEE8]">
                <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                  2. WHO WILL BE WATCHING?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Students',
                    'Professors',
                    'Business Professionals',
                    'Investors',
                    'General Audience',
                    'Technical Audience',
                    'Company / Team',
                    'Researchers',
                    'Other',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAudience(item)}
                      className={`p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        audience === item
                          ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span>{item}</span>
                      {audience === item && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {audience === 'Other' && (
                  <input
                    type="text"
                    value={audienceCustom}
                    onChange={(e) => setAudienceCustom(e.target.value)}
                    placeholder="e.g. First-year engineering students..."
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 1: STYLE, DEPTH & LENGTH */}
          {stepIdx === 1 && (
            <div className="space-y-6">
              {/* Question 3: Style */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                  3. WHAT SHOULD IT FEEL LIKE? (PRESENTATION STYLE)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Minimal & Clean',
                    'Creative & Visual',
                    'Professional',
                    'Academic',
                    'Modern Startup',
                    'Editorial',
                    'Dark & Premium',
                    'Data-Driven',
                    'Other',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStyle(item)}
                      className={`p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        style === item
                          ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span>{item}</span>
                      {style === item && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {style === 'Other' && (
                  <input
                    type="text"
                    value={styleCustom}
                    onChange={(e) => setStyleCustom(e.target.value)}
                    placeholder="Describe custom aesthetic style..."
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                )}
              </div>

              {/* Question 4 & 5: Depth & Length */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0EEE8]">
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    4. CONTENT DEPTH
                  </label>
                  {['Quick Overview', 'Balanced', 'Deep Research', 'Custom'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDepth(item)}
                      className={`w-full p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        depth === item
                          ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span>{item}</span>
                      {depth === item && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                  {depth === 'Custom' && (
                    <input
                      type="text"
                      value={depthCustom}
                      onChange={(e) => setDepthCustom(e.target.value)}
                      placeholder="Describe detail level..."
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    5. SLIDE COUNT ({slideCount} SLIDES)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 8, 10, 12, 15, 20].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSlideCount(num)}
                        className={`py-3 rounded-2xl border text-xs font-mono font-bold transition-all ${
                          slideCount === num
                            ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                            : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111]'
                        }`}
                      >
                        {num} Slides
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: VISUALS, RESEARCH & SOURCES */}
          {stepIdx === 2 && (
            <div className="space-y-6">
              {/* Question 6: Visual Style (Multi-select) */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                  6. WHAT KIND OF VISUALS SHOULD WE USE? (MULTI-SELECT)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Real Images',
                    'AI-Generated Visuals',
                    'Charts & Data',
                    'Diagrams & Infographics',
                    'Mix of Everything',
                    'Other',
                  ].map((item) => {
                    const isSel = visualPreferences.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleVisualPref(item)}
                        className={`p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                          isSel
                            ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                            : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111] hover:border-[#111111]'
                        }`}
                      >
                        <span>{item}</span>
                        {isSel && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                {visualPreferences.includes('Other') && (
                  <input
                    type="text"
                    value={visualsCustom}
                    onChange={(e) => setVisualsCustom(e.target.value)}
                    placeholder="Custom visual requirements..."
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:outline-none"
                  />
                )}
              </div>

              {/* Question 7 & 8: Research Level & Sources */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0EEE8]">
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    7. RESEARCH LEVEL
                  </label>
                  {[
                    { id: 'quick', label: '⚡ Quick (Fast)' },
                    { id: 'standard', label: '🔎 Standard (Grounded)' },
                    { id: 'deep', label: '🧠 Deep Research' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setResearchLevel(r.id as ResearchMode)}
                      className={`w-full p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        researchLevel === r.id
                          ? 'bg-[#2D7A58] border-[#2D7A58] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111]'
                      }`}
                    >
                      <span>{r.label}</span>
                      {researchLevel === r.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    8. SOURCE CITATIONS
                  </label>
                  {[
                    'Sources on each slide',
                    'References at the end',
                    'Sources + clickable links',
                    'Other',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSourcePreference(item)}
                      className={`w-full p-3 rounded-2xl border text-left font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                        sourcePreference === item
                          ? 'bg-[#111111] border-[#111111] text-white shadow-subtle'
                          : 'bg-[#F4F4F0] border-[#E4E1DA] text-[#111111]'
                      }`}
                    >
                      <span>{item}</span>
                      {sourcePreference === item && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TONE, LANGUAGE & SPECIAL REQUIREMENTS */}
          {stepIdx === 3 && (
            <div className="space-y-6">
              {/* Question 9 & 10: Tone & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    9. PRESENTATION TONE
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-2xl p-3 text-xs font-semibold text-[#111111] focus:outline-none"
                  >
                    {[
                      'Professional',
                      'Academic',
                      'Simple',
                      'Persuasive',
                      'Technical',
                      'Storytelling',
                      'Executive',
                      'Conversational',
                      'Other',
                    ].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {tone === 'Other' && (
                    <input
                      type="text"
                      value={toneCustom}
                      onChange={(e) => setToneCustom(e.target.value)}
                      placeholder="Custom tone..."
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                    10. LANGUAGE
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-2xl p-3 text-xs font-semibold text-[#111111] focus:outline-none"
                  >
                    {['English', 'Hindi', 'Gujarati', 'Hinglish', 'Other'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  {language === 'Other' && (
                    <input
                      type="text"
                      value={languageCustom}
                      onChange={(e) => setLanguageCustom(e.target.value)}
                      placeholder="Custom language..."
                      className="w-full bg-[#F4F4F0] border border-[#E4E1DA] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Question 11: Special Requirements */}
              <div className="space-y-3 pt-4 border-t border-[#F0EEE8]">
                <label className="block text-xs font-mono font-bold text-[#666664] uppercase tracking-wider">
                  11. SPECIAL INSTRUCTIONS / REQUIREMENTS (OPTIONAL)
                </label>
                <textarea
                  rows={4}
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="e.g. Focus more on India, use recent statistics, keep the language simple, include a comparison with traditional methods..."
                  className="w-full bg-[#F4F4F0] border border-[#E4E1DA] focus:border-[#111111] rounded-2xl p-4 text-xs text-[#111111] focus:outline-none transition-all resize-none font-sans"
                />
              </div>
            </div>
          )}

          {/* STEP 4: BRIEF CONFIRMATION SUMMARY */}
          {stepIdx === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-serif font-extrabold text-2xl text-[#111111]">
                  Here's what we'll create
                </h3>
                <p className="text-xs text-[#666664] font-light max-w-md mx-auto">
                  Review your presentation brief before our real-time research engine constructs your 16:9 presentation deck.
                </p>
              </div>

              <div className="bg-[#F4F4F0] border border-[#E4E1DA] rounded-3xl p-6 space-y-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E4E1DA]">
                  <div>
                    <span className="text-[#666664] block text-[10px]">TOPIC</span>
                    <span className="font-bold text-[#111111]">{topic}</span>
                  </div>
                  <div>
                    <span className="text-[#666664] block text-[10px]">PURPOSE</span>
                    <span className="font-bold text-[#111111]">{purpose === 'Other' ? purposeCustom : purpose}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E4E1DA]">
                  <div>
                    <span className="text-[#666664] block text-[10px]">TARGET AUDIENCE</span>
                    <span className="font-bold text-[#111111]">{audience === 'Other' ? audienceCustom : audience}</span>
                  </div>
                  <div>
                    <span className="text-[#666664] block text-[10px]">PRESENTATION STYLE</span>
                    <span className="font-bold text-[#111111]">{style === 'Other' ? styleCustom : style}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#E4E1DA]">
                  <div>
                    <span className="text-[#666664] block text-[10px]">SLIDE COUNT</span>
                    <span className="font-bold text-[#111111]">{slideCount} Slides</span>
                  </div>
                  <div>
                    <span className="text-[#666664] block text-[10px]">RESEARCH LEVEL</span>
                    <span className="font-bold text-[#2D7A58] uppercase">{researchLevel}</span>
                  </div>
                  <div>
                    <span className="text-[#666664] block text-[10px]">LANGUAGE</span>
                    <span className="font-bold text-[#111111]">{language === 'Other' ? languageCustom : language}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#666664] block text-[10px]">VISUAL PREFERENCES</span>
                  <span className="font-bold text-[#111111]">{visualPreferences.join(', ')}</span>
                </div>

                {specialRequirements.trim() && (
                  <div className="pt-2 border-t border-[#E4E1DA]">
                    <span className="text-[#666664] block text-[10px]">SPECIAL INSTRUCTIONS</span>
                    <span className="font-mono text-xs italic text-[#111111]">"{specialRequirements}"</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-[#E4E1DA] bg-[#F4F4F0] flex items-center justify-between shrink-0">
          {stepIdx > 0 ? (
            <button
              onClick={() => setStepIdx(stepIdx - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E4E1DA] bg-white text-xs font-bold text-[#111111] hover:bg-[#E4E1DA] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{stepIdx === 4 ? 'Edit Brief' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-sans text-xs font-extrabold uppercase tracking-wider px-7 py-3 rounded-full shadow-card transition-all"
          >
            <span>{stepIdx === 4 ? 'GENERATE PRESENTATION' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
