import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturedChefsSection } from "@/components/landing/FeaturedChefsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { CTASection } from "@/components/landing/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DarFood - Cuisine Marocaine Fait Maison | الطبخ المغربي</title>
        <meta name="description" content="Découvrez les saveurs authentiques du Maroc. Commandez des plats maison préparés par nos chefs locaux : tajines, couscous, rfissa et plus encore." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16 md:pt-20">
          <HeroSection />
          <HowItWorksSection />
          <FeaturedChefsSection />
          <TrustSection />
          <CommunitySection />
          <CTASection />
        </main>

        <Footer />
        <MobileNavbar />
      </div>
    </>
  );
};

export default Index;
