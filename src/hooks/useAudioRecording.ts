
import { useState, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export const useAudioRecording = (onTranscription: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  
  const processAudioChunk = useCallback(async (blob: Blob) => {
    try {
      const { aiService } = await import('@/services/AIService');
      const transcript = await aiService.transcribeSpeech(blob);
      
      if (transcript && transcript.trim()) {
        onTranscription(transcript);
      }
    } catch (error) {
      console.error("Error processing audio chunk:", error);
    }
  }, [onTranscription]);
  
  const startRecording = useCallback(async () => {
    try {
      if (!navigator.mediaDevices) {
        toast({
          title: "Media devices unavailable",
          description: "Your browser doesn't support media recording",
          variant: "destructive"
        });
        return false;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setHasPermissions(true);
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      
      audioChunks.current = [];
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
          // Process this audio chunk for real-time transcription
          processAudioChunk(event.data);
        }
      };
      
      mediaRecorder.current.onstop = async () => {
        // Final processing when recording stops
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        if (audioBlob.size > 100) {  // Ensure we have meaningful audio (not just silence)
          await processAudioChunk(audioBlob);
        }
        audioChunks.current = [];
      };
      
      // Start recording with 3-second chunks for real-time transcription
      mediaRecorder.current.start(3000);
      setIsRecording(true);
      
      return true;
    } catch (error) {
      console.error("Error starting recording:", error);
      
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setHasPermissions(false);
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to continue with the interview",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Recording failed",
          description: "Could not start audio recording",
          variant: "destructive"
        });
      }
      
      return false;
    }
  }, [processAudioChunk]);
  
  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, [isRecording]);
  
  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Stop the streams immediately, we just needed to request permission
      stream.getTracks().forEach(track => track.stop());
      
      setHasPermissions(true);
      toast({
        title: "Microphone access granted",
        description: "You can now participate in the interview",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to get permissions:", error);
      setHasPermissions(false);
      toast({
        title: "Permission request failed",
        description: "Microphone access is required for the interview",
        variant: "destructive"
      });
      
      return false;
    }
  }, []);
  
  return {
    isRecording,
    hasPermissions,
    startRecording,
    stopRecording,
    requestPermissions
  };
};
