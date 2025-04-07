
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/#testimonials">Testimonials</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {/* Desktop login buttons */}
            {!isMobile && (
              <>
                <Link to="/candidate/login">
                  <Button 
                    variant="outline" 
                    className={`${
                      theme === 'dark' 
                        ? 'bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white border-white/30'
                        : 'bg-brand-primary/10 hover:bg-brand-primary/20 backdrop-blur-sm text-brand-primary border-brand-primary/30'
                    } font-medium btn-hover-effect`}
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
              </>
            )}
            
            {/* Mobile Navigation */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="md:hidden"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] bg-background/95 backdrop-blur-lg border-l border-border shadow-xl">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center py-4">
                      <Link to="/" className="flex items-center">
                        <img 
                          src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                          alt="AI Interview Logo" 
                          className="h-8" 
                        />
                      </Link>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                    
                    <div className="flex flex-col space-y-6 py-8">
                      <SheetClose asChild>
                        <Link to="/#features" className="text-lg font-medium hover:text-brand-primary transition-colors">
                          Features
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/#testimonials" className="text-lg font-medium hover:text-brand-primary transition-colors">
                          Testimonials
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/#pricing" className="text-lg font-medium hover:text-brand-primary transition-colors">
                          Pricing
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/contact" className="text-lg font-medium hover:text-brand-primary transition-colors">
                          Contact
                        </Link>
                      </SheetClose>
                    </div>
                    
                    <div className="flex flex-col space-y-4 mt-auto mb-8">
                      <SheetClose asChild>
                        <Link to="/candidate/login" className="w-full">
                          <Button 
                            variant="outline"
                            className="w-full"
                          >
                            I am a Candidate
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/employer/login" className="w-full">
                          <Button className="w-full">
                            I want to Hire
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
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
