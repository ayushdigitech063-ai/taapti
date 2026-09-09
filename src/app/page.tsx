import Hero from "@/sections/Home/Hero";
import Services from "@/sections/Home/Services";
import OurCompany from "@/sections/Home/OurCompany";
import Process from "@/sections/Home/Process";
import Partners from "@/sections/Home/Partners";
import CaseStudies from "@/sections/Home/CaseStudies";
import Testimonials from "@/sections/Home/Testimonials";
import CTA from "@/sections/Home/CTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Hero />
      <Services />
      <OurCompany />
      <Process />
      <Partners />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </main>
  );
}