
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { useInterviewMedia } from "@/hooks/useInterviewMedia";
import { useInterview } from "@/hooks/useInterview";
import { setSpeakingStateCallback } from "@/utils/speechUtils";
import InterviewStatusHandler from "@/components/interview/InterviewStatusHandler";
import InterviewContent from "@/components/interview/InterviewContent";

/**
 * Main Interview Page Component
 * Facilitates an AI-powered interview experience with real-time video, 
 * transcription, and AI-generated responses
 */
const InterviewPage = () => {
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null);
  const [aiIsSpeaking, setAiIsSpeaking] = useState(false);
  const [lastTranscribed, setLastTranscribed] = useState("");
  
  // Media hooks
  const { 
    videoRef, 
    isVideoOn, 
    isAudioOn, 
    isSystemAudioOn, 
    isLoading, 
    toggleVideo, 
    toggleAudio, 
    toggleSystemAudio,
    mediaStream,
    requestMediaPermissions
  } = useInterviewMedia();
  
  // Interview hooks
  const { 
    isInterviewStarted, 
    isRecording,
    isProcessingAI,
    currentQuestion, 
    transcript,
    startInterview,
    endInterview,
    currentCodingQuestion,
    browserSupportsSpeechRecognition,
    isListening
  } = useInterview(isSystemAudioOn);

  // Register the speaking callback
  useEffect(() => {
    setSpeakingStateCallback(setAiIsSpeaking);
    return () => setSpeakingStateCallback(null);
  }, []);
  
  // Effect to monitor transcription updates
  useEffect(() => {
    if (transcript.length > 0) {
      const lastEntry = transcript[transcript.length - 1];
      if (lastEntry.speaker === "You") {
        setLastTranscribed(lastEntry.text);
      }
    }
  }, [transcript]);

  /**
   * Handle API key setup success
   */
  const handleApiKeySuccess = () => {
    setApiKeyConfigured(true);
  };

  /**
   * Start interview with recording when user clicks start button
   */
  const handleStartInterview = async () => {
    if (!mediaStream) {
      // Try requesting permissions silently
      if (requestMediaPermissions) {
        try {
          await requestMediaPermissions();
        } catch (error) {
          console.error("Camera access needed: Please allow camera and microphone access to continue.");
          return;
        }
      }
      
      // If still no media stream, log error
      if (!mediaStream) {
        console.error("Camera access needed: Please allow camera and microphone access to continue.");
        return;
      }
    }
    
    // Check if browser supports speech recognition
    if (!browserSupportsSpeechRecognition) {
      console.info("Browser compatibility: For best experience, use Chrome, Edge, or Safari for speech recognition.");
    }
    
    // Start interview logic with media stream for recording
    await startInterview(mediaStream);
  };

  return (
    <EnhancedBackground intensity="light" variant="default">
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <InterviewStatusHandler onApiKeySuccess={handleApiKeySuccess}>
          <InterviewContent
            isInterviewStarted={isInterviewStarted}
            isRecording={isRecording}
            isProcessingAI={isProcessingAI}
            isLoading={isLoading}
            isListening={isListening}
            currentQuestion={currentQuestion}
            transcript={transcript}
            currentCodingQuestion={currentCodingQuestion}
            videoRef={videoRef}
            isVideoOn={isVideoOn}
            isAudioOn={isAudioOn}
            isSystemAudioOn={isSystemAudioOn}
            lastTranscribed={lastTranscribed}
            onEndInterview={endInterview}
            onStartInterview={handleStartInterview}
            onToggleVideo={toggleVideo}
            onToggleAudio={toggleAudio}
            onToggleSystemAudio={toggleSystemAudio}
          />
        </InterviewStatusHandler>
      </div>
    </EnhancedBackground>
  );
};

export default InterviewPage;
