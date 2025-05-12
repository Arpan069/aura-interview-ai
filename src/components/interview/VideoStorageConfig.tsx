
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { videoStorage } from "@/utils/storage/videoStorage";

interface VideoStorageConfigProps {
  onClose?: () => void;
}

const VideoStorageConfig: React.FC<VideoStorageConfigProps> = ({ onClose }) => {
  const [storagePath, setStoragePath] = useState(videoStorage.getStoragePath());

  const handleSave = () => {
    try {
      videoStorage.setStoragePath(storagePath);
      toast({
        title: "Storage path updated",
        description: `Interview videos will be saved to "${storagePath}"`,
      });
      if (onClose) onClose();
    } catch (error) {
      toast({
        title: "Failed to update path",
        description: "Could not change the storage location",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Storage Settings</CardTitle>
        <CardDescription>
          Configure where interview recordings are saved
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <label htmlFor="storage-path" className="text-sm font-medium">
            Storage Path
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="storage-path"
              value={storagePath}
              onChange={(e) => setStoragePath(e.target.value)}
              placeholder="Path to save interview recordings"
              className="flex-1"
            />
            <Button variant="outline" type="button" className="shrink-0">
              <FolderOpen className="h-4 w-4 mr-1" />
              Browse
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Videos will be saved in MP4 format to this location
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoStorageConfig;
