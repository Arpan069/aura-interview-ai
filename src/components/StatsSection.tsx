
import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Award } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-10 h-10 text-brand-blue" />,
    value: "50,000+",
    label: "Successful Interviews",
  },
  {
    icon: <Briefcase className="w-10 h-10 text-brand-purple" />,
    value: "2,500+",
    label: "Company Partners",
  },
  {
    icon: <Award className="w-10 h-10 text-brand-pink" />,
    value: "95%",
    label: "Success Rate",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-xl flex flex-col items-center text-center"
            >
              <div className="mb-4">{stat.icon}</div>
              <motion.h3
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="text-4xl font-bold mb-2"
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
