"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { BRAND_NAME, BRAND_NAME_FULL, SOCIALS, CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-[#1b3225] px-6 py-16 text-[#fbf8f1]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-6 select-none">
            <div 
              className="relative w-16 h-16 shrink-0 cursor-pointer active:scale-95 hover:scale-105 transition-all duration-300"
              onClick={() => window.triggerCelebration?.()}
              title="Click for a surprise celebration!"
            >
              <Image
                src="/parampara-logo.png"
                alt="Parampara Events Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold tracking-[0.25em] leading-none text-white">
                PARAMPARA
              </span>
              <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#caa56c] mt-2.5 leading-none">
                DECOR & EVENTS
              </span>
            </div>
          </div>
          <p className="mb-6 text-sm font-light leading-relaxed text-[#c5a059] opacity-90">
            A premium event planning and decor presentation built to show
            clients the quality, style, and execution {BRAND_NAME} can
            deliver.
          </p>
          <div className="flex flex-col gap-2 opacity-80">
            <Link href={SOCIALS.instagramEvents} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d4af37]"><span className="flex items-center gap-1 text-xs font-sans uppercase">Instagram (Events) <ArrowUpRight size={14} /></span></Link>
            <Link href={SOCIALS.instagramDecor} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d4af37]"><span className="flex items-center gap-1 text-xs font-sans uppercase">Instagram (Decor) <ArrowUpRight size={14} /></span></Link>
            <Link href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d4af37]"><span className="flex items-center gap-1 text-xs font-sans uppercase">Facebook <ArrowUpRight size={14} /></span></Link>
          </div>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4 text-sm font-light">
            <h3 className="mb-2 font-serif text-lg uppercase tracking-widest text-[#d4af37]">Quick Links</h3>
            <Link href="/#weddings" className="transition-colors hover:text-white/70">Wedding Planning</Link>
            <Link href="/#events" className="transition-colors hover:text-white/70">Event Gallery</Link>
            <Link href="/gallery" className="transition-colors hover:text-white/70">Gallery</Link>
            <Link href="/#about" className="transition-colors hover:text-white/70">Our Team</Link>
          </div>

          <div className="flex flex-col gap-3 text-sm font-light">
            <h3 className="mb-1 font-serif text-lg uppercase tracking-widest text-[#d4af37]">Get In Touch</h3>
            <a
              href={SOCIALS.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-stone-300 hover:text-white transition-colors max-w-[250px]"
            >
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span className="text-xs leading-normal">
                Awanti Bai Chowk, Kurud Rd, Kohka, Bhilai, Kripal Nagar, Chhattisgarh 490023
              </span>
            </a>
            <div className="flex flex-col gap-1.5 text-xs text-stone-300">
              <span className="font-semibold text-[#caa56c]">Events (Rumesh):</span>
              <a href={`tel:${CONTACT_INFO.events.phone}`} className="hover:text-white transition-colors">{CONTACT_INFO.events.phone}</a>
              <span className="font-semibold text-[#caa56c] mt-1">Decor (Nitesh):</span>
              <a href={`tel:${CONTACT_INFO.decor.phone}`} className="hover:text-white transition-colors">{CONTACT_INFO.decor.phone}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl justify-between border-t border-white/10 pt-8 text-xs font-light uppercase tracking-widest opacity-60">
        <p>© {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
        <div className="space-x-4">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
