
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, Square } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import EnhancedBackground from "@/components/EnhancedBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useInterview } from "@/hooks/useInterview";
import VideoDisplay from "@/components/interview/VideoDisplay";
import ChatWindow from "@/components/interview/ChatWindow";

/**
 * Main Interview Page Component
 * Facilitates an AI-powered interview experience with real-time video,
 * transcription, and AI-generated responses
 */
const InterviewPage = () => {
  const navigate = useNavigate();
  
  const {
    state,
    hasPermissions,
    startInterview,
    endInterview,
    toggleAudio,
    toggleVideo,
    requestPermissions,
    currentQuestion
  } = useInterview();
  
  const handleStartClick = async () => {
    if (hasPermissions === false) {
      const granted = await requestPermissions();
      if (!granted) {
        toast({
          title: "Permission Required",
          description: "Microphone access is needed for the interview",
          variant: "destructive"
        });
        return;
      }
    }
    
    startInterview();
  };
  
  return (
    <EnhancedBackground intensity="light" variant="default">
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        {/* Header */}
        <header className="border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/candidate/dashboard")} className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-2">
              {state.isActive && (
                <div className="flex items-center gap-1">
                  <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-xs">{state.isProcessing ? "AI responding..." : "Recording active"}</span>
                </div>
              )}
              <h1 className="text-lg font-semibold">AI Interview Practice</h1>
            </div>
            
            <Button 
              variant="outline" 
              onClick={endInterview} 
              className="text-destructive"
              disabled={!state.isActive}
            >
              <Square className="h-4 w-4 mr-1" />
              End Interview
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left panel: Video and controls */}
            <div className="flex flex-col gap-4">
              <VideoDisplay 
                videoEnabled={state.videoEnabled}
                audioEnabled={state.audioEnabled}
                isActive={state.isActive}
                hasPermissions={hasPermissions}
                isSpeaking={state.isSpeaking}
                onRequestPermissions={requestPermissions}
                onToggleVideo={toggleVideo}
                onToggleAudio={toggleAudio}
              />
              
              {/* Question card */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    {!state.isActive ? (
                      <>
                        <h3 className="text-lg font-medium mb-2">Ready to begin your interview?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Make sure your microphone is working properly.
                        </p>
                        <Button 
                          onClick={handleStartClick} 
                          disabled={hasPermissions === false}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Interview
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-2">Current Question:</h3>
                        <p className="text-md">{currentQuestion?.question}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right panel: Chat and transcript */}
            <div className="flex flex-col h-full">
              <Card className="flex-1 flex flex-col h-[520px]">
                <CardContent className="p-4 flex-1 flex flex-col">
                  <ChatWindow 
                    messages={state.messages} 
                    isProcessing={state.isProcessing} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </EnhancedBackground>
  );
};

export default InterviewPage;
