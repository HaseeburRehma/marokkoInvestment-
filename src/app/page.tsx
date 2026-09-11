import { HeroSection } from "@/components/hero-section";
import { InvestmentPillars } from "@/components/investment-pillars";
import { StatsSection } from "@/components/stats-section";
import { WhyMorocco } from "@/components/why-morocco";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <InvestmentPillars />
      <StatsSection />
      <WhyMorocco />
      <CTASection />
      <Footer />
    </main>
  );
}
