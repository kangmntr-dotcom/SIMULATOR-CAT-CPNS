import React, { useState, useEffect, useMemo, useRef } from 'react';
import { User, Question, ExamSettings, ExamResult } from '../types';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  LogOut,
  Flag,
  RotateCcw
} from 'lucide-react';

interface ExamCATViewProps {
  user: User;
  questions: Question[];
  settings: ExamSettings;
  onFinishExam: (result: ExamResult) => void;
}

export const ExamCATView: React.FC<ExamCATViewProps> = ({
  user,
  questions,
  settings,
  onFinishExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [doubtfuls, setDoubtfuls] = useState<Record<number, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TWK' | 'TIU' | 'TKP'>('ALL');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Exam Duration in seconds (e.g., 100 minutes * 60)
  const initialSeconds = useMemo(() => settings.durationMinutes * 60, [settings.durationMinutes]);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds);
  const startTimeRef = useRef<string>(new Date().toISOString());

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleForceSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, doubtfuls]);

  // Format Remaining Time into HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex] || questions[0];

  // Helper for answering
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.number]: key,
    }));
  };

  // Toggle Doubtful (Ragu-ragu)
  const handleToggleDoubtful = () => {
    if (!currentQuestion) return;
    setDoubtfuls((prev) => ({
      ...prev,
      [currentQuestion.number]: !prev[currentQuestion.number],
    }));
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calculate real-time stats
  const totalCount = questions.length;
  const answeredCount = Object.keys(answers).length;
  const doubtfulCount = Object.values(doubtfuls).filter(Boolean).length;
  const unansweredCount = totalCount - answeredCount;

  // Filtered question numbers for right navigation panel
  const displayQuestions = useMemo(() => {
    if (categoryFilter === 'ALL') return questions;
    return questions.filter((q) => q.category === categoryFilter);
  }, [questions, categoryFilter]);

  // Compute final score & result object
  const calculateResult = (): ExamResult => {
    let scoreTwk = 0;
    let scoreTiu = 0;
    let scoreTkp = 0;

    questions.forEach((q) => {
      const selected = answers[q.number];
      if (!selected) return;

      if (q.category === 'TWK') {
        if (selected === q.correctKey) {
          scoreTwk += 5;
        }
      } else if (q.category === 'TIU') {
        if (selected === q.correctKey) {
          scoreTiu += 5;
        }
      } else if (q.category === 'TKP') {
        if (q.tkpScores && q.tkpScores[selected]) {
          scoreTkp += q.tkpScores[selected];
        } else {
          scoreTkp += 3; // default median
        }
      }
    });

    const passedTwk = scoreTwk >= settings.twkPassingGrade;
    const passedTiu = scoreTiu >= settings.tiuPassingGrade;
    const passedTkp = scoreTkp >= settings.tkpPassingGrade;
    const passedOverall = passedTwk && passedTiu && passedTkp;
    const scoreTotal = scoreTwk + scoreTiu + scoreTkp;

    return {
      id: 'res-' + Date.now(),
      userId: user.id,
      userName: user.name,
      userNik: user.nik,
      examNumber: user.examNumber,
      startedAt: startTimeRef.current,
      finishedAt: new Date().toISOString(),
      timeSpentSeconds: initialSeconds - remainingSeconds,
      answers,
      doubtfuls,
      scoreTwk,
      scoreTiu,
      scoreTkp,
      scoreTotal,
      passedTwk,
      passedTiu,
      passedTkp,
      passedOverall,
    };
  };

  const handleForceSubmit = () => {
    const res = calculateResult();
    onFinishExam(res);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    handleForceSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top CAT Status Bar */}
      <div className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Participant Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-11 bg-red-600 rounded overflow-hidden border border-white/40 shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">{user.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">
                No. Peserta: <span className="text-blue-300 font-semibold">{user.examNumber}</span>
              </div>
            </div>
          </div>

          {/* Center Category Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60">
            <span className="text-[11px] text-slate-400 font-medium">Sub-Tes Aktif:</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                currentQuestion?.category === 'TWK'
                  ? 'bg-blue-600 text-white'
                  : currentQuestion?.category === 'TIU'
                  ? 'bg-purple-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {currentQuestion?.category === 'TWK'
                ? 'TWK (Wawasan Kebangsaan)'
                : currentQuestion?.category === 'TIU'
                ? 'TIU (Inteligensia Umum)'
                : 'TKP (Karakteristik Pribadi)'}
            </span>
          </div>

          {/* Countdown Clock (CAT BKN Style) */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold tracking-wider ${
                remainingSeconds < 300
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                  : remainingSeconds < 900
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-emerald-400'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm sm:text-base">{formatTime(remainingSeconds)}</span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Selesai Ujian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Examination Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Question & Answering Section (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex-1 flex flex-col">
            {/* Question Header */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-md">
                  SOAL NO. {currentQuestion?.number}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {currentQuestion?.category === 'TWK' && 'Tes Wawasan Kebangsaan (TWK)'}
                  {currentQuestion?.category === 'TIU' && 'Tes Inteligensia Umum (TIU)'}
                  {currentQuestion?.category === 'TKP' && 'Tes Karakteristik Pribadi (TKP)'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {currentQuestion?.category === 'TKP'
                  ? 'Bobot Nilai: Skala 1 s/d 5'
                  : 'Bobot Nilai: Benar +5, Salah 0'}
              </div>
            </div>

            {/* Question Content */}
            <div className="p-5 sm:p-7 flex-1">
              {currentQuestion?.topic && (
                <div className="inline-block bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3">
                  Topik: {currentQuestion.topic}
                </div>
              )}

              <div className="text-slate-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal select-none">
                {currentQuestion?.text}
              </div>

              {/* Options List */}
              <div className="mt-6 space-y-3">
                {currentQuestion?.options.map((opt) => {
                  const isSelected = answers[currentQuestion.number] === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-medium shadow-xs ring-1 ring-blue-600/30'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Option Radio Circle */}
                      <div
                        className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        {opt.key}
                      </div>

                      <div className="flex-1 leading-relaxed">{opt.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-slate-50 px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {/* Ragu-ragu Checkbox (CAT BKN Style) */}
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold cursor-pointer select-none hover:bg-amber-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={!!doubtfuls[currentQuestion?.number]}
                  onChange={handleToggleDoubtful}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                <span>Ragu-ragu</span>
              </label>

              {/* Next / Simpan Button */}
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
                >
                  <span>Simpan & Lanjutkan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai & Kumpulkan</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Navigator Matrix (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 flex flex-col h-full">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Lembar Nomor Soal CAT
            </h3>

            {/* Category Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-[11px] font-semibold text-slate-600">
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`py-1.5 rounded-lg transition-all ${
                  categoryFilter === 'ALL'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setCategoryFilter('TWK')}
                className={`py-1.5 rounded-lg transition-all ${
                  categoryFilter === 'TWK'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                TWK
              </button>
              <button
                onClick={() => setCategoryFilter('TIU')}
                className={`py-1.5 rounded-lg transition-all ${
                  categoryFilter === 'TIU'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                TIU
              </button>
              <button
                onClick={() => setCategoryFilter('TKP')}
                className={`py-1.5 rounded-lg transition-all ${
                  categoryFilter === 'TKP'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                TKP
              </button>
            </div>

            {/* Legend CAT BKN */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 pb-3 mb-3 border-b border-slate-100 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold inline-block shrink-0" />
                <span>Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-500 text-white font-bold inline-block shrink-0" />
                <span>Ragu ({doubtfulCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 inline-block shrink-0" />
                <span>Belum ({unansweredCount})</span>
              </div>
            </div>

            {/* Questions Grid Matrix (Scrollable) */}
            <div className="flex-1 overflow-y-auto max-h-[380px] pr-1">
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
                {displayQuestions.map((q) => {
                  const isCurrent = q.number === currentQuestion?.number;
                  const isAnswered = !!answers[q.number];
                  const isDoubtful = !!doubtfuls[q.number];

                  let btnBg = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
                  if (isDoubtful) {
                    btnBg = 'bg-amber-500 text-white border-amber-600 font-bold';
                  } else if (isAnswered) {
                    btnBg = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                  }

                  const targetIndex = questions.findIndex((item) => item.number === q.number);

                  return (
                    <button
                      key={q.number}
                      onClick={() => {
                        if (targetIndex >= 0) setCurrentIndex(targetIndex);
                      }}
                      className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ${btnBg} ${
                        isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 font-black scale-105' : ''
                      }`}
                    >
                      <span>{q.number}</span>
                      {/* Sub-label for selected answer key */}
                      {answers[q.number] && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] opacity-90">
                          {answers[q.number]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 text-center mb-1">
              Konfirmasi Selesaikan Ujian CAT
            </h3>
            <p className="text-xs text-slate-600 text-center mb-4 leading-relaxed">
              Apakah Anda yakin ingin mengakhiri simulasi ujian sekarang? Nilai ujian Anda akan langsung diproses dan tidak dapat diubah kembali.
            </p>

            {/* Breakdown status */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Soal Sudah Terjawab:</span>
                <span className="font-bold text-emerald-600">{answeredCount} dari {totalCount}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Soal Ditandai Ragu-ragu:</span>
                <span className="font-bold text-amber-600">{doubtfulCount} soal</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Soal Belum Terjawab:</span>
                <span className="font-bold text-rose-600">{unansweredCount} soal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Kembali Mengerjakan
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow transition-colors cursor-pointer"
              >
                Ya, Akhiri Ujian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
