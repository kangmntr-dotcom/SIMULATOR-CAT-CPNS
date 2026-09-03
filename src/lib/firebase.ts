import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { User, Question, ExamResult, ExamSettings } from '../types';
import { DEFAULT_QUESTIONS, DEFAULT_EXAM_SETTINGS } from '../data/defaultQuestions';

// Firebase configuration loaded from environment or firebase-applet-config
const firebaseConfig = {
  projectId: "gen-lang-client-0089664022",
  appId: "1:912513353293:web:ddfa831ca855358a987e04",
  apiKey: "AIzaSyCbv59Qw7OKV675bx3T-hllbmQCswm0R6s",
  authDomain: "gen-lang-client-0089664022.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-simulatorskdcpns-9a9db950-2be7-4c2e-bd34-2c75d8eb2c6b",
  storageBucket: "gen-lang-client-0089664022.firebasestorage.app",
  messagingSenderId: "912513353293"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with fallback for specified databaseId
let dbInstance: Firestore;
try {
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch {
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

// LocalStorage Fallback keys for resilience
const LS_USERS_KEY = 'skd_users_cache';
const LS_QUESTIONS_KEY = 'skd_questions_cache';
const LS_RESULTS_KEY = 'skd_results_cache';
const LS_SETTINGS_KEY = 'skd_settings_cache';

// Seed Initial Admin & Sample Peserta
export const INITIAL_ADMIN: User = {
  id: 'admin-default',
  username: 'admin',
  password: 'admin123',
  name: 'Panitia Seleksi CAT BKN Pusat',
  nik: '198507202010121001',
  examNumber: 'ADM-BKN-PST-01',
  email: 'admin.cat@bkn.go.id',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  createdAt: new Date().toISOString(),
};

export const INITIAL_PESERTA: User = {
  id: 'peserta-001',
  username: 'peserta01',
  password: 'peserta123',
  name: 'Ahmad Pratama, S.Kom.',
  nik: '3201012304950001',
  examNumber: '26-7101-2024-00129',
  email: 'ahmad.pratama@example.com',
  role: 'peserta',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: new Date().toISOString(),
  agency: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB)',
  formation: 'Pranata Komputer Ahli Pertama',
};

// Sync fallback helper
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

// ---------------- USER OPERATIONS ----------------

export async function fetchAllUsers(): Promise<User[]> {
  try {
    const colRef = collection(db, 'users');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      // Seed default admin and sample peserta in Firestore & LocalStorage
      await createOrUpdateUser(INITIAL_ADMIN);
      await createOrUpdateUser(INITIAL_PESERTA);
      return [INITIAL_ADMIN, INITIAL_PESERTA];
    }
    const users: User[] = [];
    snap.forEach((docSnap) => {
      users.push({ id: docSnap.id, ...(docSnap.data() as Omit<User, 'id'>) });
    });
    setLocal(LS_USERS_KEY, users);
    return users;
  } catch (err) {
    console.warn('Firestore fetchAllUsers fallback to local cache:', err);
    const cached = getLocal<User[]>(LS_USERS_KEY, [INITIAL_ADMIN, INITIAL_PESERTA]);
    return cached;
  }
}

export async function createOrUpdateUser(user: User): Promise<void> {
  // Update Local Cache immediately
  const localUsers = getLocal<User[]>(LS_USERS_KEY, [INITIAL_ADMIN, INITIAL_PESERTA]);
  const idx = localUsers.findIndex((u) => u.id === user.id || u.username.toLowerCase() === user.username.toLowerCase());
  if (idx >= 0) {
    localUsers[idx] = { ...localUsers[idx], ...user };
  } else {
    localUsers.unshift(user);
  }
  setLocal(LS_USERS_KEY, localUsers);

  try {
    const userDoc = doc(db, 'users', user.id);
    await setDoc(userDoc, user, { merge: true });
  } catch (err) {
    console.warn('Firestore createOrUpdateUser failed, saved to local cache:', err);
  }
}

export async function deleteUserById(userId: string): Promise<void> {
  const localUsers = getLocal<User[]>(LS_USERS_KEY, [INITIAL_ADMIN, INITIAL_PESERTA]);
  const filtered = localUsers.filter((u) => u.id !== userId);
  setLocal(LS_USERS_KEY, filtered);

  try {
    const userDoc = doc(db, 'users', userId);
    await deleteDoc(userDoc);
  } catch (err) {
    console.warn('Firestore deleteUser failed:', err);
  }
}

// ---------------- QUESTION OPERATIONS ----------------

export async function fetchQuestions(): Promise<Question[]> {
  try {
    const colRef = collection(db, 'questions');
    const q = query(colRef, orderBy('number', 'asc'));
    const snap = await getDocs(q);
    if (snap.empty) {
      // Seed default questions into firestore
      await seedDefaultQuestions();
      return DEFAULT_QUESTIONS;
    }
    const questions: Question[] = [];
    snap.forEach((d) => {
      questions.push({ id: d.id, ...(d.data() as Omit<Question, 'id'>) });
    });
    setLocal(LS_QUESTIONS_KEY, questions);
    return questions;
  } catch (err) {
    console.warn('Firestore fetchQuestions fallback to default:', err);
    return getLocal<Question[]>(LS_QUESTIONS_KEY, DEFAULT_QUESTIONS);
  }
}

export async function seedDefaultQuestions(): Promise<void> {
  setLocal(LS_QUESTIONS_KEY, DEFAULT_QUESTIONS);
  try {
    const batchPromises = DEFAULT_QUESTIONS.slice(0, 30).map((q) => {
      const qDoc = doc(db, 'questions', q.id);
      return setDoc(qDoc, q, { merge: true });
    });
    await Promise.all(batchPromises);
  } catch (err) {
    console.warn('Seed questions to Firestore error:', err);
  }
}

export async function saveQuestion(q: Question): Promise<void> {
  const questions = getLocal<Question[]>(LS_QUESTIONS_KEY, DEFAULT_QUESTIONS);
  const idx = questions.findIndex((item) => item.id === q.id);
  if (idx >= 0) {
    questions[idx] = q;
  } else {
    questions.push(q);
  }
  questions.sort((a, b) => a.number - b.number);
  setLocal(LS_QUESTIONS_KEY, questions);

  try {
    const qDoc = doc(db, 'questions', q.id);
    await setDoc(qDoc, q, { merge: true });
  } catch (err) {
    console.warn('Firestore saveQuestion error:', err);
  }
}

export async function deleteQuestionById(qId: string): Promise<void> {
  const questions = getLocal<Question[]>(LS_QUESTIONS_KEY, DEFAULT_QUESTIONS);
  const filtered = questions.filter((item) => item.id !== qId);
  setLocal(LS_QUESTIONS_KEY, filtered);

  try {
    const qDoc = doc(db, 'questions', qId);
    await deleteDoc(qDoc);
  } catch (err) {
    console.warn('Firestore deleteQuestion error:', err);
  }
}

// ---------------- EXAM RESULTS OPERATIONS ----------------

export async function fetchExamResults(): Promise<ExamResult[]> {
  try {
    const colRef = collection(db, 'exam_results');
    const snap = await getDocs(colRef);
    const results: ExamResult[] = [];
    snap.forEach((d) => {
      results.push({ id: d.id, ...(d.data() as Omit<ExamResult, 'id'>) });
    });
    results.sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime());
    setLocal(LS_RESULTS_KEY, results);
    return results;
  } catch (err) {
    console.warn('Firestore fetchExamResults fallback:', err);
    return getLocal<ExamResult[]>(LS_RESULTS_KEY, []);
  }
}

