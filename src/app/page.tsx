import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Weddings from "@/components/sections/Weddings";
import ExtraEvents from "@/components/sections/ExtraEvents";
import Gallery from "@/components/sections/Gallery";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Instagram from "@/components/sections/Instagram";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="flex-1 w-full bg-[#f7f1e6]">
        <Hero />
        <Weddings />
        <ExtraEvents />
        <Gallery />
        <Services />
        <About />
        <Contact />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
