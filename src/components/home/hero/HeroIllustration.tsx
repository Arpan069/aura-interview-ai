
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroIllustrationProps {
  itemVariants: any;
}

const HeroIllustration: React.FC<HeroIllustrationProps> = ({ itemVariants }) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDarkMode = theme === 'dark';

  return (
    <motion.div 
      variants={itemVariants}
      className={`${isMobile ? 'flex' : 'hidden lg:flex'} justify-center items-center relative`}
    >
      <div className="w-full max-w-[500px] h-[400px] md:h-[500px] relative">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className={`absolute w-full h-full rounded-full border-2 border-dashed ${
            theme === 'dark' ? 'border-white/20' : 'border-brand-primary/20'
          }`}
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            transition: { duration: 40, repeat: Infinity, ease: "linear" }
          }}
          className={`absolute w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed ${
            theme === 'dark' ? 'border-white/30' : 'border-brand-primary/30'
          }`}
        />
        
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, 0, -2, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`relative w-4/5 h-auto rounded-xl overflow-hidden glass-effect ${
            theme === 'dark' 
              ? 'shadow-xl shadow-brand-primary/20' 
              : 'shadow-2xl shadow-brand-primary/30'
          }`}>
            <img 
              src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
              alt="AI Interview" 
              className="w-full h-auto z-10"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-brand-primary/30 to-transparent"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                background: [
                  `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.3' : '0.1'}) 0%, rgba(79,70,229,0) 70%)`,
                  `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.5' : '0.3'}) 10%, rgba(79,70,229,0) 80%)`,
                  `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.3' : '0.1'}) 0%, rgba(79,70,229,0) 70%)`,
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {!isMobile && (
          <>
            <motion.div
              animate={{ 
                x: [0, 30, 0], 
                y: [0, -20, 0],
                rotate: [0, 5, 0, -5, 0],
                transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`absolute top-12 right-24 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                theme === 'dark'
                  ? 'border-white/20 shadow-brand-primary/20'
                  : 'border-white/60 shadow-brand-primary/10 bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium`}>Real-time AI feedback</div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ 
                x: [0, -20, 0], 
                y: [0, 30, 0],
                rotate: [0, -5, 0, 5, 0],
                transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className={`absolute bottom-20 left-10 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                theme === 'dark'
                  ? 'border-white/20 shadow-brand-primary/20'
                  : 'border-white/60 shadow-brand-primary/10 bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V16M8 12H16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium`}>AI Interview Coach</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                x: [0, 15, 0, -15, 0], 
                y: [0, -15, 0, 15, 0],
                rotate: [0, 3, 0, -3, 0],
                transition: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }}
              className={`absolute top-40 left-20 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                theme === 'dark'
                  ? 'border-white/20 shadow-brand-primary/20'
                  : 'border-white/60 shadow-brand-primary/10 bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium`}>Instant Reports</div>
              </div>
            </motion.div>
          </>
        )}
      </div>
      
      <style jsx>{`
        .glass-effect {
          backdrop-filter: blur(8px);
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
          border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)'};
          box-shadow: ${theme === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
            : '0 8px 32px rgba(79, 70, 229, 0.15)'};
        }
      `}</style>
    </motion.div>
  );
};

export default HeroIllustration;
