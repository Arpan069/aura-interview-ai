
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedBackgroundProps {
  mousePosition: {
    x: number;
    y: number;
  };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mousePosition }) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDarkMode = theme === 'dark';
  
  const particleCount = 30;
  const floatingElementsCount = 12;

  return (
    <>
      <div className={`absolute inset-0 z-10 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-brand-primary/50 via-brand-primary/40 to-background/80'
          : 'bg-gradient-to-b from-slate-50/80 via-indigo-50/80 to-white/80'
      }`}></div>
      
      <div className={`absolute inset-0 bg-grid-pattern z-5 ${
        theme === 'dark' 
          ? 'opacity-10' 
          : 'opacity-30'
      }`}></div>
      
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: theme === 'dark' 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.8), rgba(255,255,255,0.2))' 
              : 'radial-gradient(circle at center, rgba(79,70,229,0.5), rgba(79,70,229,0.05))',
            opacity: theme === 'dark' ? 0.25 : 0.4,
            filter: 'blur(30px)',
          }}
          animate={{
            x: [0, Math.random() * 80 - 40],
            y: [0, Math.random() * 80 - 40],
            scale: [1, Math.random() * 0.4 + 0.8],
            opacity: theme === 'dark' 
              ? [0.2, 0.35, 0.2] 
              : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 20, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {[...Array(isMobile ? 4 : floatingElementsCount)].map((_, i) => (
        <motion.div
          key={`tech-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <div className={`w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-xl
            ${theme === 'dark' ? 'bg-white/5' : 'bg-white/40 shadow-lg'} backdrop-blur-lg border border-white/30`}>
            <div className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-white/70' : 'text-brand-primary'}`}>
              {['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##', '&lt;&gt;', 'API', 'UI', 'UX'][i]}
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: `${50 + (mousePosition.x / window.innerWidth - 0.5) * 15}% ${50 + (mousePosition.y / window.innerHeight - 0.5) * 15}%`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px);
        }
        
        @media (max-width: 768px) {
          .bg-grid-pattern {
            background-size: 20px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedBackground;
