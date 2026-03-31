import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1b3225] text-[#fbf8f1] py-16 px-6 relative mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left Col - Brand */}
        <div className="max-w-sm">
          <h2 className="font-serif text-3xl italic tracking-wider mb-6">The Parampara Events</h2>
          <p className="text-sm leading-relaxed text-[#c5a059] opacity-90 mb-6 font-light">
            We specialize in creating bespoke, timeless events. From intimate ceremonies to grand galas, 
            every detail is meticulously designed to reflect your unique story.
          </p>
          <div className="flex gap-4 opacity-80">
             <Link href="#" className="hover:text-[#d4af37] transition-colors"><span className="flex items-center gap-1 text-sm font-sans uppercase">Instagram <ArrowUpRight size={14}/></span></Link>
             <Link href="#" className="hover:text-[#d4af37] transition-colors"><span className="flex items-center gap-1 text-sm font-sans uppercase">Facebook <ArrowUpRight size={14}/></span></Link>
          </div>
        </div>

        {/* Middle Col - Quick Links */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4 text-sm font-light">
            <h3 className="font-serif text-lg tracking-widest text-[#d4af37] mb-2 uppercase">Quick Links</h3>
            <Link href="#weddings" className="hover:text-white/70 transition-colors">Wedding Planning</Link>
            <Link href="#events" className="hover:text-white/70 transition-colors">Corporate Events</Link>
            <Link href="#gallery" className="hover:text-white/70 transition-colors">Event Gatherings</Link>
            <Link href="#gallery" className="hover:text-white/70 transition-colors">Gallery</Link>
          </div>
          
          <div className="flex flex-col gap-4 text-sm font-light">
            <h3 className="font-serif text-lg tracking-widest text-[#d4af37] mb-2 uppercase">Get In Touch</h3>
            <span className="flex items-center gap-2"><MapPin size={16} /> Mumbai</span>
            <Link href="tel:+91" className="hover:text-white/70 transition-colors">Phone</Link>
            <Link href="mailto:info@" className="hover:text-white/70 transition-colors">Email</Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs font-light opacity-60 flex justify-between uppercase tracking-widest">
         <p>© 2024 The Parampara Events. All Rights Reserved.</p>
         <div className="space-x-4">
             <Link href="#" className="hover:text-white">Privacy Policy</Link>
             <Link href="#" className="hover:text-white">Terms of Use</Link>
         </div>
      </div>
    </footer>
  );
}
