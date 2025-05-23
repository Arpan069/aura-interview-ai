
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import InterviewAvatar from "@/components/interview/InterviewAvatar";
import VideoFeed from "@/components/interview/VideoFeed";
import QuestionCard from "@/components/interview/QuestionCard";
import InterviewTabs from "@/components/interview/InterviewTabs";
import type { Transcript } from "@/types/transcript";

interface InterviewContentProps {
  isInterviewStarted: boolean;
  isRecording: boolean;
  isProcessingAI: boolean;
  currentQuestion: string;
  transcript: Transcript[];
  isAudioOn: boolean;
  isVideoOn: boolean;
  isSystemAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleSystemAudio: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleStartInterview: () => Promise<void>;
  isLoading: boolean;
  currentCodingQuestion: string | null;
  isListening: boolean;
  isAISpeaking: boolean;
  lastTranscribed: string;
}

const InterviewContent: React.FC<InterviewContentProps> = ({
  isInterviewStarted,
  isRecording,
  isProcessingAI,
  currentQuestion,
  transcript,
  isAudioOn,
  isVideoOn,
  isSystemAudioOn,
  toggleVideo,
  toggleAudio,
  toggleSystemAudio,
  videoRef,
  handleStartInterview,
  isLoading,
  currentCodingQuestion,
  isListening,
  isAISpeaking,
  lastTranscribed
}) => {
  return (
    <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto container mx-auto">
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
              isSpeaking={isAISpeaking}
              isListening={isListening && !isAISpeaking}
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
          lastTranscribed={lastTranscribed}
        />

        <InterviewTabs
          transcript={transcript} 
          codingQuestion={currentCodingQuestion}
        />
      </motion.div>
    </main>
  );
};

export default InterviewContent;
