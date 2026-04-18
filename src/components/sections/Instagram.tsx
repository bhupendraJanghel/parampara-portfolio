"use client";

import Script from "next/script";

export default function InstagramFeed() {
  return (
    <section id="instagram" className="mx-auto max-w-7xl px-6 py-24">
      {/* Elfsight Platform Script */}
      <Script 
        src="https://elfsightcdn.com/platform.js" 
        strategy="afterInteractive" 
      />

      <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9f7637]">
            Social Stories
          </span>
          <h2 className="mt-4 font-serif text-4xl text-[#1b3225] md:text-5xl">
            Live from Instagram
          </h2>
        </div>
        <a 
          href="https://instagram.com/paramparaevents" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full border border-stone-200 px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-[#1b3225] transition-all hover:border-[#c5a059] hover:bg-[#fbf8f1]"
          aria-label="Follow us on Instagram"
        >
          {/* Custom SVG Instagram Icon to avoid lucide-react versioning issues */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-[#c5a059]"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          @paramparaevents
        </a>
      </div>

      {/* The Elfsight Widget Container */}
      <div className="overflow-hidden rounded-[2rem] shadow-sm">
        <div 
          className="elfsight-app-446f39e1-4bd6-4b1d-b707-28110228e96f" 
          data-elfsight-app-lazy=""
        ></div>
      </div>
    </section>
  );
}

