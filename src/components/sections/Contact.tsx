"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  Calendar,
  CalendarCheck,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Headset
} from "lucide-react";
import { CONTACT_INFO, SOCIALS } from "@/lib/constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
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
          "Event Location": formData.location,
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
        eventType: "",
        eventDate: "",
        location: "",
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
      className="relative overflow-hidden bg-[#070d09] px-4 py-16 md:py-24 text-white"
    >
      {/* Background glowing circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#c5a059] opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-[2.5rem] border border-white/10 bg-[#0e1b12]/95 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Left Column: Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-around h-full pr-0 lg:pr-4 text-left">
            <div>
              {/* Title */}
              <h2 className="mb-6 font-serif text-4xl md:text-5xl leading-[1.15] text-[#fbf8f1] font-medium tracking-tight">
                Let&apos;s Create
                <br /> Something
                <br />
                <span className="font-signature text-5xl md:text-6xl text-[#caa56c] font-normal block mt-2 tracking-wide leading-none">
                  Extraordinary
                </span>
              </h2>

              {/* Description */}
              <p className="max-w-sm font-sans text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                Share your vision with us and we&apos;ll turn your dream event into unforgettable memories.
              </p>
            </div>

            {/* Contacts details list */}
            <div className="space-y-4 font-sans text-xs sm:text-sm font-light mt-8 lg:mt-0">
              {/* Phone - Events */}
              <a
                href={`tel:${CONTACT_INFO.events.phone}`}
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#caa56c]/40 bg-[#caa56c]/5 text-[#caa56c] shrink-0 transition-all group-hover:bg-[#caa56c]/10">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mb-1">
                    Events Inquiry (Rumesh)
                  </span>
                  <span className="text-stone-200 group-hover:text-[#caa56c] transition-colors font-medium text-xs sm:text-sm">
                    {CONTACT_INFO.events.phone}
                  </span>
                </div>
              </a>

              {/* Phone - Decor */}
              <a
                href={`tel:${CONTACT_INFO.decor.phone}`}
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#caa56c]/40 bg-[#caa56c]/5 text-[#caa56c] shrink-0 transition-all group-hover:bg-[#caa56c]/10">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mb-1">
                    Decor Shop (Nitesh)
                  </span>
                  <span className="text-stone-200 group-hover:text-[#caa56c] transition-colors font-medium text-xs sm:text-sm">
                    {CONTACT_INFO.decor.phone}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.events.email}`}
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#caa56c]/40 bg-[#caa56c]/5 text-[#caa56c] shrink-0 transition-all group-hover:bg-[#caa56c]/10">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mb-1">
                    Email Us
                  </span>
                  <span className="text-stone-200 group-hover:text-[#caa56c] transition-colors font-medium text-xs sm:text-sm break-all">
                    {CONTACT_INFO.events.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <a
                href={SOCIALS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#caa56c]/40 bg-[#caa56c]/5 text-[#caa56c] shrink-0 transition-all group-hover:bg-[#caa56c]/10">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mb-1">
                    Office Location
                  </span>
                  <span className="text-stone-200 group-hover:text-[#caa56c] transition-colors font-medium text-xs sm:text-sm leading-snug">
                    Awanti Bai Chowk, Kurud Rd, Kohka, Bhilai, CG
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex col-span-1 justify-center items-center h-full">
            <div className="h-[90%] w-[1px] bg-gradient-to-b from-transparent via-[#caa56c]/20 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#caa56c] border border-[#0e1b12]" />
            </div>
          </div>
          <div className="block lg:hidden my-4 h-[1px] bg-gradient-to-r from-transparent via-[#caa56c]/15 to-transparent" />

          {/* Right Column: Form */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-20 h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#caa56c]/10 border border-[#caa56c]/30 text-[#caa56c]">
                  <Send size={24} />
                </div>
                <h3 className="mb-3 font-serif text-2xl text-[#fbf8f1]">Inquiry Received!</h3>
                <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-stone-300">
                  Thank you for reaching out to Parampara Events. We have received your details and will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-[#caa56c] underline hover:text-[#f1d6a0] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5 flex flex-col text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-10 py-3 text-xs text-white placeholder-white/20 transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60"
                        />
                        <User size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500" />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5 flex flex-col text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 XXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="w-full rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-10 py-3 text-xs text-white placeholder-white/20 transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60"
                        />
                        <Phone size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Event Type & Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Type */}
                    <div className="space-y-1.5 flex flex-col text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Event Type</label>
                      <div className="relative">
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          required
                          className={`w-full appearance-none rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-10 py-3 text-xs transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60 ${formData.eventType !== "" ? "text-white" : "text-white/20"
                            }`}
                        >
                          <option value="" disabled className="bg-[#0e1b12] text-stone-500">Select Event Type</option>
                          <option value="Wedding" className="bg-[#0e1b12] text-white">Wedding</option>
                          <option value="Anniversary" className="bg-[#0e1b12] text-white">Anniversary</option>
                          <option value="Birthday" className="bg-[#0e1b12] text-white">Birthday</option>
                          <option value="Anniversary" className="bg-[#0e1b12] text-white">Baby Shower</option>
                          <option value="Anniversary" className="bg-[#0e1b12] text-white">Home Decoration</option>
                          <option value="Anniversary" className="bg-[#0e1b12] text-white">Balloon Decoration</option>
                          <option value="Corporate" className="bg-[#0e1b12] text-white">Corporate Events</option>
                          <option value="Anniversary" className="bg-[#0e1b12] text-white">Other</option>

                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Event Date */}
                    <div className="space-y-1.5 flex flex-col text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Event Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          required
                          className={`w-full rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-10 py-3 text-xs transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60 custom-date-input ${formData.eventDate !== "" ? "text-white" : "text-white/20"
                            }`}
                          style={{ colorScheme: "dark" }}
                        />
                        <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Event Location */}
                  <div className="space-y-1.5 flex flex-col text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Event Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="w-full rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-10 py-3 text-xs text-white placeholder-white/20 transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60"
                      />
                      <MapPin size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500" />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-1.5 flex flex-col text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#caa56c]">Tell Us About Your Event</label>
                    <div className="relative">
                      <textarea
                        placeholder="Share your ideas, preferences, guest count, theme, or anything we should know..."
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-white/5 bg-[#0a120c]/85 pl-4 pr-4 py-3 text-xs text-white placeholder-white/20 transition-all focus:border-[#caa56c]/60 focus:outline-none focus:ring-1 focus:ring-[#caa56c]/60 min-h-[90px]"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Row 5: Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-[#caa56c] via-[#b49257] to-[#a08046] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a120c] shadow-lg hover:shadow-xl hover:shadow-[#caa56c]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck size={18} className="text-[#0a120c]" />
                    <span>{isSubmitting ? "Sending..." : "Request Free Consultation"}</span>
                  </div>
                  <ArrowRight size={18} className="text-[#0a120c]" />
                </button>

                {/* Row 6: Trust Badges Footer */}
                <div className="pt-6 border-t border-white/5 mt-6">
                  <div className="grid grid-cols-3 gap-1">
                    {/* Badge 1 */}
                    <div className="flex items-center justify-center gap-2 text-left">
                      <ShieldCheck className="text-[#caa56c] shrink-0" size={24} strokeWidth={1.5} />
                      <div className="flex flex-col">
                        <span className="font-serif text-xs font-bold text-[#caa56c] leading-tight">500+</span>
                        <span className="text-[8px] sm:text-[9px] text-stone-400 leading-tight">Events Delivered</span>
                      </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="flex items-center justify-center gap-2 text-left border-x border-white/5 px-2">
                      <MapPin className="text-[#caa56c] shrink-0" size={24} strokeWidth={1.5} />
                      <div className="flex flex-col">
                        <span className="font-serif text-xs font-bold text-[#caa56c] leading-tight">Across</span>
                        <span className="text-[8px] sm:text-[9px] text-stone-400 leading-tight">Chhattisgarh</span>
                      </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="flex items-center justify-center gap-2 text-left">
                      <Headset className="text-[#caa56c] shrink-0" size={24} strokeWidth={1.5} />
                      <div className="flex flex-col">
                        <span className="font-serif text-xs font-bold text-[#caa56c] leading-tight">Free</span>
                        <span className="text-[8px] sm:text-[9px] text-stone-400 leading-tight">Initial Consultation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

