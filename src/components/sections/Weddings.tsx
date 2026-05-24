"use client";

import { motion } from "framer-motion";

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

      <div className="hide-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 md:grid md:grid-cols-5 md:gap-4 md:pb-0">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative aspect-[9/16] min-w-[260px] snap-center overflow-hidden rounded-[2rem] border border-[#d4af37]/30 shadow-[0_18px_50px_rgba(36,38,27,0.12)] transition-all duration-500 hover:border-[#d4af37]/90 md:min-w-0"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
