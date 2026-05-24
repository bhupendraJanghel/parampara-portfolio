"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Log submission to our local API route (terminal logs)
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (logErr) {
        console.warn("Local console logging skipped:", logErr);
      }

      // 2. Submit directly to Web3Forms from the client side (bypasses Cloudflare block on Node.js)
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms Access Key is not configured in .env.local.");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Event Consultation Request from ${formData.name}`,
          from_name: "Parampara Events Consultation",
          Name: formData.name,
          Phone: formData.phone,
          "Event Type": formData.eventType,
          "Event Date": formData.eventDate,
          Message: formData.message,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit to Web3Forms");
      }

      setIsSubmitted(true);
      // Reset form fields
      setFormData({
        name: "",
        phone: "",
        eventType: "Wedding",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission failed:", error);
      const err = error as Error;
      alert(`Submission failed: ${err.message || "Please check your network and try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className="rounded-[2rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-12 min-h-[500px] flex flex-col justify-center"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37]">
                <Send size={24} />
              </div>
              <h3 className="mb-3 font-serif text-2xl text-[#fbf8f1]">Inquiry Received!</h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/70">
                Thank you for reaching out to Parampara Events. We have received your details and will get in touch with you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-xs font-bold uppercase tracking-widest text-[#d4af37] underline hover:text-[#f1d6a0] transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Event Type</label>
                <div className="relative">
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition-colors focus:border-[#d4af37] focus:outline-none"
                  >
                    <option className="bg-[#1b3225]">Wedding</option>
                    <option className="bg-[#1b3225]">Corporate</option>
                    <option className="bg-[#1b3225]">Birthday</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                    ▼
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                  className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition-colors focus:border-[#d4af37] focus:outline-none"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Message</label>
                <textarea
                  placeholder="Tell us about your dream event..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#d4af37] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] p-4 text-sm font-bold uppercase tracking-widest text-[#1b3225] transition-all hover:shadow-lg hover:shadow-[#c5a059]/30 active:scale-[0.98] sm:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Request Consultation"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
