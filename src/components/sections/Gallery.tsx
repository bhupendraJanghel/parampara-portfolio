"use client";

import { motion } from "framer-motion";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    label: "Wedding Stage Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    label: "Reception Ambience",
  },
  {
    src: "https://images.unsplash.com/photo-1505932794465-147d1f1bce2d?auto=format&fit=crop&q=80&w=800",
    label: "Guest Experience Design",
  },
  {
    src: "https://images.unsplash.com/photo-1544067977-8d070b43dff6?auto=format&fit=crop&q=80&w=800",
    label: "Mehendi Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8892bc6cb4?auto=format&fit=crop&q=80&w=800",
    label: "Destination Setup Mood",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800",
    label: "Sangeet Energy",
  },
];

export default function Gallery() {
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
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-4 h-auto md:grid-cols-4 md:grid-rows-2 md:h-[600px] lg:h-[700px]"
      >
        <div className="group relative overflow-hidden rounded-[1.8rem] md:col-span-1 md:row-span-2">
          <img src={images[0].src} alt={images[0].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[0].label}</p>
        </div>

        <div className="group relative aspect-video overflow-hidden rounded-[1.8rem] md:col-span-2 md:row-span-1 md:aspect-auto">
          <img src={images[1].src} alt={images[1].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[1].label}</p>
        </div>

        <div className="group relative aspect-square overflow-hidden rounded-[1.8rem] md:col-span-1 md:row-span-1 md:aspect-auto">
          <img src={images[2].src} alt={images[2].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[2].label}</p>
        </div>

        <div className="group relative aspect-square overflow-hidden rounded-[1.8rem] md:col-span-1 md:row-span-1 md:aspect-auto">
          <img src={images[3].src} alt={images[3].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[3].label}</p>
        </div>
        <div className="group relative aspect-square overflow-hidden rounded-[1.8rem] md:col-span-1 md:row-span-1 md:aspect-auto">
          <img src={images[4].src} alt={images[4].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[4].label}</p>
        </div>
        <div className="group relative aspect-square overflow-hidden rounded-[1.8rem] md:col-span-1 md:row-span-1 md:aspect-auto">
          <img src={images[5].src} alt={images[5].label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-xl text-white">{images[5].label}</p>
        </div>
      </motion.div>
    </section>
  );
}
