
import { useState, useCallback, useEffect } from 'react';
import { Message, InterviewQuestion, InterviewState } from '@/types/interview';
import { toast } from '@/hooks/use-toast';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { aiService } from '@/services/AIService';

// Default interview questions
const DEFAULT_QUESTIONS: InterviewQuestion[] = [
  { id: 1, question: "Tell me about yourself and your background.", category: "Introduction" },
  { id: 2, question: "What are your greatest professional strengths?", category: "Skills" },
  { id: 3, question: "Describe a challenging situation you've faced at work and how you handled it.", category: "Experience" },
  { id: 4, question: "Why are you interested in this position?", category: "Motivation" },
  { id: 5, question: "Where do you see yourself professionally in five years?", category: "Career Goals" },
];

export const useInterview = () => {
  // Interview state
  const [state, setState] = useState<InterviewState>({
    isActive: false,
    currentQuestionId: 1,
    messages: [],
    audioEnabled: true,
    videoEnabled: true,
    isProcessing: false,
    isSpeaking: false
  });
  
  const [questions] = useState<InterviewQuestion[]>(DEFAULT_QUESTIONS);

  // Handle transcription from user's speech
  const handleTranscription = useCallback((text: string) => {
    if (!text || !text.trim()) return;
    
    // Add user message to chat
    setState(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          role: 'user',
          content: text,
          timestamp: new Date()
        }
      ]
    }));
    
    // Generate AI response
    handleAIResponse([...state.messages, {
      role: 'user',
      content: text,
      timestamp: new Date()
    }]);
  }, [state.messages]);
  
  // Audio recording hook
  const { 
    isRecording,
    hasPermissions,
    startRecording,
    stopRecording,
    requestPermissions
  } = useAudioRecording(handleTranscription);
  
  // Process AI response
  const handleAIResponse = useCallback(async (messages: Message[]) => {
    try {
      setState(prev => ({ ...prev, isProcessing: true }));
      
      // Convert messages to format expected by OpenAI API
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: m.content
      }));
      
      // Generate AI response
      const response = await aiService.generateResponse(apiMessages);
      
      // Add AI response to chat
      setState(prev => ({
        ...prev,
        isProcessing: false,
        messages: [
          ...prev.messages,
          {
            role: 'assistant',
            content: response,
            timestamp: new Date()
          }
        ]
      }));
      
      // Convert AI response to speech
      if (state.audioEnabled) {
        speakAIResponse(response);
      }
      
      // Check if it's time to move to the next question
      const currentQuestion = questions.find(q => q.id === state.currentQuestionId);
      const shouldAdvanceQuestion = shouldMoveToNextQuestion(response, messages, currentQuestion?.question || "");
      
      if (shouldAdvanceQuestion && state.currentQuestionId < questions.length) {
        setTimeout(() => {
          advanceToNextQuestion();
        }, 1000); // Give a short pause before advancing
      }
      
    } catch (error) {
      console.error("Error handling AI response:", error);
      setState(prev => ({ ...prev, isProcessing: false }));
      toast({
        title: "AI Response Failed",
        description: "Could not generate AI interviewer response",
        variant: "destructive"
      });
    }
  }, [state.audioEnabled, state.currentQuestionId, questions]);
  
  // Speak AI response
  const speakAIResponse = useCallback(async (text: string) => {
    try {
      setState(prev => ({ ...prev, isSpeaking: true }));
      
      // Convert text to speech and play it
      const audioBuffer = await aiService.textToSpeech(text);
      await aiService.playAudio(audioBuffer);
      
      setState(prev => ({ ...prev, isSpeaking: false }));
    } catch (error) {
      console.error("Error speaking AI response:", error);
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);
  
  // Logic to determine if we should move to the next question
  const shouldMoveToNextQuestion = (aiResponse: string, messages: Message[], currentQuestion: string): boolean => {
    // Count meaningful exchanges on the current question
    let questionExchanges = 0;
    let foundQuestion = false;
    
    // Check if we've had enough back-and-forth on this question
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      
      if (msg.content.includes(currentQuestion)) {
        foundQuestion = true;
        break;
      }
      
      if (foundQuestion) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          questionExchanges++;
        }
      }
    }
    
    // Check if AI seems to be closing this question
    const closingPhrases = [
      "next question",
      "move on to",
      "let's discuss",
      "let's talk about",
      "let me ask you about",
      "thank you for sharing",
      "appreciate your response"
    ];
    
    const containsClosingPhrase = closingPhrases.some(phrase => 
      aiResponse.toLowerCase().includes(phrase.toLowerCase())
    );
    
    return questionExchanges >= 4 || containsClosingPhrase;
  };
  
  // Start the interview
  const startInterview = useCallback(async () => {
    const started = await startRecording();
    
    if (started) {
      setState(prev => ({ ...prev, isActive: true }));
      
      // Add first question from AI
      const firstQuestion = questions[0];
      setState(prev => ({
        ...prev,
        messages: [
          {
            role: 'assistant',
            content: `Welcome to your interview. ${firstQuestion.question}`,
            timestamp: new Date()
          }
        ]
      }));
      
      // Speak the first question
      if (state.audioEnabled) {
        speakAIResponse(`Welcome to your interview. ${firstQuestion.question}`);
      }
    }
  }, [questions, speakAIResponse, startRecording, state.audioEnabled]);
  
  // End the interview
  const endInterview = useCallback(() => {
    stopRecording();
    setState(prev => ({ ...prev, isActive: false }));
    
    toast({
      title: "Interview Ended",
      description: "Your AI interview session has ended"
    });
  }, [stopRecording]);
  
  // Advance to next question
  const advanceToNextQuestion = useCallback(() => {
    if (state.currentQuestionId < questions.length) {
      const nextQuestionId = state.currentQuestionId + 1;
      const nextQuestion = questions.find(q => q.id === nextQuestionId);
      
      if (nextQuestion) {
        setState(prev => ({ 
          ...prev, 
          currentQuestionId: nextQuestionId 
        }));
        
        // Add next question message from AI
        const nextQuestionMessage = `Let's move on to the next question. ${nextQuestion.question}`;
        
        setState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: 'assistant',
              content: nextQuestionMessage,
              timestamp: new Date()
            }
          ]
        }));
        
        // Speak the next question
        if (state.audioEnabled) {
          speakAIResponse(nextQuestionMessage);
        }
      }
    } else {
      // All questions completed
      const completionMessage = "That concludes all our questions. Thank you for participating in this interview.";
      
      setState(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: 'assistant',
            content: completionMessage,
            timestamp: new Date()
          }
        ]
      }));
      
      if (state.audioEnabled) {
        speakAIResponse(completionMessage);
      }
      
      // End interview after final message
      setTimeout(() => {
        endInterview();
      }, 5000);
    }
  }, [state.currentQuestionId, state.audioEnabled, questions, speakAIResponse, endInterview]);
  
  // Toggle audio
  const toggleAudio = useCallback(() => {
    setState(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
  }, []);
  
  // Toggle video
  const toggleVideo = useCallback(() => {
    setState(prev => ({ ...prev, videoEnabled: !prev.videoEnabled }));
  }, []);
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);
  
  return {
    state,
    questions,
    isRecording,
    hasPermissions,
    startInterview,
    endInterview,
    toggleAudio,
    toggleVideo,
    requestPermissions,
    currentQuestion: questions.find(q => q.id === state.currentQuestionId)
  };
};
