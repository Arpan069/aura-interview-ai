
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Award } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const stats = [
  {
    icon: <Users className="w-10 h-10 text-brand-primary" />,
    value: "50,000+",
    label: "Successful Interviews",
  },
  {
    icon: <Briefcase className="w-10 h-10 text-brand-primary" />,
    value: "2,500+",
    label: "Company Partners",
  },
  {
    icon: <Award className="w-10 h-10 text-brand-primary" />,
    value: "95%",
    label: "Success Rate",
  },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  // Counter animation for stats
  const counter = (value: string) => {
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
    return isInView ? numericPart : 0;
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements - Mercor style */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.4), rgba(255,255,255,0))' 
            : 'radial-gradient(circle at center, rgba(79,70,229,0.4), rgba(79,70,229,0))'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full opacity-10"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.4), rgba(255,255,255,0))' 
            : 'radial-gradient(circle at center, rgba(79,70,229,0.4), rgba(79,70,229,0))'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our AI-powered interview platform is transforming careers worldwide
          </p>
          <motion.div 
            className="w-24 h-1 bg-brand-primary mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
              className="glass-card dark:bg-brand-primary/10 p-10 rounded-xl flex flex-col items-center text-center transform transition-all"
            >
              <motion.div 
                className="mb-6 p-4 bg-brand-primary/10 dark:bg-white/10 rounded-full"
                whileHover={{ 
                  rotate: [0, 10, -10, 0],
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-brand-primary to-brand-primary/70 bg-clip-text text-transparent"
              >
                <motion.span
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                >
                  {stat.value}
                </motion.span>
              </motion.h3>
              
              <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
              
              <motion.div 
                className="w-16 h-1 bg-brand-primary/30 dark:bg-white/30 rounded-full mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CSS for Mercor-style grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(79,70,229,0.03)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(79,70,229,0.03)'} 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
