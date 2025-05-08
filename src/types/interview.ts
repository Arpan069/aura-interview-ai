
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
}

export interface InterviewState {
  isActive: boolean;
  currentQuestionId: number;
  messages: Message[];
  audioEnabled: boolean;
  videoEnabled: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
}

// Add the missing InterviewDetail interface
export interface InterviewDetail {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  score?: number;
  videoUrl?: string;
  transcript?: TranscriptItem[];
  analysis?: InterviewAnalysis;
}

export interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}

export interface InterviewAnalysis {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  notes: string;
}
