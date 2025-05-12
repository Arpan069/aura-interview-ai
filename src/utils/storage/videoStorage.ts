
import { VIDEO_STORAGE_CONFIG } from "@/config/storageConfig";
import { browserStorage } from "./browserStorage";

export class VideoStorage {
  /**
   * Save the recording to the configured storage location
   * @param blob The recorded video blob
   * @param fileName The name to save the file as (default: generates timestamp-based name)
   * @returns The URL to the saved recording
   */
  async saveRecording(blob: Blob, fileName?: string): Promise<string> {
    try {
      // Generate a filename if not provided
      const name = fileName || `interview-${new Date().toISOString().replace(/[:.]/g, "-")}`;
      const extension = VIDEO_STORAGE_CONFIG.fileFormat || "mp4";
      const fullPath = `${VIDEO_STORAGE_CONFIG.storagePath}/${name}.${extension}`;
      
      // Convert to MP4 if needed and the browser supports it
      let processedBlob = blob;
      
      // If the received blob isn't already in the configured format, 
      // and we have the MediaRecorder API, attempt conversion
      if (blob.type !== `video/${extension}` && MediaRecorder.isTypeSupported(`video/${extension}`)) {
        console.log(`Converting video from ${blob.type} to video/${extension}`);
        try {
          // For now, we'll just pass through the blob since real-time conversion 
          // would require a more complex implementation with a codec library
          // This is where you could integrate with a codec library if needed
          processedBlob = blob;
        } catch (conversionError) {
          console.warn("Video format conversion failed, using original format:", conversionError);
          processedBlob = blob;
        }
      }
      
      // Use browser storage to handle the actual saving
      return await browserStorage.saveRecording(processedBlob, fullPath);
    } catch (error) {
      console.error("Failed to save recording:", error);
      throw error;
    }
  }
  
  /**
   * Get the current storage path
   */
  getStoragePath(): string {
    return VIDEO_STORAGE_CONFIG.storagePath;
  }
  
  /**
   * Set a new storage path
   * @param path New storage path
   */
  setStoragePath(path: string): void {
    VIDEO_STORAGE_CONFIG.storagePath = path;
    console.log(`Video storage path set to: ${path}`);
  }
}

// Export a singleton instance for use throughout the app
export const videoStorage = new VideoStorage();
