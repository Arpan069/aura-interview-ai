
/**
 * Configuration for video storage
 */

// Default storage path - use window.env for browser environment instead of process.env
const defaultStoragePath = 
  (window as any).env?.REACT_APP_VIDEO_STORAGE_PATH || 
  (window as any).REACT_APP_VIDEO_STORAGE_PATH || 
  "interview_recordings";

export const VIDEO_STORAGE_CONFIG = {
  storagePath: defaultStoragePath,
  fileFormat: "mp4",
  maxDuration: 30 * 60, // 30 minutes in seconds
  quality: "high",
};

/**
 * Update the storage configuration
 * @param config Updated configuration
 * @returns Updated configuration object
 */
export const updateStorageConfig = (config: Partial<typeof VIDEO_STORAGE_CONFIG>) => {
  Object.assign(VIDEO_STORAGE_CONFIG, config);
  return VIDEO_STORAGE_CONFIG;
};

/**
 * Get the current storage path
 * @returns Current storage path
 */
export const getStoragePath = () => {
  return VIDEO_STORAGE_CONFIG.storagePath;
};

/**
 * Set a new storage path
 * @param path New storage path
 */
export const setStoragePath = (path: string) => {
  VIDEO_STORAGE_CONFIG.storagePath = path;
  return VIDEO_STORAGE_CONFIG.storagePath;
};
