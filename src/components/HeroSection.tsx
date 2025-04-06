
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const particleCount = 20; // Increased number of particles for a more immersive effect
  
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/90 to-background z-0"></div>
      
      {/* Mercor-style Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Interactive Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30 dark:opacity-20"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: theme === 'dark' 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.8), rgba(255,255,255,0.2))' 
              : 'radial-gradient(circle at center, rgba(79,70,229,0.8), rgba(79,70,229,0.2))',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.4 + 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 10, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating Tech Elements - Mercor style */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`tech-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <div className={`w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-xl
            ${theme === 'dark' ? 'bg-white/5' : 'bg-brand-primary/5'} backdrop-blur-sm`}>
            <div className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-white/70' : 'text-brand-primary/70'}`}>
              {['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##'][i]}
            </div>
          </div>
        </motion.div>
      ))}

      {/* 3D Parallax Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: `${50 + (mousePosition.x / window.innerWidth - 0.5) * 10}% ${50 + (mousePosition.y / window.innerHeight - 0.5) * 10}%`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
                AI-Powered Interviews
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Ace Your <span className="text-white relative">
                Interviews
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 385 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C95.8333 3.5 281.8 0.699997 384 8.49997" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round"/>
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
                <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90 font-medium gap-2 py-6 px-6 rounded-xl text-base btn-hover-effect">
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
                className="absolute w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/30"
              />
              
              {/* Main Hero Image */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0, -2, 0],
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-4/5 h-auto rounded-xl overflow-hidden glass-effect">
                  <img 
                    src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                    alt="AI Interview" 
                    className="w-full h-auto z-10"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-brand-primary/30 to-transparent"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      background: [
                        "linear-gradient(45deg, rgba(79,70,229,0.3) 0%, rgba(79,70,229,0) 70%)",
                        "linear-gradient(45deg, rgba(79,70,229,0.5) 10%, rgba(79,70,229,0) 80%)",
                        "linear-gradient(45deg, rgba(79,70,229,0.3) 0%, rgba(79,70,229,0) 70%)",
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              {/* Floating Elements - Mercor style */}
              <motion.div
                animate={{ 
                  x: [0, 30, 0], 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-12 right-24 backdrop-blur-md rounded-lg shadow-lg p-4 border border-white/20 z-20 glass-effect"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-white font-medium">Real-time AI feedback</div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [0, -20, 0], 
                  y: [0, 30, 0],
                  rotate: [0, -5, 0, 5, 0],
                  transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute bottom-20 left-10 backdrop-blur-md rounded-lg shadow-lg p-4 border border-white/20 z-20 glass-effect"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V16M8 12H16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-white font-medium">AI Interview Coach</div>
                </div>
              </motion.div>

              {/* New floating element - Mercor style */}
              <motion.div
                animate={{ 
                  x: [0, 15, 0, -15, 0], 
                  y: [0, -15, 0, 15, 0],
                  rotate: [0, 3, 0, -3, 0],
                  transition: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }
                }}
                className="absolute top-40 left-20 backdrop-blur-md rounded-lg shadow-lg p-4 border border-white/20 z-20 glass-effect"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-white font-medium">Instant Reports</div>
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

      {/* CSS for Mercor-style grid pattern */}
      <style>
        {`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        
        .glass-effect {
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark .glass-effect {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
