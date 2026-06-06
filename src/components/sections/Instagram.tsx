"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SOCIALS } from "@/lib/constants";
import {
  Heart,
  MessageCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface InstagramPost {
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  link: string;
  date: string;
}

const InstagramLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-stone-200/40 bg-white p-4 shadow-sm min-h-[420px] flex flex-col justify-between w-[280px] sm:w-[320px] shrink-0">
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-stone-200" />
        <div className="flex flex-col gap-1">
          <div className="h-2.5 w-20 rounded bg-stone-200" />
          <div className="h-2 w-12 rounded bg-stone-200" />
        </div>
      </div>
      {/* Image placeholder */}
      <div className="relative aspect-square w-full rounded-2xl bg-stone-200 mb-3" />
      {/* Caption lines */}
      <div className="space-y-1.5 px-1">
        <div className="h-2.5 w-full rounded bg-stone-200" />
        <div className="h-2.5 w-5/6 rounded bg-stone-200" />
      </div>
    </div>
    {/* Footer */}
    <div className="h-4 w-24 bg-stone-200 rounded mt-4 ml-1" />
  </div>
);

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error("Failed to fetch Instagram posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Infinite horizontal scroll and drag loop effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || posts.length === 0) return;

    let animationFrameId: number;
    let isDragging = false;
    let isHovered = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let pauseTimer: NodeJS.Timeout | null = null;

    let currentScroll = container.scrollLeft;
    const scrollSpeed = 0.8; // Smooth scrolling speed

    const step = () => {
      if (!isDragging && !isHovered) {
        currentScroll += scrollSpeed;
        container.scrollLeft = Math.round(currentScroll);
      } else {
        currentScroll = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    const handleScroll = () => {
      const halfScrollWidth = container.scrollWidth / 2;
      if (halfScrollWidth <= 0) return;

      if (container.scrollLeft >= halfScrollWidth) {
        container.scrollLeft -= halfScrollWidth;
        currentScroll = container.scrollLeft;
      } else if (container.scrollLeft < 0) {
        container.scrollLeft += halfScrollWidth;
        currentScroll = container.scrollLeft;
      }
    };

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
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeftStart - walk;
    };

    const handleMouseUpOrLeave = () => {
      isDragging = false;
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handleWheel = () => {
      if (pauseTimer) clearTimeout(pauseTimer);
      isHovered = true;
      pauseTimer = setTimeout(() => {
        isHovered = false;
      }, 1500);
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUpOrLeave);
    container.addEventListener("mouseleave", handleMouseUpOrLeave);

    container.addEventListener("touchstart", () => { isDragging = true; }, { passive: true });
    container.addEventListener("touchend", () => { isDragging = false; }, { passive: true });

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

      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isLoading, posts]);

  return (
    <section className="bg-[#fbf8f1] px-6 pb-12 md:pb-16 pt-0">
      <div className="mx-auto max-w-7xl border-t border-stone-200/50 pt-12 md:pt-16 text-center">
        <div className="flex flex-col items-center text-center">
          {/* Instagram Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <InstagramLogo /> {SOCIALS.instagramEventsUsername}
            </span>
          </div>

          {/* Title & Separator */}
          <h3 className="mb-2 mt-4 font-serif text-3xl text-[#1b3225] md:text-4xl">
            Live from Instagram
          </h3>
          <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[200px]">
            <div className="h-[1px] bg-stone-200 flex-grow" />
            <Sparkles size={12} className="text-[#c5a059]" />
            <div className="h-[1px] bg-stone-200 flex-grow" />
          </div>

          <p className="text-sm text-stone-500 max-w-md">
            Follow our journey on social media to see our latest wedding and event setups
          </p>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative mx-auto w-full overflow-hidden mt-12 py-4">
          {isLoading ? (
            <div className="flex gap-6 justify-center px-6 sm:px-16 overflow-x-hidden">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 select-none px-6 sm:px-16"
            >
              {/* Duplicated list of posts for seamless loop */}
              {[...posts, ...posts].map((post, index) => (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl border border-stone-200/50 bg-white p-4 shadow-[0_4px_20px_rgba(27,50,37,0.02)] relative flex flex-col justify-between text-left hover:shadow-[0_8px_30px_rgba(27,50,37,0.05)] transition-shadow duration-300 group"
                >
                  <div>
                    {/* Post Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-sans text-[8px] font-bold text-stone-800">
                            PE
                          </div>
                        </div>
                        <div>
                          <h4 className="font-sans text-[10px] font-bold tracking-wide text-[#1b3225]">
                            paramparaevents
                          </h4>
                          <p className="font-sans text-[8px] text-stone-400">
                            {post.date}
                          </p>
                        </div>
                      </div>
                      {/* Small Instagram Icon */}
                      <div className="text-stone-300 group-hover:text-[#ee2a7b] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                    </div>

                    {/* Post Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-50 mb-3">
                      <Image
                        src={post.imageUrl}
                        alt="Instagram Post"
                        fill
                        unoptimized={post.imageUrl.startsWith("http")}
                        sizes="(max-width: 768px) 280px, 320px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Post Caption */}
                    <p className="font-sans text-[10px] leading-relaxed text-stone-600 line-clamp-2 px-1">
                      {post.caption}
                    </p>
                  </div>

                  {/* Post Footer Metrics */}
                  <div className="mt-4 border-t border-stone-100 pt-3 flex items-center gap-4 text-[10px] font-bold text-stone-500 px-1">
                    <span className="flex items-center gap-1 hover:text-[#ee2a7b] transition-colors">
                      <Heart size={12} className="fill-stone-100 group-hover:fill-current" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} /> {post.comments}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Left and Right Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-r from-[#fbf8f1] to-[#fbf8f1]/0 z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l from-[#fbf8f1] to-[#fbf8f1]/0 z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

