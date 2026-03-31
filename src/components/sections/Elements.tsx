"use client";

import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Mic, Music, Palette, Camera, Utensils, Gift, Quote, Star } from "lucide-react";

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
    quote: "Parampara Events brought our dream wedding to life. The attention to detail was absolutely flawless.",
    name: "Aarushi Khanna",
    role: "Bride",
    rating: 5,
  },
  {
    quote: "Extremely professional team! Our corporate gala was a huge success thanks to their creative execution.",
    name: "Rohan Mehta",
    role: "Corporate Client",
    rating: 5,
  },
];

export default function Elements() {
  return (
    <section className="py-24 px-6 bg-[#fbf8f1]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl text-[#1b3225] mb-16"
        >
          The Elements of Elegance
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-12 gap-x-6 mb-24 justify-items-center">
          {elements.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#e0cfab] to-[#c5a059] rounded-full flex items-center justify-center text-[#1b3225] shadow-sm mb-4 group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                <item.icon strokeWidth={1} size={32} />
              </div>
              <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#1b3225]">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white p-10 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
               <div className="flex gap-1 text-[#c5a059] mb-6">
                 {[...Array(t.rating)].map((_, i) => (
                   <Star key={i} size={16} fill="currentColor" />
                 ))}
               </div>
               <p className="font-serif text-lg md:text-xl italic text-stone-600 leading-relaxed mb-8 flex-grow">
                 "{t.quote}"
               </p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-stone-400">
                    <Quote size={20} />
                 </div>
                 <div>
                   <h4 className="font-sans font-bold text-sm tracking-wide text-[#1b3225]">{t.name}</h4>
                   <p className="font-sans text-xs uppercase tracking-widest text-[#c5a059] mt-1">{t.role}</p>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
