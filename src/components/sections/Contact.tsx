"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-[#2c4b37] to-[#1b3225] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-4 block">
            The Parampara Events
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#fbf8f1] mb-8 leading-tight">
            Let’s Plan <br /> Your Event
          </h2>
          <p className="text-white/80 font-light leading-relaxed mb-12 max-w-md">
            Whether it’s a small family function or a grand party, our team is here to help. Just tell us what you need, and we’ll handle the rest.
          </p>

          <div className="space-y-6 mb-12 opacity-90 font-light">
            <div className="flex items-center gap-4">
              <Phone className="text-[#d4af37]" size={20} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[#d4af37]" size={20} />
              <span>hello@paramparaevents.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-[#d4af37]" size={20} />
              <span>Mumbai, India</span>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 w-max rounded-full font-bold shadow-lg shadow-[#25D366]/20 hover:-translate-y-1 transition-transform">
            <Send size={18} /> WhatsApp
          </button>
        </motion.div>

        {/* Right Side / Form */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2rem]"
        >
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Full Name</label>
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37] text-white placeholder-white/30 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Phone Number</label>
              <input type="tel" placeholder="+91" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37] text-white placeholder-white/30 transition-colors" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Event Type</label>
              <div className="relative">
                <select className="appearance-none w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37] text-white/70 transition-colors">
                  <option className="bg-[#1b3225]">Wedding</option>
                  <option className="bg-[#1b3225]">Corporate</option>
                  <option className="bg-[#1b3225]">Birthday</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  ⌄
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Event Date</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37] text-white/70 transition-colors appearance-none" style={{ colorScheme: 'dark' }} />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Message</label>
              <textarea placeholder="Tell us about your dream event..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37] text-white placeholder-white/30 transition-colors resize-none"></textarea>
            </div>

            <button type="button" className="sm:col-span-2 w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#1b3225] p-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all active:scale-[0.98]">
              Request Consultation
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
