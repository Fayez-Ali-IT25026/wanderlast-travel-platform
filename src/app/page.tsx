import CTA from "@/components/Cta";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <HeroSection/>
      <WhyChoose/>
      <Testimonials/>
      <CTA/>
    </div>
  );
}
