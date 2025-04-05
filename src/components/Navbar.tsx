
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 glass-card">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
            alt="AI Interview Logo" 
            className="h-10" 
          />
        </Link>
        <div className="space-x-4">
          <Link to="/candidate/login">
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium animate-fade-in">
              I am a Candidate
            </Button>
          </Link>
          <Link to="/employer/login">
            <Button className="bg-brand-purple hover:bg-indigo-600 font-medium animate-fade-in">
              I want to Hire
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
