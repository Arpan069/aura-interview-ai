
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { VIDEO_STORAGE_CONFIG, setStoragePath, getStoragePath } from "@/config/storageConfig";
import { Folder, Save, RefreshCw } from "lucide-react";

interface VideoStorageConfigProps {
  onSave?: (path: string) => void;
}

const VideoStorageConfig: React.FC<VideoStorageConfigProps> = ({ onSave }) => {
  const [storagePath, setStoragePathState] = useState(getStoragePath());
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePath = () => {
    try {
      setIsSaving(true);
      // Update the global config
      setStoragePath(storagePath);
      
      toast.success("Video storage path updated successfully");
      
      if (onSave) {
        onSave(storagePath);
      }
    } catch (error) {
      console.error("Failed to update storage path:", error);
      toast.error("Failed to update storage path");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultPath = "interview_recordings";
    setStoragePathState(defaultPath);
    setStoragePath(defaultPath);
    toast.info("Video storage path reset to default");
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Folder className="h-5 w-5 text-muted-foreground" />
          Video Storage Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="storagePath" className="text-sm font-medium">
              Video Storage Path
            </label>
            <div className="flex gap-2">
              <Input
                id="storagePath"
                value={storagePath}
                onChange={(e) => setStoragePathState(e.target.value)}
                placeholder="Enter path to save video recordings"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Videos will be saved in MP4 format at this location
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSavePath}
              disabled={isSaving}
              className="flex-1"
              variant="default"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Path
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset to Default
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoStorageConfig;
