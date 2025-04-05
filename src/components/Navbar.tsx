
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 glass-card"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
            alt="AI Interview Logo" 
            className="h-10" 
          />
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/candidate/login">
            <Button 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium btn-hover-effect dark:bg-gray-800/40 dark:hover:bg-gray-800/60 dark:text-white"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I am a Candidate
              </motion.span>
            </Button>
          </Link>
          <Link to="/employer/login">
            <Button 
              className="bg-brand-primary hover:bg-brand-primary/90 font-medium btn-hover-effect"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I want to Hire
              </motion.span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
