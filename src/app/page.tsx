import FAQPage from "@/components/homepage/FAQ";
import HeroSection from "@/components/homepage/HeroSection";
import TrustedPartners from "@/components/homepage/TrustedPartners";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      {/* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"> */}
      <Navbar />
      <HeroSection />
      <TrustedPartners />
      <FAQPage />
    </div>
  );
}
