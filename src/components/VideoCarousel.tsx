
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoData = [
  {
    id: 1,
    title: "Mock Interview For Software Engineering",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-shot-4790-large.mp4"
  },
  {
    id: 2,
    title: "How To Ace Your Data Science Interview",
    thumbnail: "https://images.unsplash.com/photo-1558746204-8f5be0fce8b3?q=80&w=2070&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-talking-on-video-call-considering-a-project-idea-7802-large.mp4"
  },
  {
    id: 3,
    title: "Product Management Interview Tips",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-a-laptop-in-a-modern-office-5695-large.mp4"
  },
  {
    id: 4,
    title: "UI/UX Design Interview Best Practices",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4"
  },
  {
    id: 5,
    title: "Machine Learning Interview Questions",
    thumbnail: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?q=80&w=2074&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-closeup-view-of-a-persons-hand-typing-on-a-laptop-keyboard-42854-large.mp4"
  },
];

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Set up video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoData.length);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % videoData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? videoData.length - 1 : prevIndex - 1
    );
  };

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Manage video playback based on active index
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          // Play the active video, muted for autoplay
          video.muted = true;
          video.currentTime = 0;
          video.play().catch(e => console.log("Video autoplay prevented:", e));
        } else {
          // Pause all other videos
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  // Animation when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
      });
    }
  }, [controls, isInView]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="relative w-full max-w-5xl mx-auto mt-20 mb-24 overflow-hidden rounded-2xl shadow-2xl"
    >
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-brand-primary/5">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-secondary/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-primary/20 blur-3xl"></div>
        
        <motion.div 
          ref={carouselRef}
          className="flex h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {videoData.map((item, index) => (
            <div key={item.id} className="relative min-w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
              
              {/* Video element */}
              <video
                ref={el => videoRefs.current[index] = el}
                src={item.video}
                poster={item.thumbnail}
                className="w-full h-full object-cover"
                playsInline
                loop
              />
              
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{item.title}</h2>
                  <Button className="bg-brand-secondary text-brand-primary hover:bg-brand-secondary/90 btn-hover-effect">
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1 : 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-secondary backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-secondary/80 transition-all transform hover:scale-110">
                  <svg className="w-8 h-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 rounded-full z-30 border-white/20 text-white shadow-lg animate-pulse-light"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 rounded-full z-30 border-white/20 text-white shadow-lg animate-pulse-light"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {videoData.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === activeIndex ? "bg-brand-secondary w-8" : "bg-white/50 w-2"
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoCarousel;
