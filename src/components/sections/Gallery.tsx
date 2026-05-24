"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/gallery/wedding_stage.png",
    label: "Wedding Stage Styling",
  },
  {
    src: "/gallery/reception_ambience.png",
    label: "Reception Ambience",
  },
  {
    src: "/gallery/guest_experience.png",
    label: "Guest Experience Design",
  },
  {
    src: "/gallery/mehendi_styling.png",
    label: "Mehendi Styling",
  },
  {
    src: "/gallery/destination_setup.png",
    label: "Destination Setup Mood",
  },
  {
    src: "/gallery/sangeet_energy.png",
    label: "Sangeet Energy",
  },
];

export default function Gallery() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only track center element on mobile layout (width < 768px)
      if (window.innerWidth >= 768) {
        setActiveCardIndex(null);
        return;
      }

      const cards = document.querySelectorAll(".gallery-card");
      const viewportCenter = window.innerHeight / 2;

      let closestIndex: number | null = null;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        // Highlight card when it's within the middle 35% height band of the screen
        if (distance < window.innerHeight * 0.35) {
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveCardIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Run on initial render

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isCardActive = (idx: number) => activeCardIndex === idx;

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9f7637]">
          Selected Portfolio
        </span>
        <h2 className="mb-5 mt-4 font-serif text-4xl text-[#1b3225] md:text-5xl">
          A visual preview of the worlds
          <br className="hidden md:block" /> we create for clients.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
          Use this section to show clients the range of styling, scale, and
          atmosphere Parampara Events can deliver across wedding and event
          formats.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[#1b3225]">
          <button className="rounded-full bg-[#c5a059] px-6 py-2 text-white transition-all shadow-sm">All</button>
          <button className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#c5a059] hover:text-[#c5a059]">Wedding</button>
          <button className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#c5a059] hover:text-[#c5a059]">Private Events</button>
          <button className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#c5a059] hover:text-[#c5a059]">Corporate</button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-4 h-auto md:grid-cols-4 md:grid-rows-2 md:h-[600px] lg:h-[700px]"
      >
        <motion.div 
          className={`gallery-card group relative overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-0 cursor-pointer transition-all duration-500 ${
            isCardActive(0) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[0].src}
            alt={images[0].label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(0) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(0) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(0) ? "translate-x-1" : ""
          }`}>{images[0].label}</p>
        </motion.div>

        <motion.div 
          className={`gallery-card group relative aspect-video overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-2 md:row-span-1 md:aspect-auto cursor-pointer transition-all duration-500 ${
            isCardActive(1) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[1].src}
            alt={images[1].label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(1) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(1) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(1) ? "translate-x-1" : ""
          }`}>{images[1].label}</p>
        </motion.div>

        <motion.div 
          className={`gallery-card group relative aspect-square overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-1 md:row-span-1 md:aspect-auto cursor-pointer transition-all duration-500 ${
            isCardActive(2) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[2].src}
            alt={images[2].label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(2) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(2) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(2) ? "translate-x-1" : ""
          }`}>{images[2].label}</p>
        </motion.div>

        <motion.div 
          className={`gallery-card group relative aspect-square overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-1 md:row-span-1 md:aspect-auto cursor-pointer transition-all duration-500 ${
            isCardActive(3) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[3].src}
            alt={images[3].label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(3) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(3) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(3) ? "translate-x-1" : ""
          }`}>{images[3].label}</p>
        </motion.div>

        <motion.div 
          className={`gallery-card group relative aspect-square overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-1 md:row-span-1 md:aspect-auto cursor-pointer transition-all duration-500 ${
            isCardActive(4) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[4].src}
            alt={images[4].label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(4) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(4) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(4) ? "translate-x-1" : ""
          }`}>{images[4].label}</p>
        </motion.div>

        <motion.div 
          className={`gallery-card group relative aspect-square overflow-hidden rounded-[1.8rem] bg-stone-900 md:col-span-1 md:row-span-1 md:aspect-auto cursor-pointer transition-all duration-500 ${
            isCardActive(5) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={images[5].src}
            alt={images[5].label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${
              isCardActive(5) ? "scale-105 opacity-100" : ""
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${
            isCardActive(5) ? "opacity-60" : ""
          }`} />
          <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${
            isCardActive(5) ? "translate-x-1" : ""
          }`}>{images[5].label}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
