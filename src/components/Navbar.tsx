"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-md text-white" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-light italic tracking-wider">
          The Parampara Events
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
          <Link href="#home" className="hover:text-amber-200 transition-colors border-b border-amber-200 pb-1">
            Home
          </Link>
          <Link href="#weddings" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Weddings
          </Link>
          <Link href="#events" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Events
          </Link>
          <Link href="#gallery" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Gallery
          </Link>
          <Link href="#about" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            About
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#contact"
          className="hidden md:inline-block px-6 py-2 border border-white/60 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300"
        >
          Book Now
        </Link>
      </div>
    </motion.nav>
  );
}
