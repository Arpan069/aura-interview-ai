
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioRecorderProps {
  onAudioAvailable?: (blob: Blob) => void;
  maxDuration?: number; // in milliseconds
}

interface AudioRecorderState {
  isRecording: boolean;
  recordingDuration: number;
  audioBlob: Blob | null;
}

/**
 * Hook for recording audio
 */
export const useAudioRecorder = ({ 
  onAudioAvailable, 
  maxDuration = 10000 // Default to 10 seconds max recording
}: UseAudioRecorderProps = {}) => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    recordingDuration: 0,
    audioBlob: null
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Clean up function to stop recording and release resources
  const cleanupRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setState(prev => ({
      ...prev,
      isRecording: false
    }));
  }, []);
  
  // Start recording audio
  const startRecording = useCallback(async () => {
    try {
      // Clean up any existing recording
      cleanupRecording();
      
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Create MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // Format that works well with Whisper API
      });
      mediaRecorderRef.current = mediaRecorder;
      
      // Set up data handling
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Handle recording stop
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setState(prev => ({ ...prev, audioBlob, isRecording: false }));
        
        if (onAudioAvailable) {
          onAudioAvailable(audioBlob);
        }
      };
      
      // Start recording
      mediaRecorder.start(1000); // Capture in 1-second chunks
      startTimeRef.current = Date.now();
      
      // Update state to reflect recording
      setState({
        isRecording: true,
        recordingDuration: 0,
        audioBlob: null
      });
      
      // Set up timer to track duration and auto-stop
      timerRef.current = setInterval(() => {
        const currentDuration = Date.now() - startTimeRef.current;
        setState(prev => ({
          ...prev,
          recordingDuration: currentDuration
        }));
        
        // Auto-stop if max duration reached
        if (currentDuration >= maxDuration) {
          stopRecording();
        }
      }, 100);
      
      console.log("Started audio recording");
      return true;
    } catch (error) {
      console.error("Error starting audio recording:", error);
      return false;
    }
  }, [cleanupRecording, maxDuration, onAudioAvailable]);
  
  // Stop recording audio
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      console.log("Stopped audio recording");
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  // Cancel recording without processing the audio
  const cancelRecording = useCallback(() => {
    cleanupRecording();
    audioChunksRef.current = [];
    setState(prev => ({
      ...prev,
      audioBlob: null,
      recordingDuration: 0
    }));
    console.log("Canceled audio recording");
  }, [cleanupRecording]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupRecording();
    };
  }, [cleanupRecording]);
  
  return {
    isRecording: state.isRecording,
    recordingDuration: state.recordingDuration,
    audioBlob: state.audioBlob,
    startRecording,
    stopRecording,
    cancelRecording
  };
};
