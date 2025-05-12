
/**
 * Core functionality for media recording
 */
export class MediaRecorder {
  private mediaRecorder: globalThis.MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private isRecording = false;
  
  /**
   * Start recording from a given media stream
   * @param stream The media stream to record from
   * @param options Recording options
   * @returns Promise that resolves when recording starts
   */
  startRecording(stream: MediaStream, options: { mimeType?: string } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Check if already recording
        if (this.isRecording) {
          reject(new Error("Already recording"));
          return;
        }

        this.stream = stream;
        this.recordedChunks = [];
        
        // Determine the best supported mime type
        // Try MP4 with H.264 first, fall back to WebM with VP9, then VP8
        let mimeType = 'video/mp4';
        const supportedTypes = [
          'video/mp4;codecs=h264,aac',
          'video/mp4',
          'video/webm;codecs=vp9,opus',
          'video/webm;codecs=vp8,opus',
          'video/webm'
        ];
        
        // Use the first supported mimetype in our preference list
        mimeType = supportedTypes.find(type => 
          globalThis.MediaRecorder.isTypeSupported(type)
        ) || 'video/webm';
        
        console.log(`Using MIME type: ${mimeType} for recording`);

        // Initialize the media recorder with audio emphasis
        this.mediaRecorder = new globalThis.MediaRecorder(stream, {
          mimeType,
          audioBitsPerSecond: 128000, // Prioritize audio quality
          videoBitsPerSecond: 2500000, // ~2.5 Mbps for good video quality
        });

        // Collect data chunks as they become available
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        // Handle recording start event
        this.mediaRecorder.onstart = () => {
          this.isRecording = true;
          console.log("Recording started successfully");
          resolve();
        };

        // Handle recording errors
        this.mediaRecorder.onerror = (event) => {
          console.error("Recording error:", event);
          reject(new Error("Error during recording"));
        };

        // Start recording in small chunks for more frequent processing
        this.mediaRecorder.start(500); // Capture in half-second chunks
      } catch (error) {
        console.error("Failed to start recording:", error);
        reject(error);
      }
    });
  }

  /**
   * Stop the current recording
   * @returns Promise with the recording blob
   */
  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // Check if recording is active
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error("Not recording"));
        return;
      }

      // Handle recording stop event
      this.mediaRecorder.onstop = () => {
        this.isRecording = false;
        
        // Check if we have recorded data
        if (this.recordedChunks.length === 0) {
          reject(new Error("No data recorded"));
          return;
        }

        // Create blob from recorded chunks
        const mimeType = this.recordedChunks[0].type;
        const recordedBlob = new Blob(this.recordedChunks, { type: mimeType });
        
        console.log(`Recording completed: ${recordedBlob.size} bytes, type: ${mimeType}`);
        resolve(recordedBlob);
      };

      // Stop the recording
      this.mediaRecorder.stop();
    });
  }

  /**
   * Checks if recording is currently in progress
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    // Stop media recorder if active
    if (this.mediaRecorder) {
      if (this.isRecording) {
        this.mediaRecorder.stop();
      }
      this.mediaRecorder = null;
    }
    
    // Stop and clean up media stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    // Reset recording state
    this.isRecording = false;
    this.recordedChunks = [];
  }
}

// Export a singleton instance for use throughout the app
export const mediaRecorder = new MediaRecorder();
