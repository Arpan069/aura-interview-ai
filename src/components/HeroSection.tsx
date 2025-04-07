
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animations for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
    }
  };

  const particleCount = 15; // Number of floating particles
  
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/90 to-background z-0"></div>
      
      {/* Animated Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-30 dark:opacity-20"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#FFE600' : '#FFFFFF',
            animation: `floating ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      {/* Animated Meteor Shower */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`meteor-${i}`}
          className="meteor"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100 + 50}%`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10 pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text Content */}
          <div className="text-left">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-secondary text-sm font-medium">
                AI-Powered Interviews
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Ace Your <span className="text-brand-secondary relative">
                Interviews
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 385 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C95.8333 3.5 281.8 0.699997 384 8.49997" stroke="#FFE600" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span> With AI
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
            >
              Practice with our intelligent AI interviewer and receive personalized feedback to help you land your dream job. Join thousands of successful candidates today.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/candidate/login">
                <Button size="lg" className="bg-brand-secondary text-brand-primary hover:bg-brand-secondary/90 font-medium gap-2 py-6 px-6 rounded-xl text-base btn-hover-effect">
                  Start Practicing Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 font-medium gap-2 py-6 px-6 rounded-xl text-base btn-hover-effect">
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2"
            >
              <p className="text-white/70 font-medium">Trusted by candidates from</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                  <span key={company} className="text-white/80 font-semibold text-lg">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: 3D Image with Animation */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="w-[500px] h-[500px] relative">
              {/* Animated Circular Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  transition: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-full h-full rounded-full border-2 border-dashed border-white/20"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  transition: { duration: 40, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-yellow-400/30"
              />
              
              {/* Main Hero Image */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                  alt="AI Interview" 
                  className="w-4/5 h-auto rounded-xl shadow-2xl shadow-brand-primary/30 z-10 animate-pulse-light"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  x: [0, 30, 0], 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-12 right-24 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-3 border border-white/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#2D3277" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-white">Real-time feedback</div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [0, -20, 0], 
                  y: [0, 30, 0],
                  rotate: [0, -5, 0],
                  transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-3 border border-white/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V16M8 12H16" stroke="#2D3277" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-white">AI Coach</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Wave Bottom Effect */}
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

export default HeroSection;
