"use client";

import { ContactSection } from "@/modules/landing/ui/components/contact";
import { GallerySection } from "@/modules/landing/ui/components/gallery-section";
import { Hero } from "@/modules/landing/ui/components/hero";
import Navbar from "@/modules/landing/ui/components/navbar";
import { QueEsSection } from "@/modules/landing/ui/components/que-es-section";
import { QuienesSomosSection } from "@/modules/landing/ui/components/quienes-somos-section";
import { Footer } from "@/modules/landing/ui/components/footer";

const LandingPage = () => {
  return (
    <main className="bg-blackBackgroundNew z-10 relative min-h-screen w-screen  ">
      <Navbar />
      <Hero />
      <QueEsSection />
      <QuienesSomosSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
