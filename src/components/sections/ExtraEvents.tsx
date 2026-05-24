"use client";

import { motion } from "framer-motion";
import { Baby, Building2, Cake, ChevronRight, Flame } from "lucide-react";

const milestones = [
  {
    title: "Corporate Events",
    description: "Launches, award nights, annual meets, and branded gatherings with polished staging and smooth execution.",
    icon: Building2,
    imageUrl: "/Other/corporate_1.png",
  },
  {
    title: "Grand Birthdays",
    description: "Custom themes, decor styling, and guest-friendly layouts for milestone birthdays and family celebrations.",
    icon: Cake,
    imageUrl: "/Birthday/birthday_1.png",
  },
  {
    title: "Religious Functions",
    description: "Tasteful arrangements for pujas, spiritual gatherings, and ceremonies that need cultural sensitivity and warmth.",
    icon: Flame,
    imageUrl: "/Other/religious_1.png",
  },
  {
    title: "Baby Occasions",
    description: "Soft styling, thoughtful decor details, and comfortable setups for baby showers and naming ceremonies.",
    icon: Baby,
    imageUrl: "/Other/baby_occasion_1.png",
  },
];

export default function ExtraEvents() {
  return (
    <section id="events" className="bg-[#fcf8ef] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-[#d4af37]/25 bg-white shadow-[0_18px_50px_rgba(36,38,27,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(36,38,27,0.12)]"
            >
              {/* Image Section */}
              <div className="relative h-40 w-full sm:h-48">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Fade to white at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              {/* Floating Icon */}
              <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#c5a059] shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:bg-[#c5a059] group-hover:text-white z-10">
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
                <a
                  href="#contact"
                  className="flex w-max items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#c5a059] transition-colors group-hover:text-[#1b3225]"
                >
                  Ask for Concepts <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
