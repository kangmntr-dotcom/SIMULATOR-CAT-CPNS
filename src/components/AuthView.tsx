import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Shield, User as UserIcon, Lock, AlertCircle, ArrowRight, CheckCircle2, Award, Info, Sparkles } from 'lucide-react';

interface AuthViewProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ users, onLoginSuccess }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('peserta');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanId = identifier.trim().toLowerCase();
      const cleanPass = password.trim();

      if (!cleanId || !cleanPass) {
        setErrorMessage('Silakan lengkapi identifier login dan kata sandi/PIN.');
        setIsLoading(false);
        return;
      }

      // Match user in database by username, NIK, or examNumber, matching selected role
      const foundUser = users.find((u) => {
        const matchRole = u.role === activeRole;
        const matchIdentifier =
          u.username.toLowerCase() === cleanId ||
          (u.nik && u.nik.toLowerCase() === cleanId) ||
          (u.examNumber && u.examNumber.toLowerCase() === cleanId) ||
          (u.email && u.email.toLowerCase() === cleanId);
        return matchRole && matchIdentifier;
      });

      if (!foundUser) {
        if (activeRole === 'peserta') {
          setErrorMessage(
            'Akun peserta tidak ditemukan. Pastikan nomor peserta/NIK benar, atau hubungi Administrator jika akun Anda belum didaftarkan.'
          );
        } else {
          setErrorMessage('Akun administrator tidak ditemukan.');
        }
        setIsLoading(false);
        return;
      }

      // Check password
      if (foundUser.password && foundUser.password !== cleanPass) {
        setErrorMessage('Kata sandi atau PIN yang Anda masukkan salah.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onLoginSuccess(foundUser);
    }, 400);
  };

  // Quick helper to fill demo credentials
  const fillDemoPeserta = () => {
    setActiveRole('peserta');
    setIdentifier('peserta01');
    setPassword('peserta123');
    setErrorMessage('');
  };

  const fillDemoAdmin = () => {
    setActiveRole('admin');
    setIdentifier('admin');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/50">
      <div className="w-full max-w-lg">
        {/* Portal Branding Card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-xl shadow-blue-500/20 text-white mb-3 border border-blue-400/30">
            <Award className="w-9 h-9 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SIMULATOR SKD CPNS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Computer Assisted Test (CAT) • Badan Kepegawaian Negara Republik Indonesia
          </p>
        </div>

        {/* Auth Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Role Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveRole('peserta');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeRole === 'peserta'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Login Peserta</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole('admin');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeRole === 'admin'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Login Administrator</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Header info for each role */}
            {activeRole === 'peserta' ? (
              <div className="mb-6 p-4 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-blue-950 mb-0.5">
                      Pemberitahuan Akun Peserta:
                    </span>
                    User peserta didaftarkan secara terpusat oleh{' '}
                    <strong>Administrator Instansi</strong>. Pendaftaran peserta secara mandiri
                    tidak dibuka. Gunakan NIK atau Nomor Peserta dan PIN yang telah diberikan.
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-950 mb-0.5">
                      Akses Khusus Administrator:
                    </span>
                    Portal panitia untuk mengelola bank soal SKD, monitoring rekapitulasi nilai live,
                    serta <strong>membuat akun peserta ujian baru</strong>.
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {activeRole === 'peserta'
                    ? 'Nomor Peserta / NIK / Username'
                    : 'Username / Email Administrator'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    {activeRole === 'peserta' ? (
                      <UserIcon className="w-4 h-4" />
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      activeRole === 'peserta'
                        ? 'Contoh: peserta01 atau 3201012304950001'
                        : 'Contoh: admin'
                    }
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {activeRole === 'peserta' ? 'PIN / Kata Sandi Ujian' : 'Kata Sandi Administrator'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={activeRole === 'peserta' ? 'Masukkan PIN / Kata Sandi' : 'Masukkan Kata Sandi'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Memverifikasi akun...</span>
                ) : (
                  <>
                    <span>Masuk ke Sistem CAT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials for Reviewer convenience */}
            <div className="mt-6 pt-5 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Kredensial Cepat (Uji Coba Penguji):
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={fillDemoPeserta}
                  className="px-3 py-2 text-left rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all text-xs text-slate-700"
                >
                  <div className="font-semibold text-blue-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Akun Peserta Demo</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    User: peserta01 | PIN: peserta123
                  </div>
                </button>
                <button
                  type="button"
                  onClick={fillDemoAdmin}
                  className="px-3 py-2 text-left rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-xs text-slate-700"
                >
                  <div className="font-semibold text-amber-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Akun Admin Demo</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    User: admin | Pass: admin123
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4 text-[11px] text-slate-400">
          Database terhubung ke <strong>Firebase Firestore</strong> Cloud Database
        </div>
      </div>
    </div>
  );
};
