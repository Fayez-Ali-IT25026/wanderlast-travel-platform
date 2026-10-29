import CTA from "@/components/Cta";
import FeaturedDestinations from "@/components/Feature";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <HeroSection/>
      < FeaturedDestinations/>
      <WhyChoose/>
      <Testimonials/>
      <CTA/>
    </div>
  );
}
