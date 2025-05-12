
import { useCallback } from "react";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useSpeechMonitor } from "@/hooks/useSpeechMonitor";
import { useAIResponse } from "@/hooks/useAIResponse";

/**
 * Custom hook for managing speech-related functionality in the interview
 */
export function useInterviewSpeech(
  isInterviewStarted: boolean,
  isSystemAudioOn: boolean,
  currentQuestion: string,
  addToTranscript: (speaker: string, text: string) => void,
  advanceToNextQuestion: () => void
) {
  // Use AI response hook
  const { 
    isProcessingAI, 
    processWithOpenAI,
    resetConversation 
  } = useAIResponse(
    isSystemAudioOn, 
    addToTranscript, 
    advanceToNextQuestion
  );
  
  // Handler for new speech transcription
  const handleSpeechTranscript = useCallback((text: string) => {
    if (!text || text.trim().length < 2) return;
    
    console.log("Speech transcription received:", text);
    addToTranscript("You", text);
    
    // Process with AI for meaningful content (2+ words)
    if (text.trim().split(/\s+/).length >= 2) {
      // Add a small delay to allow for transcript to be displayed
      setTimeout(() => {
        processWithOpenAI(text, currentQuestion)
          .catch(err => console.error("Error processing speech:", err));
      }, 500);
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion]);
  
  // Use speech recognition with the enhanced handler
  const { 
    startListening,
    stopListening,
    clearTranscript: clearSpeechTranscript,
    isListening,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    resetAndRestartListening
  } = useSpeechToText(handleSpeechTranscript, isInterviewStarted);

  // Use speech monitoring hook
  const { 
    isSpeechRecognitionActive, 
    activateSpeechRecognition, 
    deactivateSpeechRecognition 
  } = useSpeechMonitor(
    isInterviewStarted, 
    isProcessingAI, 
    isListening, 
    resetAndRestartListening
  );
  
  return {
    isProcessingAI,
    startListening,
    stopListening,
    clearSpeechTranscript,
    isListening,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    isSpeechRecognitionActive,
    activateSpeechRecognition,
    deactivateSpeechRecognition,
    resetConversation
  };
}
