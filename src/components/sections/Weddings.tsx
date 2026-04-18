"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Haldi",
    imageUrl: "https://images.unsplash.com/photo-1583089892943-e02e52f182fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    detail: "Bright rituals styled with floral textures, marigold palettes, and joyful family moments.",
  },
  {
    title: "Mehendi",
    imageUrl: "https://images.unsplash.com/photo-1544067977-8d070b43dff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    detail: "Interactive lounge layouts, artisanal decor, and a warm festive guest experience.",
  },
  {
    title: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    detail: "Elegant mandaps, refined stage styling, and complete ceremony coordination.",
  },
  {
    title: "Sangeet",
    imageUrl: "https://images.unsplash.com/photo-1621801306180-2d88c42b0ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    detail: "High-energy evenings with lighting, sound, choreography support, and standout production.",
  },
  {
    title: "Reception",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    detail: "Premium ambience for the grand reveal, guest hospitality, and timeless photo moments.",
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
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#eac98f]">
                Signature Experience
              </p>
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

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
