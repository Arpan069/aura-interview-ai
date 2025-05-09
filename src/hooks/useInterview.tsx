
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { videoRecorder } from "@/utils/videoRecording";
import { speakText } from "@/utils/speechUtils";
import { useTranscript } from "@/hooks/useTranscript";
import { useInterviewQuestions } from "@/hooks/useInterviewQuestions";
import { useAIResponse } from "@/hooks/useAIResponse";
import { useRealTimeTranscription } from "@/hooks/useRealTimeTranscription";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

/**
 * Custom hook for managing interview logic and state
 */
export const useInterview = (isSystemAudioOn: boolean) => {
  // Navigation hook for redirecting after interview
  const navigate = useNavigate();
  
  // Core interview state
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [lastTranscribed, setLastTranscribed] = useState("");
  
  // Use custom hooks
  const { transcript, addToTranscript } = useTranscript();
  
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    currentCodingQuestion, 
    showCodingChallenge,
    setShowCodingChallenge,
    advanceToNextQuestion,
    questions,
    codingQuestions,
    resetQuestions
  } = useInterviewQuestions(isSystemAudioOn, addToTranscript);
  
  const { 
    isProcessingAI, 
    processWithOpenAI,
    resetConversation 
  } = useAIResponse(
    isSystemAudioOn, 
    addToTranscript, 
    advanceToNextQuestion
  );
  
  // Handler for new transcription
  const handleTranscriptionUpdate = useCallback((text: string) => {
    if (!text || text.trim().length === 0) return;
    setLastTranscribed(text);
  }, []);
  
  // Use the Audio Recorder hook
  const { 
    isRecording: isAudioRecording,
    startRecording: startAudioRecording,
    stopRecording: stopAudioRecording,
    audioBlob,
  } = useAudioRecorder({
    maxDuration: 15000, // 15 seconds max recording at a time
  });
  
  // Use the Real-Time Transcription hook with Whisper
  const {
    processAudioWithWhisper,
    transcriptionState,
    resetTranscription
  } = useRealTimeTranscription(
    addToTranscript,
    processWithOpenAI,
    currentQuestion
  );
  
  // Monitor audio blob changes and process with Whisper
  useEffect(() => {
    if (audioBlob && isInterviewStarted) {
      console.log("New audio blob available, processing with Whisper");
      processAudioWithWhisper(audioBlob);
      handleTranscriptionUpdate("Processing your response...");
    }
  }, [audioBlob, isInterviewStarted, processAudioWithWhisper, handleTranscriptionUpdate]);

  // Handler for starting listening
  const startListening = useCallback(async () => {
    if (isAudioRecording || isProcessingAI) return;
    
    console.log("Starting listening with audio recorder");
    setIsListening(true);
    await startAudioRecording();
  }, [isAudioRecording, isProcessingAI, startAudioRecording]);
  
  // Handler for stopping listening
  const stopListening = useCallback(() => {
    if (!isAudioRecording) return;
    
    console.log("Stopping listening");
    stopAudioRecording();
    setIsListening(false);
  }, [isAudioRecording, stopAudioRecording]);

  /**
   * Start the interview and recording
   * @param stream Media stream to record from
   */
  const startInterview = useCallback(async (stream: MediaStream) => {
    try {
      // Reset any previous state
      resetConversation();
      resetQuestions();
      resetTranscription();
      
      // Set interview as started
      setIsInterviewStarted(true);
      
      // Set the first question
      setCurrentQuestion(questions[0]);
      
      // Start recording
      await videoRecorder.startRecording(stream);
      setIsRecording(true);
      
      // Add initial AI question to transcript
      addToTranscript("AI Interviewer", questions[0]);
      
      // Delay speaking slightly to ensure UI updates first
      setTimeout(() => {
        // Simulate AI speaking the question
        speakText(questions[0], isSystemAudioOn)
          .catch(err => {
            console.error("Error during AI speech:", err);
          });
      }, 500);
      
      // Add a test message to verify the system is working
      console.log("Interview started successfully");
    } catch (error) {
      console.error("Failed to start interview:", error);
    }
  }, [
    questions, 
    addToTranscript, 
    isSystemAudioOn,
    resetConversation,
    resetQuestions,
    resetTranscription,
    setCurrentQuestion
  ]);

  /**
   * End the interview and save recording
   */
  const endInterview = useCallback(async () => {
    try {
      // Stop listening if active
      if (isListening) {
        stopListening();
      }
      
      if (isRecording) {
        // Stop recording and get the blob
        const recordedBlob = await videoRecorder.stopRecording();
        setIsRecording(false);
        
        // Save the recording and get the URL
        const url = await videoRecorder.saveRecording(recordedBlob);
        setVideoUrl(url);
      }
      
      // Navigate back to dashboard
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error("Error ending interview:", error);
      navigate("/candidate/dashboard");
    }
  }, [isRecording, isListening, navigate, stopListening]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        // Attempt to stop recording if component unmounts during recording
        videoRecorder.cleanup();
      }
      if (isListening) {
        stopListening();
      }
    };
  }, [isRecording, isListening, stopListening]);

  return {
    isInterviewStarted,
    isRecording,
    currentQuestion,
    transcript,
    startInterview,
    endInterview,
    currentCodingQuestion,
    showCodingChallenge,
    videoUrl,
    isProcessingAI,
    isListening,
    startListening,
    stopListening,
    lastTranscribed,
    isTranscribing: transcriptionState.isTranscribing,
  };
};
