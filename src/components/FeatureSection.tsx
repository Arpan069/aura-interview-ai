
import React from "react";
import { motion } from "framer-motion";
import { 
  Video, UserCheck, Cpu, BarChart, CheckCircle, Award
} from "lucide-react";

const features = [
  {
    icon: <Video className="w-6 h-6 text-brand-blue" />,
    title: "Video Interviews",
    description: "Practice with realistic video interviews that simulate real-world scenarios.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-brand-pink" />,
    title: "AI Feedback",
    description: "Get instant, personalized feedback from our advanced AI on your performance.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-brand-purple" />,
    title: "Expert Review",
    description: "Receive detailed analysis from industry experts to improve your skills.",
  },
  {
    icon: <BarChart className="w-6 h-6 text-brand-blue" />,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-brand-purple" />,
    title: "Personalized Path",
    description: "Get customized interview preparation based on your target role and experience.",
  },
  {
    icon: <Award className="w-6 h-6 text-brand-pink" />,
    title: "Job Success",
    description: "Increase your chances of landing your dream job with our proven system.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ace Your Next Interview</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides you with the tools to prepare, practice, and perfect your interview skills.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="h-12 w-12 rounded-lg bg-white/80 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
