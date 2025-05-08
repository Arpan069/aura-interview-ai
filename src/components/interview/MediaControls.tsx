
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface MediaControlsProps {
  audioEnabled: boolean;
  videoEnabled: boolean;
  isActive: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
}

const MediaControls: React.FC<MediaControlsProps> = ({
  audioEnabled,
  videoEnabled,
  isActive,
  onToggleAudio,
  onToggleVideo
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md rounded-full z-10">
      <Button
        size="icon"
        variant={audioEnabled ? "ghost" : "destructive"}
        className="rounded-full"
        onClick={onToggleAudio}
        disabled={!isActive}
      >
        {audioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
      </Button>
      
      <Button
        size="icon"
        variant={videoEnabled ? "ghost" : "destructive"}
        className="rounded-full"
        onClick={onToggleVideo}
        disabled={!isActive}
      >
        {videoEnabled ? <Video size={18} /> : <VideoOff size={18} />}
      </Button>
    </div>
  );
};

export default MediaControls;
