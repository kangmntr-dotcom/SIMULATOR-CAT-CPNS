import React, { useState } from 'react';
import { User, Question, ExamResult, ExamSettings } from '../types';
import {
  Users,
  Award,
  BookOpen,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Shield,
  KeyRound,
  FileSpreadsheet,
  AlertCircle,
  Copy,
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  users: User[];
  questions: Question[];
  results: ExamResult[];
  settings: ExamSettings;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onSaveUser: (user: User) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
  onSaveQuestion: (question: Question) => Promise<void>;
  onDeleteQuestion: (questionId: string) => Promise<void>;
  onResetQuestions: () => Promise<void>;
  onSaveSettings: (settings: ExamSettings) => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users,
  questions,
  results,
  settings,
  activeTab,
  onSelectTab,
  onSaveUser,
  onDeleteUser,
  onSaveQuestion,
  onDeleteQuestion,
  onResetQuestions,
  onSaveSettings,
}) => {
  // Peserta Management State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State for User
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    nik: '',
    examNumber: '',
    password: '',
    email: '',
    agency: '',
    formation: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<ExamSettings>({ ...settings });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Question tab state
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'TWK' | 'TIU' | 'TKP'>('ALL');
  const [questionSearch, setQuestionSearch] = useState('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Filter peserta (only role 'peserta')
  const pesertaList = users.filter((u) => u.role === 'peserta');
  const filteredPeserta = pesertaList.filter((u) => {
    const q = userSearchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.nik.includes(q) ||
      (u.examNumber && u.examNumber.toLowerCase().includes(q))
    );
  });

  // Sort exam results by total score desc, tie-breaker: TKP, TIU, TWK (BKN official rule)
  const rankedResults = [...results].sort((a, b) => {
    if (b.scoreTotal !== a.scoreTotal) return b.scoreTotal - a.scoreTotal;
    if (b.scoreTkp !== a.scoreTkp) return b.scoreTkp - a.scoreTkp;
    if (b.scoreTiu !== a.scoreTiu) return b.scoreTiu - a.scoreTiu;
    return b.scoreTwk - a.scoreTwk;
  });

  // Open Add/Edit User Modal
  const handleOpenUserModal = (userToEdit?: User) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      setFormData({
        name: userToEdit.name,
        username: userToEdit.username,
        nik: userToEdit.nik,
        examNumber: userToEdit.examNumber,
        password: userToEdit.password || '',
        email: userToEdit.email,
        agency: userToEdit.agency || '',
        formation: userToEdit.formation || '',
        avatar: userToEdit.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
    } else {
      setEditingUser(null);
      // Auto generate random sample NIK & No Peserta for convenience
      const randNum = Math.floor(1000 + Math.random() * 9000);
      setFormData({
        name: '',
        username: `peserta_${randNum}`,
        nik: `320101${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        examNumber: `26-7101-2026-00${randNum}`,
        password: 'cat' + randNum,
        email: `peserta${randNum}@bkn.go.id`,
        agency: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi',
        formation: 'Analis Kebijakan Ahli Pertama',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      });
    }
    setShowAddUserModal(true);
  };

  const handleSaveUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.nik || !formData.password) {
      alert('Mohon lengkapi Nama, NIK, Username, dan Password!');
      return;
    }

    const newUser: User = {
      id: editingUser ? editingUser.id : 'user-' + Date.now(),
      name: formData.name.trim(),
      username: formData.username.trim().toLowerCase(),
      nik: formData.nik.trim(),
      examNumber: formData.examNumber.trim(),
      password: formData.password.trim(),
      email: formData.email.trim(),
      role: 'peserta',
      agency: formData.agency.trim(),
      formation: formData.formation.trim(),
      avatar: formData.avatar,
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString(),
    };

    await onSaveUser(newUser);
    setShowAddUserModal(false);
  };

  // Generate 3 Practice Candidates quickly
  const handleQuickGenerateCandidates = async () => {
    const samples = [
      { name: 'Dewi Lestari, S.E.', role: 'peserta', agency: 'Kementerian Keuangan', formation: 'Analis Anggaran' },
      { name: 'Budi Santoso, S.T.', role: 'peserta', agency: 'Kementerian PUPR', formation: 'Teknik Pengairan Ahli Pertama' },
      { name: 'Siti Rahmawati, S.Pd.', role: 'peserta', agency: 'Kementerian Pendidikan', formation: 'Pengembang Kurikulum' },
    ];

    for (const item of samples) {
      const rand = Math.floor(100 + Math.random() * 900);
      const u: User = {
        id: 'peserta-' + Date.now() + '-' + rand,
        name: item.name,
        username: `peserta_${rand}`,
        nik: `317101${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        examNumber: `26-7101-2026-00${rand}`,
        password: `pin${rand}`,
        email: `peserta.${rand}@instansi.go.id`,
        role: 'peserta',
        agency: item.agency,
        formation: item.formation,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      };
      await onSaveUser(u);
    }
  };

  // Export Results as CSV
  const handleExportCSV = () => {
    if (rankedResults.length === 0) {
      alert('Belum ada data nilai ujian peserta.');
      return;
    }

    const headers = ['Peringkat', 'Nama Peserta', 'NIK', 'No Peserta', 'Skor TWK', 'Skor TIU', 'Skor TKP', 'Total Skor', 'Status Ambang Batas', 'Waktu Submit'];
    const rows = rankedResults.map((r, i) => [
      i + 1,
      `"${r.userName}"`,
      `'${r.userNik}`,
      `'${r.examNumber}`,
      r.scoreTwk,
      r.scoreTiu,
      r.scoreTkp,
      r.scoreTotal,
      r.passedOverall ? 'MEMENUHI (MS)' : 'TIDAK MEMENUHI (TMS)',
      `"${new Date(r.finishedAt).toLocaleString('id-ID')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_SKD_CPNS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Admin Greeting & Metrics Overview */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Dashboard Administrator Instansi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            PANITIA SELEKSI SIMULATOR SKD CPNS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pengelolaan Peserta Ujian, Monitoring Rekap Nilai Live, dan Bank Soal CAT BKN.
          </p>
        </div>

        {/* Quick Stats Chips */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Peserta</span>
            <span className="text-xl font-black text-blue-400">{pesertaList.length}</span>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Sesi Selesai</span>
            <span className="text-xl font-black text-emerald-400">{results.length}</span>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Bank Soal</span>
            <span className="text-xl font-black text-amber-400">{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher for Mobile & Tablet */}
      <div className="flex md:hidden bg-white p-1 rounded-xl border border-slate-200 shadow-xs overflow-x-auto text-xs font-semibold text-slate-700">
        <button
          onClick={() => onSelectTab('peserta')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'peserta' ? 'bg-blue-600 text-white' : ''
          }`}
        >
          Manajemen Peserta
        </button>
        <button
          onClick={() => onSelectTab('rekap')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'rekap' ? 'bg-blue-600 text-white' : ''
          }`}
        >
          Rekap Nilai
        </button>
        <button
          onClick={() => onSelectTab('soal')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'soal' ? 'bg-blue-600 text-white' : ''
          }`}
        >
          Bank Soal
        </button>
        <button
          onClick={() => onSelectTab('pengaturan')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'pengaturan' ? 'bg-blue-600 text-white' : ''
          }`}
        >
          Pengaturan
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: MANAJEMEN PESERTA (PESERTA HANYA BISA DIBUAT ADMIN) */}
      {/* ========================================================= */}
      {activeTab === 'peserta' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Daftar Peserta Ujian CAT BKN
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sesuai ketentuan, pendaftaran akun peserta hanya dapat dilakukan oleh Administrator Instansi.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleQuickGenerateCandidates}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Otomatis buat 3 akun peserta latihan untuk simulasi cepat"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Generate 3 Peserta</span>
                </button>

                <button
                  onClick={() => handleOpenUserModal()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Peserta Baru</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="py-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari peserta berdasarkan Nama, NIK, atau Nomor Peserta..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-slate-800"
                />
              </div>
              <div className="text-xs font-semibold text-slate-500 shrink-0">
                {filteredPeserta.length} Peserta
              </div>
            </div>

            {/* Table Peserta */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Peserta & NIK</th>
                    <th className="py-3 px-3">No. Ujian / Sesi</th>
                    <th className="py-3 px-3">Kredensial Login</th>
                    <th className="py-3 px-3">Instansi & Formasi</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {filteredPeserta.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Tidak ada data peserta yang cocok. Klik "Tambah Peserta Baru" untuk mendaftarkan user.
                      </td>
                    </tr>
                  ) : (
                    filteredPeserta.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                              {p.avatar ? (
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                                  {p.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">{p.name}</span>
                              <span className="text-[11px] font-mono text-slate-500">
                                NIK: {p.nik}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3 font-mono font-semibold text-blue-900">
                          {p.examNumber || '-'}
                        </td>

                        <td className="py-3 px-3 font-mono text-[11px]">
                          <div className="bg-slate-100 p-1.5 rounded-lg border border-slate-200/80 inline-block space-y-0.5">
                            <div>User: <strong className="text-slate-900">{p.username}</strong></div>
                            <div>PIN: <strong className="text-blue-700">{p.password || '******'}</strong></div>
                          </div>
                        </td>

                        <td className="py-3 px-3 text-[11px]">
                          <span className="block font-semibold text-slate-800 truncate max-w-[200px]">
                            {p.agency || 'Kementerian PANRB'}
                          </span>
                          <span className="text-slate-500 truncate max-w-[200px] block">
                            {p.formation || 'Pranata Komputer'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                            Terdaftar
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenUserModal(p)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Data Peserta"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus peserta ${p.name}?`)) {
                                  onDeleteUser(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Peserta"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: REKAPITULASI NILAI & PERINGKAT HASIL UJIAN */}
      {/* ========================================================= */}
      {activeTab === 'rekap' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Rekapitulasi Nilai & Peringkat SKD CPNS
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Peringkat otomatis diurutkan berdasarkan Total Skor Tertinggi dengan tie-breaker resmi BKN: TKP &rarr; TIU &rarr; TWK.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Ekspor Rekap CSV</span>
              </button>
            </div>

            {/* Table Rekap */}
            <div className="mt-5 border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3 text-center">Rank</th>
                    <th className="py-3 px-4">Nama Peserta</th>
                    <th className="py-3 px-3 font-mono">No. Peserta</th>
                    <th className="py-3 px-3 text-center">TWK (PG {settings.twkPassingGrade})</th>
                    <th className="py-3 px-3 text-center">TIU (PG {settings.tiuPassingGrade})</th>
                    <th className="py-3 px-3 text-center">TKP (PG {settings.tkpPassingGrade})</th>
                    <th className="py-3 px-3 text-center font-bold">Total Skor</th>
                    <th className="py-3 px-4 text-center">Status Kelulusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {rankedResults.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        Belum ada peserta yang menyelesaikan simulasi ujian.
                      </td>
                    </tr>
                  ) : (
                    rankedResults.map((r, i) => (
                      <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 text-center font-bold">
                          {i === 0 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 inline-flex items-center justify-center text-xs font-black shadow-xs">
                              1
                            </span>
                          ) : i === 1 ? (
                            <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-900 inline-flex items-center justify-center text-xs font-black">
                              2
                            </span>
                          ) : i === 2 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-700 text-white inline-flex items-center justify-center text-xs font-black">
                              3
                            </span>
                          ) : (
                            <span className="text-slate-500">{i + 1}</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{r.userName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">NIK: {r.userNik}</span>
                        </td>

                        <td className="py-3 px-3 font-mono text-blue-900 font-semibold text-[11px]">
                          {r.examNumber}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              r.passedTwk
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            {r.scoreTwk}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              r.passedTiu
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            {r.scoreTiu}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              r.passedTkp
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            {r.scoreTkp}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center font-black text-slate-900 text-sm">
                          {r.scoreTotal}
                        </td>

                        <td className="py-3 px-4 text-center">
                          {r.passedOverall ? (
                            <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              MEMENUHI (MS)
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-900 px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              TIDAK MEMENUHI (TMS)
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: BANK SOAL SKD CPNS */}
      {/* ========================================================= */}
      {activeTab === 'soal' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Bank Soal Standar CAT BKN (110 Soal)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kelola dan tinjau butir soal TWK (1-30), TIU (31-65), dan TKP (66-110).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (confirm('Kembalikan bank soal ke 110 soal standar resmi BKN?')) {
                      onResetQuestions();
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Standar BKN</span>
                </button>
              </div>
            </div>

            {/* Filter Category & Search */}
            <div className="py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === 'ALL'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Semua ({questions.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('TWK')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === 'TWK'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  TWK (30)
                </button>
                <button
                  onClick={() => setSelectedCategory('TIU')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === 'TIU'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  TIU (35)
                </button>
                <button
                  onClick={() => setSelectedCategory('TKP')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === 'TKP'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  TKP (45)
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari teks soal / topik..."
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-800"
                />
              </div>
            </div>

            {/* List of Questions Preview */}
            <div className="space-y-3 mt-2">
              {questions
                .filter((q) => selectedCategory === 'ALL' || q.category === selectedCategory)
                .filter((q) =>
                  questionSearch
                    ? q.text.toLowerCase().includes(questionSearch.toLowerCase()) ||
                      (q.topic && q.topic.toLowerCase().includes(questionSearch.toLowerCase()))
                    : true
                )
                .slice(0, 15)
                .map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold bg-slate-800 text-white px-2 py-0.5 rounded text-[11px]">
                          No. {q.number}
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            q.category === 'TWK'
                              ? 'bg-blue-100 text-blue-800'
                              : q.category === 'TIU'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {q.category}
                        </span>
                        {q.topic && (
                          <span className="text-slate-500 font-medium">Topik: {q.topic}</span>
                        )}
                      </div>

                      <div className="font-mono text-slate-600">
                        {q.category === 'TKP' ? (
                          <span className="text-emerald-700 font-semibold">Skor 1 - 5</span>
                        ) : (
                          <span>Kunci: <strong className="text-blue-700">{q.correctKey}</strong></span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-800 leading-relaxed font-medium line-clamp-2">{q.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: PENGATURAN SIMULASI */}
      {/* ========================================================= */}
      {activeTab === 'pengaturan' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 max-w-2xl">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <Settings className="w-5 h-5 text-blue-600" />
              Pengaturan Aturan Ujian & Nilai Ambang Batas
            </h2>

            {settingsSavedToast && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pengaturan berhasil disimpan ke database Firebase!</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onSaveSettings(settingsForm);
                setSettingsSavedToast(true);
                setTimeout(() => setSettingsSavedToast(false), 3000);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Durasi Ujian (Menit)
                </label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={settingsForm.durationMinutes}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, durationMinutes: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Standar resmi SKD CPNS: 100 Menit.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Passing Grade TWK (Tes Wawasan Kebangsaan)
                </label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={settingsForm.twkPassingGrade}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, twkPassingGrade: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Standar BKN: 65 poin.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Passing Grade TIU (Tes Inteligensia Umum)
                </label>
                <input
                  type="number"
                  min="0"
                  max="175"
                  value={settingsForm.tiuPassingGrade}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, tiuPassingGrade: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Standar BKN: 80 poin.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Passing Grade TKP (Tes Karakteristik Pribadi)
                </label>
                <input
                  type="number"
                  min="0"
                  max="225"
                  value={settingsForm.tkpPassingGrade}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, tkpPassingGrade: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900 font-semibold"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">Standar BKN: 166 poin.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PESERTA */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {editingUser ? 'Edit Data Peserta' : 'Tambah Peserta Ujian Baru'}
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-base cursor-pointer font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Peserta *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Hidayat, S.T."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIK (16 Digit) *</label>
                  <input
                    type="text"
                    required
                    placeholder="320101..."
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Peserta Ujian</label>
                  <input
                    type="text"
                    placeholder="26-7101-2026-..."
                    value={formData.examNumber}
                    onChange={(e) => setFormData({ ...formData, examNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Username Login *</label>
                  <input
                    type="text"
                    required
                    placeholder="peserta01"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PIN / Password *</label>
                  <input
                    type="text"
                    required
                    placeholder="cat1234"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Instansi Pemerintah Tujuan</label>
                <input
                  type="text"
                  placeholder="Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Formasi Jabatan</label>
                <input
                  type="text"
                  placeholder="Pranata Komputer Ahli Pertama"
                  value={formData.formation}
                  onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-slate-900"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-sm"
                >
                  Simpan Peserta ke Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
