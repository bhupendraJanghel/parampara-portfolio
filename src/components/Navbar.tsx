"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Hide when scrolling down past 150px
    } else {
      setHidden(false); // Show when scrolling up
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#111712]/70 text-[#f7f1e6] backdrop-blur-xl shadow-[0_10px_40px_rgba(15,17,15,0.14)]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="#home" className="font-serif text-2xl font-light italic tracking-wider">
          Parampara Events
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
          <Link href="#home" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Home
          </Link>
          <Link href="#weddings" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Weddings
          </Link>
          <Link href="#events" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Events
          </Link>
          <Link href="#gallery" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Portfolio
          </Link>
          <Link href="#about" className="hover:text-amber-200 transition-colors pb-1 border-b border-transparent">
            Founders
          </Link>
        </div>

        <Link
          href="#contact"
          className="hidden md:inline-block px-6 py-2 border border-white/60 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300"
        >
          Plan Your Event
        </Link>
      </div>
    </motion.nav>
  );
}
