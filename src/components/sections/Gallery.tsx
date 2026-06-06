"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/gallery/wedding_stage.png",
    label: "Wedding Stage Styling",
    category: "weddings",
  },
  {
    src: "/gallery/reception_ambience.png",
    label: "Reception Ambience",
    category: "sangeet-reception",
  },
  {
    src: "/gallery/guest_experience.png",
    label: "Guest Experience Design",
    category: "corporate-social",
  },
  {
    src: "/gallery/mehendi_styling.png",
    label: "Mehendi Styling",
    category: "haldi-mehendi",
  },
  {
    src: "/gallery/destination_setup.png",
    label: "Destination Setup Mood",
    category: "weddings",
  },
  {
    src: "/gallery/sangeet_energy.png",
    label: "Sangeet Energy",
    category: "sangeet-reception",
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
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="mb-12 text-center">

        <h2 className="mb-5 mt-4 font-serif text-4xl text-[#1b3225] md:text-5xl">
          A visual preview of the worlds
          <br className="hidden md:block" /> we create for clients.
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[#1b3225]">
          <Link href="/gallery?from=gallery" className="rounded-full bg-[#caa56c] hover:bg-[#b08b50] px-6 py-2 text-white transition-all shadow-sm">
            All
          </Link>
          <Link href="/gallery?category=weddings&from=gallery" className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#caa56c] hover:text-[#caa56c] hover:bg-[#1b3225]/5">
            Wedding
          </Link>
          <Link href="/gallery?category=haldi-mehendi&from=gallery" className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#caa56c] hover:text-[#caa56c] hover:bg-[#1b3225]/5">
            Haldi & Mehndi
          </Link>
          <Link href="/gallery?category=corporate-social&from=gallery" className="rounded-full bg-white px-6 py-2 border border-stone-200 transition-all hover:border-[#caa56c] hover:text-[#caa56c] hover:bg-[#1b3225]/5">
            Corporate & Social
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-4 h-auto md:grid-cols-4 md:grid-rows-2 md:h-[600px] lg:h-[700px]"
      >
        <Link href={`/gallery?category=${images[0].category}&from=gallery`} className="md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-0">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(0) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[0].src}
              alt={images[0].label}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(0) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(0) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(0) ? "translate-x-1" : ""
              }`}>{images[0].label}</p>
          </motion.div>
        </Link>

        <Link href={`/gallery?category=${images[1].category}&from=gallery`} className="md:col-span-2 md:row-span-1 aspect-video md:aspect-auto">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(1) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[1].src}
              alt={images[1].label}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(1) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(1) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(1) ? "translate-x-1" : ""
              }`}>{images[1].label}</p>
          </motion.div>
        </Link>

        <Link href={`/gallery?category=${images[2].category}&from=gallery`} className="md:col-span-1 md:row-span-1 aspect-square md:aspect-auto">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(2) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[2].src}
              alt={images[2].label}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(2) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(2) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(2) ? "translate-x-1" : ""
              }`}>{images[2].label}</p>
          </motion.div>
        </Link>

        <Link href={`/gallery?category=${images[3].category}&from=gallery`} className="md:col-span-1 md:row-span-1 aspect-square md:aspect-auto">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(3) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[3].src}
              alt={images[3].label}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(3) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(3) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(3) ? "translate-x-1" : ""
              }`}>{images[3].label}</p>
          </motion.div>
        </Link>

        <Link href={`/gallery?category=${images[4].category}&from=gallery`} className="md:col-span-1 md:row-span-1 aspect-square md:aspect-auto">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(4) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[4].src}
              alt={images[4].label}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(4) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(4) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(4) ? "translate-x-1" : ""
              }`}>{images[4].label}</p>
          </motion.div>
        </Link>

        <Link href={`/gallery?category=${images[5].category}&from=gallery`} className="md:col-span-1 md:row-span-1 aspect-square md:aspect-auto">
          <motion.div
            className={`gallery-card group relative h-full w-full overflow-hidden rounded-[1.8rem] bg-stone-900 cursor-pointer transition-all duration-500 ${isCardActive(5) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-transparent"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={images[5].src}
              alt={images[5].label}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-active:scale-105 group-active:opacity-100 ${isCardActive(5) ? "scale-105 opacity-100" : ""
                }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-active:opacity-60 pointer-events-none ${isCardActive(5) ? "opacity-60" : ""
              }`} />
            <p className={`absolute bottom-5 left-5 font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 z-10 ${isCardActive(5) ? "translate-x-1" : ""
              }`}>{images[5].label}</p>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
