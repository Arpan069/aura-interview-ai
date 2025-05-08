
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
