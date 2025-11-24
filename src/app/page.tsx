import CombinedFeaturedSection from "@/components/ui/combined-featured-section";
import HeroFuturistic from "@/components/ui/hero-futuristic";
import Navbar from "@/components/ui/navbar";
import TrustedBy from "@/components/ui/trusted-by";
import { Navbar1 } from "@/components/ui/navbar-1";
import PricingSectionComponent from "@/components/ui/pricing-section";
import FAQSection from "@/components/ui/faq-section";

export default function Home() {
  return (
    <main className="w-full bg-gray-50">
      <Navbar1 />
      <div className="bg-stone-50 py-6 md:py-8">
        <div className="border-t border-gray-200 max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8"></div>
      </div>
      {/* Navbar temporarily removed */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 -mt-4 md:-mt-6">
        {/* Hero Section Frame */}
        <div className="border-t border-l border-r border-gray-200 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] bg-white flex relative">
          <HeroFuturistic />
        </div>
        
        {/* Bottom border line - separate element to ensure visibility */}
        <div className="border-b border-gray-200 bg-white"></div>
        
        {/* Trusted By Section Frame */}
        <div className="border-l border-r border-b border-gray-200 bg-white">
          <TrustedBy />
        </div>
        <CombinedFeaturedSection />
      </div>
      
      <PricingSectionComponent />
      <FAQSection />
    </main>
  );
}
