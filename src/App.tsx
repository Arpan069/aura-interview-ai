
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Candidate pages
import CandidateLogin from "./pages/candidate/Login";
import CandidateRegister from "./pages/candidate/Register";
import CandidateVerifyOTP from "./pages/candidate/VerifyOTP";
import CandidateDashboard from "./pages/candidate/Dashboard";

// Employer pages
import EmployerLogin from "./pages/employer/Login";
import EmployerDashboard from "./pages/employer/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Legacy routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Candidate routes */}
            <Route path="/candidate/login" element={<CandidateLogin />} />
            <Route path="/candidate/register" element={<CandidateRegister />} />
            <Route path="/candidate/verify-otp" element={<CandidateVerifyOTP />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            
            {/* Employer routes */}
            <Route path="/employer/login" element={<EmployerLogin />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
