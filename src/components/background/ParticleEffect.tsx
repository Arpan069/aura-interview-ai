
import React from 'react';
import { motion } from "framer-motion";

interface ParticleEffectProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ isDarkMode, intensity }) => {
  if (intensity === 'light') return null;
  
  const particleCount = {
    light: 20,
    medium: 35,
    heavy: 50,
    extreme: 80
  }[intensity];
  
  return (
    <>
      {/* Particle effect - more dynamic */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={`enhanced-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 1,
            height: Math.random() * 6 + 1,
            background: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(79,70,229,0.8)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -(Math.random() * 200 + 100)],
            x: [0, (Math.random() * 50 - 25)],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </>
  );
};

export default ParticleEffect;
