
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Check if we're on a candidate or employer page
  const isCandidate = location.pathname.includes("/candidate");
  const isEmployer = location.pathname.includes("/employer");
  
  // Determine the appropriate login/dashboard links
  const loginLink = isEmployer ? "/employer/login" : "/candidate/login";
  const dashboardLink = isEmployer ? "/employer/dashboard" : "/candidate/dashboard";
  
  // Check if user is on login or dashboard page
  const isOnLoginPage = location.pathname.includes("/login") || location.pathname.includes("/register");
  const isOnDashboardPage = location.pathname.includes("/dashboard");

  // Main navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/#testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDarkMode 
            ? 'bg-background/90 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
              alt="Aura Interview AI" 
              className="h-9 w-auto mr-2"
            />
            <span className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Aura AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                className={`text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
                  location.pathname === item.href
                    ? isDarkMode
                      ? 'border-white text-white'
                      : 'border-brand-primary text-brand-primary'
                    : isDarkMode
                      ? 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                      : 'border-transparent text-gray-600 hover:text-brand-primary hover:border-brand-primary/50'
                }`}
                onClick={(e) => {
                  if (item.href.startsWith('#') && location.pathname === '/') {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Auth & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Only show auth buttons on home and general pages, not when in a dashboard or specific auth flow */}
            {!isOnDashboardPage && (
              <>
                {isOnLoginPage ? (
                  <Link to={dashboardLink}>
                    <Button variant="default" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to={loginLink}>
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
            
            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="ml-2" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              isDarkMode ? 'bg-background/95' : 'bg-white/95'
            } backdrop-blur-md`}
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-2 rounded-lg text-base font-medium ${
                    location.pathname === item.href
                      ? isDarkMode
                        ? 'bg-white/10 text-white'
                        : 'bg-brand-primary/10 text-brand-primary'
                      : isDarkMode
                        ? 'text-white/70 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-brand-primary/5 hover:text-brand-primary'
                  }`}
                  onClick={() => {
                    if (item.href.startsWith('#') && location.pathname === '/') {
                      document.querySelector(item.href)?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }
                    closeMenu();
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Only show auth buttons on home and general pages, not when in a dashboard or specific auth flow */}
              {!isOnDashboardPage && (
                <>
                  {isOnLoginPage ? (
                    <Link to={dashboardLink} onClick={closeMenu}>
                      <Button variant="default" className="w-full mt-4">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to={loginLink} onClick={closeMenu}>
                      <Button variant="outline" className="w-full mt-4">
                        Login
                      </Button>
                    </Link>
                  )}
                </>
              )}
              
              <Button variant="ghost" size="sm" className="w-full flex justify-between items-center mt-2" onClick={closeMenu}>
                Close Menu
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
