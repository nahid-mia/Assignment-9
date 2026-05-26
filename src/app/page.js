import AboutSection from "@/components/AboutSection";
import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <AboutSection></AboutSection>
    </div>
  );
}
