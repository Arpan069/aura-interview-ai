
import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95 relative">
      {/* Simple background gradient overlay with reduced intensity */}
      <div className={`fixed inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-brand-primary/5 via-transparent to-background/60'
          : 'bg-gradient-to-br from-brand-primary/3 via-transparent to-background/30'
      }`}></div>
      
      {/* Background grid pattern with reduced opacity */}
      <div className={`fixed inset-0 mercor-grid ${
        isDarkMode ? 'opacity-5' : 'opacity-20'
      }`}></div>
      
      {/* Content */}
      {children}
      
      {/* Wave effect at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute -bottom-1 left-0 right-0 w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="1" className="text-background" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default BackgroundWrapper;
