export type UserRole = 'admin' | 'peserta';

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  nik: string;
  examNumber: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  agency?: string; // Instansi tujuan
  formation?: string; // Formasi jabatan
}

export type QuestionCategory = 'TWK' | 'TIU' | 'TKP';

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: string;
  number: number;
  category: QuestionCategory;
  topic?: string;
  text: string;
  options: QuestionOption[];
  correctKey?: 'A' | 'B' | 'C' | 'D' | 'E'; // Untuk TWK & TIU
  tkpScores?: Record<'A' | 'B' | 'C' | 'D' | 'E', number>; // Untuk TKP skor 1-5
  explanation: string;
}

export interface ExamAnswer {
  questionNumber: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | 'E';
  isDoubtful: boolean;
  score: number;
}

export interface ExamResult {
  id: string;
  userId: string;
  userName: string;
  userNik: string;
  examNumber: string;
  startedAt: string;
  finishedAt: string;
  timeSpentSeconds: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>;
  doubtfuls: Record<number, boolean>;
  scoreTwk: number;
  scoreTiu: number;
  scoreTkp: number;
  scoreTotal: number;
  passedTwk: boolean;
  passedTiu: boolean;
  passedTkp: boolean;
  passedOverall: boolean;
}

export interface ExamSettings {
  durationMinutes: number;
  twkPassingGrade: number;
  tiuPassingGrade: number;
  tkpPassingGrade: number;
  totalQuestions: number;
}
