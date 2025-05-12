
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewAvatar from "@/components/interview/InterviewAvatar";
import VideoFeed from "@/components/interview/VideoFeed";
import QuestionCard from "@/components/interview/QuestionCard";
import InterviewTabs from "@/components/interview/InterviewTabs";
import { Card, CardContent } from "@/components/ui/card";
import { TranscriptEntry } from "@/types/transcript";

interface InterviewContentProps {
  isInterviewStarted: boolean;
  isRecording: boolean;
  isProcessingAI: boolean;
  isLoading: boolean;
  isListening: boolean;
  currentQuestion: string;
  transcript: TranscriptEntry[];
  currentCodingQuestion: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSystemAudioOn: boolean;
  lastTranscribed: string;
  onEndInterview: () => void;
  onStartInterview: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleSystemAudio: () => void;
}

const InterviewContent: React.FC<InterviewContentProps> = ({
  isInterviewStarted,
  isRecording,
  isProcessingAI,
  isLoading,
  isListening,
  currentQuestion,
  transcript,
  currentCodingQuestion,
  videoRef,
  isVideoOn,
  isAudioOn,
  isSystemAudioOn,
  lastTranscribed,
  onEndInterview,
  onStartInterview,
  onToggleVideo,
  onToggleAudio,
  onToggleSystemAudio,
}) => {
  return (
    <>
      <InterviewHeader 
        onEndInterview={onEndInterview} 
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
            startInterview={onStartInterview}
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
            toggleVideo={onToggleVideo}
            toggleAudio={onToggleAudio}
            toggleSystemAudio={onToggleSystemAudio}
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
    </>
  );
};

export default InterviewContent;
