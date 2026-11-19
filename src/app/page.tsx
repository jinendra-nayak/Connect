import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { MobileCta } from "@/components/layout/mobile-cta";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Products } from "@/components/sections/products";
import { PanelShowcase } from "@/components/sections/panel-showcase";
import { Sensors } from "@/components/sections/sensors";
import { Security } from "@/components/sections/security";
import { Connected } from "@/components/sections/connected";
import { Why } from "@/components/sections/why";
import { Consultation } from "@/components/sections/consultation";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Experience />
        <Products />
        <PanelShowcase />
        <Sensors />
        <Security />
        <Connected />
        <Why />
        <Consultation />
      </main>
      <Footer />
      <FloatingContact />
      <MobileCta />
    </>
  );
}
