
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface AnimatedBackgroundProps {
  mousePosition?: { x: number; y: number };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mousePosition }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Ensure video is set to loop and autoplay
      videoRef.current.loop = true;
      
      // Try to play the video automatically
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Background video playing successfully");
          })
          .catch(error => {
            console.warn("Auto-play prevented:", error);
            // We'll add a play button or handle this gracefully
          });
      }
    }
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full z-0">
      {/* Video background with loop enabled */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        className="absolute object-cover w-full h-full"
      >
        <source 
          src="/WhatsApp Video 2025-04-10 at 03.57.49_10143aa7 (online-video-cutter.com).mp4"
          type="video/mp4"
        />
        {/* Fallback content */}
        Your browser does not support the video tag.
      </video>
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-r from-background via-background/80 to-transparent'
          : 'bg-gradient-to-r from-white via-white/90 to-transparent'
      }`}></div>
      
      {/* Additional texture overlay */}
      <div className={`absolute inset-0 ${
        isDark ? 'bg-grid-white/5' : 'bg-grid-black/10'
      } opacity-20`}></div>

      {/* Regular style tag */}
      <style>
        {`.bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .bg-grid-black {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }`}
      </style>
    </div>
  );
};

export default AnimatedBackground;
