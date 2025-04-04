
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import VideoCarousel from "../components/VideoCarousel";
import FeatureSection from "../components/FeatureSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4">
        <VideoCarousel />
        <FeatureSection />
        <StatsSection />
      </div>
      <Footer />
    </motion.div>
  );
};

export default Index;
