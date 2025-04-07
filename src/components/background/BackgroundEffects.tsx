
import React from 'react';
import GeometricShapes from './GeometricShapes';
import VerticalLines from './VerticalLines';
import LightFlares from './LightFlares';
import ParticleEffect from './ParticleEffect';
import TechElements from './TechElements';

interface BackgroundEffectsProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkMode, intensity }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Only render each component if the required intensity level is met */}
      <GeometricShapes isDarkMode={isDarkMode} intensity={intensity} />
      <VerticalLines isDarkMode={isDarkMode} intensity={intensity} />
      <LightFlares isDarkMode={isDarkMode} intensity={intensity} />
      <ParticleEffect isDarkMode={isDarkMode} intensity={intensity} />
      <TechElements isDarkMode={isDarkMode} intensity={intensity} />
    </div>
  );
};

export default BackgroundEffects;
