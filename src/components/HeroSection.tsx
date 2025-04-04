
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 animated-gradient-background"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Master Your Next Interview with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8"
          >
            Practice with our advanced AI interviewer and get personalized feedback to land your dream job. Join thousands of successful candidates who have aced their interviews.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            <p className="text-white/70 text-sm mb-2">Trusted by top companies</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                <span key={company} className="text-white/60 font-semibold text-lg">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute -bottom-40 left-0 right-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;
