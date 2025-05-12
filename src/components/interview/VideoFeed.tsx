
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Mic, MicOff, VideoIcon, VideoOff } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSystemAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleSystemAudio: () => void;
  isRecording?: boolean;
  isListening?: boolean;
  lastTranscribed?: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  videoRef,
  isVideoOn,
  isAudioOn,
  isSystemAudioOn,
  toggleVideo,
  toggleAudio,
  toggleSystemAudio,
  isRecording = false,
  isListening = false,
  lastTranscribed = ""
}) => {
  return (
    <Card className="relative overflow-hidden h-[calc(100vh-380px)]">
      <CardContent className="p-0 h-full flex items-center justify-center relative">
        {/* Camera feed */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          {isVideoOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={!isAudioOn}
              className="h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }} // Mirror effect
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <p>Camera is off</p>
            </div>
          )}
        </div>
        
        {/* Controls overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          <Button
            size="sm"
            variant={isVideoOn ? "default" : "outline"}
            className="rounded-full w-10 h-10 p-0"
            onClick={toggleVideo}
          >
            {isVideoOn ? <VideoIcon size={18} /> : <VideoOff size={18} />}
          </Button>
          
          <Button
            size="sm"
            variant={isAudioOn ? "default" : "outline"}
            className="rounded-full w-10 h-10 p-0"
            onClick={toggleAudio}
          >
            {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
          </Button>
          
          <Button
            size="sm"
            variant={isSystemAudioOn ? "default" : "outline"}
            className="rounded-full w-10 h-10 p-0"
            onClick={toggleSystemAudio}
          >
            {isSystemAudioOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
        </div>
        
        {/* Recording indicator */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/80 text-white px-3 py-1 rounded-full text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            REC
          </motion.div>
        )}
        
        {/* Listening indicator */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 left-0 right-0 mx-auto w-fit bg-primary/80 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Listening...
          </motion.div>
        )}
        
        {/* Transcription preview */}
        {lastTranscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 right-4 mx-auto max-w-md bg-background/80 backdrop-blur-sm p-2 rounded-md text-sm text-foreground border border-border"
          >
            {lastTranscribed}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoFeed;
