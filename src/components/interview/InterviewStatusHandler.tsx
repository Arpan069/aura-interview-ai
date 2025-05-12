
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { backendService } from "@/services/api/BackendService";
import { ApiKeySetup } from "@/components/interview/ApiKeySetup";
import EnhancedBackground from "@/components/EnhancedBackground";

interface InterviewStatusHandlerProps {
  children: React.ReactNode;
  onApiKeySuccess: () => void;
}

const InterviewStatusHandler: React.FC<InterviewStatusHandlerProps> = ({ 
  children, 
  onApiKeySuccess 
}) => {
  const [backendReady, setBackendReady] = useState<boolean | null>(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("/api/health");
        if (response.ok) {
          const data = await response.json();
          setBackendReady(true);
          setApiKeyConfigured(data.api_key_configured);
          console.log("Backend health check:", data);
        } else {
          setBackendReady(false);
          setApiKeyConfigured(false);
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        setBackendReady(false);
        setApiKeyConfigured(false);
      }
    };

    checkBackendStatus();
  }, []);

  // Handle API key setup success
  const handleApiKeySuccess = () => {
    setApiKeyConfigured(true);
    onApiKeySuccess();
  };

  // Show API key setup if backend is ready but API key isn't configured
  if (backendReady === true && apiKeyConfigured === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <ApiKeySetup onSuccess={handleApiKeySuccess} />
        </div>
      </EnhancedBackground>
    );
  }

  // Show loading message while checking backend status
  if (backendReady === null) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-semibold">Connecting to backend...</h2>
              <p className="text-muted-foreground">Please wait while we establish connection</p>
            </CardContent>
          </Card>
        </div>
      </EnhancedBackground>
    );
  }

  // Show error message if backend is not ready
  if (backendReady === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 text-destructive mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Backend Connection Error</h2>
              <p className="text-center text-muted-foreground mt-2">
                Could not connect to the Flask backend. Please make sure it's running at http://localhost:5000.
              </p>
              <div className="mt-6 p-4 bg-muted rounded-md text-sm">
                <p className="font-mono">Running Flask backend:</p>
                <p className="font-mono mt-2">1. Navigate to flask_backend folder</p>
                <p className="font-mono">2. Run: pip install -r requirements.txt</p>
                <p className="font-mono">3. Run: python app.py</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </EnhancedBackground>
    );
  }

  // If all checks pass, render children
  return <>{children}</>;
};

export default InterviewStatusHandler;
