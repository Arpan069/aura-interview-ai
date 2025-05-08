
import { useState, useEffect, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useSpeechToText = (
  onTranscript: (text: string) => void,
  isInterviewActive: boolean = false
) => {
  // Use the react-speech-recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState('');
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  
  // Start speech recognition
  const startListening = useCallback(async () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition');
      return;
    }
    
    try {
      await SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      setIsRecognitionActive(true);
      console.log('Started listening for speech');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, [browserSupportsSpeechRecognition]);
  
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
  
  // Process transcript changes
  useEffect(() => {
    if (!isInterviewActive || !transcript || transcript === lastProcessedTranscript) return;
    
    const transcriptDiff = transcript.substring(lastProcessedTranscript.length).trim();
    
    if (transcriptDiff) {
      onTranscript(transcriptDiff);
      setLastProcessedTranscript(transcript);
    }
  }, [transcript, lastProcessedTranscript, onTranscript, isInterviewActive]);
  
  // Auto-start listening when interview becomes active
  useEffect(() => {
    if (isInterviewActive && !isRecognitionActive) {
      startListening();
    } else if (!isInterviewActive && isRecognitionActive) {
      stopListening();
    }
    
    return () => {
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
