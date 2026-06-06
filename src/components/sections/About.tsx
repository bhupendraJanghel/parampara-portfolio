"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getYearsOfExperience } from "@/lib/constants";
import {
  Crown,
  Sparkles,
  Award,
  Users,
  Compass,
  Palette,
  Calendar,
  Flower2,
  Handshake,
  ShieldCheck,
  Heart,
  Bell,
  Store,
  Monitor,
  Laptop,
} from "lucide-react";



const founders = [
  {
    name: "Rumesh Janghel",
    role: "FOUNDER",
    title: "PARAMPARA EVENT PLANNERS",
    description:
      "Leads event planning, coordination, and client experience with a focus on creating seamless and meaningful celebrations.",
    expertise: "Planning & Coordination",
    expertiseIcon: Compass,
    floatingIcon: Crown,
    image: "/team/rumesh.png",
  },
  {
    name: "Nitesh Janghel",
    role: "CO-FOUNDER",
    title: "CHIEF OF PARAMPARA DECOR STUDIO",
    description:
      "Heads decor design, styling, and event setup execution with an eye for detail and premium finishes.",
    expertise: "Decor & Styling",
    expertiseIcon: Palette,
    floatingIcon: Store,
    image: "/team/nitesh.png",
  },
  {
    name: "Bhupendra Janghel",
    role: "HEAD OF DIGITAL & TECHNOLOGY",
    title: "DIGITAL & TECHNOLOGY LEAD",
    description:
      "Manages our website, web apps, digital platforms, and social media presence to keep Parampara connected and always evolving.",
    expertise: "Web, Digital & Technology",
    expertiseIcon: Laptop,
    floatingIcon: Monitor,
    image: "/team/bhuppi_.png",
  },
];

const features = [
  {
    title: "Planning & Coordination",
    description: "From concept to execution, we plan every detail to perfection.",
    icon: Calendar,
  },
  {
    title: "Premium Decor Execution",
    description: "Elegant themes, fresh florals, and stunning setups that bring your vision to life.",
    icon: Flower2,
  },
  {
    title: "Weddings, Corporate & Social Events",
    description: "We create memorable experiences for every occasion and every kind of celebration.",
    icon: Users,
  },
  {
    title: "End-to-End Service",
    description: "One dedicated team handling everything so you can relax and enjoy.",
    icon: Handshake,
  },
  {
    title: "Tailored Concept Styling",
    description: "Custom color palettes, visual mockups, and layouts curated for your specific theme.",
    icon: Palette,
  },
  {
    title: "Transparent Pricing & Operations",
    description: "Direct communications, clear cost sheets, and highly organized timelines for complete peace of mind.",
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#faf6ee] px-6 py-12 md:py-16 text-[#1b3225]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b88a44]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#fbf8f1] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f7637] shadow-sm">
            The Team Behind Parampara
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#1b3225] md:text-5xl lg:text-6xl font-medium tracking-tight">
            Meet the People Behind Parampara
          </h2>
          <p className="mt-3 text-sm font-sans font-medium text-[#a27e36] md:text-base">
            Turning celebrations into unforgettable experiences.
          </p>

          {/* Central Ornament */}
          <div className="flex items-center justify-center gap-4 my-8 w-full max-w-md mx-auto">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/40 flex-grow" />
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/parampara-logo.png"
                alt="Parampara Gold Medallion Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/40 flex-grow" />
          </div>
        </div>

        {/* 2-Column Main Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-7xl mx-auto">

          {/* Left Column - Founders Container */}
          <div className="flex flex-col gap-6">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-white border border-stone-200/40 shadow-sm relative"
              >
                {/* Founder Image */}
                <div className="relative h-64 w-full md:h-auto md:w-52 lg:w-56 shrink-0 bg-stone-50">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 224px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Founder Details */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#caa15c]">
                    {founder.role}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#1b3225] mt-1 font-medium">
                    {founder.name}
                  </h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-0.5">
                    {founder.title}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 font-sans">
                    {founder.description}
                  </p>

                  {/* Expertise Pill */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#faf6ee] border border-stone-200/50 px-4 py-1.5 mt-4 self-start text-[10px] font-semibold text-stone-700">
                    <founder.expertiseIcon size={12} className="text-[#c5a059]" />
                    <span>Expertise: {founder.expertise}</span>
                  </div>
                </div>

                {/* Floating Top-Right Badge */}
                <div className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-[#faf6ee] border border-[#c5a059]/20 text-[#c5a059] shadow-sm z-10">
                  <founder.floatingIcon size={16} strokeWidth={1.5} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Why Choose Parampara Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] bg-[#1c2a21] p-8 text-[#faf6ee] shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex flex-col items-start mb-6">
                <Sparkles className="text-[#caa56c] mb-2" size={20} strokeWidth={1.5} />
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium tracking-wide">
                  Why Clients Choose Parampara
                </h3>
                <div className="h-[2px] w-12 bg-[#caa56c] mt-2.5" />
              </div>

              {/* Feature List */}
              <div className="flex flex-col gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start pb-5 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#caa56c]">
                      <feature.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-sans text-sm font-bold text-white tracking-wide">
                        {feature.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-white/70 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Row */}
            {/* <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
              <div className="flex gap-2.5 items-start">
                <ShieldCheck className="text-[#caa56c] shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#caa56c] tracking-wider">
                    Reliable. Transparent. Professional.
                  </p>
                  <p className="text-[9px] text-white/50 mt-0.5">
                    That's the Parampara Promise.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Heart className="text-[#caa56c] shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#caa56c] tracking-wider">
                    Client-Ready Portfolio
                  </p>
                  <p className="text-[9px] text-white/50 mt-0.5">
                    Proven experience. Trusted results.
                  </p>
                </div>
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
