
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X, Circle, Mic, MessageSquare } from "lucide-react";
import type { Transcript } from "@/types/transcript";
import type { TranscriptItem } from "@/types/interview"; 

interface InterviewHeaderProps {
  onEndInterview: (transcript: TranscriptItem[]) => void;
  isRecording?: boolean;
  isProcessingAI?: boolean;
  transcript: Transcript[];
}

/**
 * InterviewHeader component for the top navigation/header of the interview page
 * 
 * @param onEndInterview - Function to handle ending the interview
 * @param isRecording - Whether the interview is currently being recorded
 * @param isProcessingAI - Whether the AI is currently processing a response
 * @param transcript - The current interview transcript
 */
const InterviewHeader = ({ 
  onEndInterview, 
  isRecording, 
  isProcessingAI,
  transcript
}: InterviewHeaderProps) => {
  
  const handleEndInterview = () => {
    // Convert Transcript[] to TranscriptItem[]
    const formattedTranscript: TranscriptItem[] = transcript.map(item => ({
      speaker: item.speaker,
      text: item.text,
      timestamp: item.timestamp.toISOString(),
    }));
    
    onEndInterview(formattedTranscript);
  };
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Back button - returns to dashboard */}
        <Button variant="ghost" onClick={handleEndInterview} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Title with recording and transcription status */}
        <div className="flex items-center gap-2">
          {isRecording && (
            <>
              {/* Recording indicator */}
              <Circle className="h-3 w-3 fill-red-500 text-red-500 animate-pulse" />
              {/* Transcription indicator */}
              <Mic className="h-3 w-3 text-green-500 animate-pulse" />
              {/* AI Processing indicator */}
              {isProcessingAI && (
                <MessageSquare className="h-3 w-3 text-blue-500 animate-pulse" />
              )}
            </>
          )}
          <h1 className="text-lg font-semibold">AI Interview</h1>
          {isRecording && (
            <span className="text-xs opacity-75">
              {isProcessingAI 
                ? "(AI responding...)" 
                : "(Real-time transcription active)"}
            </span>
          )}
        </div>

        {/* End button to finish the interview */}
        <Button 
          variant="ghost" 
          onClick={handleEndInterview}
          className="text-destructive"
        >
          <X className="h-4 w-4 mr-1" />
          End Interview
        </Button>
      </div>
    </header>
  );
};

export default InterviewHeader;
