
import React from 'react';
import { motion } from "framer-motion";

interface VerticalLinesProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const VerticalLines: React.FC<VerticalLinesProps> = ({ isDarkMode, intensity }) => {
  // Now render vertical lines for 'heavy' and 'extreme' intensities
  if (intensity !== 'heavy' && intensity !== 'extreme') return null;
  
  return (
    <>
      {/* Animated vertical lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`vertical-line-${i}`}
          className="absolute h-screen w-px"
          style={{
            left: `${i * 5}%`,
            background: isDarkMode 
              ? 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0))' 
              : 'linear-gradient(to bottom, rgba(79,70,229,0), rgba(79,70,229,0.1), rgba(79,70,229,0))',
            opacity: 0.4,
          }}
          animate={{
            scaleY: [0.6, 1.2, 0.6],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </>
  );
};

export default VerticalLines;
