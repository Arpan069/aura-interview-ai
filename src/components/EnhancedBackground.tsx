
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import AnimatedBackground from './AnimatedBackground';

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
  
  const particleCount = {
    light: 20,
    medium: 35,
    heavy: 50,
    extreme: 80
  }[intensity];
  
  const floatingElementsCount = {
    light: 5,
    medium: 10,
    heavy: 15,
    extreme: 25
  }[intensity];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Main animated background */}
      <AnimatedBackground intensity={intensity} />
      
      {/* Fixed position background effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Moving geometric shapes */}
        {variant === 'dashboard' && intensity === 'extreme' && [...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-shape-${i}`}
            className="absolute"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15,
              zIndex: -1,
              borderRadius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '30%' : '0%',
              background: isDarkMode 
                ? `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.1)` 
                : `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 255, 0.08)`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 180, 0],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated vertical lines */}
        {intensity === 'extreme' && [...Array(20)].map((_, i) => (
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
        
        {/* Light flares */}
        {(intensity === 'heavy' || intensity === 'extreme') && [...Array(6)].map((_, i) => (
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
        
        {/* Particle effect - more dynamic */}
        {intensity !== 'light' && [...Array(particleCount)].map((_, i) => (
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
        
        {/* Tech-themed floating elements */}
        {(intensity === 'heavy' || intensity === 'extreme') && [...Array(floatingElementsCount)].map((_, i) => {
          const size = Math.random() * 30 + 30;
          const icons = ['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##', '&lt;&gt;', 'API', 'UI', '🤖', '🔍', '📊', '⚙️', '🚀'];
          return (
            <motion.div
              key={`tech-element-${i}`}
              className="absolute z-0"
              style={{
                left: `${Math.random() * 95 + 2}%`,
                top: `${Math.random() * 90 + 5}%`,
                perspective: '500px',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                y: [0, -30, 0],
                rotateX: [0, Math.random() * 40 - 20],
                rotateY: [0, Math.random() * 40 - 20],
                rotateZ: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                delay: Math.random() * 10
              }}
            >
              <div 
                style={{ width: `${size}px`, height: `${size}px` }}
                className={`flex items-center justify-center rounded-xl
                  ${isDarkMode ? 'bg-white/5' : 'bg-white/40 shadow-lg'} backdrop-blur-lg border border-white/30`}
              >
                <div className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-brand-primary'}`}>
                  {icons[i % icons.length]}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EnhancedBackground;
