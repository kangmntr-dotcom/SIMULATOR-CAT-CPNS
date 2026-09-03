import React, { useState, useEffect } from 'react';
import { User, Question, ExamResult, ExamSettings } from './types';
import {
  fetchAllUsers,
  createOrUpdateUser,
  deleteUserById,
  fetchQuestions,
  saveQuestion,
  deleteQuestionById,
  seedDefaultQuestions,
  fetchExamResults,
  saveExamResult,
  fetchExamSettings,
  saveExamSettings,
  INITIAL_ADMIN,
  INITIAL_PESERTA,
} from './lib/firebase';
import { Header } from './components/Header';
import { AuthView } from './components/AuthView';
import { ExamInfoView } from './components/ExamInfoView';
import { ExamCATView } from './components/ExamCATView';
import { ExamResultView } from './components/ExamResultView';
import { AdminDashboard } from './components/AdminDashboard';
import { DEFAULT_EXAM_SETTINGS } from './data/defaultQuestions';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // App Views: 'auth' | 'exam_info' | 'exam_active' | 'exam_result' | 'admin'
  const [viewState, setViewState] = useState<string>('auth');
  const [adminTab, setAdminTab] = useState<string>('peserta');

  // Firebase Loaded Data
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [settings, setSettings] = useState<ExamSettings>(DEFAULT_EXAM_SETTINGS);

  // Active Session Exam Result (for current exam run)
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);

  // Load initial data from Firebase on mount
  useEffect(() => {
    async function initData() {
      setLoading(true);
      try {
        const [loadedUsers, loadedQuestions, loadedResults, loadedSettings] = await Promise.all([
          fetchAllUsers(),
          fetchQuestions(),
          fetchExamResults(),
          fetchExamSettings(),
        ]);

        setUsers(loadedUsers);
        setQuestions(loadedQuestions);
        setResults(loadedResults);
        setSettings(loadedSettings);

        // Check if there was an active session in localStorage
        const savedSession = localStorage.getItem('skd_active_user');
        if (savedSession) {
          try {
            const parsedUser = JSON.parse(savedSession);
            // Verify user still exists
            const matched = loadedUsers.find((u) => u.id === parsedUser.id);
            if (matched) {
              setCurrentUser(matched);
              if (matched.role === 'admin') {
                setViewState('admin');
              } else {
                setViewState('exam_info');
              }
            }
          } catch {
            localStorage.removeItem('skd_active_user');
          }
        }
      } catch (err) {
        console.error('Failed to initialize Firebase data:', err);
      } finally {
        setLoading(false);
      }
    }

    initData();
  }, []);

  // Login handler
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('skd_active_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setViewState('admin');
      setAdminTab('peserta');
    } else {
      setViewState('exam_info');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skd_active_user');
    setViewState('auth');
    setLatestResult(null);
  };

  // Start Exam
  const handleStartExam = () => {
    setViewState('exam_active');
  };

  // Finish Exam
  const handleFinishExam = async (result: ExamResult) => {
    setLatestResult(result);
    setViewState('exam_result');
    // Save to Firebase
    await saveExamResult(result);
    setResults((prev) => [result, ...prev]);
  };

  // Retake Exam
  const handleRetakeExam = () => {
    setLatestResult(null);
    setViewState('exam_info');
  };

  // Admin Actions
  const handleSaveUser = async (user: User) => {
    await createOrUpdateUser(user);
    const updatedUsers = await fetchAllUsers();
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUserById(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSaveQuestion = async (question: Question) => {
    await saveQuestion(question);
    const updatedQuestions = await fetchQuestions();
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = async (qId: string) => {
    await deleteQuestionById(qId);
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  const handleResetQuestions = async () => {
    await seedDefaultQuestions();
    const updated = await fetchQuestions();
    setQuestions(updated);
  };

  const handleSaveSettings = async (newSettings: ExamSettings) => {
    await saveExamSettings(newSettings);
    setSettings(newSettings);
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <div className="text-sm font-bold tracking-wider uppercase text-slate-300">
          Menghubungkan ke Database Firebase...
        </div>
        <p className="text-xs text-slate-500">SIMULATOR SKD CPNS • CAT BKN</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Header is shown in all states except during active exam testing (which has its own dedicated CAT bar) */}
      {viewState !== 'exam_active' && (
        <Header
          currentUser={currentUser}
          activeTab={adminTab}
          onSelectTab={(tab) => setAdminTab(tab)}
          onLogout={handleLogout}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {/* Auth / Login View */}
        {viewState === 'auth' && (
          <AuthView users={users} onLoginSuccess={handleLoginSuccess} />
        )}

        {/* Admin Dashboard */}
        {viewState === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboard
            users={users}
            questions={questions}
            results={results}
            settings={settings}
            activeTab={adminTab}
            onSelectTab={(tab) => setAdminTab(tab)}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onSaveQuestion={handleSaveQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onResetQuestions={handleResetQuestions}
            onSaveSettings={handleSaveSettings}
          />
        )}

        {/* Peserta View: Exam Info & Instructions (/simulasi/ujian_peserta/info/...) */}
        {viewState === 'exam_info' && currentUser && (
          <ExamInfoView
            user={currentUser}
            settings={settings}
            onStartExam={handleStartExam}
          />
        )}

        {/* Peserta View: Active CAT Test Simulator */}
        {viewState === 'exam_active' && currentUser && (
          <ExamCATView
            user={currentUser}
            questions={questions}
            settings={settings}
            onFinishExam={handleFinishExam}
          />
        )}

        {/* Peserta View: Result & Complete Discussion */}
        {viewState === 'exam_result' && currentUser && latestResult && (
          <ExamResultView
            result={latestResult}
            questions={questions}
            settings={settings}
            user={currentUser}
            onRetakeExam={handleRetakeExam}
            onBackToHome={() => setViewState('exam_info')}
          />
        )}
      </main>
    </div>
  );
}
