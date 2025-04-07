
import React from 'react';
import { motion } from "framer-motion";

interface LightFlaresProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const LightFlares: React.FC<LightFlaresProps> = ({ isDarkMode, intensity }) => {
  if (intensity !== 'heavy' && intensity !== 'extreme') return null;
  
  return (
    <>
      {/* Light flares */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 200,
            height: Math.random() * 300 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: isDarkMode
              ? `radial-gradient(circle at center, rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.15), rgba(255,255,255,0))`
              : `radial-gradient(circle at center, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, 229, 0.12), rgba(79,70,229,0))`,
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default LightFlares;
