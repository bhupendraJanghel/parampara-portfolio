"use client";

import { Instagram as IgIcon } from "lucide-react";
import Script from "next/script";

export default function Instagram() {
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
        >
          <IgIcon size={16} className="text-[#c5a059]" />
          @paramparaevents
        </a>
      </div>

      {/* The Elfsight Widget Container */}
      <div className="overflow-hidden rounded-[2rem] shadow-sm">
        <div 
          className="elfsight-app-446f39e1-4bd6-4b1d-b707-28110228e96f" 
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
}

