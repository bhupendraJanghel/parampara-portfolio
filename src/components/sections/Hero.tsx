"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Crown,
  PartyPopper,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";

const PHRASES = [
  "Signature celebrations",
  "Luxury weddings",
  "Curated events",
  "Exquisite experiences",
];

export default function Hero() {
  const [yearsOfExperience, setYearsOfExperience] = useState(6);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    setYearsOfExperience(currentYear - startYear);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const heroStats = [
    {
      value: `${yearsOfExperience}+`,
      label: "YEARS OF EXPERIENCE",
      icon: Crown,
      circleBg: "bg-[#1c2a21]",
      iconColor: "text-[#caa56c]",
    },
    {
      value: "100+",
      label: "EVENTS DELIVERED",
      icon: PartyPopper,
      circleBg: "bg-[#caa56c]/20",
      iconColor: "text-[#9f7637]",
    },
    {
      value: "100%",
      label: "CLIENT SATISFACTION",
      icon: Users,
      circleBg: "bg-[#1c2a21]",
      iconColor: "text-[#caa56c]",
    },
    {
      value: "Trusted",
      label: "BY FAMILIES & BUSINESSES",
      icon: Heart,
      circleBg: "bg-[#caa56c]/20",
      iconColor: "text-[#9f7637]",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#faf6ee] flex flex-col justify-between pt-28 pb-12 overflow-hidden">

      {/* Desktop background: spans the entire viewport width to place flowers on right and cream on left */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/hero_background.png"
          alt="Wedding centerpiece decor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      {/* Mobile background cover */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src="/hero_background.png"
          alt="Wedding centerpiece decor mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-30"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full flex-1 flex flex-col justify-between">

        {/* Top Split Layout Row - vertically centered */}
        <div className="flex-1 flex items-center w-full py-8">
          <div className="grid gap-12 md:grid-cols-2 items-center w-full">

            {/* Left Text Column */}
            <div className="max-w-xl text-left">
              {/* Tagline Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#9f7637]">
                  CRAFTING MOMENTS. CREATING MEMORIES.
                </span>
                <div className="h-[1px] bg-[#c5a059]/40 flex-grow max-w-[80px]" />
                <Sparkles size={12} className="text-[#c5a059]" />
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-[1.1] tracking-tight text-[#1b3225] font-medium"
              >
                <span className="block h-[1.25em] relative overflow-hidden mb-1 sm:mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute left-0 right-0 top-0 block text-[#1b3225]"
                    >
                      {PHRASES[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block mt-1 sm:mt-2">
                  <span className="italic font-normal text-[#caa15c]">designed</span>{" "}
                  to feel unforgettable.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="mt-6 text-sm sm:text-base leading-relaxed text-stone-600 font-sans"
              >
                Parampara Events creates wedding celebrations, family functions,
                and curated event experiences that look premium, run smoothly, and
                leave a lasting impression on every guest.
              </motion.p>

              {/* CTA Button Row */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs font-bold uppercase tracking-widest"
              >
                <Link
                  href="#gallery"
                  className="group flex items-center justify-center gap-2 rounded-lg bg-[#111d15] px-8 py-4 text-white hover:bg-[#1b3225] transition-all"
                >
                  View Portfolio
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#contact"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#c5a059]/40 bg-white px-8 py-4 text-[#9f7637] hover:bg-stone-50 hover:border-[#c5a059] transition-all"
                >
                  <Calendar size={14} className="text-[#c5a059]" />
                  Book a Consultation
                </Link>
              </motion.div>
            </div>

            {/* Right Placeholder Column (empty space on desktop since background image covers it) */}
            <div className="hidden md:block" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full mt-auto pt-6">
          {/* Floating Stat Bar Card at the Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="rounded-[2.5rem] bg-white border border-stone-200/50 p-6 md:p-8 shadow-[0_15px_50px_rgba(27,50,37,0.04)] max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 justify-items-center">
              {heroStats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 text-left w-full justify-start md:justify-center px-4 md:px-6
                    ${i > 0 && i % 2 !== 0 ? "border-l border-stone-100" : ""}
                    ${i >= 2 ? "border-t border-stone-100 md:border-t-0" : ""}
                    ${i > 0 ? "md:border-l md:border-stone-100 md:border-t-0" : ""}
                  `}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.circleBg} ${stat.iconColor} shadow-sm`}>
                    <stat.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg sm:text-2xl font-bold text-[#1b3225] leading-tight">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-500 mt-0.5 leading-normal">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stat Bar Bottom Caption & Ornament */}
          <div className="mt-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-3 w-full max-w-[100px] mb-3">
              <div className="h-[1px] bg-stone-200 flex-grow" />
              <Sparkles size={10} className="text-[#c5a059]" />
              <div className="h-[1px] bg-stone-200 flex-grow" />
            </div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 leading-relaxed">
              Trusted by families, businesses, and communities across{" "}
              <span className="text-[#9f7637] font-bold">Chhattisgarh</span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
