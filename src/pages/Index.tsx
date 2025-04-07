
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import VideoCarousel from "../components/VideoCarousel";
import FeatureSection from "../components/FeatureSection";
import StatsSection from "../components/StatsSection";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/Footer";
import EnhancedBackground from "../components/EnhancedBackground";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const controls = useAnimation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls]);

  // Reduce background intensity to improve performance
  const backgroundIntensity = isMobile ? "light" : "medium";

  return (
    <EnhancedBackground intensity={backgroundIntensity}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="relative min-h-screen w-full"
      >
        <Navbar />
        
        <section id="hero" className="relative z-30">
          <HeroSection />
        </section>
        
        <div className="container mx-auto px-4 w-full relative z-30">
          <section id="videos" className="py-8 sm:py-12">
            <VideoCarousel />
          </section>
          
          <section id="features" className="high-contrast-section rounded-xl sm:rounded-3xl my-8 sm:my-12">
            <FeatureSection />
          </section>
          
          <section id="stats">
            <StatsSection />
          </section>
          
          <section id="testimonials" className="py-8 sm:py-12">
            <TestimonialCarousel />
          </section>
        </div>
        
        <Footer />
      </motion.div>
    </EnhancedBackground>
  );
};

export default Index;
