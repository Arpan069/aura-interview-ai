
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/components/ThemeProvider";
import AnimatedBackground from './AnimatedBackground';
import BackgroundEffects from './background/BackgroundEffects';

interface EnhancedBackgroundProps {
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy' | 'extreme';
  variant?: 'default' | 'dashboard' | 'auth';
}

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  children,
  intensity = 'heavy',
  variant = 'default'
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  
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
      <AnimatedBackground intensity={intensity} />
      
      {/* Fixed position background effects */}
      <BackgroundEffects isDarkMode={isDarkMode} intensity={intensity} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EnhancedBackground;
