"use client";

import { motion } from "framer-motion";
import { Building2, Cake, Flame, Baby, ChevronRight } from "lucide-react";

const milestones = [
  {
    title: "Corporate Galas",
    description: "Elevate your brand with sophisticated and professional events managed with perfect excellence.",
    icon: Building2,
  },
  {
    title: "Majestic Birthdays",
    description: "From intimate gatherings to grand celebrations, creating memorable events for your themes.",
    icon: Cake,
  },
  {
    title: "Religious Events",
    description: "Graceful and traditionally rich rituals managed with serenity and sanctity.",
    icon: Flame,
  },
  {
    title: "Baby Events",
    description: "Welcome the newest impact with tenderness exactly tailored to your family's joy.",
    icon: Baby,
  },
];

export default function Milestones() {
  return (
    <section id="events" className="py-24 px-6 bg-[#fbf8f1]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#1b3225]">
            Life's Milestone Events
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 border border-[#d4af37]/30 shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col"
            >
              <div className="w-12 h-12 bg-[#fbf8f1] rounded-full flex items-center justify-center mb-6 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                <item.icon strokeWidth={1.5} size={24} />
              </div>
              <h3 className="font-serif text-2xl text-[#1b3225] mb-3">
                {item.title}
              </h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              <a
                href="#contact"
                className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-1 group-hover:text-[#1b3225] transition-colors w-max"
              >
                View Themes <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
