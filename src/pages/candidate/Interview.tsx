
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mic, MicOff, Camera, CameraOff, Volume2, VolumeX, UserCheck, ExternalLink, MessageSquare } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "@/hooks/use-toast";
import InterviewAvatar from "@/components/interview/InterviewAvatar";
import TranscriptSection from "@/components/interview/TranscriptSection";
import InterviewHeader from "@/components/interview/InterviewHeader";
import BackgroundWrapper from "@/components/home/BackgroundWrapper";

const InterviewPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // State management
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSystemAudioOn, setIsSystemAudioOn] = useState(true);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [transcript, setTranscript] = useState<Array<{speaker: string; text: string; timestamp: Date}>>([]);
  
  // Interview questions
  const [questions] = useState([
    "Tell me a little about yourself and your background.",
    "What interests you about this position?",
    "What are your greatest strengths that make you suitable for this role?",
    "Can you describe a challenging situation you faced at work and how you handled it?",
    "Where do you see yourself professionally in five years?",
  ]);
  
  // Initialize user media stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoOn, 
          audio: isAudioOn 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "System check complete",
            description: "Camera and microphone are working properly.",
          });
        }, 2000);
        
      } catch (error) {
        console.error("Error accessing media devices:", error);
        toast({
          title: "Media access error",
          description: "Could not access camera or microphone. Please check your permissions.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    initializeMedia();
    
    return () => {
      // Clean up media streams when component unmounts
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Toggle video
  const toggleVideo = async () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const isEnabled = videoTracks[0].enabled;
        videoTracks.forEach(track => {
          track.enabled = !isEnabled;
        });
        setIsVideoOn(!isVideoOn);
      } else if (isVideoOn) {
        // Need to get video access
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoTrack = newStream.getVideoTracks()[0];
          stream.addTrack(videoTrack);
          setIsVideoOn(true);
        } catch (error) {
          toast({
            title: "Camera error",
            description: "Could not access camera.",
            variant: "destructive",
          });
        }
      }
    }
  };

  // Toggle audio
  const toggleAudio = async () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const isEnabled = audioTracks[0].enabled;
        audioTracks.forEach(track => {
          track.enabled = !isEnabled;
        });
        setIsAudioOn(!isAudioOn);
      } else if (isAudioOn) {
        // Need to get audio access
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioTrack = newStream.getAudioTracks()[0];
          stream.addTrack(audioTrack);
          setIsAudioOn(true);
        } catch (error) {
          toast({
            title: "Microphone error",
            description: "Could not access microphone.",
            variant: "destructive",
          });
        }
      }
    }
  };

  // Toggle system audio (AI voice)
  const toggleSystemAudio = () => {
    setIsSystemAudioOn(!isSystemAudioOn);
  };

  // Start the interview
  const startInterview = () => {
    setIsInterviewStarted(true);
    setCurrentQuestion(questions[0]);
    
    // Add initial AI question to transcript
    addToTranscript("AI Interviewer", questions[0]);
    
    // Simulate AI speaking
    speakText(questions[0]);
  };

  // End the interview
  const endInterview = () => {
    // Here you would normally send the transcript data to your backend
    // for analysis and scoring
    
    toast({
      title: "Interview complete",
      description: "Thank you for participating in the interview.",
    });
    
    navigate("/candidate/dashboard");
  };

  // Add message to transcript
  const addToTranscript = (speaker: string, text: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text,
      timestamp: new Date()
    }]);
  };

  // Simulate AI speaking text
  const speakText = (text: string) => {
    if (!isSystemAudioOn) return;
    
    // Here you would normally integrate with a text-to-speech API
    // For now, we'll just simulate the AI speaking with a timer
    
    toast({
      title: "AI Speaking",
      description: text.substring(0, 60) + (text.length > 60 ? "..." : ""),
      duration: 3000,
    });
  };

  // Simulate candidate's answer and progress to next question
  const simulateAnswer = () => {
    // In a real app, this would be triggered by speech recognition
    // For demonstration, we'll use a button
    
    const currentIndex = questions.indexOf(currentQuestion);
    
    // Add simulated answer to transcript
    addToTranscript("You", "This is a simulated answer from the candidate.");
    
    // Move to the next question if available
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      setCurrentQuestion(nextQuestion);
      
      // Add next question to transcript
      setTimeout(() => {
        addToTranscript("AI Interviewer", nextQuestion);
        speakText(nextQuestion);
      }, 1000);
    } else {
      // End of interview
      setTimeout(() => {
        addToTranscript("AI Interviewer", "Thank you for your time. The interview is now complete.");
        speakText("Thank you for your time. The interview is now complete.");
        
        // Show end interview button
        toast({
          title: "Interview complete",
          description: "All questions have been answered.",
          duration: 5000,
        });
      }, 1000);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col">
        <InterviewHeader onEndInterview={endInterview} />
        
        <main className="flex-grow flex flex-col md:flex-row gap-4 p-4">
          {/* Left side - AI Avatar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <Card className="flex-grow relative overflow-hidden glass-morphism border-primary/10">
              <CardContent className="p-0 h-full flex flex-col justify-center items-center">
                <InterviewAvatar 
                  isInterviewStarted={isInterviewStarted}
                  currentQuestion={currentQuestion} 
                  isSystemAudioOn={isSystemAudioOn}
                />
              </CardContent>
            </Card>
            
            {isInterviewStarted ? (
              <Card className="glass-morphism border-primary/10">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Current Question:</h3>
                    <p className="text-md">{currentQuestion}</p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button onClick={simulateAnswer} className="bg-primary hover:bg-primary/90">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Simulate Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-morphism border-primary/10">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Ready to begin your interview?</h3>
                    <p className="text-sm text-muted-foreground mb-4">Make sure your camera and microphone are working properly.</p>
                    <Button 
                      onClick={startInterview} 
                      disabled={isLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? "Setting up..." : "Start Interview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
          
          {/* Right side - Video feed and transcript */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <Card className="relative glass-morphism border-primary/10">
              <CardContent className="p-2 aspect-video relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-md"
                />
                
                {/* Video overlay controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 bg-background/70 backdrop-blur-sm rounded-full">
                  <Button 
                    onClick={toggleVideo} 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${!isVideoOn ? 'bg-red-500/20 text-red-500' : ''}`}
                  >
                    {isVideoOn ? <Camera size={18} /> : <CameraOff size={18} />}
                  </Button>
                  
                  <Button 
                    onClick={toggleAudio} 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${!isAudioOn ? 'bg-red-500/20 text-red-500' : ''}`}
                  >
                    {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
                  </Button>
                  
                  <Button 
                    onClick={toggleSystemAudio} 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${!isSystemAudioOn ? 'bg-red-500/20 text-red-500' : ''}`}
                  >
                    {isSystemAudioOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </Button>
                </div>
                
                {/* Video indicators */}
                <div className="absolute top-4 left-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
                  <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-xs font-medium">LIVE</span>
                </div>
                
                <div className="absolute top-4 right-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
                  <UserCheck size={14} className="text-green-500" />
                  <span className="text-xs font-medium">You</span>
                </div>
              </CardContent>
            </Card>
            
            <TranscriptSection transcript={transcript} />
          </motion.div>
        </main>
      </div>
    </BackgroundWrapper>
  );
};

export default InterviewPage;
