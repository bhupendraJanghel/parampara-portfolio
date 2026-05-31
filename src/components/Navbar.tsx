"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-[#111712]/90 text-[#f7f1e6] backdrop-blur-xl shadow-[0_10px_40px_rgba(15,17,15,0.14)]"
          : "bg-transparent text-[#1b3225]"
          }`}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
          <Link href="#home" className="flex items-center gap-4 group z-50">
            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 transition-all duration-300">
              <Image
                src="/parampara-logo.png"
                alt="Parampara Events Logo"
                fill
                priority
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-serif text-xl md:text-2xl font-bold tracking-[0.25em] leading-none transition-colors duration-300 ${isOpen || scrolled
                ? "text-white group-hover:text-amber-100"
                : "text-[#1b3225] group-hover:text-[#caa56c]"
                }`}>
                PARAMPARA
              </span>
              <span className="font-sans text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-[#caa56c] mt-2.5 leading-none">
                DECOR & EVENTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold">
            <Link href="#home" className="hover:text-white transition-colors pb-1 border-b border-transparent">
              Home
            </Link>
            <Link href="#weddings" className="hover:text-white transition-colors pb-1 border-b border-transparent">
              Weddings
            </Link>
            <Link href="#events" className="hover:text-white transition-colors pb-1 border-b border-transparent">
              Events
            </Link>
            <Link href="#gallery" className="hover:text-white transition-colors pb-1 border-b border-transparent">
              Portfolio
            </Link>
            <Link href="#about" className="hover:text-white transition-colors pb-1 border-b border-transparent">
              Founders
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <Link
            href="#contact"
            className={`hidden md:inline-block px-6 py-2.5 border rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300
              ${scrolled
                ? "border-[#f7f1e6]/60 text-[#f7f1e6] hover:bg-[#f7f1e6] hover:text-[#111712]"
                : "border-[#1b3225]/60 text-[#1b3225] hover:bg-[#1b3225] hover:text-[#faf6ee]"
              }
            `}
          >
            Plan Your Event
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`block md:hidden p-2 focus:outline-none z-50 relative transition-colors duration-300 ${isOpen || scrolled
              ? "text-white hover:text-amber-200"
              : "text-[#1b3225] hover:text-[#caa56c]"
              }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#111712] text-[#f7f1e6] z-40 flex flex-col justify-center items-center px-6 pt-24"
          >
            {/* Background luxury brand ornament pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <Sparkles size={300} className="text-[#caa56c]" />
            </div>

            <div className="flex flex-col items-center space-y-8 text-lg uppercase tracking-[0.2em] font-semibold z-10">
              <Link
                href="#home"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="#weddings"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 transition-colors py-2"
              >
                Weddings
              </Link>
              <Link
                href="#events"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 transition-colors py-2"
              >
                Events
              </Link>
              <Link
                href="#gallery"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 transition-colors py-2"
              >
                Portfolio
              </Link>
              <Link
                href="#about"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 transition-colors py-2"
              >
                Founders
              </Link>

              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 px-8 py-3 border border-[#caa56c]/60 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-[#f7f1e6] hover:text-[#111712] transition-all duration-300"
              >
                Plan Your Event
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
