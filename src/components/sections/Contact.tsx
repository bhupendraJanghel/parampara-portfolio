"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[#2c4b37] to-[#1b3225] px-6 py-24 text-white"
    >
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#c5a059] opacity-10 blur-[150px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
            Start Your Consultation
          </span>
          <h2 className="mb-8 font-serif text-5xl leading-tight text-[#fbf8f1] md:text-6xl">
            Let&apos;s design
            <br /> your next event
          </h2>
          <p className="mb-12 max-w-md font-light leading-relaxed text-white/80">
            Whether you are planning a wedding, a family celebration, or a
            branded event, Parampara Events can help shape the concept, decor,
            guest experience, and execution.
          </p>

          <div className="mb-12 space-y-6 font-light opacity-90">
            <div className="flex items-center gap-4">
              <Phone className="text-[#d4af37]" size={20} />
              <span>Contact number available on request</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[#d4af37]" size={20} />
              <span>Instagram and direct inquiry support</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-[#d4af37]" size={20} />
              <span>Available for weddings, decor work, and event setups</span>
            </div>
          </div>

          <a
            href="#instagram"
            className="flex w-max items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-[#25D366]/20 transition-transform hover:-translate-y-1"
          >
            <Send size={18} /> Connect With Parampara
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-12"
        >
          <form className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Full Name</label>
              <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Phone Number</label>
              <input type="tel" placeholder="+91" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Event Type</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition-colors focus:border-[#d4af37] focus:outline-none">
                  <option className="bg-[#1b3225]">Wedding</option>
                  <option className="bg-[#1b3225]">Corporate</option>
                  <option className="bg-[#1b3225]">Birthday</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  ?
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Event Date</label>
              <input type="date" className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition-colors focus:border-[#d4af37] focus:outline-none" style={{ colorScheme: "dark" }} />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Message</label>
              <textarea placeholder="Tell us about your dream event..." rows={4} className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none"></textarea>
            </div>

            <button type="button" className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] p-4 text-sm font-bold uppercase tracking-widest text-[#1b3225] transition-all hover:shadow-lg hover:shadow-[#c5a059]/30 active:scale-[0.98] sm:col-span-2">
              Request Consultation
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
