
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/components/ThemeProvider";
import AnimatedBackground from './AnimatedBackground';
import BackgroundEffects from './background/BackgroundEffects';
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedBackgroundProps {
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy' | 'extreme';
  variant?: 'default' | 'dashboard' | 'auth';
}

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  children,
  intensity = 'medium',
  variant = 'default'
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  // Adjust intensity for mobile devices to improve performance
  const adjustedIntensity = isMobile ? (intensity === 'extreme' ? 'medium' : 'light') : 
                          (intensity === 'extreme' ? 'heavy' : intensity);
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Main animated background with reduced opacity */}
      <div className="fixed inset-0 z-0 opacity-40">
        <AnimatedBackground intensity={adjustedIntensity} />
      </div>
      
      {/* Fixed position background effects with reduced opacity */}
      <div className="fixed inset-0 z-0 opacity-50">
        <BackgroundEffects isDarkMode={isDarkMode} intensity={adjustedIntensity} />
      </div>
      
      {/* Semi-transparent overlay to increase contrast for content */}
      <div className={`fixed inset-0 z-1 ${isDarkMode ? 'bg-black/20' : 'bg-white/40'}`}></div>
      
      {/* Content - ensuring it's clearly above background with higher z-index */}
      <div className="relative z-20 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default EnhancedBackground;
