
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoData = [
  {
    id: 1,
    title: "Mock Interview For Software Engineering",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "How To Ace Your Data Science Interview",
    thumbnail: "https://images.unsplash.com/photo-1558746204-8f5be0fce8b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Product Management Interview Tips",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "UI/UX Design Interview Best Practices",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Machine Learning Interview Questions",
    thumbnail: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?q=80&w=2074&auto=format&fit=crop",
  },
];

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % videoData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? videoData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-20 mb-10 overflow-hidden rounded-xl">
      <div className="relative h-[400px] md:h-[500px]">
        <motion.div 
          ref={carouselRef}
          className="flex h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {videoData.map((video) => (
            <div key={video.id} className="relative min-w-full h-full">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h2 className="text-white text-2xl font-bold mb-2">{video.title}</h2>
                <Button className="bg-brand-blue hover:bg-blue-600">
                  Watch Demo
                </Button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full z-30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full z-30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {videoData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
