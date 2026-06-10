"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  MapPin,
  Play,
  Image as ImageIcon,
  Home,
  ArrowRight,
  Users,
  Star,
  Crown
} from "lucide-react";
import { GalleryItem } from "@/lib/gallery";

interface PortfolioGalleryProps {
  initialItems: GalleryItem[];
}

const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "weddings", label: "WEDDINGS" },
  { id: "haldi", label: "HALDI" },
  { id: "sangeet", label: "SANGEET" },
  { id: "reception", label: "RECEPTION" },
  { id: "birthdays", label: "BIRTHDAYS" },
  { id: "corporate", label: "CORPORATE" },
];

export default function PortfolioGallery({ initialItems }: PortfolioGalleryProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const fromSection = searchParams.get("from");

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Synchronize category with query parameter changes
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  // Filter items based on active category & search query
  const filteredItems = initialItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" ||
      item.title.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Disable page scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-6">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-stone-500 font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-8 text-left">
        <Link href={fromSection ? `/#${fromSection}` : "/"} className="hover:text-[#caa56c] transition-colors flex items-center">
          <Home size={13} />
        </Link>
        <span>/</span>
        <span className="text-[#caa56c]">Gallery</span>
      </div>

      {/* Tabs & Search Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-stone-200/50 pb-8">

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-1 sm:gap-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <div key={category.id} className="flex flex-col items-center relative">
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-all duration-300 ${isActive
                    ? "bg-[#111d15] text-[#f7f1e6] shadow-md"
                    : "text-stone-500 hover:text-[#1b3225]"
                    }`}
                >
                  {category.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute -bottom-[9px] w-6 h-[2px] bg-[#caa56c]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md w-full lg:w-80 shrink-0 self-end lg:self-center">
          <input
            type="text"
            placeholder="Search events, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full border border-stone-200 focus:border-[#caa56c] focus:outline-none font-sans text-xs tracking-wider text-stone-700 transition-colors shadow-sm"
          />
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Gallery 12-Column Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            // Custom badge render based on event type
            const isVideo = item.type === "video";

            return (
              <div
                key={item.src}
                onClick={() => setLightboxIndex(index)}
                className="col-span-12 sm:col-span-6 md:col-span-4 group relative aspect-[4/3] w-full overflow-hidden border border-stone-200/40 rounded-[2rem] cursor-pointer shadow-[0_4px_20px_rgba(27,50,37,0.02)] hover:shadow-lg"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-90"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-stone-50 border border-stone-200/50 rounded-[2rem] max-w-6xl mx-auto">
          <p className="font-sans text-sm text-stone-500 uppercase tracking-widest">No showcase matches your search criteria.</p>
          <button
            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
            className="mt-4 px-6 py-2 bg-[#1b3225] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#111d15] transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* CTA Box Banner */}
      <div className="mt-20 rounded-[2.5rem] bg-[#fbf9f4] border border-stone-200/60 p-8 sm:p-10 md:p-12 shadow-[0_15px_50px_rgba(27,50,37,0.02)] max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#faf6ee] text-[#caa56c] border border-stone-200/40 shadow-sm">
            <Sparkles size={20} className="text-[#caa56c]" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#1b3225] font-bold leading-snug">
              Have a vision in mind?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-500 mt-1 leading-normal tracking-wide">
              Let&apos;s create something unforgettable together.
            </p>
          </div>
        </div>
        <Link
          href="/#contact"
          className="group flex items-center justify-center gap-2 rounded-full bg-[#111d15] hover:bg-[#1b3225] px-8 py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white transition-all shrink-0 shadow-md hover:shadow-lg"
        >
          Plan Your Event
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Absolute Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-stone-900/60 rounded-full text-white/80 hover:text-white hover:bg-stone-800 transition-all border border-white/10 shadow-lg"
            >
              <X size={24} />
            </button>

            {/* Main Image Slider Area */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={() => setLightboxIndex(null)}>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 z-50 p-3 bg-stone-900/60 rounded-full text-white/80 hover:text-white hover:bg-stone-800 transition-all border border-white/10 shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Lightbox Image Container */}
              <div
                className="relative w-full h-full max-h-[90vh] max-w-[90vw] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    {filteredItems[lightboxIndex].type === "video" ? (
                      <video
                        src={filteredItems[lightboxIndex].videoSrc || filteredItems[lightboxIndex].src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full max-h-[90vh] rounded-[1rem] object-contain focus:outline-none"
                      />
                    ) : (
                      <Image
                        src={filteredItems[lightboxIndex].src}
                        alt={filteredItems[lightboxIndex].title}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 z-50 p-3 bg-stone-900/60 rounded-full text-white/80 hover:text-white hover:bg-stone-800 transition-all border border-white/10 shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
