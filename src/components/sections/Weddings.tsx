"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Flower2,
  Users,
  Star,
  ArrowRight
} from "lucide-react";

const cards = [
  {
    title: "Haldi Ceremony",
    imageUrl: "/haldi/haldi_2.png",
    category: "haldi",
  },
  {
    title: "Mehendi Ceremony",
    imageUrl: "/mehendi/mehndi_3.png",
    category: "haldi",
  },
  {
    title: "Wedding Ceremony",
    imageUrl: "/wedding/wedding_2.png",
    category: "weddings",
  },
  {
    title: "Reception Night",
    imageUrl: "/sangeet/sangeet_3.png",
    category: "sangeet",
  },
  {
    title: "Grand Celebration",
    imageUrl: "/reception/reception_1.png",
    category: "reception",
  },
];

const FlowerOrnament = ({ className = "text-[#caa56c] h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 2a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3Z" />
    <path d="M12 22a3 3 0 0 0 3-3c0-2-3-5-3-5s-3 3-3 5a3 3 0 0 0 3 3Z" />
    <path d="M22 12a3 3 0 0 0-3-3c-2 0-5 3-5 3s3 3 5 3a3 3 0 0 0 3-3Z" />
    <path d="M2 12a3 3 0 0 0 3 3c2 0 5-3 5-3s-3-3-5-3a3 3 0 0 0-3 3Z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export default function Weddings() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 5
    );

    // Only track center card on mobile layouts (width < 768px)
    if (window.innerWidth >= 768) {
      setActiveCardIndex(null);
      return;
    }

    const cardElements = container.querySelectorAll(".wedding-card");
    const viewportCenter = window.innerWidth / 2;

    let closestIndex: number | null = null;
    let minDistance = Infinity;

    cardElements.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      // Highlight the card that is closest to the screen center horizontally
      if (distance < rect.width * 0.7) {
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    setActiveCardIndex(closestIndex);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 280; // card width + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isCardActive = (idx: number) => activeCardIndex === idx;

  return (
    <section id="weddings" className="mx-auto max-w-7xl px-6 py-12 md:py-16">

      {/* 2-Column Split Header */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left text column */}
        <div className="text-left">
          <h2 className="font-serif text-4xl leading-[1.1] text-[#1b3225] md:text-[3.5rem] font-medium tracking-tight">
            Every ceremony handled
            <br /> with <span className="font-normal text-[#caa15c]">detail</span>, <span className="font-normal text-[#caa15c]">grace</span>, and <span className="font-normal text-[#caa15c]">flow</span>.
          </h2>

          {/* Golden Flower Ornament Divider */}
          <div className="flex items-center justify-start gap-4 my-6">
            <div className="h-[1px] bg-[#caa56c]/30 w-12" />
            <FlowerOrnament />
            <div className="h-[1px] bg-[#caa56c]/30 w-12" />
          </div>

          <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-stone-600 max-w-lg">
            From intimate family functions to full wedding journeys, we turn your moments into memories that last a lifetime.
          </p>
        </div>

        {/* Right Feature Highlight Box */}
        <div className="rounded-[2.5rem] bg-[#fbf9f4] border border-[#caa56c]/15 p-6 md:p-8 shadow-[0_15px_45px_rgba(27,50,37,0.02)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#caa56c]/10 text-[#caa56c]">
              <FlowerOrnament className="text-[#caa56c] h-5 w-5" />
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-left font-sans font-medium">
              Parampara Events creates each celebration with decor, planning, coordination, and guest experience working together as one polished story.
            </p>
          </div>
          <div className="h-px bg-stone-200/50 my-6" />
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#caa56c]/5 text-[#caa56c] mb-2">
                <Heart size={16} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-700 leading-tight">
                Personalized<br />Planning
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#caa56c]/5 text-[#caa56c] mb-2">
                <Flower2 size={16} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-700 leading-tight">
                Stunning<br />Decor
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#caa56c]/5 text-[#caa56c] mb-2">
                <Users size={16} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-700 leading-tight">
                Seamless<br />Coordination
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#caa56c]/5 text-[#caa56c] mb-2">
                <Star size={16} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-700 leading-tight">
                Guest<br />Experience
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Cards Slider Section */}
      <div className="relative group/scroll">
        {/* Left Chevron Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-stone-950/80 text-[#fbf8f1] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all hover:bg-stone-900 hover:border-[#d4af37] active:scale-90 md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-[#caa15c]" />
          </button>
        )}

        {/* Right Chevron Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-stone-950/80 text-[#fbf8f1] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all hover:bg-stone-900 hover:border-[#d4af37] active:scale-90 md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-[#caa15c]" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="hide-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 md:grid md:grid-cols-5 md:gap-4 md:pb-0"
        >
          {cards.map((card, index) => (
            <Link
              href={`/gallery?category=${card.category}&from=weddings`}
              key={card.title}
              className="block w-full h-full snap-center min-w-[260px] md:min-w-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`wedding-card group relative aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] border transition-all duration-500 hover:border-[#d4af37]/90 cursor-pointer h-full ${isCardActive(index) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-[#d4af37]/20"
                  }`}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 260px, 20vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-103 group-active:scale-103 ${isCardActive(index) ? "scale-103" : ""
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Bottom Centered Label & Ornament */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end text-center z-10">
                  <div className="flex items-center justify-center gap-2 mb-2 w-full max-w-[80px] opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="h-[1px] bg-white/45 flex-grow" />
                    <FlowerOrnament className="text-white h-3 w-3 shrink-0" />
                    <div className="h-[1px] bg-white/45 flex-grow" />
                  </div>
                  <h3 className="font-serif text-lg tracking-wide text-white font-medium drop-shadow-sm">
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/gallery?from=weddings"
          className="group flex items-center justify-center gap-3 rounded-full border border-[#caa56c]/30 bg-[#fbf9f4] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1b3225] hover:bg-[#1b3225] hover:text-white hover:border-[#1b3225] transition-all duration-300 shadow-sm"
        >
          <FlowerOrnament className="text-[#caa56c] group-hover:text-white transition-colors h-3.5 w-3.5 shrink-0" />
          <span>Explore Our Wedding Gallery</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
