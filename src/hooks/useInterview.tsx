
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { videoRecorder } from "@/utils/videoRecording";
import { toast } from "@/hooks/use-toast";
import { speakText } from "@/utils/speechUtils";
import { useTranscript } from "@/hooks/useTranscript";
import { useInterviewQuestions } from "@/hooks/useInterviewQuestions";
import { useAIResponse } from "@/hooks/useAIResponse";
import { useSpeechToText } from "@/hooks/useSpeechToText";

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
    codingQuestions
  } = useInterviewQuestions(isSystemAudioOn, addToTranscript);
  
  const { isProcessingAI, processWithOpenAI } = useAIResponse(
    isSystemAudioOn, 
    addToTranscript, 
    advanceToNextQuestion
  );
  
  // Handler for new speech transcription
  const handleSpeechTranscript = useCallback((text: string) => {
    if (!text) return;
    
    console.log("Speech transcription received:", text);
    addToTranscript("You", text);
    
    // Process with AI if we have enough text
    if (text.split(" ").length >= 3) {
      processWithOpenAI(text, currentQuestion);
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion]);
  
  // Use speech recognition
  const { 
    startListening,
    stopListening,
    clearTranscript,
    isListening,
    browserSupportsSpeechRecognition
  } = useSpeechToText(handleSpeechTranscript, isInterviewStarted);

  /**
   * Start the interview and recording
   * @param stream Media stream to record from
   */
  const startInterview = useCallback(async (stream: MediaStream) => {
    try {
      // Set interview as started
      setIsInterviewStarted(true);
      // Set the first question
      setCurrentQuestion(questions[0]);
      
      // Start recording
      await videoRecorder.startRecording(stream);
      setIsRecording(true);
      
      // Add initial AI question to transcript
      addToTranscript("AI Interviewer", questions[0]);
      
      // Simulate AI speaking the question
      await speakText(questions[0], isSystemAudioOn);
      
      // Start listening for speech
      startListening();
      
      // Add a test message to verify the system is working
      console.log("Interview started successfully");
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast({
        title: "Start failed",
        description: "Could not start interview recording",
        variant: "destructive",
      });
    }
  }, [questions, addToTranscript, isSystemAudioOn, startListening]);

  /**
   * End the interview and save recording
   */
  const endInterview = useCallback(async () => {
    try {
      // Stop speech recognition
      stopListening();
      
      if (isRecording) {
        // Stop recording and get the blob
        const recordedBlob = await videoRecorder.stopRecording();
        setIsRecording(false);
        
        // Save the recording and get the URL
        const url = await videoRecorder.saveRecording(recordedBlob);
        setVideoUrl(url);
        
        toast({
          title: "Interview completed",
          description: "Recording saved successfully",
        });
      }
      
      // Navigate back to dashboard
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error("Error ending interview:", error);
      toast({
        title: "Error",
        description: "Failed to end interview properly",
        variant: "destructive",
      });
      navigate("/candidate/dashboard");
    }
  }, [isRecording, navigate, stopListening]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        // Attempt to stop recording if component unmounts during recording
        videoRecorder.cleanup();
      }
      stopListening();
    };
  }, [isRecording, stopListening]);

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
    browserSupportsSpeechRecognition
  };
};
