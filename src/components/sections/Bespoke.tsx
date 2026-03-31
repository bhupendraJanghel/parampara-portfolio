"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Haldi",
    imageUrl: "https://images.unsplash.com/photo-1583089892943-e02e52f182fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mehendi",
    imageUrl: "https://images.unsplash.com/photo-1544067977-8d070b43dff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sangeet",
    imageUrl: "https://images.unsplash.com/photo-1621801306180-2d88c42b0ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Reception",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function Bespoke() {
  return (
    <section id="weddings" className="py-24 px-6 max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="md:max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-4 block">
            The Grand Union
          </span>
          <h2 className="font-serif text-4xl md:text-[3.5rem] leading-[1.1] text-[#1b3225]">
            Bespoke Wedding <br /> Experiences
          </h2>
        </div>
        <p className="text-stone-500 max-w-sm text-sm leading-relaxed border-l-2 border-[#d4af37] pl-4 font-light">
          "Every thrill's a story, every structure a legacy. We weave these moments into a tapestry of lifelong memories."
        </p>
      </div>

      {/* 5 Cards */}
      <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-5 md:gap-4 pb-8 md:pb-0 snap-x snap-mandatory hide-scroll">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative min-w-[240px] md:min-w-0 aspect-[9/16] rounded-[2rem] overflow-hidden shadow-lg border-2 border-[#d4af37]/30 snap-center hover:border-[#d4af37]/90 transition-all duration-500"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full text-center">
              <h3 className="font-serif text-2xl text-[#fbf8f1] tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[1px] after:bg-[#d4af37]/50 group-hover:after:w-16 after:transition-all after:duration-500">
                {card.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Quick custom style to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
