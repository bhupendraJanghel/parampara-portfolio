"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Gift,
  Lightbulb,
  Mic,
  Music,
  Palette,
  Sparkles,
  Utensils,
} from "lucide-react";

const elements = [
  { name: "Decoration", icon: Sparkles },
  { name: "Lighting", icon: Lightbulb },
  { name: "Stage", icon: Mic },
  { name: "DJ & Sound", icon: Music },
  { name: "Props", icon: Palette },
  { name: "Photography", icon: Camera },
  { name: "Catering", icon: Utensils },
  { name: "Gifting", icon: Gift },
];

export default function Services() {
  return (
    <section className="bg-[#fbf8f1] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-5 font-serif text-4xl text-[#1b3225] md:text-5xl"
        >
          What we can deliver for your event
        </motion.h2>
        <p className="mx-auto mb-16 max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
          Parampara Events combines planning, decor, logistics, and atmosphere
          into a single execution team so clients can move from idea to event
          day with clarity.
        </p>

        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-4 md:grid-cols-5">
          {elements.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex cursor-pointer flex-col items-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e0cfab] to-[#c5a059] text-[#1b3225] shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-md">
                <item.icon strokeWidth={1} size={32} />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#1b3225]">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

