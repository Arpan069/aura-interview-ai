
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PricingTier = ({ 
  title, 
  price, 
  features, 
  isPopular = false, 
  buttonText = "Get Started",
  buttonVariant = "default",
  delay = 0
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative rounded-2xl p-6 shadow-lg ${
        isPopular 
          ? isDarkMode 
            ? 'bg-brand-primary border-2 border-white/20' 
            : 'bg-brand-primary text-white border-2 border-brand-primary/20'
          : isDarkMode 
            ? 'bg-background/60 border border-white/10 backdrop-blur-md' 
            : 'bg-white border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-brand-primary text-sm font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className={`text-2xl font-bold ${isPopular && !isDarkMode ? 'text-white' : ''}`}>{title}</h3>
      
      <div className="mt-4 mb-6">
        <span className={`text-4xl font-bold ${isPopular && !isDarkMode ? 'text-white' : ''}`}>${price}</span>
        <span className={`text-sm ${isPopular && !isDarkMode ? 'text-white/80' : 'text-gray-500'}`}>/month</span>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              isPopular 
                ? isDarkMode 
                  ? 'text-brand-secondary' 
                  : 'text-brand-secondary'
                : 'text-brand-primary'
            }`} />
            <span className={`text-sm ${
              isPopular && !isDarkMode 
                ? 'text-white/90' 
                : isDarkMode 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={buttonVariant} 
        className={`w-full ${
          buttonVariant === "outline" && isPopular && !isDarkMode 
            ? "border-white text-white hover:bg-white/10" 
            : ""
        } ${
          buttonVariant === "default" && isPopular && isDarkMode
            ? "bg-white text-brand-primary hover:bg-white/90"
            : ""
        }`}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Background gradient overlay with reduced intensity */}
      <div className={`fixed inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-brand-primary/5 via-transparent to-background/60'
          : 'bg-gradient-to-br from-brand-primary/3 via-transparent to-background/30'
      }`}></div>
      
      {/* Background grid pattern with reduced opacity */}
      <div className={`fixed inset-0 mercor-grid ${
        isDarkMode ? 'opacity-5' : 'opacity-20'
      }`}></div>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-16">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Simple, Transparent <span className="text-brand-primary">Pricing</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground"
            >
              Choose the perfect plan for your interview preparation needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier
              title="Basic"
              price="0"
              features={[
                "5 AI Interview Sessions",
                "Basic Performance Analysis",
                "Standard Question Bank",
                "Email Support",
                "Practice Session History"
              ]}
              buttonText="Start Free"
              delay={0.1}
            />
            
            <PricingTier
              title="Professional"
              price="29"
              features={[
                "Unlimited AI Interview Sessions",
                "Advanced Performance Analytics",
                "Industry-specific Questions",
                "Custom Interview Scenarios",
                "Priority Support",
                "Resume Review Assistant",
                "Interview Recording"
              ]}
              isPopular={true}
              buttonVariant={isDarkMode ? "default" : "default"}
              delay={0.2}
            />
            
            <PricingTier
              title="Enterprise"
              price="99"
              features={[
                "Everything in Professional",
                "Multiple User Accounts",
                "Team Analytics Dashboard",
                "Custom Question Database",
                "Dedicated Account Manager",
                "API Access",
                "White-labeling Options",
                "Custom Integration Support"
              ]}
              buttonVariant="outline"
              buttonText="Contact Sales"
              delay={0.3}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-secondary rounded-xl p-8 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="mb-6 text-muted-foreground">Contact our team for a personalized plan tailored to your specific requirements</p>
            <Button>Contact Us</Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 text-center max-w-2xl mx-auto"
          >
            <h3 className="font-medium text-xl mb-6">Trusted by leading organizations</h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                <span key={company} className={`${isDarkMode ? 'text-white/70' : 'text-gray-600'} text-lg font-medium`}>
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
