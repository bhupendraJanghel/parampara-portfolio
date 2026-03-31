"use client";

import { motion } from "framer-motion";
import { Building2, Cake, Flame, Baby, ChevronRight } from "lucide-react";

const milestones = [
  {
    title: "Corporate Events",
    description: "Launch your brand or host professional office events with perfect management and style.",
    icon: Building2,
  },
  {
    title: "Grand Birthdays",
    description: "From small parties to big themed celebrations, we make birthdays truly special for all ages.",
    icon: Cake,
  },
  {
    title: "Religious Functions",
    description: "Beautiful arrangements for Pujas, Mata ki Chowki, and all traditional ceremonies.",
    icon: Flame,
  },
  {
    title: "Baby Occasions",
    description: "Celebrate the new arrival with cute themes for Baby Showers and Naming Ceremonies.",
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
            Celebrations for Every Occasion
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
