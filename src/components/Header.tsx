import React from 'react';
import { User } from '../types';
import { Shield, UserCheck, LogOut, Award, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onLogout: () => void;
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onLogout,
  onOpenHelp,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo CAT BKN */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner font-bold text-white tracking-wider border border-blue-400/40">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wide text-slate-50 uppercase">
                  SIMULATOR SKD CPNS
                </span>
                <span className="bg-blue-600 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  CAT BKN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight hidden sm:block">
                Sistem Simulasi Computer Assisted Test • Badan Kepegawaian Negara
              </p>
            </div>
          </div>

          {/* Navigation for Admin or User */}
          {currentUser && (
            <div className="flex items-center gap-2 sm:gap-4">
              {currentUser.role === 'admin' && onSelectTab && (
                <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
                  <button
                    onClick={() => onSelectTab('peserta')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'peserta'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    Manajemen Peserta
                  </button>
                  <button
                    onClick={() => onSelectTab('rekap')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'rekap'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    Rekap Nilai
                  </button>
                  <button
                    onClick={() => onSelectTab('soal')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'soal'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    Bank Soal
                  </button>
                  <button
                    onClick={() => onSelectTab('pengaturan')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'pengaturan'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    Pengaturan
                  </button>
                </div>
              )}

              {/* User Chip */}
              <div className="flex items-center gap-3 bg-slate-800/90 pl-2 pr-3 py-1.5 rounded-full border border-slate-700/70">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : currentUser.role === 'admin' ? (
                    <Shield className="w-4 h-4 text-amber-400" />
                  ) : (
                    <UserCheck className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-100 max-w-[130px] sm:max-w-[200px] truncate leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono leading-tight">
                    {currentUser.role === 'admin' ? (
                      <span className="text-amber-400 font-semibold uppercase">Administrator</span>
                    ) : (
                      <span>No: {currentUser.examNumber || currentUser.username}</span>
                    )}
                  </div>
                </div>
              </div>

              {onOpenHelp && (
                <button
                  onClick={onOpenHelp}
                  title="Panduan Petunjuk Ujian"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/50 border border-rose-800/40 rounded-lg transition-all"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
