
import React, { RefObject } from "react";
import { UserCheck, MicOff, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoControls from "./VideoControls";

interface VideoFeedProps {
  videoRef: RefObject<HTMLVideoElement>;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSystemAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleSystemAudio: () => void;
  isRecording?: boolean;
  hasPermissions?: boolean | null;
  requestMediaPermissions?: () => Promise<void>;
}

/**
 * VideoFeed component for displaying the candidate's video feed
 * 
 * @param videoRef - Reference to the video element
 * @param isVideoOn - Whether video is enabled
 * @param isAudioOn - Whether microphone audio is enabled
 * @param isSystemAudioOn - Whether system audio is enabled
 * @param toggleVideo - Function to toggle video on/off
 * @param toggleAudio - Function to toggle microphone audio on/off
 * @param toggleSystemAudio - Function to toggle system audio on/off
 * @param isRecording - Whether the interview is being recorded
 * @param hasPermissions - Whether media permissions have been granted
 * @param requestMediaPermissions - Function to request media permissions
 */
const VideoFeed = ({
  videoRef,
  isVideoOn,
  isAudioOn,
  isSystemAudioOn,
  toggleVideo,
  toggleAudio,
  toggleSystemAudio,
  isRecording = false,
  hasPermissions = null,
  requestMediaPermissions
}: VideoFeedProps) => {
  return (
    <Card className="relative glass-morphism border-primary/10">
      <CardContent className="p-2 aspect-video relative">
        {/* Permission denied warning */}
        {hasPermissions === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4 text-center">
            <AlertTriangle size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Microphone Access Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To participate in the interview, please allow access to your microphone and camera.
              Without these permissions, voice transcription will not work.
            </p>
            {requestMediaPermissions && (
              <Button 
                onClick={requestMediaPermissions}
                className="mt-2"
                variant="default"
              >
                Request Permissions
              </Button>
            )}
          </div>
        )}
        
        {/* Warning for audio being off during recording */}
        {isRecording && !isAudioOn && hasPermissions !== false && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 p-4 rounded-md z-10 text-center">
            <MicOff className="mx-auto mb-2 text-red-500" size={32} />
            <p className="font-medium">Microphone is off</p>
            <p className="text-sm text-muted-foreground">Your voice will not be recorded</p>
            <Button 
              onClick={toggleAudio} 
              variant="default" 
              size="sm" 
              className="mt-2"
            >
              Enable Microphone
            </Button>
          </div>
        )}
        
        {/* Main video element that displays the user's camera feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-md"
        />
        
        {/* Video controls for toggling camera, microphone, and system audio */}
        <VideoControls
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          isSystemAudioOn={isSystemAudioOn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          toggleSystemAudio={toggleSystemAudio}
        />
        
        {/* Video status indicators */}
        <div className="absolute top-4 left-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
          {isRecording ? (
            <>
              {/* Recording indicator with real-time transcription notice */}
              <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs font-medium text-red-500">REC</span>
              <span className="text-xs ml-1 opacity-75">(Transcribing)</span>
            </>
          ) : (
            <>
              {/* Live indicator when not recording */}
              <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs font-medium">LIVE</span>
            </>
          )}
        </div>
        
        {/* User indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
          <UserCheck size={14} className="text-green-500" />
          <span className="text-xs font-medium">You</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoFeed;
