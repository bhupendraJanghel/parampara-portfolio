"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle,
  ChevronRight,
  ThumbsUp,
} from "lucide-react";
import { Review } from "@/types";

const GoogleLogo = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-stone-200/40 bg-white p-6 shadow-sm min-h-[290px] flex flex-col justify-between">
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-stone-200" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-24 rounded bg-stone-200" />
            <div className="h-2.5 w-32 rounded bg-stone-200" />
          </div>
        </div>
        <div className="h-5 w-5 rounded bg-stone-200" />
      </div>
      <div className="mb-3 flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-full bg-stone-200" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-stone-200" />
        <div className="h-3 w-5/6 rounded bg-stone-200" />
        <div className="h-3 w-2/3 rounded bg-stone-200" />
      </div>
    </div>
    <div className="h-6 w-32 bg-stone-200 rounded mt-4" />
  </div>
);

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(120);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
          setRating(data.rating || 5.0);
          setTotalReviews(data.totalReviews || 120);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Infinite horizontal scroll and drag loop effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || reviews.length === 0) return;

    let animationFrameId: number;
    let isDragging = false;
    let isHovered = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let pauseTimer: NodeJS.Timeout | null = null;

    // Track scroll as a float to prevent browser truncation issues with small speed steps
    let currentScroll = container.scrollLeft;

    const scrollSpeed = 0.8; // Speed adjustment (pixels per animation frame)

    const step = () => {
      if (!isDragging && !isHovered) {
        currentScroll += scrollSpeed;
        container.scrollLeft = Math.round(currentScroll);
      } else {
        // Sync float variable with manual scroll/drag position
        currentScroll = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    // Scroll Wrapping Listener
    const handleScroll = () => {
      const halfScrollWidth = container.scrollWidth / 2;
      if (halfScrollWidth <= 0) return;

      if (container.scrollLeft >= halfScrollWidth) {
        container.scrollLeft -= halfScrollWidth;
        currentScroll = container.scrollLeft; // Sync float tracker
      } else if (container.scrollLeft < 0) {
        container.scrollLeft += halfScrollWidth;
        currentScroll = container.scrollLeft; // Sync float tracker
      }
    };

    // Mouse Drag Listeners
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeftStart = container.scrollLeft;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll multiplier
      container.scrollLeft = scrollLeftStart - walk;
    };

    const handleMouseUpOrLeave = () => {
      isDragging = false;
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
    };

    // Touch Swipe Listeners for Mobile
    const handleTouchStart = () => {
      isDragging = true;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    // Pause on mouse hover
    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    // Temporarily pause auto-scrolling when manual trackpad/scroll wheel is used
    const handleWheel = () => {
      if (pauseTimer) clearTimeout(pauseTimer);
      isHovered = true;
      pauseTimer = setTimeout(() => {
        isHovered = false;
      }, 1500);
    };

    // Attach all handlers
    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUpOrLeave);
    container.addEventListener("mouseleave", handleMouseUpOrLeave);

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("wheel", handleWheel, { passive: true });

    container.style.cursor = "grab";

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimer) clearTimeout(pauseTimer);

      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpOrLeave);
      container.removeEventListener("mouseleave", handleMouseUpOrLeave);

      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);

      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isLoading, reviews]);

  return (
    <section className="bg-[#fbf8f1] px-6 pt-12">
      <div className="mx-auto max-w-7xl border-t border-stone-200/50 pt-16 text-center">
        <div className="flex flex-col items-center text-center">
          {/* Google Reviews Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-600 shadow-sm">
            <GoogleLogo /> Google Reviews
          </span>

          {/* Title & Separator */}
          <h3 className="mb-2 mt-4 font-serif text-3xl text-[#1b3225] md:text-4xl">
            Loved by Our Clients
          </h3>
          <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[200px]">
            <div className="h-[1px] bg-stone-200 flex-grow" />
            <Sparkles size={12} className="text-[#c5a059]" />
            <div className="h-[1px] bg-stone-200 flex-grow" />
          </div>

          <p className="text-sm text-stone-500 max-w-md">
            Real experiences from our happy clients on{" "}
            <span className="font-semibold text-[#1b3225]">Google</span>
          </p>

          {/* Centered Statistics Card */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-stone-200 bg-white px-6 py-2.5 text-xs text-stone-600 shadow-sm">
            <span className="font-serif text-base font-bold text-[#1b3225]">
              {rating.toFixed(1)}
            </span>
            <div className="flex gap-0.5 text-[#ffc107]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="h-4 w-[1px] bg-stone-200 hidden sm:block" />
            <span>Based on {totalReviews}+ verified reviews</span>
            <span className="h-4 w-[1px] bg-stone-200 hidden sm:block" />
            <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500">
              <GoogleLogo /> Google Rating
            </span>
          </div>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative mx-auto w-full overflow-hidden mt-12 py-4">
          {isLoading ? (
            <div className="flex gap-6 justify-center px-6 sm:px-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-[280px] sm:w-[360px] shrink-0">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 select-none px-6 sm:px-16"
            >
              {/* Duplicated list of reviews for seamless infinite looping */}
              {[...reviews, ...reviews].map((r, index) => (
                <div
                  key={index}
                  className="w-[280px] sm:w-[360px] shrink-0 rounded-3xl border border-stone-200/50 bg-white p-7 shadow-[0_4px_20px_rgba(27,50,37,0.02)] relative flex flex-col justify-between min-h-[290px] text-left hover:shadow-[0_8px_30px_rgba(27,50,37,0.05)] transition-shadow duration-300"
                >
                  {/* Big Quotation Mark background */}
                  <span className="absolute left-6 top-16 text-8xl font-serif text-[#c5a059]/8 select-none pointer-events-none">
                    &ldquo;
                  </span>

                  <div>
                    {/* Card Header (Avatar, Name, Date, Google Logo) */}
                    <div className="mb-4 flex items-start justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        {r.avatarUrl ? (
                          <Image
                            src={r.avatarUrl}
                            alt={r.name}
                            width={40}
                            height={40}
                            unoptimized
                            className="h-10 w-10 rounded-full object-cover shadow-inner border border-stone-100"
                          />
                        ) : (
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${r.gradient} font-sans text-xs font-bold text-stone-800 shadow-inner`}
                          >
                            {r.initials}
                          </div>
                        )}
                        <div>
                          <h4 className="flex items-center gap-1.5 font-sans text-xs font-bold tracking-wide text-[#1b3225]">
                            {r.name}
                            <CheckCircle
                              size={12}
                              className="text-[#caa15c]"
                            />
                          </h4>
                          <p className="font-sans text-[10px] text-stone-400 font-medium">
                            {r.date}
                          </p>
                        </div>
                      </div>
                      <div className="opacity-90">
                        <GoogleLogo />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="mb-3 flex gap-0.5 text-[#ffc107] relative z-10">
                      {[...Array(r.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-3 w-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Quote text */}
                    <p className="font-sans text-[11px] leading-5 text-stone-600 line-clamp-4 relative z-10">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer branding */}
                  <div className="mt-4 border-t border-stone-100 pt-3 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-400">
                    <button className="flex items-center gap-1 hover:text-[#9f7637] transition-colors">
                      <ThumbsUp size={10} /> Helpful
                    </button>
                    <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50/70 px-2 py-0.5 rounded-full">
                      <CheckCircle size={10} className="text-emerald-600" />{" "}
                      Verified Review
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Left and Right Fade Overlays for elegant premium look */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-r from-[#fbf8f1] to-[#fbf8f1]/0 z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l from-[#fbf8f1] to-[#fbf8f1]/0 z-20 pointer-events-none" />
        </div>

        {/* Action Row - See All Reviews Button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <a
            href="https://www.google.com/maps/place/Parampara+Decor+%26+Events/@21.2194689,81.3424908,816m/data=!3m1!1e3!4m8!3m7!1s0x3a2923982dd74161:0x8d4a7c3c65118734!8m2!3d21.2194689!4d81.3450657!9m1!1b1!16s%2Fg%2F11y6zv3g7j?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-3.5 font-sans text-xs font-semibold text-[#1b3225] shadow-sm transition-all hover:bg-stone-50 hover:border-[#c5a059]"
          >
            <GoogleLogo /> See All Reviews on Google{" "}
            <ChevronRight size={14} className="ml-1" />
          </a>
          <span className="text-[10px] text-stone-400 font-medium">
            Reviews are fetched directly from Google and updated automatically.
          </span>
        </div>
      </div>
    </section>
  );
}
