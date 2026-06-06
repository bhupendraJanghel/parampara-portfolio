"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Baby, Building2, Cake, ChevronRight, Flame } from "lucide-react";

const milestones = [
  {
    title: "Corporate Events",
    description: "Launches, award nights, annual meets, and branded gatherings with polished staging and smooth execution.",
    icon: Building2,
    imageUrl: "/Other/corporate_1.png",
    category: "corporate",
  },
  {
    title: "Grand Birthdays",
    description: "Custom themes, decor styling, and guest-friendly layouts for milestone birthdays and family celebrations.",
    icon: Cake,
    imageUrl: "/Birthday/birthday_1.png",
    category: "birthdays",
  },
  {
    title: "Religious Functions",
    description: "Tasteful arrangements for pujas, spiritual gatherings, and ceremonies that need cultural sensitivity and warmth.",
    icon: Flame,
    imageUrl: "/Other/religious_1.png",
    category: "corporate",
  },
  {
    title: "Baby Occasions",
    description: "Soft styling, thoughtful decor details, and comfortable setups for baby showers and naming ceremonies.",
    icon: Baby,
    imageUrl: "/Other/baby_occasion_1.png",
    category: "corporate",
  },
];

export default function ExtraEvents() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only track center element on mobile layouts (width < 768px)
      if (window.innerWidth >= 768) {
        setActiveCardIndex(null);
        return;
      }

      const cards = document.querySelectorAll(".extra-event-card");
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
    handleScroll(); // Run initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isCardActive = (idx: number) => activeCardIndex === idx;

  return (
    <section id="events" className="bg-[#fcf8ef] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col gap-3 text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f7637]">
            Beyond Weddings
          </span>
          <h2 className="font-serif text-2xl text-[#1b3225] md:text-3xl">
            Events that still feel premium,
            <br className="hidden md:block" /> whatever the occasion.
          </h2>
          <p className="mx-auto max-w-2xl text-xs leading-5 text-stone-600 md:text-sm md:leading-6">
            The same Parampara quality extends to social, festive, and branded
            experiences, with thoughtful decor, guest comfort, and strong event
            management built into every setup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {milestones.map((item, index) => (
            <Link
              href={`/gallery?category=${item.category}&from=events`}
              key={item.title}
              className="block w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`extra-event-card group relative flex flex-col overflow-hidden rounded-[1.25rem] border bg-white shadow-[0_18px_50px_rgba(36,38,27,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(36,38,27,0.12)] cursor-pointer h-full ${isCardActive(index) ? "scale-[0.99] border-[#d4af37]/90 shadow-md" : "border-[#d4af37]/25"
                  }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image Section */}
                <div className="relative h-40 w-full sm:h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105 group-active:scale-105 ${isCardActive(index) ? "scale-105" : ""
                      }`}
                  />
                  {/* Fade to white at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                {/* Floating Icon */}
                <div className={`absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#c5a059] shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:bg-[#c5a059] group-hover:text-white z-10 ${isCardActive(index) ? "bg-[#c5a059] text-white" : ""
                  }`}>
                  <item.icon strokeWidth={1.5} size={18} />
                </div>

                {/* Text Section */}
                <div className="relative z-10 flex flex-grow flex-col bg-white px-5 pb-5 pt-0">
                  <h3 className="mb-1.5 font-serif text-lg text-[#1b3225]">
                    {item.title}
                  </h3>
                  <p className="mb-3 flex-grow text-xs font-light leading-5 text-stone-500 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="flex w-max items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#c5a059] transition-colors group-hover:text-[#1b3225]">
                    View Gallery <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
