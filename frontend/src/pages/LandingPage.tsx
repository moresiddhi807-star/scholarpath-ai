import { PublicNavbar } from "../components/layout/PublicNavbar";
import { Hero } from "../components/landing/Hero";
import { FeaturesShowcase } from "../components/landing/FeaturesShowcase";
import { StatsSection } from "../components/landing/StatsSection";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Testimonials } from "../components/landing/Testimonials";
import { CtaBand, Footer } from "../components/landing/CtaAndFooter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      <PublicNavbar />
      <Hero />
      <FeaturesShowcase />
      <StatsSection />
      <HowItWorks />
      <Testimonials />
      <CtaBand />
      <Footer />
    </div>
  );
}
