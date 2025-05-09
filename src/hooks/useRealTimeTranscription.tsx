
import { useCallback, useRef, useState } from "react";
import { OpenAIService } from "@/services/OpenAIService";

const openAIService = new OpenAIService();

interface TranscriptionState {
  isTranscribing: boolean;
  lastTranscriptionTime: number | null;
  transcriptionErrors: number;
}

/**
 * Hook for managing Whisper-based transcription during interview
 */
export const useRealTimeTranscription = (
  addToTranscript: (speaker: string, text: string) => void,
  processWithOpenAI: (text: string, currentQuestion: string) => Promise<void>,
  currentQuestion: string
) => {
  // Track the accumulated transcript text
  const accumulatedText = useRef<string>("");
  
  // Transcription state for debugging
  const [transcriptionState, setTranscriptionState] = useState<TranscriptionState>({
    isTranscribing: false,
    lastTranscriptionTime: null,
    transcriptionErrors: 0,
  });
  
  // Timeout for no response from AI
  const aiResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Process audio blob with Whisper API
   */
  const processAudioWithWhisper = useCallback(async (audioBlob: Blob) => {
    if (!audioBlob || audioBlob.size === 0) {
      console.log("Empty audio blob received, skipping transcription");
      return;
    }
    
    try {
      setTranscriptionState(prev => ({
        isTranscribing: true,
        lastTranscriptionTime: Date.now(),
        transcriptionErrors: prev.transcriptionErrors,
      }));
      
      console.log("Processing audio with Whisper, blob size:", audioBlob.size);
      
      // Use OpenAI Service to transcribe audio
      const result = await openAIService.transcribeRealTime(audioBlob, {
        language: "en",
        prompt: "This is part of a job interview. Transcribe accurately."
      });
      
      const transcribedText = result.text.trim();
      console.log("Whisper transcription result:", transcribedText);
      
      if (transcribedText) {
        // Add transcribed text to the transcript UI
        addToTranscript("You", transcribedText);
        
        // Accumulate text for better context
        accumulatedText.current = `${accumulatedText.current} ${transcribedText}`.trim();
        
        // Process with OpenAI for a response
        console.log("Processing accumulated text:", accumulatedText.current);
        if (accumulatedText.current.length > 0) {
          await processWithOpenAI(accumulatedText.current, currentQuestion);
          
          // Reset accumulated text after processing
          accumulatedText.current = "";
          
          // Set timeout for AI response
          if (aiResponseTimeoutRef.current) {
            clearTimeout(aiResponseTimeoutRef.current);
          }
          
          aiResponseTimeoutRef.current = setTimeout(() => {
            console.log("AI response timeout - might need to prompt again");
          }, 15000); // 15 second timeout for AI response
        }
      } else {
        console.log("Empty transcription result from Whisper");
      }
    } catch (error) {
      console.error("Error processing audio with Whisper:", error);
      setTranscriptionState(prev => ({
        ...prev,
        transcriptionErrors: prev.transcriptionErrors + 1
      }));
      
      // Log error after multiple failures
      if (transcriptionState.transcriptionErrors > 3) {
        console.error("AI Processing Issue: We're having trouble processing your responses. Please check your API key.");
      }
    } finally {
      setTranscriptionState(prev => ({
        ...prev,
        isTranscribing: false
      }));
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion, transcriptionState.transcriptionErrors]);

  // Function to debug transcription status
  const getTranscriptionStatus = useCallback(() => {
    return {
      ...transcriptionState,
      timeSinceLastTranscription: transcriptionState.lastTranscriptionTime 
        ? Date.now() - transcriptionState.lastTranscriptionTime 
        : null,
      accumulatedTextLength: accumulatedText.current.length
    };
  }, [transcriptionState]);

  // Function to reset the transcription state
  const resetTranscription = useCallback(() => {
    accumulatedText.current = "";
    if (aiResponseTimeoutRef.current) {
      clearTimeout(aiResponseTimeoutRef.current);
    }
  }, []);

  return {
    processAudioWithWhisper,
    transcriptionState,
    getTranscriptionStatus,
    resetTranscription
  };
};
