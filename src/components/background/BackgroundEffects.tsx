
import React from 'react';
import GeometricShapes from './GeometricShapes';
import VerticalLines from './VerticalLines';
import LightFlares from './LightFlares';
import ParticleEffect from './ParticleEffect';
import TechElements from './TechElements';
import { useIsMobile } from "@/hooks/use-mobile";

interface BackgroundEffectsProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkMode, intensity }) => {
  const isMobile = useIsMobile();
  
  // Reduce the number of effects on mobile devices
  const shouldRenderAll = !isMobile || intensity === 'extreme';
  const shouldRenderMedium = !isMobile || intensity !== 'light';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Always render basic shapes on all devices */}
      <GeometricShapes isDarkMode={isDarkMode} intensity={intensity} />
      
      {/* Render lines on medium+ intensity and all devices, or on desktop */}
      {(shouldRenderMedium) && (
        <VerticalLines isDarkMode={isDarkMode} intensity={intensity} />
      )}
      
      {/* Render light flares on all devices */}
      <LightFlares isDarkMode={isDarkMode} intensity={intensity} />
      
      {/* Conditionally render based on device and intensity */}
      {(shouldRenderAll || intensity === 'heavy') && (
        <ParticleEffect isDarkMode={isDarkMode} intensity={intensity} />
      )}
      
      {/* Render tech elements only on desktop for heavy/extreme intensity */}
      {(shouldRenderAll && !isMobile) && (
        <TechElements isDarkMode={isDarkMode} intensity={intensity} />
      )}
    </div>
  );
};

export default BackgroundEffects;
