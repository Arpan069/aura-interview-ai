
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setScrolled(latest > 20);
    });
    
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-white/90 dark:bg-black/80 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.img 
              src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
              alt="AI Interview Logo" 
              className="h-10" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/#testimonials">Testimonials</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/candidate/login">
              <Button 
                variant="outline" 
                className="bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 font-medium btn-hover-effect dark:bg-brand-primary/30 dark:hover:bg-brand-primary/40 dark:text-white dark:border-brand-primary/40"
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
                className="bg-brand-primary hover:bg-brand-primary/90 font-medium btn-hover-effect text-white shadow-md shadow-brand-primary/20 dark:shadow-brand-primary/40"
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
    </AnimatePresence>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <motion.a
      href={href}
      className="text-gray-800 dark:text-white/90 hover:text-brand-primary dark:hover:text-white font-medium relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{children}</span>
      <motion.span 
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary dark:bg-white"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default Navbar;
