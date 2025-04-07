
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
  const adjustedIntensity = isMobile && intensity === 'extreme' ? 'heavy' : intensity;
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Main animated background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground intensity={adjustedIntensity} />
      </div>
      
      {/* Fixed position background effects */}
      <div className="fixed inset-0 z-0">
        <BackgroundEffects isDarkMode={isDarkMode} intensity={adjustedIntensity} />
      </div>
      
      {/* Content - ensuring it's clearly above background */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default EnhancedBackground;
