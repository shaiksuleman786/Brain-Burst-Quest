export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdByUsername: string;
  questions: Question[];
  createdAt: Date;
  isPublic: boolean;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  answers: number[];
  score: number;
  total: number;
  createdAt: Date;
}

export interface QuizAttempt {
  quizId: string;
  answers: (number | null)[];
  currentQuestion: number;
  startTime: Date;
  isCompleted: boolean;
}