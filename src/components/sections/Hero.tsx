"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Wedding Mandap Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center text-white mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-6 tracking-wide drop-shadow-xl"
        >
           Crafting <span className="italic font-light opacity-90">Unforgettable</span> <br />
           Celebrations
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl md:tracking-wide font-light text-white/90 mb-12"
        >
          From Weddings to Private Events, We Bring Your Vision to Life
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 font-sans uppercase tracking-[0.2em] text-xs"
        >
          <Link
            href="#weddings"
            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/40 hover:bg-white hover:text-stone-900 transition-all duration-300 backdrop-blur-sm"
          >
            Explore Services 
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-stone-900 border border-transparent hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
