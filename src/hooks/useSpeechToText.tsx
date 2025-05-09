
import "regenerator-runtime/runtime";
import { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from "@/hooks/use-toast";

export const useSpeechToText = (
  onTranscript: (text: string) => void,
  isInterviewActive: boolean = false
) => {
  // Use the react-speech-recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();
  
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState('');
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const startAttempts = useRef(0);
  const lastStartTime = useRef<number | null>(null);
  
  // Check for recognition errors
  useEffect(() => {
    if (isInterviewActive && !listening && isRecognitionActive) {
      // Only log after multiple failures to avoid false positives
      if (startAttempts.current > 3) {
        console.warn("Speech recognition stopped unexpectedly. Attempting to restart...");
        // Add small delay before restart
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    }
  }, [listening, isInterviewActive, isRecognitionActive]);
  
  // Start speech recognition with retry logic
  const startListening = useCallback(async () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition');
      return;
    }
    
    // Prevent rapid restart attempts
    const now = Date.now();
    if (lastStartTime.current && now - lastStartTime.current < 2000) {
      console.log("Throttling speech recognition start attempts");
      return;
    }
    
    lastStartTime.current = now;
    startAttempts.current += 1;
    
    try {
      // Use continuous mode with long sessions to avoid breaks
      await SpeechRecognition.startListening({ 
        continuous: true, 
        language: 'en-US',
      });
      
      setIsRecognitionActive(true);
      console.log('Started listening for speech');
      
      // Reset attempt counter on successful start
      startAttempts.current = 0;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      
      // Check for permission issues
      if (!isMicrophoneAvailable) {
        toast({
          title: "Microphone access needed",
          description: "Please allow microphone access for speech recognition."
        });
      }
      
      // Try again after a delay if we're in interview mode
      if (isInterviewActive && startAttempts.current < 5) {
        setTimeout(() => {
          startListening();
        }, 2000);
      }
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, isInterviewActive]);
  
  // Stop speech recognition
  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
    setIsRecognitionActive(false);
    console.log('Stopped listening for speech');
  }, []);
  
  // Reset transcript
  const clearTranscript = useCallback(() => {
    resetTranscript();
    setLastProcessedTranscript('');
  }, [resetTranscript]);
  
  // Process transcript changes with intelligent chunking
  useEffect(() => {
    if (!isInterviewActive || !transcript) return;
    
    // Debounce processing to collect more complete phrases
    const timeoutId = setTimeout(() => {
      if (transcript === lastProcessedTranscript) return;
      
      // Check if enough new text to process
      const newText = transcript.substring(lastProcessedTranscript.length).trim();
      
      if (newText) {
        console.log("Processing new speech:", newText);
        onTranscript(newText);
        setLastProcessedTranscript(transcript);
      }
    }, 1000); // 1 second debounce
    
    return () => clearTimeout(timeoutId);
  }, [transcript, lastProcessedTranscript, onTranscript, isInterviewActive]);
  
  // Auto-start listening when interview becomes active with exponential backoff
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isInterviewActive && !isRecognitionActive) {
      const delay = Math.min(1000 * Math.pow(2, startAttempts.current), 10000);
      timeoutId = setTimeout(() => {
        startListening();
      }, delay);
    } else if (!isInterviewActive && isRecognitionActive) {
      stopListening();
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (isRecognitionActive) {
        SpeechRecognition.stopListening();
      }
    };
  }, [isInterviewActive, isRecognitionActive, startListening, stopListening]);
  
  return {
    isListening: listening,
    currentTranscript: transcript,
    startListening,
    stopListening,
    clearTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};
