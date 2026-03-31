import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Bespoke from "@/components/sections/Bespoke";
import Milestones from "@/components/sections/Milestones";
import Gallery from "@/components/sections/Gallery";
import Elements from "@/components/sections/Elements";
import Contact from "@/components/sections/Contact";
import Instagram from "@/components/sections/Instagram";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-[#fbf8f1]">
        <Hero />
        <Bespoke />
        <Milestones />
        <Gallery />
        <Elements />
        <Contact />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
