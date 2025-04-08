
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import AuthButtons from "./navbar/AuthButtons";
import { NavItem } from "@/types/navbar";

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
  const navItems: NavItem[] = [
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
          <NavbarLogo />

          {/* Desktop Navigation */}
          <DesktopNav navItems={navItems} closeMenu={closeMenu} />

          {/* Right Side - Auth & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {!isOnDashboardPage && (
              <AuthButtons 
                isOnDashboardPage={isOnDashboardPage}
                isOnLoginPage={isOnLoginPage}
                loginLink={loginLink}
                dashboardLink={dashboardLink}
              />
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

      {/* Mobile Navigation Menu */}
      <MobileNav 
        isOpen={isOpen}
        closeMenu={closeMenu}
        navItems={navItems}
        isOnDashboardPage={isOnDashboardPage}
        isOnLoginPage={isOnLoginPage}
        loginLink={loginLink}
        dashboardLink={dashboardLink}
      />
    </motion.header>
  );
};

export default Navbar;
