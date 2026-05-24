"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    title: "Haldi",
    imageUrl: "/haldi/haldi_2.png",
    detail: "Beautiful flower decorations and happy family moments.",
  },
  {
    title: "Mehendi",
    imageUrl: "/mehendi/mehndi_3.png",
    detail: "Comfortable seating, beautiful decorations, and a fun time for guests.",
  },
  {
    title: "Wedding",
    imageUrl: "/wedding/wedding_2.png",
    detail: "Beautiful mandaps, elegant stages, and smooth ceremony planning.",
  },
  {
    title: "Sangeet",
    imageUrl: "/sangeet/sangeet_3.png",
    detail: "Fun nights with great lights, music, dancing, and grand setups.",
  },
  {
    title: "Reception",
    imageUrl: "/reception/reception_1.png",
    detail: "A grand and elegant party to welcome guests and capture great photos.",
  },
];

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
    <section id="weddings" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="md:max-w-xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
            Wedding Portfolio
          </span>
          <h2 className="font-serif text-4xl leading-[1.05] text-[#1b3225] md:text-[3.8rem]">
            Every ceremony handled
            <br /> with detail, grace, and flow.
          </h2>
        </div>
        <p className="max-w-md border-l-2 border-[#d4af37] pl-4 text-sm font-light leading-7 text-stone-600">
          From intimate family functions to full wedding journeys, Parampara
          Events curates each celebration with decor, planning, coordination,
          and guest experience working together as one polished story.
        </p>
      </div>

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
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`wedding-card group relative aspect-[9/16] min-w-[260px] snap-center overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-[#d4af37]/90 md:min-w-0 cursor-pointer ${
                isCardActive(index) ? "scale-[0.99] border-[#d4af37]/90 shadow-lg" : "border-[#d4af37]/30"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 260px, 20vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 ${
                  isCardActive(index) ? "scale-105" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 text-left">
                <h3 className="font-serif text-2xl tracking-wide text-[#fbf8f1]">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/78">
                  {card.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
