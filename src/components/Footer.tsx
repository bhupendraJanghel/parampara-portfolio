import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-[#1b3225] px-6 py-16 text-[#fbf8f1]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-sm">
          <h2 className="mb-6 font-serif text-3xl italic tracking-wider">Parampara Events</h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-[#c5a059] opacity-90">
            A premium event planning and decor presentation built to show
            clients the quality, style, and execution Parampara Events can
            deliver.
          </p>
          <div className="flex gap-4 opacity-80">
            <Link href="#" className="transition-colors hover:text-[#d4af37]"><span className="flex items-center gap-1 text-sm font-sans uppercase">Instagram <ArrowUpRight size={14}/></span></Link>
            <Link href="#" className="transition-colors hover:text-[#d4af37]"><span className="flex items-center gap-1 text-sm font-sans uppercase">Facebook <ArrowUpRight size={14}/></span></Link>
          </div>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4 text-sm font-light">
            <h3 className="mb-2 font-serif text-lg uppercase tracking-widest text-[#d4af37]">Quick Links</h3>
            <Link href="#weddings" className="transition-colors hover:text-white/70">Wedding Planning</Link>
            <Link href="#events" className="transition-colors hover:text-white/70">Event Portfolio</Link>
            <Link href="#gallery" className="transition-colors hover:text-white/70">Gallery</Link>
            <Link href="#about" className="transition-colors hover:text-white/70">Founders</Link>
          </div>

          <div className="flex flex-col gap-4 text-sm font-light">
            <h3 className="mb-2 font-serif text-lg uppercase tracking-widest text-[#d4af37]">Get In Touch</h3>
            <span className="flex items-center gap-2"><MapPin size={16} /> Parampara Event Planner</span>
            <Link href="#contact" className="transition-colors hover:text-white/70">Consultation Form</Link>
            <Link href="#instagram" className="transition-colors hover:text-white/70">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl justify-between border-t border-white/10 pt-8 text-xs font-light uppercase tracking-widest opacity-60">
        <p>© 2026 Parampara Events. All Rights Reserved.</p>
        <div className="space-x-4">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
