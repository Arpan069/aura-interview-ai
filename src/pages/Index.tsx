
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import VideoCarousel from "../components/VideoCarousel";
import FeatureSection from "../components/FeatureSection";
import StatsSection from "../components/StatsSection";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/Footer";
import ThreeBackground from "../components/ThreeBackground";

const Index = () => {
  const controls = useAnimation();
  const { theme } = useTheme();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      className="relative min-h-screen"
    >
      <ThreeBackground isDarkMode={theme === 'dark'} />
      
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4">
        <VideoCarousel />
        <FeatureSection />
        <StatsSection />
        <TestimonialCarousel />
      </div>
      <Footer />
      
      {/* Animated Meteor Shower */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`meteor-${i}`}
          className="meteor hidden lg:block"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100 + 50}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 3 + 3}s`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Index;
