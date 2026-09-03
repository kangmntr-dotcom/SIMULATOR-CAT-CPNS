import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ExamResult, Question, ExamSettings, User } from '../types';
import {
  CheckCircle2,
  XCircle,
  Award,
  Clock,
  Printer,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Filter,
  FileCheck2,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExamResultViewProps {
  result: ExamResult;
  questions: Question[];
  settings: ExamSettings;
  user: User;
  onRetakeExam: () => void;
  onBackToHome: () => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  questions,
  settings,
  user,
  onRetakeExam,
  onBackToHome,
}) => {
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussionFilter, setDiscussionFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'TKP'>('ALL');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (result.passedOverall) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [result.passedOverall]);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} Menit ${s} Detik`;
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleExpand = (qNum: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qNum]: !prev[qNum],
    }));
  };

  // Filter discussion questions
  const filteredQuestions = questions.filter((q) => {
    const selected = result.answers[q.number];
    const isCorrect = q.category === 'TKP' ? true : selected === q.correctKey;

    if (discussionFilter === 'CORRECT') return isCorrect && !!selected;
    if (discussionFilter === 'WRONG') return !isCorrect || !selected;
    if (discussionFilter === 'TKP') return q.category === 'TKP';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 print:p-0 print:m-0">
      {/* Result Status Banner */}
      <div
        className={`rounded-2xl p-6 sm:p-8 text-white shadow-lg border ${
          result.passedOverall
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-500'
            : 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shrink-0">
            {result.passedOverall ? (
              <Award className="w-11 h-11 text-amber-300 animate-bounce" />
            ) : (
              <FileCheck2 className="w-11 h-11 text-slate-300" />
            )}
          </div>

          <div className="flex-1">
            <span className="text-[11px] uppercase tracking-widest font-bold text-white/80 block mb-1">
              PENGUMUMAN HASIL SKD CPNS RESMI • CAT BKN
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {result.passedOverall
                ? 'SELAMAT! ANDA MEMENUHI NILAI AMBANG BATAS (PASSING GRADE)'
                : 'ANDA BELUM MEMENUHI NILAI AMBANG BATAS SKD'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
              {result.passedOverall
                ? 'Hasil evaluasi menunjukkan Anda berhasil melampaui seluruh passing grade untuk TWK, TIU, dan TKP sesuai standar BKN.'
                : 'Tetap semangat! Anda belum memenuhi syarat ambang batas minimal di salah satu atau lebih komponen sub-tes. Silakan pelajari pembahasan di bawah ini.'}
            </p>
          </div>

          {/* Big Total Score Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
            <span className="text-[10px] uppercase font-bold text-white/75 block">TOTAL SKOR SKD</span>
            <span className="text-4xl font-black text-white">{result.scoreTotal}</span>
            <span className="text-[10px] text-white/70 block">dari Maks. 550</span>
          </div>
        </div>
      </div>

      {/* Participant Card and Detailed Scores Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Peserta Info (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-3.5 text-xs text-slate-700">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Identitas Peserta Ujian
          </h2>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nama Lengkap</span>
            <span className="font-bold text-slate-900 text-sm">{result.userName}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nomor Peserta</span>
            <span className="font-mono font-bold text-blue-900">{result.examNumber}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">NIK</span>
            <span className="font-mono font-semibold">{result.userNik}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Durasi Pengerjaan
            </span>
            <span className="font-semibold text-slate-800">
              {formatSeconds(result.timeSpentSeconds)} (dari 100 Menit)
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Waktu Ujian Selesai</span>
            <span className="text-slate-600">
              {new Date(result.finishedAt).toLocaleString('id-ID', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </span>
          </div>
        </div>

        {/* 3 Categories Score Cards (8 cols) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* TWK Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 uppercase">TWK</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    result.passedTwk
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {result.passedTwk ? 'LULUS PG' : 'TIDAK LULUS'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">Tes Wawasan Kebangsaan</p>

              <div className="text-3xl font-black text-slate-900">{result.scoreTwk}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Passing Grade: <strong>{settings.twkPassingGrade}</strong> (Maks: 150)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  result.passedTwk ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (result.scoreTwk / 150) * 100)}%` }}
              />
            </div>
          </div>

          {/* TIU Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-900 uppercase">TIU</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    result.passedTiu
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {result.passedTiu ? 'LULUS PG' : 'TIDAK LULUS'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">Tes Inteligensia Umum</p>

              <div className="text-3xl font-black text-slate-900">{result.scoreTiu}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Passing Grade: <strong>{settings.tiuPassingGrade}</strong> (Maks: 175)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  result.passedTiu ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (result.scoreTiu / 175) * 100)}%` }}
              />
            </div>
          </div>

          {/* TKP Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">TKP</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    result.passedTkp
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {result.passedTkp ? 'LULUS PG' : 'TIDAK LULUS'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">Tes Karakteristik Pribadi</p>

              <div className="text-3xl font-black text-slate-900">{result.scoreTkp}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Passing Grade: <strong>{settings.tkpPassingGrade}</strong> (Maks: 225)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  result.passedTkp ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (result.scoreTkp / 225) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDiscussion(!showDiscussion)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              showDiscussion
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{showDiscussion ? 'Tutup Pembahasan Soal' : 'Lihat Pembahasan Lengkap'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Hasil Ujian</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeExam}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ujian Ulang</span>
          </button>

          <button
            onClick={onBackToHome}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Question Discussion Section */}
      {showDiscussion && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Kunci Jawaban & Pembahasan Mendalam (110 Soal)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluasi jawaban yang Anda pilih dengan kunci jawaban resmi dan penjelasan materi BKN.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setDiscussionFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  discussionFilter === 'ALL'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Soal
              </button>
              <button
                onClick={() => setDiscussionFilter('CORRECT')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  discussionFilter === 'CORRECT'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Benar
              </button>
              <button
                onClick={() => setDiscussionFilter('WRONG')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  discussionFilter === 'WRONG'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salah / Kosong
              </button>
              <button
                onClick={() => setDiscussionFilter('TKP')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  discussionFilter === 'TKP'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                TKP
              </button>
            </div>
          </div>

          {/* List of Questions with Discussion */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const selectedKey = result.answers[q.number];
              const isCorrect = q.category === 'TKP' ? true : selectedKey === q.correctKey;
              const isExpanded = expandedQuestions[q.number] !== false; // default open

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50"
                >
                  {/* Item Header */}
                  <div
                    onClick={() => toggleExpand(q.number)}
                    className="p-4 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs bg-slate-800 text-white px-2 py-0.5 rounded">
                        No. {q.number}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          q.category === 'TWK'
                            ? 'bg-blue-100 text-blue-800'
                            : q.category === 'TIU'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {q.category}
                      </span>

                      {/* Status icon */}
                      {q.category === 'TKP' ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Skor Pilihan: {selectedKey && q.tkpScores ? q.tkpScores[selectedKey] : 0} Poin
                        </span>
                      ) : isCorrect ? (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+5 Poin)
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Salah / Kosong (0 Poin)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">
                        Jawaban Anda: <strong>{selectedKey || '-'}</strong>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Item Body */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 space-y-4 bg-white">
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                        {q.text}
                      </div>

                      {/* Options breakdown */}
                      <div className="space-y-2 text-xs">
                        {q.options.map((opt) => {
                          const isPicked = selectedKey === opt.key;
                          const isOfficialKey = q.correctKey === opt.key;
                          const tkpScore = q.tkpScores?.[opt.key];

                          let rowStyle = 'border-slate-200 bg-slate-50 text-slate-700';
                          if (isOfficialKey) {
                            rowStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
                          } else if (isPicked && !isCorrect) {
                            rowStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${rowStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full font-bold flex items-center justify-center border text-[11px]">
                                  {opt.key}
                                </span>
                                <span>{opt.text}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {isOfficialKey && (
                                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                                    Kunci Benar
                                  </span>
                                )}
                                {isPicked && (
                                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
                                    Pilihan Anda
                                  </span>
                                )}
                                {tkpScore !== undefined && (
                                  <span className="text-[11px] font-mono font-bold text-emerald-800">
                                    Bobot: {tkpScore} Poin
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
                        <span className="font-bold flex items-center gap-1.5 text-blue-900">
                          <BookOpen className="w-3.5 h-3.5" /> Pembahasan & Kunci:
                        </span>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
