
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

export const useInterviewMedia = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSystemAudioOn, setIsSystemAudioOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // New state to expose media stream to other components
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  // Add permission state to track if permissions were granted
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  // Initialize user media stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // First check if the user has permissions
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: isVideoOn, 
            audio: isAudioOn 
          });
          
          mediaStreamRef.current = stream;
          setMediaStream(stream); // Set the media stream state
          setHasPermissions(true);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          // Check specifically if audio tracks are available
          const audioTracks = stream.getAudioTracks();
          if (audioTracks.length === 0) {
            toast({
              title: "Audio not available",
              description: "No microphone detected. Voice transcription will not work.",
              variant: "destructive",
            });
          } else {
            // Verify audio is active
            const isAudioActive = audioTracks.some(track => track.enabled && track.readyState === 'live');
            if (!isAudioActive) {
              toast({
                title: "Audio inactive",
                description: "Microphone is not active. Check browser settings.",
                variant: "destructive",
              });
            }
          }
        } else {
          toast({
            title: "Media not supported",
            description: "Your browser doesn't support media devices",
            variant: "destructive",
          });
          console.error("getUserMedia is not supported in this browser");
          setHasPermissions(false);
        }
        
        // Set loading to false after a small delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Reduced from 2000ms to 1000ms for better UX
        
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setHasPermissions(false);
        setIsLoading(false);
        
        // Check specific error types for better user feedback
        if (error instanceof DOMException) {
          if (error.name === "NotAllowedError") {
            toast({
              title: "Permission Denied",
              description: "Microphone and camera access was denied. Please allow access in your browser settings.",
              variant: "destructive",
            });
          } else if (error.name === "NotFoundError") {
            toast({
              title: "Hardware Not Found",
              description: "No microphone or camera detected. Please connect a device and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Media Access Error",
              description: `${error.name}: ${error.message}`,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Media Access Error",
            description: "Failed to access your microphone and camera.",
            variant: "destructive",
          });
        }
      }
    };

    initializeMedia();
    
    return () => {
      // Clean up media streams when component unmounts
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
        setMediaStream(null);
      }
    };
  }, []);

  // Toggle video with memoized callback to prevent unnecessary re-renders
  const toggleVideo = useCallback(async () => {
    const stream = mediaStreamRef.current;
    
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
          console.error("Could not access camera.", error);
          toast({
            title: "Camera Access Failed",
            description: "Could not access your camera.",
            variant: "destructive",
          });
        }
      }
    }
  }, [isVideoOn]);

  // Toggle audio with memoized callback
  const toggleAudio = useCallback(async () => {
    const stream = mediaStreamRef.current;
    
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
          console.error("Could not access microphone.", error);
          toast({
            title: "Microphone Access Failed",
            description: "Could not access your microphone.",
            variant: "destructive",
          });
        }
      }
    }
  }, [isAudioOn]);

  // Toggle system audio with memoized callback
  const toggleSystemAudio = useCallback(() => {
    setIsSystemAudioOn(prev => !prev);
  }, []);

  // Function to request permissions again
  const requestMediaPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      // Explicitly request both audio and video permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      // Update refs and state
      mediaStreamRef.current = stream;
      setMediaStream(stream);
      setHasPermissions(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Verify audio tracks
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        toast({
          title: "Audio not available",
          description: "No microphone detected after permissions granted.",
          variant: "destructive",
        });
      }
      
      setIsVideoOn(true);
      setIsAudioOn(true);
      
      toast({
        title: "Permissions Granted",
        description: "Microphone and camera access successful.",
      });
    } catch (error) {
      console.error("Error requesting media permissions:", error);
      setHasPermissions(false);
      toast({
        title: "Permission Request Failed",
        description: "Could not get access to your camera and microphone.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    videoRef,
    isVideoOn,
    isAudioOn,
    isSystemAudioOn,
    isLoading,
    toggleVideo,
    toggleAudio,
    toggleSystemAudio,
    mediaStream,
    hasPermissions,
    requestMediaPermissions
  };
};
