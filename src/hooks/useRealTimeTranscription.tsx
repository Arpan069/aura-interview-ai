
import { useCallback, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface TranscriptionState {
  isTranscribing: boolean;
  lastTranscriptionTime: number | null;
  transcriptionErrors: number;
}

/**
 * Hook for managing real-time transcription during interview
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
  
  // Debounce timer to avoid processing too frequently
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Callback function for handling real-time transcriptions 
   * @param text The transcribed text from OpenAI API
   */
  const handleRealTimeTranscription = useCallback((text: string) => {
    // Update state and log for debugging
    setTranscriptionState(prev => ({
      isTranscribing: true,
      lastTranscriptionTime: Date.now(),
      transcriptionErrors: prev.transcriptionErrors,
    }));
    
    console.log("Received transcription text:", text);
    
    if (text && text.trim()) {
      // Add transcribed text to the transcript UI
      addToTranscript("You (Transcribed)", text);
      
      // Accumulate text for better context
      accumulatedText.current = `${accumulatedText.current} ${text}`.trim();
      
      // Clear previous timer if exists
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Set new timer to process with delay
      debounceTimerRef.current = setTimeout(() => {
        console.log("Processing accumulated text:", accumulatedText.current);
        if (accumulatedText.current.length > 0) {
          processWithOpenAI(accumulatedText.current, currentQuestion)
            .catch(err => {
              console.error("Error processing with OpenAI:", err);
              setTranscriptionState(prev => ({
                ...prev,
                transcriptionErrors: prev.transcriptionErrors + 1
              }));
            });
          
          // Reset accumulated text after processing
          accumulatedText.current = "";
        }
      }, 2000); // 2 seconds delay to collect more speech
    } else {
      console.log("Empty transcription received");
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion]);

  // Function to debug transcription status
  const getTranscriptionStatus = useCallback(() => {
    return {
      ...transcriptionState,
      timeSinceLastTranscription: transcriptionState.lastTranscriptionTime 
        ? Date.now() - transcriptionState.lastTranscriptionTime 
        : null
    };
  }, [transcriptionState]);

  return {
    handleRealTimeTranscription,
    transcriptionState,
    getTranscriptionStatus
  };
};
