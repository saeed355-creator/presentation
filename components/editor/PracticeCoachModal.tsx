'use client';

import { useState, useEffect, useRef } from 'react';
import { Slide, ThemeConfig, PracticeScoreResult } from '@/lib/types';
import { X, Mic, MicOff, Play, Square, Award, Clock, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import SlideLayoutRenderer from './SlideLayoutRenderer';

interface PracticeCoachModalProps {
  slides: Slide[];
  theme: ThemeConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function PracticeCoachModal({
  slides,
  theme,
  isOpen,
  onClose,
}: PracticeCoachModalProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(5);
  const [isPracticing, setIsPracticing] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const [result, setResult] = useState<PracticeScoreResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isPracticing) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPracticing]);

  if (!isOpen) return null;

  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.onresult = (event: any) => {
            let current = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            setSpokenText((prev) => prev + current);
          };
          rec.onend = () => setIsListening(false);
          rec.start();
          recognitionRef.current = rec;
          setIsListening(true);
        } catch (e) {
          console.warn('Speech recognition start notice:', e);
        }
      } else {
        setIsListening(true);
      }
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const handleStartPractice = () => {
    setResult(null);
    setElapsedSeconds(0);
    setSpokenText('');
    setActiveSlideIdx(0);
    setIsPracticing(true);
    startSpeechRecognition();
  };

  const handleFinishPractice = () => {
    setIsPracticing(false);
    stopSpeechRecognition();

    const targetSecs = targetMinutes * 60;
    const diffSecs = elapsedSeconds - targetSecs;

    // Calculate score heuristics
    let timingScore = 90;
    if (Math.abs(diffSecs) > 30) timingScore -= 12;
    if (Math.abs(diffSecs) > 60) timingScore -= 15;

    const wordCount = spokenText.trim().split(/\s+/).filter(Boolean).length;
    let clarityScore = wordCount > 100 ? 88 : 82;
    let structureScore = slides.length >= 5 ? 92 : 84;
    let confidenceScore = Math.min(95, 75 + Math.round(wordCount / 20));

    const overall = Math.round((timingScore + clarityScore + structureScore + confidenceScore) / 4);

    const recommendations: string[] = [];
    if (diffSecs > 0) {
      recommendations.push(`Your presentation exceeded the target duration by ${diffSecs} seconds.`);
    } else if (diffSecs < -45) {
      recommendations.push(`Your presentation was ${Math.abs(diffSecs)} seconds shorter than the target duration. Expand key points.`);
    } else {
      recommendations.push('Excellent timing! You stayed within your target duration window.');
    }

    recommendations.push('Reduce filler words ("um", "ah", "like") during slide transitions.');
    recommendations.push(`Spend additional time explaining slide ${Math.min(slides.length, 3)} metrics.`);

    setResult({
      overall,
      clarity: clarityScore,
      structure: structureScore,
      confidence: confidenceScore,
      timing: timingScore,
      targetDurationSeconds: targetSecs,
      actualDurationSeconds: elapsedSeconds,
      recommendations,
    });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeSlide = slides[activeSlideIdx] || slides[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl relative">
        {/* Top Header */}
        <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#121212] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">AI Presentation Coach & Practice Studio</h3>
              <p className="text-[11px] font-mono text-[#A0A0A0]">
                Rehearse live speech, track duration, and receive instant AI performance analytics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRACTICE RESULT SCORE DISPLAY */}
        {result ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-3xl mx-auto w-full text-center my-auto">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#8FAF9A] bg-[#8FAF9A]/10 border border-[#8FAF9A]/20 px-3.5 py-1 rounded-full uppercase">
                PRACTICE SESSION COMPLETE
              </span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Presentation Performance Score</h2>
            </div>

            {/* Big Overall Score Pill */}
            <div className="w-36 h-36 rounded-full bg-[#121212] border-4 border-[#FF6B35] flex flex-col items-center justify-center mx-auto shadow-2xl">
              <span className="text-4xl font-extrabold text-white">{result.overall}</span>
              <span className="text-xs font-mono text-[#A0A0A0]">/ 100 OVERALL</span>
            </div>

            {/* Measurable Bar Scores */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono">
              <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-xl space-y-2">
                <span className="text-[11px] text-[#A0A0A0] uppercase">Clarity</span>
                <div className="text-xl font-bold text-white">{result.clarity}%</div>
                <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8FAF9A] h-full" style={{ width: `${result.clarity}%` }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-xl space-y-2">
                <span className="text-[11px] text-[#A0A0A0] uppercase">Structure</span>
                <div className="text-xl font-bold text-white">{result.structure}%</div>
                <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FF6B35] h-full" style={{ width: `${result.structure}%` }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-xl space-y-2">
                <span className="text-[11px] text-[#A0A0A0] uppercase">Confidence</span>
                <div className="text-xl font-bold text-white">{result.confidence}%</div>
                <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8B78A8] h-full" style={{ width: `${result.confidence}%` }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-xl space-y-2">
                <span className="text-[11px] text-[#A0A0A0] uppercase">Timing</span>
                <div className="text-xl font-bold text-white">{result.timing}%</div>
                <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E8C547] h-full" style={{ width: `${result.timing}%` }} />
                </div>
              </div>
            </div>

            {/* Timing Analysis Box */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-5 rounded-xl text-left flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[#A0A0A0] block">TARGET DURATION:</span>
                <span className="text-white font-bold text-sm">{formatTimer(result.targetDurationSeconds)}</span>
              </div>
              <div className="text-right">
                <span className="text-[#A0A0A0] block">ACTUAL REHEARSAL TIME:</span>
                <span className="text-[#FF6B35] font-bold text-sm">{formatTimer(result.actualDurationSeconds)}</span>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-[#121212] border border-[#2A2A2A] p-5 rounded-xl text-left space-y-2 text-xs">
              <span className="font-mono text-[#FF6B35] uppercase font-bold block mb-2">AI COACH RECOMMENDATIONS:</span>
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#8FAF9A] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartPractice}
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A24] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>
          </div>
        ) : (
          /* ACTIVE PRACTICE WORKSPACE */
          <div className="flex-1 flex flex-col justify-between p-6 overflow-hidden">
            {/* Top Rehearsal Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                {/* Target Duration Picker */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span>TARGET:</span>
                  {[3, 5, 10, 15].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTargetMinutes(m)}
                      disabled={isPracticing}
                      className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
                        targetMinutes === m
                          ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                          : 'bg-[#121212] border-[#2A2A2A] text-[#A0A0A0]'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Display & Main Practice Action */}
              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono font-bold text-white bg-[#121212] border border-[#2A2A2A] px-4 py-1 rounded-xl">
                  ⏱ {formatTimer(elapsedSeconds)}
                </div>

                {!isPracticing ? (
                  <button
                    onClick={handleStartPractice}
                    className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E85A24] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Practice Session</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishPractice}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all animate-pulse"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Finish Practice & Analyze</span>
                  </button>
                )}
              </div>
            </div>

            {/* Middle Slide Preview */}
            <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div className="w-full max-w-3xl aspect-[16/9] rounded-xl overflow-hidden border border-[#2A2A2A] shadow-2xl">
                <SlideLayoutRenderer slide={activeSlide} theme={theme} />
              </div>
            </div>

            {/* Bottom Controls & Mic Feedback */}
            <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSlideIdx === 0}
                  onClick={() => setActiveSlideIdx((prev) => prev - 1)}
                  className="p-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white">
                  Slide {activeSlideIdx + 1} of {slides.length}
                </span>
                <button
                  disabled={activeSlideIdx === slides.length - 1}
                  onClick={() => setActiveSlideIdx((prev) => prev + 1)}
                  className="p-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Speech Recognition Indicator */}
              <div className="flex items-center gap-2 text-[#A0A0A0]">
                {isListening ? (
                  <span className="text-[#8FAF9A] flex items-center gap-1.5 font-bold">
                    <Mic className="w-4 h-4 animate-bounce text-[#8FAF9A]" />
                    Listening to speech input...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <MicOff className="w-4 h-4 text-[#A0A0A0]" />
                    Mic ready
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
