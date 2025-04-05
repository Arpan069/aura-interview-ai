
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CandidateDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 animated-gradient-background"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      <header className="relative z-10 border-b bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <Link to="/" className="flex items-center">
            <img 
              src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
              alt="AI Interview Logo" 
              className="h-10" 
            />
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/candidate/dashboard">Dashboard</Link>
            <Link to="/candidate/interviews">My Interviews</Link>
            <Link to="/candidate/profile">Profile</Link>
            <Link to="/">
              <Button variant="outline">Logout</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 relative z-10">
        <div className="container mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                <p className="text-gray-600 mb-4">You have no upcoming interviews scheduled.</p>
                <Button className="w-full">Schedule Interview</Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Practice Sessions</h2>
                <p className="text-gray-600 mb-4">Improve your skills with practice interviews.</p>
                <Button className="w-full">Start Practice</Button>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Interview Tips</h2>
                <p className="text-gray-600 mb-4">Get tips to ace your next interview.</p>
                <Button className="w-full">View Tips</Button>
              </div>
            </div>
            
            <div className="mt-8 glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
