import React, { useState } from 'react';
import { User, ExamSettings } from '../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  ShieldCheck,
  Building,
  Briefcase,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface ExamInfoViewProps {
  user: User;
  settings: ExamSettings;
  onStartExam: () => void;
}

export const ExamInfoView: React.FC<ExamInfoViewProps> = ({
  user,
  settings,
  onStartExam,
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb & Official Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <span>Portal CAT BKN</span>
            <span>&bull;</span>
            <span>Simulasi Ujian Peserta Info</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            KONFIRMASI DATA & INFORMASI UJIAN SKD CPNS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ID Simulasi: <code className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">d44fae1b-68b6-4456-9efe-6e279e687964</code>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Status: Siap Ujian</span>
        </div>
      </div>

      {/* Grid: Peserta Card & Exam Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Peserta Identity Card (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Data Peserta Ujian
          </h2>

          <div className="flex flex-col items-center text-center pb-5 border-b border-slate-100">
            {/* Foto Peserta Resmi background merah/biru */}
            <div className="relative mb-3">
              <div className="w-24 h-32 rounded-xl bg-gradient-to-b from-red-600 to-red-700 shadow-md p-1 border-2 border-white flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white" />
            </div>

            <h3 className="font-bold text-slate-900 text-base leading-snug">{user.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
          </div>

          <div className="pt-4 space-y-3 text-xs flex-1">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Nomor Peserta Ujian
              </span>
              <span className="font-mono font-bold text-blue-900 text-sm">
                {user.examNumber || '26-7101-2024-00129'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Nomor Induk Kependudukan (NIK)
              </span>
              <span className="font-mono font-semibold text-slate-800">
                {user.nik || '3201012304950001'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold flex items-center gap-1">
                <Building className="w-3 h-3" /> Instansi
              </span>
              <span className="font-medium text-slate-800 leading-tight block">
                {user.agency || 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> Formasi Jabatan
              </span>
              <span className="font-medium text-slate-800 leading-tight block">
                {user.formation || 'Pranata Komputer Ahli Pertama'}
              </span>
            </div>
          </div>
        </div>

        {/* Exam Structure & Passing Grades (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 space-y-6">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              Rincian Komposisi Ujian & Nilai Ambang Batas
            </h2>
            <p className="text-xs text-slate-600">
              Sesuai dengan Keputusan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (MENPAN-RB) tentang Standar Ujian SKD CPNS.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Soal</span>
              <span className="text-2xl font-black text-slate-900">{settings.totalQuestions}</span>
              <span className="text-[10px] text-slate-400 block">Butir Soal</span>
            </div>
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-blue-600 uppercase block">Waktu Ujian</span>
              <span className="text-2xl font-black text-blue-900">{settings.durationMinutes}</span>
              <span className="text-[10px] text-blue-700 block">Menit</span>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-emerald-600 uppercase block">Skor Maksimal</span>
              <span className="text-2xl font-black text-emerald-900">550</span>
              <span className="text-[10px] text-emerald-700 block">Poin Kumulatif</span>
            </div>
          </div>

          {/* Table Breakdown */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Kategori Sub-Tes</th>
                  <th className="py-3 px-3 text-center">Jumlah Soal</th>
                  <th className="py-3 px-3 text-center">Sistem Penilaian</th>
                  <th className="py-3 px-3 text-center">Passing Grade</th>
                  <th className="py-3 px-3 text-center">Skor Maksimal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-blue-950 block">TWK</span>
                    <span className="text-[11px] text-slate-500">Tes Wawasan Kebangsaan</span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold">30 Butir</td>
                  <td className="py-3 px-3 text-center text-slate-600">Benar: +5 | Salah/Kosong: 0</td>
                  <td className="py-3 px-3 text-center">
                    <span className="bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                      {settings.twkPassingGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">150</td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-blue-950 block">TIU</span>
                    <span className="text-[11px] text-slate-500">Tes Inteligensia Umum</span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold">35 Butir</td>
                  <td className="py-3 px-3 text-center text-slate-600">Benar: +5 | Salah/Kosong: 0</td>
                  <td className="py-3 px-3 text-center">
                    <span className="bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                      {settings.tiuPassingGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">175</td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-blue-950 block">TKP</span>
                    <span className="text-[11px] text-slate-500">Tes Karakteristik Pribadi</span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold">45 Butir</td>
                  <td className="py-3 px-3 text-center text-slate-600">Skor Bertingkat 1 s/d 5</td>
                  <td className="py-3 px-3 text-center">
                    <span className="bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                      {settings.tkpPassingGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">225</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tata Tertib & Rules Accordion */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Petunjuk Teknis & Tata Tertib Ujian CAT BKN
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <p>
              Waktu simulasi berjalan mundur secara real-time selama <strong>100 menit</strong>. Ujian otomatis berakhir jika waktu telah habis.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <p>
              Peserta bebas berpindah soal nomor 1 hingga 110 menggunakan panel nomor navigasi di sebelah kanan layar ujian.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <p>
              Jawaban tersimpan otomatis saat memilih opsi. Fitur <strong>Ragu-ragu</strong> menandai nomor soal dengan warna kuning.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
              4
            </span>
            <p>
              Setelah selesai, hasil skor resmi (TWK, TIU, TKP) dan pembahasan lengkap tiap nomor soal akan langsung ditampilkan.
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-200 cursor-pointer select-none hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
            />
            <div className="text-xs text-slate-800 leading-relaxed">
              <span className="font-bold text-slate-900 block">
                Pakta Integritas & Konfirmasi Ujian:
              </span>
              Saya menyatakan telah membaca, memahami, dan menyetujui seluruh tata tertib CAT BKN di atas, serta bersedia mengerjakan simulasi SKD CPNS ini secara mandiri dan jujur.
            </div>
          </label>
        </div>

        {/* Start Exam Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kamera dan sistem koneksi terverifikasi siap.</span>
          </div>

          <button
            onClick={onStartExam}
            disabled={!agreed}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
              agreed
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>MULAI UJIAN SEKARANG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
