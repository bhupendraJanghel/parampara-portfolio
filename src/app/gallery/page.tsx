import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import { Suspense } from "react";
import { getGalleryItems } from "@/lib/gallery";

export const metadata = {
  title: "Gallery | Parampara Events",
  description: "Browse Parampara Events' exclusive gallery, featuring signature setups for weddings, sangeet ceremonies, mehndi events, birthdays, and corporate celebrations.",
};

export default function GalleryPage() {
  const initialItems = getGalleryItems();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ee] pt-36 pb-20">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-20">
            <div className="w-10 h-10 border-4 border-[#1b3225] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-sans text-xs uppercase tracking-widest text-stone-500">Loading Parampara Gallery...</p>
          </div>
        }>
          <PortfolioGallery initialItems={initialItems} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
