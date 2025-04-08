
import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import VideoCarousel from "@/components/VideoCarousel";

const Index = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDarkMode = theme === 'dark';
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Function to scroll to testimonials section
  const scrollToTestimonials = () => {
    testimonialRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Simple background gradient overlay with reduced intensity */}
      <div className={`fixed inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-brand-primary/5 via-transparent to-background/60'
          : 'bg-gradient-to-br from-brand-primary/3 via-transparent to-background/30'
      }`}></div>
      
      {/* Background grid pattern with reduced opacity */}
      <div className={`fixed inset-0 mercor-grid ${
        isDarkMode ? 'opacity-5' : 'opacity-20'
      }`}></div>
      
      {/* Navbar */}
      <Navbar />
      
      <main className="flex-grow flex flex-col relative z-10 px-4 py-12">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]"
          >
            {/* Left side content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                AI-Powered <span className="text-brand-primary">Interview</span> Platform
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Practice with our intelligent AI interviewer and receive personalized feedback to help you land your dream job or find the perfect candidate for your team.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <RouterLink to="/candidate/login">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg font-medium py-6 px-8 rounded-xl text-base"
                  >
                    I am a Candidate
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </RouterLink>
                
                <RouterLink to="/employer/login">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className={`w-full sm:w-auto ${
                      theme === 'dark' 
                        ? 'border-white/30 text-white hover:bg-white/10' 
                        : 'border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10'
                    } font-medium py-6 px-8 rounded-xl text-base`}
                  >
                    I want to Hire
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </RouterLink>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Button 
                  variant="link" 
                  onClick={scrollToTestimonials}
                  className="text-brand-primary font-medium"
                >
                  See Testimonials
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mt-12 pt-6 border-t border-border/30"
              >
                <p className="text-muted-foreground mb-4 font-medium">Trusted by candidates from</p>
                <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center lg:justify-start">
                  {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company, index) => (
                    <motion.span 
                      key={company} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                      className={`${isDarkMode ? 'text-white/80' : 'text-gray-800'} font-semibold text-lg`}
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Right side illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className={`relative w-full max-w-md aspect-square rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-brand-primary/10' : 'bg-brand-primary/5'
              } border ${
                isDarkMode ? 'border-white/10' : 'border-brand-primary/10'
              } p-6`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                    alt="AI Interview" 
                    className="w-3/5 h-auto object-contain z-10"
                  />
                  
                  {/* Simple decorative elements with reduced animation */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      transition: { duration: 40, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute w-full h-full rounded-full border-2 border-dashed ${
                      isDarkMode ? 'border-white/10' : 'border-brand-primary/10'
                    }`}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      transition: { duration: 50, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed ${
                      isDarkMode ? 'border-white/20' : 'border-brand-primary/20'
                    }`}
                  />
                </div>
                
                {/* Feature callouts - only show on larger screens with reduced animation */}
                {!isMobile && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className={`absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/4 px-4 py-2 rounded-lg ${
                        isDarkMode ? 'bg-background/80' : 'bg-white'
                      } border ${
                        isDarkMode ? 'border-white/10' : 'border-brand-primary/20'
                      } shadow-md`}
                    >
                      <span className="text-sm font-medium">AI-Powered Feedback</span>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className={`absolute bottom-0 left-0 transform translate-y-1/3 -translate-x-1/4 px-4 py-2 rounded-lg ${
                        isDarkMode ? 'bg-background/80' : 'bg-white'
                      } border ${
                        isDarkMode ? 'border-white/10' : 'border-brand-primary/20'
                      } shadow-md`}
                    >
                      <span className="text-sm font-medium">Real-time Analysis</span>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Carousel Section */}
        <div className="container mx-auto mt-16">
          <VideoCarousel />
        </div>
        
        {/* Testimonial Section */}
        <div ref={testimonialRef}>
          <TestimonialCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
