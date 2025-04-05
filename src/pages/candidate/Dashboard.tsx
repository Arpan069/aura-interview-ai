
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Calendar, 
  Clock, 
  CheckIcon,
  Mic, 
  Video,
  Laptop 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const mockUpcomingInterviews = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      role: "Frontend Developer",
      date: "April 12, 2025",
      time: "10:00 AM",
      status: "Scheduled"
    },
    {
      id: 2,
      company: "Global Innovations",
      role: "React Developer",
      date: "April 15, 2025",
      time: "2:30 PM",
      status: "Scheduled"
    }
  ];

  const mockPastInterviews = [
    {
      id: 3,
      company: "Digital Creations",
      role: "UI Developer",
      date: "March 28, 2025",
      time: "11:00 AM",
      status: "Completed",
      score: 82
    },
    {
      id: 4,
      company: "WebTech Solutions",
      role: "Full Stack Developer",
      date: "March 25, 2025",
      time: "3:00 PM",
      status: "Completed",
      score: 78
    }
  ];

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
          <div className="flex-1 flex justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="interviews">My Interviews</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Link to="/">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 relative z-10">
        <div className="container mx-auto py-8 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="profile" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-xl"
              >
                <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1 flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-400">
                      <span className="text-7xl">👤</span>
                    </div>
                    <Button className="mt-4 w-full">Update Photo</Button>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Current Title</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea 
                          className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm h-24"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="bg-brand-purple hover:bg-indigo-600">Save Changes</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-medium mb-4">Resume & Portfolio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Resume</h4>
                      <p className="text-sm text-gray-500 mb-3">Upload your latest resume (PDF, DOC, DOCX)</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">resume_john_doe.pdf</span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-card p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Portfolio</h4>
                      <p className="text-sm text-gray-500 mb-3">Link to your personal website or portfolio</p>
                      <input 
                        type="url" 
                        className="w-full p-2 rounded-md border bg-white/10 backdrop-blur-sm"
                        placeholder="https://portfolio.example.com"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="interviews" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Upcoming Interviews</h2>
                  
                  {mockUpcomingInterviews.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUpcomingInterviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell className="font-medium">{interview.company}</TableCell>
                            <TableCell>{interview.role}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {interview.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {interview.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {interview.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button size="sm">Prepare</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No upcoming interviews scheduled.</p>
                      <Button className="mt-4">Schedule an Interview</Button>
                    </div>
                  )}
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Past Interviews</h2>
                  
                  {mockPastInterviews.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPastInterviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell className="font-medium">{interview.company}</TableCell>
                            <TableCell>{interview.role}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {interview.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {interview.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {interview.status}
                              </span>
                            </TableCell>
                            <TableCell>{interview.score}%</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Report</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No past interviews.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="interview" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Start a New Interview</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">1. Select Role</h3>
                    <div className="max-w-md">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the role you want to interview for" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                          <SelectItem value="mobile">Mobile Developer</SelectItem>
                          <SelectItem value="devops">DevOps Engineer</SelectItem>
                          <SelectItem value="data">Data Scientist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">2. System Check</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="glass-card p-4 rounded-lg flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2">
                          <Mic className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Microphone</h4>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Ready
                          </p>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2">
                          <Video className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Camera</h4>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Ready
                          </p>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2">
                          <Laptop className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Internet</h4>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Strong connection
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-4" variant="outline">Run System Check Again</Button>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">3. Interview Details</h3>
                    <div className="space-y-4 max-w-lg">
                      <div>
                        <p className="text-sm font-medium mb-1">Duration</p>
                        <p>Approximately 30-45 minutes</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Format</p>
                        <p>Video interview with our AI interviewer</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">What to Expect</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Technical questions related to your selected role</li>
                          <li>Problem-solving scenarios</li>
                          <li>Behavioral questions</li>
                          <li>Opportunity to ask questions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t flex justify-end">
                    <Button className="bg-brand-purple hover:bg-indigo-600">
                      Start Interview <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
