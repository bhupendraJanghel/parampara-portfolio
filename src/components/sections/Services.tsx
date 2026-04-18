"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Gift,
  Lightbulb,
  Mic,
  Music,
  Palette,
  Quote,
  Sparkles,
  Star,
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

const testimonials = [
  {
    quote: "Parampara Events brought our wedding vision together beautifully. The decor felt premium, the flow felt effortless, and every guest noticed the finish.",
    name: "Wedding Client",
    role: "Private Celebration",
    rating: 5,
  },
  {
    quote: "What stood out most was the coordination. The team handled setup, styling, and execution with calm professionalism from start to finish.",
    name: "Event Client",
    role: "Corporate Gathering",
    rating: 5,
  },
];

export default function Services() {
  return (
    <section className="bg-[#fbf8f1] px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
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

        <div className="mb-24 grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-4 md:grid-cols-5">
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

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group flex flex-col justify-between rounded-[1.7rem] border border-stone-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex gap-1 text-[#c5a059]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mb-8 flex-grow font-serif text-lg italic leading-relaxed text-stone-600 md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 text-stone-400">
                  <Quote size={20} />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold tracking-wide text-[#1b3225]">{t.name}</h4>
                  <p className="mt-1 font-sans text-xs uppercase tracking-widest text-[#c5a059]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