export async function saveExamResult(result: ExamResult): Promise<void> {
  const results = getLocal<ExamResult[]>(LS_RESULTS_KEY, []);
  results.unshift(result);
  setLocal(LS_RESULTS_KEY, results);

  try {
    const resDoc = doc(db, 'exam_results', result.id);
    await setDoc(resDoc, result, { merge: true });
  } catch (err) {
    console.warn('Firestore saveExamResult error:', err);
  }
}

// ---------------- SETTINGS OPERATIONS ----------------

export async function fetchExamSettings(): Promise<ExamSettings> {
  try {
    const sDoc = doc(db, 'settings', 'general');
    const snap = await getDoc(sDoc);
    if (snap.exists()) {
      const data = snap.data() as ExamSettings;
      setLocal(LS_SETTINGS_KEY, data);
      return data;
    }
    return DEFAULT_EXAM_SETTINGS;
  } catch {
    return getLocal<ExamSettings>(LS_SETTINGS_KEY, DEFAULT_EXAM_SETTINGS);
  }
}

export async function saveExamSettings(settings: ExamSettings): Promise<void> {
  setLocal(LS_SETTINGS_KEY, settings);
  try {
    const sDoc = doc(db, 'settings', 'general');
    await setDoc(sDoc, settings, { merge: true });
  } catch (err) {
    console.warn('Firestore saveExamSettings error:', err);
  }
}
