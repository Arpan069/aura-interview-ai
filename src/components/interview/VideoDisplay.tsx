
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MediaControls from './MediaControls';

interface VideoDisplayProps {
  videoEnabled: boolean;
  audioEnabled: boolean;
  isActive: boolean;
  hasPermissions: boolean | null;
  isSpeaking: boolean;
  onRequestPermissions: () => Promise<boolean>;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  videoEnabled,
  audioEnabled,
  isActive,
  hasPermissions,
  isSpeaking,
  onRequestPermissions,
  onToggleVideo,
  onToggleAudio
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Set up webcam feed when video is enabled
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const setupVideo = async () => {
      try {
        if (videoEnabled && hasPermissions !== false) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    
    setupVideo();
    
    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoEnabled, hasPermissions]);
  
  return (
    <Card className="w-full overflow-hidden relative">
      <CardContent className="p-0 aspect-video relative">
        {/* Permission denied warning */}
        {hasPermissions === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4 text-center">
            <AlertTriangle size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Microphone Access Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To participate in the interview, please allow access to your microphone.
              Without this permission, voice transcription will not work.
            </p>
            <Button 
              onClick={onRequestPermissions}
              className="mt-2"
              variant="default"
            >
              Request Permissions
            </Button>
          </div>
        )}
        
        {/* Video display */}
        {videoEnabled ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="h-20 w-20 rounded-full bg-background flex items-center justify-center">
              <User size={40} className="text-muted-foreground" />
            </div>
          </div>
        )}
        
        {/* AI speaking indicator */}
        {isSpeaking && (
          <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            AI Speaking
          </div>
        )}
        
        {/* Media controls */}
        <MediaControls
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
          isActive={isActive}
          onToggleAudio={onToggleAudio}
          onToggleVideo={onToggleVideo}
        />
      </CardContent>
    </Card>
  );
};

export default VideoDisplay;
