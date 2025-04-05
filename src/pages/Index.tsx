
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
      {/* Interactive 3D background */}
      <ThreeBackground isDarkMode={theme === 'dark'} />
      
      <Navbar />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <div className="container mx-auto px-4">
        <section id="videos" className="py-12">
          <VideoCarousel />
        </section>
        
        <section id="features">
          <FeatureSection />
        </section>
        
        <section id="stats">
          <StatsSection />
        </section>
        
        <section id="testimonials" className="py-12">
          <TestimonialCarousel />
        </section>
      </div>
      
      <Footer />
      
      {/* Animated floating elements - Mercor style */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`floating-element-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.3), rgba(255,255,255,0))'
                : 'radial-gradient(circle at center, rgba(79,70,229,0.3), rgba(79,70,229,0))',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Index;
