"use client";

import { motion } from "framer-motion";
import { Baby, Building2, Cake, ChevronRight, Flame } from "lucide-react";

const milestones = [
  {
    title: "Corporate Events",
    description: "Launches, award nights, annual meets, and branded gatherings with polished staging and smooth execution.",
    icon: Building2,
  },
  {
    title: "Grand Birthdays",
    description: "Custom themes, decor styling, and guest-friendly layouts for milestone birthdays and family celebrations.",
    icon: Cake,
  },
  {
    title: "Religious Functions",
    description: "Tasteful arrangements for pujas, spiritual gatherings, and ceremonies that need cultural sensitivity and warmth.",
    icon: Flame,
  },
  {
    title: "Baby Occasions",
    description: "Soft styling, thoughtful decor details, and comfortable setups for baby showers and naming ceremonies.",
    icon: Baby,
  },
];

export default function ExtraEvents() {
  return (
    <section id="events" className="bg-[#fcf8ef] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-5 text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9f7637]">
            Beyond Weddings
          </span>
          <h2 className="font-serif text-4xl text-[#1b3225] md:text-5xl">
            Events that still feel premium,
            <br className="hidden md:block" /> whatever the occasion.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
            The same Parampara quality extends to social, festive, and branded
            experiences, with thoughtful decor, guest comfort, and strong event
            management built into every setup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {milestones.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col rounded-[1.75rem] border border-[#d4af37]/25 bg-white p-8 shadow-[0_18px_50px_rgba(36,38,27,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(36,38,27,0.12)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf8f1] text-[#c5a059] transition-colors duration-300 group-hover:bg-[#c5a059] group-hover:text-white">
                <item.icon strokeWidth={1.5} size={24} />
              </div>
              <h3 className="mb-3 font-serif text-2xl text-[#1b3225]">
                {item.title}
              </h3>
              <p className="mb-6 flex-grow text-sm font-light leading-7 text-stone-500">
                {item.description}
              </p>
              <a
                href="#contact"
                className="flex w-max items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#c5a059] transition-colors group-hover:text-[#1b3225]"
              >
                Ask for Concepts <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
