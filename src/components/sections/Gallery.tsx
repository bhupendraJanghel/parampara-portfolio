"use client";

import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", // Tall (Left)
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", // Wide top-right
  "https://images.unsplash.com/photo-1505932794465-147d1f1bce2d?auto=format&fit=crop&q=80&w=800",  // Mid-right 
  "https://images.unsplash.com/photo-1544067977-8d070b43dff6?auto=format&fit=crop&q=80&w=800",   // bottom-left
  "https://images.unsplash.com/photo-1530103862676-de8892bc6cb4?auto=format&fit=crop&q=80&w=800",   // bottom-mid
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"    // bottom-right
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1b3225] mb-8">
          The Gallery of Dreams
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 font-sans text-xs uppercase tracking-widest font-semibold text-[#1b3225]">
          <button className="px-6 py-2 rounded-full bg-[#c5a059] text-white transition-all shadow-sm">All</button>
          <button className="px-6 py-2 rounded-full bg-white border border-stone-200 hover:border-[#c5a059] hover:text-[#c5a059] transition-all">Wedding</button>
          <button className="px-6 py-2 rounded-full bg-white border border-stone-200 hover:border-[#c5a059] hover:text-[#c5a059] transition-all">Birthday</button>
          <button className="px-6 py-2 rounded-full bg-white border border-stone-200 hover:border-[#c5a059] hover:text-[#c5a059] transition-all">Corporate</button>
        </div>
      </div>

      {/* Bento-style Gallery Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[700px]"
      >
        {/* Left tall */}
        <div className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group">
          <img src={images[0]} alt="Gallery 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        
        {/* Center wide */}
        <div className="md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden group aspect-video md:aspect-auto">
          <img src={images[1]} alt="Gallery 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        
        {/* Right stacked top */}
        <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group aspect-square md:aspect-auto">
          <img src={images[2]} alt="Gallery 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Bottom row */}
        <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group aspect-square md:aspect-auto">
          <img src={images[3]} alt="Gallery 4" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group aspect-square md:aspect-auto">
          <img src={images[4]} alt="Gallery 5" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group aspect-square md:aspect-auto">
          <img src={images[5]} alt="Gallery 6" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      </motion.div>
    </section>
  );
}
