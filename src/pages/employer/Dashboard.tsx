
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, ChevronRight, Download, Layers, LogOut, Settings, 
  Users, FileText, Calendar, PlusCircle, Search
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import AnimatedBackground from "@/components/AnimatedBackground";

const EmployerDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/employer/login");
  };
  
  // Mock data for the dashboard
  const recentApplications = [
    { id: 1, name: "John Doe", role: "Frontend Developer", status: "Interviewed", date: "2025-04-05" },
    { id: 2, name: "Jane Smith", role: "UX Designer", status: "Shortlisted", date: "2025-04-04" },
    { id: 3, name: "Mike Johnson", role: "Backend Developer", status: "New", date: "2025-04-03" },
    { id: 4, name: "Sarah Williams", role: "Product Manager", status: "Rejected", date: "2025-04-02" },
  ];
  
  const activeJobs = [
    { id: 1, title: "Frontend Developer", applications: 24, views: 156, closes: "2025-04-20" },
    { id: 2, title: "UX Designer", applications: 18, views: 132, closes: "2025-04-25" },
    { id: 3, title: "Backend Developer", applications: 15, views: 89, closes: "2025-04-15" },
  ];
  
  const upcomingInterviews = [
    { id: 1, candidate: "John Doe", role: "Frontend Developer", time: "10:00 AM", date: "2025-04-10" },
    { id: 2, candidate: "Jane Smith", role: "UX Designer", time: "2:30 PM", date: "2025-04-11" },
  ];

  return (
    <AnimatedBackground intensity="medium">
      <div className="min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className={`fixed top-0 inset-x-0 z-40 py-3 px-4 md:px-6 ${
          theme === 'dark' 
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/70 backdrop-blur-xl border-b border-gray-200/70'
        }`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                alt="AI Interview Logo" 
                className="h-8" 
              />
              <h1 className="text-xl font-bold hidden md:block">Employer Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell size={18} />
              </Button>
              
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings size={18} />
              </Button>
              
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Employer</p>
                  <p className="text-xs text-muted-foreground">Acme Inc.</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-100/50"
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 pt-20 pb-10 px-4 md:px-6">
          <div className="container mx-auto">
            {/* Tabs navigation */}
            <div className="overflow-x-auto pb-2 mb-6">
              <Tabs 
                defaultValue="dashboard" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 md:grid-cols-5 max-w-2xl">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Dashboard Content */}
            <div className="space-y-6">
              {/* Stats Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard 
                  title="Active Jobs" 
                  value={activeJobs.length.toString()} 
                  icon={<Layers className="h-5 w-5 text-blue-500" />} 
                  change="+2 this week" 
                />
                <StatsCard 
                  title="Total Applications" 
                  value="57" 
                  icon={<FileText className="h-5 w-5 text-green-500" />}
                  change="+12 this week"
                />
                <StatsCard 
                  title="Interviews Scheduled" 
                  value={upcomingInterviews.length.toString()} 
                  icon={<Calendar className="h-5 w-5 text-purple-500" />}
                  change="+1 today" 
                />
                <StatsCard 
                  title="Candidates" 
                  value="24" 
                  icon={<Users className="h-5 w-5 text-amber-500" />}
                  change="+5 this week" 
                />
              </section>
              
              {/* Recent Applications */}
              <section>
                <Card className="glass-morphism">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Applications</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div 
                          key={application.id} 
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                          } transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {application.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-sm text-muted-foreground">{application.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <ApplicationStatus status={application.status} />
                            <p className="text-xs text-muted-foreground mt-1">{application.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              {/* Two columns: Jobs and Upcoming Interviews */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Jobs */}
                <Card className="glass-morphism">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Jobs</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" /> Post New Job
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeJobs.map((job) => (
                        <div 
                          key={job.id} 
                          className={`p-3 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                          } transition-colors`}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{job.title}</h3>
                            <Button variant="ghost" size="sm">
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex gap-4 mt-2">
                            <p className="text-xs"><span className="font-semibold">{job.applications}</span> applications</p>
                            <p className="text-xs"><span className="font-semibold">{job.views}</span> views</p>
                            <p className="text-xs text-muted-foreground">Closes {job.closes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto gap-1">
                      View All Jobs <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Upcoming Interviews */}
                <Card className="glass-morphism">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Interviews</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" /> Schedule
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingInterviews.map((interview) => (
                        <div 
                          key={interview.id} 
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                          } transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {interview.candidate.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{interview.candidate}</p>
                              <p className="text-sm text-muted-foreground">{interview.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{interview.time}</p>
                            <p className="text-xs text-muted-foreground">{interview.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto gap-1">
                      View Calendar <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className={`py-4 px-4 ${
          theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200'
        }`}>
          <div className="container mx-auto">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Interview - Employer Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, change }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  change?: string;
}) => {
  const { theme } = useTheme();
  
  return (
    <Card className={`glass-morphism ${theme === 'dark' ? 'bg-background/20' : 'bg-white'}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-semibold">{value}</h3>
          {change && (
            <p className="text-xs font-medium text-green-500">{change}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Application Status Component
const ApplicationStatus = ({ status }: { status: string }) => {
  let bgColor = '';
  let textColor = '';
  
  switch(status) {
    case 'New':
      bgColor = 'bg-blue-100 dark:bg-blue-900/30';
      textColor = 'text-blue-700 dark:text-blue-300';
      break;
    case 'Shortlisted':
      bgColor = 'bg-green-100 dark:bg-green-900/30';
      textColor = 'text-green-700 dark:text-green-300';
      break;
    case 'Interviewed':
      bgColor = 'bg-purple-100 dark:bg-purple-900/30';
      textColor = 'text-purple-700 dark:text-purple-300';
      break;
    case 'Rejected':
      bgColor = 'bg-red-100 dark:bg-red-900/30';
      textColor = 'text-red-700 dark:text-red-300';
      break;
    default:
      bgColor = 'bg-gray-100 dark:bg-gray-800';
      textColor = 'text-gray-700 dark:text-gray-300';
  }
  
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default EmployerDashboard;
