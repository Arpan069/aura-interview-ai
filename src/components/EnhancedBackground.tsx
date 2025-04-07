
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
      <AnimatedBackground intensity={adjustedIntensity} />
      
      {/* Fixed position background effects */}
      <BackgroundEffects isDarkMode={isDarkMode} intensity={adjustedIntensity} />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default EnhancedBackground;
