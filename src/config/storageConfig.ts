
/**
 * Configuration for video recording storage
 */
export const VIDEO_STORAGE_CONFIG = {
  // Default storage path (can be overridden by environment variables)
  storagePath: process.env.REACT_APP_VIDEO_STORAGE_PATH || "interview_recordings",
  
  // Video recording format and settings
  format: {
    container: "mp4",             // mp4 or webm
    videoCodec: "h264",           // h264 for mp4, vp9 for webm
    videoQuality: "high",         // low, medium, high
    audioBitRate: 128000,         // audio bit rate
  }
};

// Function to update storage path at runtime
export const updateStoragePath = (newPath: string) => {
  VIDEO_STORAGE_CONFIG.storagePath = newPath;
  console.log(`Video storage path updated to: ${newPath}`);
  return VIDEO_STORAGE_CONFIG;
};
