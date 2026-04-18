"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

const stats = [
  { value: "Weddings", label: "Luxury ceremonies and family celebrations" },
  { value: "Decor", label: "Premium styling from concept to setup" },
  { value: "Events", label: "Corporate, social, and cultural experiences" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Wedding Mandap Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%),linear-gradient(180deg,rgba(7,10,8,0.18),rgba(7,10,8,0.76))]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-28 text-white lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl leading-[1.02] tracking-[0.01em] drop-shadow-xl md:text-7xl lg:text-[5.8rem]"
          >
            Signature celebrations
            <span className="block italic font-light text-[#f1dcc0]">
              designed to feel unforgettable.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/82 md:text-xl"
          >
            Parampara Events creates wedding celebrations, family functions,
            and curated event experiences that look premium, run smoothly, and
            leave a lasting impression on every guest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center font-sans uppercase tracking-[0.2em] text-xs"
          >
            <Link
              href="#gallery"
              className="group flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-stone-900"
            >
              View Portfolio
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="rounded-full bg-gradient-to-r from-[#caa15c] via-[#d9b26d] to-[#f1d6a0] px-8 py-4 font-semibold text-stone-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="grid gap-4 rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-xl lg:ml-auto lg:max-w-md"
        >
          {stats.map((item) => (
            <div
              key={item.value}
              className="rounded-[1.4rem] border border-white/10 bg-black/10 p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-serif text-3xl text-[#f6dfb5]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
