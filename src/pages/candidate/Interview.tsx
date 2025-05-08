
import React from "react";
import { motion } from "framer-motion";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewAvatar from "@/components/interview/InterviewAvatar";
import VideoFeed from "@/components/interview/VideoFeed";
import QuestionCard from "@/components/interview/QuestionCard";
import InterviewTabs from "@/components/interview/InterviewTabs";
import { useInterviewMedia } from "@/hooks/useInterviewMedia";
import { useInterview } from "@/hooks/useInterview";
import { Card, CardContent } from "@/components/ui/card";
import EnhancedBackground from "@/components/EnhancedBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Main Interview Page Component
 * Facilitates an AI-powered interview experience with real-time video, 
 * transcription, and AI-generated responses
 */
const InterviewPage = () => {
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

  // State to manage visibility of error popups
  const [showPermissionDeniedModal, setShowPermissionDeniedModal] = React.useState(false);
  const [showBrowserSupportModal, setShowBrowserSupportModal] = React.useState(false);
  
  /**
   * Start interview with recording when user clicks start button
   * Checks if media stream is available
   */
  const handleStartInterview = async () => {
    if (!mediaStream) {
      // Try requesting permissions silently
      if (requestMediaPermissions) {
        try {
          await requestMediaPermissions();
        } catch (error) {
          // Show permission denied modal instead of toast
          setShowPermissionDeniedModal(true);
          return;
        }
      }
      
      // If still no media stream, show modal instead of toast
      if (!mediaStream) {
        setShowPermissionDeniedModal(true);
        return;
      }
    }
    
    // Check if browser supports speech recognition
    if (!browserSupportsSpeechRecognition) {
      // Show browser support modal instead of toast
      setShowBrowserSupportModal(true);
      return;
    }
    
    // Start interview logic with media stream for recording
    await startInterview(mediaStream);
  };

  const closePermissionModal = () => {
    setShowPermissionDeniedModal(false);
  };

  const closeBrowserSupportModal = () => {
    setShowBrowserSupportModal(false);
  };

  return (
    <EnhancedBackground intensity="light" variant="default">
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <InterviewHeader 
          onEndInterview={endInterview} 
          isRecording={isRecording} 
          isProcessingAI={isProcessingAI} 
        />
        
        <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto container mx-auto">
          {/* Left side - AI Avatar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <Card className="relative overflow-hidden glass-morphism border-primary/10 h-[calc(100vh-300px)]"> 
              <CardContent className="p-0 h-full flex flex-col justify-center items-center">
                <InterviewAvatar 
                  isInterviewStarted={isInterviewStarted}
                  currentQuestion={currentQuestion} 
                  isSystemAudioOn={isSystemAudioOn}
                />
              </CardContent>
            </Card>
            
            <QuestionCard 
              isInterviewStarted={isInterviewStarted}
              currentQuestion={currentQuestion}
              startInterview={handleStartInterview}
              isLoading={isLoading}
            />
          </motion.div>
          
          {/* Right side - Video feed and tabs for transcript/coding */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <VideoFeed 
              videoRef={videoRef}
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
              isSystemAudioOn={isSystemAudioOn}
              toggleVideo={toggleVideo}
              toggleAudio={toggleAudio}
              toggleSystemAudio={toggleSystemAudio}
              isRecording={isRecording}
              isListening={isListening}
            />
            
            <InterviewTabs 
              transcript={transcript}
              codingQuestion={currentCodingQuestion}
            />
          </motion.div>
        </main>

        {/* Permission Denied Modal */}
        {showPermissionDeniedModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Camera access needed</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closePermissionModal} 
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mb-6">Please allow camera access to continue with the interview. You can change this setting in your browser's permissions.</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closePermissionModal}>Cancel</Button>
                <Button onClick={() => {
                  closePermissionModal();
                  requestMediaPermissions && requestMediaPermissions();
                }}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Browser Support Modal */}
        {showBrowserSupportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Browser compatibility</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeBrowserSupportModal} 
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mb-6">For best experience, use Chrome, Edge, or Safari for speech recognition. Your current browser may not fully support all interview features.</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeBrowserSupportModal}>Cancel</Button>
                <Button onClick={closeBrowserSupportModal}>
                  Continue Anyway
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </EnhancedBackground>
  );
};

export default InterviewPage;
