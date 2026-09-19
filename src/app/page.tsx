import dynamic from "next/dynamic";
import Hero from "@/sections/Home/Hero";
import Services from "@/sections/Home/Services";
import OurCompany from "@/sections/Home/OurCompany";

const Process = dynamic(() => import("@/sections/Home/Process"));
const Partners = dynamic(() => import("@/sections/Home/Partners"));
const CaseStudies = dynamic(() => import("@/sections/Home/CaseStudies"));
const Testimonials = dynamic(() => import("@/sections/Home/Testimonials"));
const Gallery = dynamic(() => import("@/sections/Home/Gallery"));
const CTA = dynamic(() => import("@/sections/Home/CTA"));

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <OurCompany />
      <Process />
      <Partners />
      <CaseStudies />
      <Testimonials />
      <Gallery />
      <CTA />
    </main>
  );
}